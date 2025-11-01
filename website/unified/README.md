# F2G - Unified Gaming Accounts Marketplace

A complete, unified web application combining Homepage, Accounts listing, and Dashboard functionality for buying and selling premium gaming accounts.

## Features

### Homepage (`/`)
- Hero section with featured account showcase
- Stats and trust indicators
- How it works section
- Customer testimonials
- FAQ section
- Call-to-action sections

### Accounts Page (`/accounts`)
- Featured premium accounts grid
- Full marketplace with filters and sorting
- Account details with stats
- Why choose us section
- FAQ specific to accounts

### Dashboard (`/dashboard`)
- User authentication (email/password and Google OAuth)
- User Dashboard:
  - Overview with purchase statistics
  - My Accounts section showing purchased accounts
  - Account delivery status tracking
  - Messages section
- Admin Dashboard:
  - Revenue and statistics overview
  - Manage all marketplace accounts
  - Upload new accounts
  - Process and manage orders
  - Customer management
  - Messages management

## Technology Stack

- **Frontend**: React 18 + TypeScript
- **Routing**: React Router v6
- **Styling**: Tailwind CSS
- **Backend/Database**: Supabase
- **Build Tool**: Vite
- **Icons**: Lucide React

## Setup Instructions

### 1. Prerequisites
- Node.js 18+ installed
- A Supabase account and project

### 2. Environment Setup

Create a `.env` file in the root directory:

```bash
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Get these values from your Supabase project settings.

### 3. Database Setup

The database schema is already defined in `/website/dashboard/supabase/migrations/`.

Make sure your Supabase database has these tables:
- `profiles` - User profiles with roles
- `accounts` - Gaming accounts for sale
- `purchases` - Purchase records
- `messages` - User/admin messaging

### 4. Install Dependencies

```bash
npm install
```

### 5. Development

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### 6. Build for Production

```bash
npm run build
```

The production build will be in the `dist/` directory.

### 7. Preview Production Build

```bash
npm run preview
```

## Project Structure

```
unified/
├── src/
│   ├── components/
│   │   ├── AuthForm.tsx          # Authentication form
│   │   ├── DashboardLayout.tsx   # Dashboard layout wrapper
│   │   └── UnifiedHeader.tsx     # Main navigation header
│   ├── pages/
│   │   ├── HomePage.tsx          # Landing page
│   │   ├── AccountsPage.tsx      # Accounts marketplace
│   │   └── DashboardPage.tsx     # User/Admin dashboard
│   ├── lib/
│   │   └── supabase.ts           # Supabase client & types
│   ├── App.tsx                   # Main app with routing
│   ├── main.tsx                  # Entry point
│   └── index.css                 # Global styles & animations
├── index.html                    # HTML template
├── vite.config.ts               # Vite configuration
├── tailwind.config.js           # Tailwind configuration
├── tsconfig.json                # TypeScript configuration
└── package.json                 # Dependencies & scripts
```

## Features by Page

### Navigation
- Unified header with logo and navigation links
- Dynamic navigation based on authentication state
- Mobile-responsive menu
- Logout functionality

### Authentication
- Email/password authentication
- Google OAuth integration
- Role-based access (User/Admin)
- Auto profile creation on signup

### Responsive Design
- Mobile-first approach
- Tablet and desktop optimized
- Smooth animations and transitions
- Professional color scheme with red accents

## User Roles

### Regular Users
- Browse and view accounts
- Purchase accounts
- Track delivery status
- Access account credentials after delivery
- Contact support

### Admin Users
- All user features
- View revenue and statistics
- Manage all accounts
- Upload new accounts
- Process orders
- Update delivery status
- Manage customers
- Full dashboard access

## Security

- Row Level Security (RLS) enabled on all tables
- Authenticated user policies
- Admin-only actions protected
- Secure password requirements
- Environment variable protection

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Lint code
- `npm run typecheck` - Type check without emitting

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- ES2020+ JavaScript features
- CSS Grid and Flexbox

## Notes

- Make sure to update your Supabase OAuth settings to include your deployment URL
- For Google OAuth, configure the OAuth provider in Supabase dashboard
- Admin accounts must be manually set in the database (role='admin')

## License

Private - All rights reserved
