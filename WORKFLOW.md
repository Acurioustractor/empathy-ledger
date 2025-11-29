# ⚡ Quick Workflow Guide

Your everyday commands for working with Empathy Ledger.

---

## 🎬 First Time Setup

```bash
# 1. Install dependencies
npm install

# 2. Connect CLIs (opens browser for auth)
npm run setup

# 3. Pull environment variables
npm run vercel:env

# 4. Generate database types
npm run supabase:types

# 5. Start development
npm run dev
```

Visit: `http://localhost:3000`

---

## 💻 Daily Development

### Start Working
```bash
npm run dev
```

### Test Production Build
```bash
npm run build
npm run start
```

### Regenerate Icons (if you update design)
```bash
npm run icons
```

---

## 🚀 Deploy Changes

### Automatic (Recommended)
```bash
git add .
git commit -m "Your changes"
git push
```
Vercel auto-deploys from GitHub push to `main` branch.

### Manual Deploy
```bash
npm run vercel:deploy          # Production
npm run vercel:deploy:preview  # Test first
```

---

## 🗄️ Database Changes

### Add a New Table/Column

```bash
# 1. Create migration
npm run supabase:migration:new add_something

# 2. Edit: supabase/migrations/[timestamp]_add_something.sql
# Add your SQL

# 3. Push to production
npm run supabase:db:push

# 4. Update TypeScript types
npm run supabase:types

# 5. Commit the changes
git add .
git commit -m "Add database field"
git push
```

### Update Types After Manual Changes

If you edit the database directly in Supabase dashboard:

```bash
# Pull schema
npm run supabase:db:pull

# Generate types
npm run supabase:types

# Commit
git add .
git commit -m "Update database types"
```

---

## 🔍 Debugging

### Check Deployment Logs
```bash
npm run vercel:logs
```

### Check Database Status
```bash
npm run supabase:status
```

### See What Changed in Database
```bash
npm run supabase:db:diff
```

---

## 👥 Working with Storytellers

### Create a Storyteller (via Admin Panel)
1. Visit `https://your-app.vercel.app/admin`
2. Fill in email, name (optional), phone (optional)
3. Click "Generate Access"
4. Share QR code or magic link

### Storyteller Login Flow
1. Scan QR or click link
2. Check email for magic link
3. Click magic link → auto-login
4. Dashboard loads with their story

---

## 🔐 Environment Variables

### Add New Secret
```bash
# In Vercel dashboard
https://vercel.com/[your-username]/empathy-ledger/settings/environment-variables

# Then pull locally
npm run vercel:env
```

### Required Variables
- `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Public anon key
- `SUPABASE_SERVICE_ROLE_KEY` - Secret service role key (for admin operations)

---

## 🆘 Common Issues

### Build Failing
```bash
# Test build locally
npm run build

# Check logs
npm run vercel:logs
```

### TypeScript Errors
```bash
# Regenerate types
npm run supabase:types

# Restart TS server in VS Code
# Cmd+Shift+P → "TypeScript: Restart TS Server"
```

### Magic Links Not Working
1. Check Supabase → Authentication → URL Configuration
2. Verify redirect URLs include your Vercel domain
3. Check email spam folder

### PWA Not Installing
1. Must be HTTPS (Vercel automatically provides this)
2. Check icons exist: `ls public/icon-*.png`
3. Regenerate if needed: `npm run icons`
4. Check service worker in DevTools → Application

---

## 📝 Git Workflow

```bash
# Create feature branch
git checkout -b feature/add-something

# Make changes and commit
git add .
git commit -m "Add something cool"

# Push and create PR
git push -u origin feature/add-something

# Or merge to main directly
git checkout main
git merge feature/add-something
git push
```

---

## 🎯 Quick Commands Cheat Sheet

```bash
npm run dev                    # Start development server
npm run build                  # Build for production
npm run start                  # Run production build locally
npm run icons                  # Generate PWA icons
npm run vercel:deploy          # Deploy to production
npm run supabase:types         # Update database types
npm run supabase:db:pull       # Sync database schema
npm run vercel:logs            # View deployment logs
```

---

**Pro Tip:** Keep `CLI_SETUP.md` open for detailed command references!
