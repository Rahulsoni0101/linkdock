import { Router } from 'express';
import QRCode from 'qrcode';
import db from '../db.js';
import { detectCountry, detectDevice, id } from '../utils.js';

const router = Router();

function isActive(link, now = new Date().toISOString()) {
  if (!link.enabled) return false;
  if (link.schedule_start && now < link.schedule_start) return false;
  if (link.schedule_end && now > link.schedule_end) return false;
  return true;
}

router.get('/page/:username', (req, res) => {
  const user = db
    .prepare('SELECT id, username, display_name, bio, avatar, created_at FROM users WHERE username = ?')
    .get(req.params.username);
  if (!user) return res.status(404).json({ error: 'Page not found' });

  let profile = db.prepare('SELECT * FROM profiles WHERE user_id = ?').get(user.id);
  if (!profile) {
    db.prepare('INSERT INTO profiles (user_id) VALUES (?)').run(user.id);
    profile = db.prepare('SELECT * FROM profiles WHERE user_id = ?').get(user.id);
  }

  const now = new Date().toISOString();
  const links = db
    .prepare('SELECT * FROM links WHERE user_id = ? ORDER BY pinned DESC, position ASC')
    .all(user.id)
    .filter((l) => isActive(l, now))
    .map((l) => ({
      id: l.id,
      title: l.title,
      url: l.url,
      thumbnail: l.thumbnail,
      pinned: !!l.pinned,
    }));

  const socials = db
    .prepare('SELECT platform, url FROM social_links WHERE user_id = ? ORDER BY position')
    .all(user.id);

  res.json({
    user: {
      username: user.username,
      displayName: user.display_name,
      bio: user.bio,
      avatar: user.avatar,
    },
    profile: {
      theme: profile.theme,
      primaryColor: profile.primary_color,
      accentColor: profile.accent_color,
      font: profile.font,
      backgroundType: profile.background_type,
      backgroundValue: profile.background_value,
      showSocial: !!profile.show_social,
      showBranding: !!profile.show_branding,
      seoTitle: profile.seo_title,
      seoDescription: profile.seo_description,
    },
    links,
    socials,
  });
});

router.get('/s/:linkId', (req, res) => {
  const link = db.prepare('SELECT * FROM links WHERE id = ?').get(req.params.linkId);
  if (!link || !isActive(link)) {
    return res.status(404).json({ error: 'Link not found or inactive' });
  }

  const ua = req.headers['user-agent'] || '';
  db.prepare(
    `INSERT INTO events (id, type, user_id, link_id, referrer, device, country, created_at)
     VALUES (?, 'click', ?, ?, ?, ?, ?, datetime('now'))`
  ).run(
    id(),
    link.user_id,
    link.id,
    req.headers.referer || null,
    detectDevice(ua),
    detectCountry(req.headers['x-forwarded-for'] || req.socket.remoteAddress)
  );
  db.prepare('UPDATE links SET click_count = click_count + 1 WHERE id = ?').run(link.id);

  res.redirect(301, link.url);
});

router.get('/qr/:username', async (req, res) => {
  const user = db.prepare('SELECT id FROM users WHERE username = ?').get(req.params.username);
  if (!user) return res.status(404).json({ error: 'Page not found' });

  const base = process.env.CLIENT_URL || 'http://localhost:3000';
  const url = `${base}/${req.params.username}`;
  try {
    const png = await QRCode.toBuffer(url, {
      width: 600,
      margin: 2,
      color: { dark: '#000000', light: '#ffffff' },
    });
    res.set('Content-Type', 'image/png');
    res.set('Cache-Control', 'public, max-age=86400');
    res.send(png);
  } catch {
    res.status(500).json({ error: 'Failed to generate QR code' });
  }
});

export default router;
