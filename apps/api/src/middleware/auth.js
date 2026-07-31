import jwt from 'jsonwebtoken';
import db from '../db.js';

const JWT_SECRET = process.env.JWT_SECRET || 'linkdock_dev_secret';

export function signToken(user) {
  return jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, {
    expiresIn: '30d',
  });
}

export function requireAuth(req, res, next) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;
  if (!token) return res.status(401).json({ error: 'Unauthorized' });

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    const user = db
      .prepare('SELECT id, username, email, display_name, bio, avatar, created_at FROM users WHERE id = ?')
      .get(payload.id);
    if (!user) return res.status(401).json({ error: 'Unauthorized' });
    req.user = user;
    next();
  } catch {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
}
