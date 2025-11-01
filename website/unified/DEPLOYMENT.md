# Deployment Guide

## Quick Deployment Options

### Option 1: Netlify (Recommended)

1. Install Netlify CLI (optional):
```bash
npm install -g netlify-cli
```

2. Deploy:
```bash
npm run build
netlify deploy --prod --dir=dist
```

Or simply:
- Connect your GitHub repository to Netlify
- Set build command: `npm run build`
- Set publish directory: `dist`
- Add environment variables in Netlify dashboard

### Option 2: Vercel

1. Install Vercel CLI (optional):
```bash
npm install -g vercel
```

2. Deploy:
```bash
npm run build
vercel --prod
```

Or:
- Connect your GitHub repository to Vercel
- Framework preset: Vite
- Build command: `npm run build`
- Output directory: `dist`
- Add environment variables in Vercel dashboard

### Option 3: Static Hosting (GitHub Pages, AWS S3, etc.)

1. Build the project:
```bash
npm run build
```

2. Upload the `dist/` directory contents to your hosting provider

3. Configure redirects for SPA routing (see `dist/_redirects` file)

## Environment Variables

Make sure to set these in your deployment platform:

```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Post-Deployment Checklist

- [ ] Environment variables configured
- [ ] Supabase OAuth redirect URLs updated
- [ ] Google OAuth configured (if using)
- [ ] Database migrations applied
- [ ] Test authentication flow
- [ ] Test all routes (/, /accounts, /dashboard)
- [ ] Verify admin functionality
- [ ] Check mobile responsiveness
- [ ] Test purchase flow (if applicable)

## Supabase Configuration

1. Update Authentication URLs in Supabase dashboard:
   - Site URL: `https://yourdomain.com`
   - Redirect URLs: `https://yourdomain.com/**`

2. Configure Google OAuth (if using):
   - Add OAuth provider in Supabase Auth settings
   - Add authorized redirect URIs in Google Cloud Console

## Troubleshooting

### Build Errors
- Ensure all dependencies are installed: `npm install`
- Check Node.js version (requires 18+)
- Verify TypeScript types: `npm run typecheck`

### Runtime Errors
- Check browser console for errors
- Verify environment variables are set correctly
- Check Supabase connection and API keys
- Verify database schema matches expectations

### Authentication Issues
- Check Supabase Auth settings
- Verify OAuth redirect URLs
- Check browser cookies are enabled
- Verify JWT token expiration settings
