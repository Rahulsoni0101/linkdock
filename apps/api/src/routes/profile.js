import { Router } from 'express';
import db from '../db.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

router.use(requireAuth);

function getProfile(userId) {
  let profile = db.prepare('SELECT * FROM profiles WHERE user_id = ?').get(userId);
  if (!profile) {
    db.prepare('INSERT INTO profiles (user_id) VALUES (?)').run(userId);
    profile = db.prepare('SELECT * FROM profiles WHERE user_id = ?').get(userId);
  }
  return profile;
}

function mapProfile(p) {
  if (!p) return null;
  return {
    theme: p.theme,
    primaryColor: p.primary_color,
    accentColor: p.accent_color,
    font: p.font,
    backgroundType: p.background_type,
    backgroundValue: p.background_value,
    showSocial: !!p.show_social,
    showBranding: !!p.show_branding,
    seoTitle: p.seo_title,
    seoDescription: p.seo_description,
  };
}

router.get('/', (req, res) => {
  const profile = getProfile(req.user.id);
  const socials = db
    .prepare('SELECT id, platform, url, position FROM social_links WHERE user_id = ? ORDER BY position')
    .all(req.user.id);
  res.json({ profile: mapProfile(profile), socials });
});

router.put('/', (req, res) => {
  const allowed = [
    'theme',
    'primaryColor',
    'accentColor',
    'font',
    'backgroundType',
    'backgroundValue',
    'showSocial',
    'showBranding',
    'seoTitle',
    'seoDescription',
  ];
  const body = req.body || {};
  const fields = allowed.filter((f) => body[f] !== undefined);
  if (fields.length === 0) {
    return res.status(400).json({ error: 'No valid fields provided' });
  }

  const setClause = fields.map((f) => `"${f === 'primaryColor' ? 'primary_color' : f === 'accentColor' ? 'accent_color' : f === 'backgroundType' ? 'background_type' : f === 'backgroundValue' ? 'background_value' : f === 'showSocial' ? 'show_social' : f === 'showBranding' ? 'show_branding' : f === 'seoTitle' ? 'seo_title' : f === 'seoDescription' ? 'seo_description' : f}" = ?`).join(', ');

  const values = fields.map((f) => {
    const v = body[f];
    if (f === 'showSocial' || f === 'showBranding') return v ? 1 : 0;
    return typeof v === 'string' ? v : JSON.stringify(v);
  });

  db.prepare(
    `UPDATE profiles SET ${setClause}, updated_at = datetime('now') WHERE user_id = ?`
  ).run(...values, req.user.id);

  res.json({ profile: mapProfile(getProfile(req.user.id)) });
});

router.put('/socials', (req, res) => {
  const { socials } = req.body || {};
  if (!Array.isArray(socials)) {
    return res.status(400).json({ error: 'socials must be an array' });
  }
  const tx = db.transaction(() => {
    db.prepare('DELETE FROM social_links WHERE user_id = ?').run(req.user.id);
    const insert = db.prepare(
      'INSERT INTO social_links (id, user_id, platform, url, position) VALUES (?, ?, ?, ?, ?)'
    );
    socials.forEach((s, i) => {
      if (s && s.platform && s.url) {
        insert.run(
          s.id || crypto.randomUUID(),
          req.user.id,
          s.platform,
          s.url,
          typeof s.position === 'number' ? s.position : i
        );
      }
    });
  });
  tx();
  const rows = db
    .prepare('SELECT id, platform, url, position FROM social_links WHERE user_id = ? ORDER BY position')
    .all(req.user.id);
  res.json({ socials: rows });
});

export default router;
