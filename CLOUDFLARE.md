# Cloudflare deploy

## Required secrets

Set these in the Cloudflare Worker settings before production deploy:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `GEMINI_API_KEY`

## Local preview

```bash
npm run build:cloudflare
npm run preview:cloudflare
```

## Deploy

```bash
npm run deploy:cloudflare
```
