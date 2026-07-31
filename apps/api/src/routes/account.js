import { Router } from 'express';
import bcrypt from 'bcryptjs';
import db from '../db.js';
import { requireAuth } from '../middleware/auth.js';
import { publicUser } from '../utils.js';

const router = Router();

router.use(requireAuth);

router.put('/', (req, res) => {
  const body = req.body || {};
  const updates = {};
  const USERNAME_RE = /^[a-zA-Z0-9_]{3,24}$/;

  if (body.displayName !== undefined) updates.display_name = String(body.displayName).slice(0, 60);
  if (body.bio !== undefined) updates.bio = String(body.bio).slice(0, 200);
  if (body.avatar !== undefined) updates.avatar = body.avatar || null;

  if (body.username !== undefined) {
    const username = String(body.username).trim();
    if (!USERNAME_RE.test(username)) {
      return res.status(400).json({ error: 'Username must be 3-24 characters (letters, numbers, underscores)' });
    }
    const taken = db.prepare('SELECT id FROM users WHERE username = ? AND id != ?').get(username, req.user.id);
    if (taken) return res.status(409).json({ error: 'Username already taken' });
    updates.username = username;
  }

  if (Object.keys(updates).length === 0) {
    return res.status(400).json({ error: 'No valid fields provided' });
  }

  const setClause = Object.keys(updates).map((k) => `"${k}" = ?`).join(', ');
  db.prepare(`UPDATE users SET ${setClause} WHERE id = ?`).run(...Object.values(updates), req.user.id);

  const user = db.prepare('SELECT id, username, email, display_name, bio, avatar, created_at FROM users WHERE id = ?').get(req.user.id);
  res.json({ user: publicUser(user) });
});

router.put('/password', (req, res) => {
  const { currentPassword, newPassword } = req.body || {};
  if (!currentPassword || !newPassword) {
    return res.status(400).json({ error: 'Both passwords are required' });
  }
  if (newPassword.length < 6) {
    return res.status(400).json({ error: 'New password must be at least 6 characters' });
  }

  const user = db.prepare('SELECT * FROM users WHERE id = ?').get(req.user.id);
  if (!bcrypt.compareSync(currentPassword, user.password_hash)) {
    return res.status(401).json({ error: 'Current password is incorrect' });
  }

  db.prepare('UPDATE users SET password_hash = ? WHERE id = ?').run(
    bcrypt.hashSync(newPassword, 10),
    req.user.id
  );
  res.json({ success: true });
});

router.delete('/', (req, res) => {
  db.prepare('DELETE FROM users WHERE id = ?').run(req.user.id);
  res.json({ success: true });
});

export default router;
