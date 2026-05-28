# ReplyAI — AI-Powered Review Responder

ReplyAI helps restaurant owners, salon managers, clinic staff, and small business owners reply to Google and Yelp reviews instantly using AI. Paste a review, pick a tone, and get a professional reply in seconds.

## Tech Stack

- **Framework:** Next.js 16 (App Router, TypeScript)
- **Styling:** Tailwind CSS v4
- **Database & Auth:** Supabase (email/password)
- **AI:** Anthropic Claude
- **Email:** Resend

## Local Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Set up Supabase

1. Create a project at [supabase.com](https://supabase.com)
2. Run the SQL in `supabase/schema.sql` in the Supabase SQL editor
3. Copy your project URL, anon key, and service role key

### 3. Set up Resend

1. Create an account at [resend.com](https://resend.com)
2. Generate an API key

### 4. Environment variables

```bash
cp .env.local.example .env.local
```

Fill in all variables in `.env.local`.

### 5. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy to Vercel

1. Push your repo to GitHub
2. Import the project on [vercel.com](https://vercel.com)
3. Add all environment variables in Vercel project settings
4. Deploy
