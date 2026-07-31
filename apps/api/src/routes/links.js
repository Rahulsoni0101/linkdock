import { Router } from 'express';
import db from '../db.js';
import { requireAuth } from '../middleware/auth.js';
import { id } from '../utils.js';

const router = Router();

router.use(requireAuth);

function normalizeUrl(url) {
  if (!url) return '';
  const trimmed = url.trim();
  if (!trimmed) return '';
  return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
}

function rowToLink(row) {
  return {
    id: row.id,
    title: row.title,
    url: row.url,
    thumbnail: row.thumbnail,
    enabled: !!row.enabled,
    pinned: !!row.pinned,
    position: row.position,
    clickCount: row.click_count,
    scheduleStart: row.schedule_start,
    scheduleEnd: row.schedule_end,
    createdAt: row.created_at,
  };
}

function listLinks(userId) {
  const rows = db
    .prepare('SELECT * FROM links WHERE user_id = ? ORDER BY position ASC, created_at ASC')
    .all(userId);
  return rows.map(rowToLink);
}

router.get('/', (req, res) => {
  res.json({ links: listLinks(req.user.id) });
});

router.post('/', (req, res) => {
  const { title, url, thumbnail, enabled, pinned, scheduleStart, scheduleEnd } = req.body || {};
  if (!title || !url) return res.status(400).json({ error: 'Title and URL are required' });

  const maxPos = db
    .prepare('SELECT COALESCE(MAX(position), -1) AS m FROM links WHERE user_id = ?')
    .get(req.user.id).m;

  const linkId = id();
  db.prepare(
    `INSERT INTO links (id, user_id, title, url, thumbnail, enabled, pinned, position, schedule_start, schedule_end)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
  ).run(
    linkId,
    req.user.id,
    title.trim(),
    normalizeUrl(url),
    thumbnail || null,
    enabled === undefined ? 1 : enabled ? 1 : 0,
    pinned ? 1 : 0,
    maxPos + 1,
    scheduleStart || null,
    scheduleEnd || null
  );

  const row = db.prepare('SELECT * FROM links WHERE id = ?').get(linkId);
  res.status(201).json({ link: rowToLink(row) });
});

router.put('/:id', (req, res) => {
  const link = db
    .prepare('SELECT * FROM links WHERE id = ? AND user_id = ?')
    .get(req.params.id, req.user.id);
  if (!link) return res.status(404).json({ error: 'Link not found' });

  const body = req.body || {};
  const updates = {};
  if (body.title !== undefined) updates.title = body.title.trim();
  if (body.url !== undefined) updates.url = normalizeUrl(body.url);
  if (body.thumbnail !== undefined) updates.thumbnail = body.thumbnail || null;
  if (body.enabled !== undefined) updates.enabled = body.enabled ? 1 : 0;
  if (body.pinned !== undefined) updates.pinned = body.pinned ? 1 : 0;
  if (body.scheduleStart !== undefined) updates.schedule_start = body.scheduleStart || null;
  if (body.scheduleEnd !== undefined) updates.schedule_end = body.scheduleEnd || null;

  if (Object.keys(updates).length === 0) {
    return res.status(400).json({ error: 'No valid fields provided' });
  }

  const setClause = Object.keys(updates).map((k) => `"${k}" = ?`).join(', ');
  db.prepare(`UPDATE links SET ${setClause}, updated_at = datetime('now') WHERE id = ?`).run(
    ...Object.values(updates),
    req.params.id
  );

  res.json({ link: rowToLink(db.prepare('SELECT * FROM links WHERE id = ?').get(req.params.id)) });
});

router.post('/reorder', (req, res) => {
  const { order } = req.body || {};
  if (!Array.isArray(order)) return res.status(400).json({ error: 'order must be an array of link ids' });

  const owned = db
    .prepare('SELECT id FROM links WHERE user_id = ?')
    .all(req.user.id)
    .map((r) => r.id);
  const valid = order.filter((oid) => owned.includes(oid));

  const tx = db.transaction(() => {
    const update = db.prepare('UPDATE links SET position = ?, pinned = pinned WHERE id = ?');
    valid.forEach((oid, i) => update.run(i, oid));
  });
  tx();

  res.json({ links: listLinks(req.user.id) });
});

router.delete('/:id', (req, res) => {
  const result = db
    .prepare('DELETE FROM links WHERE id = ? AND user_id = ?')
    .run(req.params.id, req.user.id);
  if (result.changes === 0) return res.status(404).json({ error: 'Link not found' });

  db.prepare('DELETE FROM events WHERE link_id = ?').run(req.params.id);
  res.json({ success: true });
});

export default router;
