# Cloudflare deploy

This repository is a Next.js app deployed as a Cloudflare Worker via OpenNext. It is not a static Pages project with a `dist` output.

## Required secrets

Set these in Cloudflare Workers Builds before production deploy:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `GEMINI_API_KEY`

## Cloudflare Git integration settings

- Build command: `npm run build:cloudflare`
- Deploy command: `npm run deploy`
- Production branch: `master`

Do not configure this project as a static Cloudflare Pages site that uploads only a build directory. It needs the Worker deploy step.

## Local preview

```bash
npm run preview
```

## Deploy

```bash
npm run deploy
```
