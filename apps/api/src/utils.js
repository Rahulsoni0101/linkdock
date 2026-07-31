import { randomBytes, randomUUID } from 'node:crypto';

export function id() {
  return randomUUID();
}

const ALPHABET = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
export function shortId(len = 8) {
  const bytes = randomBytes(len);
  let out = '';
  for (let i = 0; i < len; i++) out += ALPHABET[bytes[i] % ALPHABET.length];
  return out;
}

export function publicUser(user) {
  if (!user) return null;
  return {
    id: user.id,
    username: user.username,
    displayName: user.display_name,
    bio: user.bio,
    avatar: user.avatar,
  };
}

export function detectDevice(ua = '') {
  if (/mobile|iphone|android/i.test(ua)) return 'mobile';
  if (/tablet|ipad/i.test(ua)) return 'tablet';
  return 'desktop';
}

export function detectCountry(ip = '') {
  const parts = (ip || '').split('.');
  if (parts.length === 4 && parts[0] === '127') return 'Localhost';
  return 'Unknown';
}

export function todayStr() {
  return new Date().toISOString().slice(0, 10);
}

export function daysAgo(n) {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d.toISOString();
}
