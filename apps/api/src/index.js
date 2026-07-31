import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import profileRoutes from './routes/profile.js';
import linksRoutes from './routes/links.js';
import analyticsRoutes from './routes/analytics.js';
import publicRoutes from './routes/public.js';
import accountRoutes from './routes/account.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:3000';

app.use(
  cors({
    origin: [CLIENT_URL, 'http://localhost:3000'],
    credentials: true,
  })
);
app.use(express.json({ limit: '2mb' }));

app.get('/api/health', (req, res) => res.json({ ok: true, service: 'linkdock-api' }));

app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/links', linksRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/account', accountRoutes);
app.use('/api', publicRoutes);

app.use((req, res) => res.status(404).json({ error: 'Not found' }));

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`\n  linkdock API running → http://localhost:${PORT}\n`);
});
