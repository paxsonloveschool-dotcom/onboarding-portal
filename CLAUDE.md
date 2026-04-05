@AGENTS.md

# Onboarding Portal — Project Guide

## Overview
Employee onboarding portal for **HP Landscaping** and **Restore** teams. Multi-tenant app where each brand has its own onboarding flow with checklists, document uploads, W-9 forms, and SOPs.

## Tech Stack
- **Framework:** Next.js 16.2.2 (App Router)
- **Language:** TypeScript 5
- **Auth:** NextAuth 4 (credentials provider, JWT sessions)
- **Database:** SQLite via better-sqlite3 (file: `onboarding.db`)
- **Styling:** Tailwind CSS 4
- **Fonts:** Geist Sans & Geist Mono

## Quick Start
```bash
npm install
cp .env.example .env.local   # then edit secrets
npm run dev                   # http://localhost:3000
```

**Default admin login:** `admin@hplandscaping.com` / `admin123`

## Key Commands
| Command | Purpose |
|---------|---------|
| `npm run dev` | Start dev server on port 3000 |
| `npm run build` | Production build |
| `npm run start` | Run production server |
| `npm run lint` | ESLint check |

## Architecture

### Route Structure
```
/                        → Landing page
/login                   → Auth login
/register                → User registration
/admin                   → Admin panel (user management)
/hp-landscaping/         → HP Landscaping brand
  ├── dashboard          → Employee dashboard
  ├── checklist          → Onboarding checklist
  ├── documents          → Document uploads
  ├── w9                 → W-9 tax form
  └── sops               → Standard operating procedures
/restore/                → Restore brand (same sub-routes)
```

### API Routes
```
/api/auth/[...nextauth]  → NextAuth endpoints
/api/admin               → GET admin user list
/api/admin/register      → POST create new user
/api/checklist           → GET/POST checklist progress
/api/documents           → GET/POST document uploads
/api/w9                  → GET/POST W-9 submissions
```

### Source Layout
```
src/
├── app/          → Next.js App Router pages & API routes
├── components/   → Shared UI components
│   ├── AuthProvider.tsx     → NextAuth session provider
│   ├── ChecklistView.tsx    → Onboarding checklist
│   ├── DocumentUploader.tsx → File upload component
│   ├── Navbar.tsx           → Top navigation
│   ├── ProgressBar.tsx      → Progress indicator
│   ├── SOPViewer.tsx        → SOP display
│   ├── Sidebar.tsx          → Side navigation
│   └── W9Form.tsx           → W-9 tax form
├── lib/
│   ├── auth.ts    → NextAuth config (credentials, JWT, callbacks)
│   ├── brands.ts  → Brand config (colors, logos, routes)
│   └── db.ts      → SQLite setup, schema, seed data
└── types/
    └── index.ts   → TypeScript interfaces
```

### Database Schema (SQLite)
- **users** — id, email, password_hash, name, role (`employee`|`admin`), team (`hp`|`restore`)
- **w9_submissions** — W-9 form data linked to user
- **documents** — uploaded file metadata linked to user
- **checklist_items** — per-team onboarding steps (seeded automatically)
- **checklist_progress** — per-user completion tracking

### Brand System
Two brands configured in `src/lib/brands.ts`:
- **hp** (HP Landscaping) — green theme, routes under `/hp-landscaping`
- **restore** (Restore) — blue theme, routes under `/restore`

## Environment Variables
| Variable | Purpose | Required |
|----------|---------|----------|
| `NEXTAUTH_SECRET` | JWT signing secret | Yes |
| `NEXTAUTH_URL` | App base URL | Yes (production) |

## Conventions
- Use `@/` path alias for imports from `src/`
- Database auto-creates and seeds on first access
- File uploads go to `/uploads/` directory (gitignored)
- All auth uses JWT strategy (no database sessions)
