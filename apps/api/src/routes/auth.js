import { Router } from 'express';
import bcrypt from 'bcryptjs';
import db from '../db.js';
import { id, publicUser } from '../utils.js';
import { requireAuth, signToken } from '../middleware/auth.js';

const router = Router();

const USERNAME_RE = /^[a-zA-Z0-9_]{3,24}$/;

function ensureProfile(userId) {
  db.prepare(
    `INSERT OR IGNORE INTO profiles (user_id) VALUES (?)`
  ).run(userId);
}

router.post('/register', (req, res) => {
  const { username, email, password } = req.body || {};

  if (!username || !email || !password) {
    return res.status(400).json({ error: 'Username, email and password are required' });
  }
  if (!USERNAME_RE.test(username)) {
    return res.status(400).json({
      error: 'Username must be 3-24 characters (letters, numbers, underscores)',
    });
  }
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return res.status(400).json({ error: 'Invalid email address' });
  }
  if (password.length < 6) {
    return res.status(400).json({ error: 'Password must be at least 6 characters' });
  }

  const usernameTaken = db.prepare('SELECT id FROM users WHERE username = ?').get(username);
  if (usernameTaken) return res.status(409).json({ error: 'Username already taken' });

  const emailTaken = db.prepare('SELECT id FROM users WHERE email = ?').get(email.toLowerCase());
  if (emailTaken) return res.status(409).json({ error: 'Email already registered' });

  const userId = id();
  const hash = bcrypt.hashSync(password, 10);

  db.prepare(
    'INSERT INTO users (id, username, email, password_hash, display_name) VALUES (?, ?, ?, ?, ?)'
  ).run(userId, username, email.toLowerCase(), hash, username);
  ensureProfile(userId);

  const user = db.prepare('SELECT * FROM users WHERE id = ?').get(userId);
  res.status(201).json({ token: signToken(user), user: publicUser(user) });
});

router.post('/login', (req, res) => {
  const { identifier, password } = req.body || {};
  if (!identifier || !password) {
    return res.status(400).json({ error: 'Identifier and password are required' });
  }

  const user = db
    .prepare('SELECT * FROM users WHERE email = ? OR username = ?')
    .get(String(identifier).toLowerCase(), identifier);

  if (!user || !bcrypt.compareSync(password, user.password_hash)) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  res.json({ token: signToken(user), user: publicUser(user) });
});

router.get('/me', requireAuth, (req, res) => {
  res.json({ user: publicUser(req.user) });
});

router.get('/username-available/:username', (req, res) => {
  const exists = db
    .prepare('SELECT id FROM users WHERE username = ?')
    .get(req.params.username);
  res.json({ available: !exists });
});

export default router;
