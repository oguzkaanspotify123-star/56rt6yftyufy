# F2G Unified Website - Quick Start Guide

## What You Have

A complete, unified web application combining:
- **Homepage** - Marketing landing page
- **Accounts** - Gaming accounts marketplace
- **Dashboard** - User and admin management portal

All three pages are now in one application with unified navigation and routing.

## File Location

```
/tmp/cc-agent/59547801/project/website/unified/
```

## Get Started in 3 Steps

### 1. Install Dependencies

```bash
cd /tmp/cc-agent/59547801/project/website/unified
npm install
```

### 2. Configure Environment

Create a `.env` file:

```bash
cp .env.example .env
```

Edit `.env` and add your Supabase credentials:
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Run Development Server

```bash
npm run dev
```

Open your browser to `http://localhost:5173`

## Navigate the Application

- **Homepage**: `http://localhost:5173/`
- **Accounts**: `http://localhost:5173/accounts`
- **Dashboard**: `http://localhost:5173/dashboard`

## Test Features

### Homepage
- Scroll through sections
- Click "Browse Accounts" to go to accounts page
- View responsive design on mobile

### Accounts Page
- Browse featured accounts
- View marketplace listings
- Try filters and sorting
- Read FAQ section

### Dashboard
1. Click "Sign Up" button
2. Create an account with email/password
3. View user dashboard
4. Check purchase history section

### Admin Access
To test admin features:
1. Sign up normally
2. In Supabase, update your profile:
   ```sql
   UPDATE profiles SET role = 'admin' WHERE email = 'your@email.com';
   ```
3. Refresh dashboard to see admin features

## Production Build

```bash
npm run build
```

Output is in `dist/` directory.

## Deploy

See `DEPLOYMENT.md` for detailed deployment instructions.

Quick deploy to Netlify:
```bash
npm run build
netlify deploy --prod --dir=dist
```

## Project Structure

```
unified/
├── src/
│   ├── components/     # Reusable components
│   ├── pages/          # Main pages (Home, Accounts, Dashboard)
│   ├── lib/            # Supabase client
│   ├── App.tsx         # Routing
│   └── index.css       # Global styles
├── dist/               # Production build
└── package.json        # Dependencies
```

## Key Technologies

- **React 18** + TypeScript
- **React Router** v6 (client-side routing)
- **Tailwind CSS** (styling)
- **Supabase** (backend/database)
- **Vite** (build tool)

## Features

✅ Unified navigation across all pages
✅ Email/password authentication
✅ Google OAuth support
✅ User dashboard with purchases
✅ Admin dashboard with full control
✅ Responsive design (mobile, tablet, desktop)
✅ Smooth animations
✅ Production-ready build

## Common Commands

```bash
npm run dev         # Start development server
npm run build       # Build for production
npm run preview     # Preview production build
npm run typecheck   # Check TypeScript types
npm run lint        # Lint code
```

## Need Help?

1. Check `README.md` for full documentation
2. Check `DEPLOYMENT.md` for deployment help
3. Check `PROJECT_SUMMARY.md` for technical details
4. View browser console for errors
5. Check Supabase connection

## What's Included

- ✅ All original designs preserved
- ✅ All animations working
- ✅ Complete functionality
- ✅ Database integration
- ✅ Authentication system
- ✅ Admin features
- ✅ Mobile responsive
- ✅ Production ready

## Next Steps

1. Test the application locally
2. Add your Supabase credentials
3. Test authentication flow
4. Create an admin user
5. Build for production
6. Deploy to hosting platform

That's it! Your unified F2G website is ready to use.
