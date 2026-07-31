import Database from 'better-sqlite3';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import dotenv from 'dotenv';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dbDir = path.resolve(__dirname, '..', 'data');
if (!fs.existsSync(dbDir)) fs.mkdirSync(dbDir, { recursive: true });

const dbPath = process.env.DB_PATH
  ? path.resolve(__dirname, '..', process.env.DB_PATH)
  : path.join(dbDir, 'linkdock.db');

const db = new Database(dbPath);
db.pragma('journal_mode = WAL');

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    display_name TEXT,
    bio TEXT,
    avatar TEXT,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS profiles (
    user_id TEXT PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    theme TEXT NOT NULL DEFAULT 'aurora',
    primary_color TEXT NOT NULL DEFAULT '#a855f7',
    accent_color TEXT NOT NULL DEFAULT '#22d3ee',
    font TEXT NOT NULL DEFAULT 'inter',
    background_type TEXT NOT NULL DEFAULT 'gradient',
    background_value TEXT NOT NULL DEFAULT 'linear-gradient(135deg,#0f0f23,#1a1035)',
    show_social INTEGER NOT NULL DEFAULT 1,
    show_branding INTEGER NOT NULL DEFAULT 1,
    seo_title TEXT,
    seo_description TEXT,
    updated_at TEXT NOT NULL DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS links (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    url TEXT NOT NULL,
    thumbnail TEXT,
    enabled INTEGER NOT NULL DEFAULT 1,
    pinned INTEGER NOT NULL DEFAULT 0,
    position INTEGER NOT NULL DEFAULT 0,
    click_count INTEGER NOT NULL DEFAULT 0,
    schedule_start TEXT,
    schedule_end TEXT,
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    updated_at TEXT NOT NULL DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS social_links (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    platform TEXT NOT NULL,
    url TEXT NOT NULL,
    position INTEGER NOT NULL DEFAULT 0
  );

  CREATE TABLE IF NOT EXISTS events (
    id TEXT PRIMARY KEY,
    type TEXT NOT NULL,
    user_id TEXT NOT NULL,
    link_id TEXT,
    referrer TEXT,
    device TEXT,
    country TEXT,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  );

  CREATE INDEX IF NOT EXISTS idx_links_user ON links(user_id);
  CREATE INDEX IF NOT EXISTS idx_events_user_time ON events(user_id, created_at);
  CREATE INDEX IF NOT EXISTS idx_events_type ON events(type);
`);

export default db;
