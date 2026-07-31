# ⚓ LinkDock

A modern link-in-bio platform — unlimited links, stunning themes, deep
analytics, QR codes and zero commission. Built with **Next.js**, **Node.js +
Express** and **Tailwind CSS**.

## Stack

| Layer     | Tech                                            |
| --------- | ----------------------------------------------- |
| Frontend  | Next.js 15 (App Router) · React 19 · Tailwind v4 · Framer Motion · Recharts |
| Backend   | Node.js · Express · better-sqlite3 · JWT · bcrypt |
| Monorepo  | npm workspaces (`apps/web`, `apps/api`)          |

## Getting started

```bash
npm install          # install all workspace deps
npm run dev          # starts API (:4000) + web (:3000) together
```

Open http://localhost:3000 — create an account and you'll have a live page at
`http://localhost:3000/yourname` in seconds.

## Scripts

```bash
npm run dev:api      # API only
npm run dev:web      # web only
npm run build        # production build of the web app
```

## Features

- **Unlimited links** — drag-to-reorder, pin, hide, schedule publish/expiry
- **Theme engine** — 8 themes, custom colors, fonts, gradients / colors / image backgrounds
- **Public pages** — server-rendered, SEO metadata, interactive link tracking
- **Analytics** — views, clicks, CTR, 30-day chart, top links, device breakdown
- **QR codes** — downloadable PNG of any page
- **Audience** — social links grid, bio, avatar, SEO title/description
- **Auth** — JWT-based register/login, profile & password management

## API overview

```
POST   /api/auth/register            create account
POST   /api/auth/login               log in
GET    /api/auth/me                  current user
PUT    /api/account                  update profile (name, bio, avatar, username)
PUT    /api/account/password         change password
GET    /api/links                    list links
POST   /api/links                    create link
PUT    /api/links/:id                update link
DELETE /api/links/:id                delete link
POST   /api/links/reorder            save drag order
GET    /api/profile                  get theme + socials
PUT    /api/profile                  update theme settings
PUT    /api/profile/socials          update social links
GET    /api/analytics/summary        30-day stats
POST   /api/analytics/track          record a view/click (public)
GET    /api/page/:username           public page data
GET    /api/s/:linkId                tracked link redirect
GET    /api/qr/:username             QR code PNG
```

## Environment

Copy `apps/api/.env.example` to `apps/api/.env` and adjust if needed:

```
PORT=4000
JWT_SECRET=change_me
CLIENT_URL=http://localhost:3000
```

The web app reads `NEXT_PUBLIC_API_URL` (defaults to `http://localhost:4000`).
