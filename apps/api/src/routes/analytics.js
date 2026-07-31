import { Router } from 'express';
import db from '../db.js';
import { requireAuth } from '../middleware/auth.js';
import { daysAgo, detectCountry, detectDevice, id } from '../utils.js';

const router = Router();

router.post('/track', (req, res) => {
  const { username, type, linkId } = req.body || {};
  if (!username || !['view', 'click'].includes(type)) {
    return res.status(400).json({ error: 'username and valid type required' });
  }

  const user = db.prepare('SELECT id FROM users WHERE username = ?').get(username);
  if (!user) return res.status(404).json({ error: 'User not found' });

  const ua = req.headers['user-agent'] || '';
  const device = detectDevice(ua);
  const country = detectCountry(req.headers['x-forwarded-for'] || req.socket.remoteAddress);

  db.prepare(
    `INSERT INTO events (id, type, user_id, link_id, referrer, device, country, created_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, datetime('now'))`
  ).run(id(), type, user.id, linkId || null, req.headers.referer || null, device, country);

  res.status(204).end();
});

router.use(requireAuth);

router.get('/summary', (req, res) => {
  const userId = req.user.id;
  const since = daysAgo(30);

  const totals = db
    .prepare(
      `SELECT
        SUM(CASE WHEN type = 'view' THEN 1 ELSE 0 END) AS views,
        SUM(CASE WHEN type = 'click' THEN 1 ELSE 0 END) AS clicks
       FROM events WHERE user_id = ? AND created_at >= ?`
    )
    .get(userId, since);

  const chartRows = db
    .prepare(
      `SELECT substr(created_at, 1, 10) AS date,
              SUM(CASE WHEN type = 'view' THEN 1 ELSE 0 END) AS views,
              SUM(CASE WHEN type = 'click' THEN 1 ELSE 0 END) AS clicks
       FROM events WHERE user_id = ? AND created_at >= ?
       GROUP BY date ORDER BY date ASC`
    )
    .all(userId, since);

  const linkRows = db
    .prepare(
      `SELECT l.title, l.url, l.click_count,
              COALESCE(SUM(CASE WHEN e.type = 'click' THEN 1 ELSE 0 END), 0) AS event_clicks
       FROM links l LEFT JOIN events e ON e.link_id = l.id AND e.type = 'click'
       WHERE l.user_id = ?
       GROUP BY l.id ORDER BY event_clicks DESC LIMIT 10`
    )
    .all(userId);

  const deviceRows = db
    .prepare(
      `SELECT device, COUNT(*) AS count FROM events
       WHERE user_id = ? AND created_at >= ? GROUP BY device`
    )
    .all(userId, since);

  res.json({
    views: totals.views || 0,
    clicks: totals.clicks || 0,
    chart: chartRows,
    topLinks: linkRows,
    devices: deviceRows,
  });
});

router.get('/events', (req, res) => {
  const rows = db
    .prepare(
      `SELECT e.type, e.referrer, e.device, e.country, e.created_at, l.title AS link_title
       FROM events e LEFT JOIN links l ON l.id = e.link_id
       WHERE e.user_id = ?
       ORDER BY e.created_at DESC LIMIT 50`
    )
    .all(req.user.id);
  res.json({ events: rows });
});

export default router;
