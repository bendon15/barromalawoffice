# BarromaLaw — attorney website with consultation requests

Next.js 14 (App Router) + TypeScript + Tailwind. Converted from a studio site;
the admin login, database, rate limiting and email plumbing are kept.

## What's on the site
- Hero, trust bar, practice areas, attorney profile, consultation request form, footer
- The form saves each request (name, email, mobile, matter, preferred date/time,
  description) to Postgres and optionally emails the office via Resend
- `/admin` lists requests: mark read/unread, delete

## Run it
```bash
npm install
cp .env.example .env.local     # fill in DATABASE_URL, admin values
npm run db:migrate             # creates/upgrades the tables (safe to re-run)
npm run hash-password "your-password"   # paste output into ADMIN_PASSWORD_HASH
npm run dev
```

## Edit content
- `lib/data.ts` — firm name, address, hours, phone, services, trust points
- `lib/validation.ts` — dropdown options for what the client needs, onsite/online, and preferred time
- `public/images/` — logo, hero statue, attorney banner, office schedule flyer
- `components/Attorney.tsx` — the attorney bio is placeholder wording; replace it

## Deploy
Push to GitHub and import into Vercel. Add the same variables as `.env.local`.
Connect a Postgres database (Neon or Supabase) and run `npm run db:migrate` once.
