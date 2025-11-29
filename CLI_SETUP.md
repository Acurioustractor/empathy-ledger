# 🛠️ CLI Setup Guide - Vercel & Supabase

Complete command-line workflow for managing deployments and database operations.

---

## 🚀 Quick Setup (One-Time)

Run this command to set up everything:

```bash
npm run setup
```

This will:
1. Log you into Vercel
2. Link your project to Vercel
3. Log you into Supabase  
4. Link your project to Supabase

### Manual Setup (Alternative)

If you prefer step-by-step:

**1. Vercel Setup:**
```bash
npm run setup:vercel
```
- Opens browser for authentication
- Links project to your GitHub repo
- Creates `.vercel` directory with project config

**2. Supabase Setup:**
```bash
npm run setup:supabase
```
- Opens browser for authentication
- Prompts for your project reference ID
  - Find it at: `https://supabase.com/dashboard/project/YOUR_PROJECT_REF`
- Creates `supabase/.temp` with project config

---

## 📦 Vercel CLI Commands

### Deploy to Production
```bash
npm run vercel:deploy
```
- Deploys to production (your-app.vercel.app)
- Runs build checks
- Updates live site

### Deploy Preview (Staging)
```bash
npm run vercel:deploy:preview
```
- Creates a preview deployment
- Gets unique URL for testing
- Safe for testing changes

### Pull Environment Variables
```bash
npm run vercel:env
```
- Downloads all env vars from Vercel
- Saves to `.env.local`
- Useful after adding new secrets in dashboard

### View Deployment Logs
```bash
npm run vercel:logs
```
- Shows recent deployment logs
- Helpful for debugging production issues

### Link Existing Project
```bash
npm run vercel:link
```
- Re-link if you cloned the repo elsewhere
- Choose existing project from list

### Direct Vercel Commands
```bash
# Check project info
npx vercel project ls

# List all deployments
npx vercel ls

# Remove deployment
npx vercel rm [deployment-url]

# Check which project you're in
npx vercel whoami

# View domains
npx vercel domains ls
```

---

## 🗄️ Supabase CLI Commands

### Check Connection Status
```bash
npm run supabase:status
```
- Shows if you're linked to a project
- Displays project details

### Pull Database Schema
```bash
npm run supabase:db:pull
```
- Downloads current database schema from production
- Creates migration files
- Keeps local in sync with production

### Push Local Changes to Database
```bash
npm run supabase:db:push
```
- ⚠️ **DANGER**: Applies local migrations to production
- Use with caution
- Test locally first

### Generate TypeScript Types
```bash
npm run supabase:types
```
- Generates types from your database schema
- Updates `src/lib/database.types.ts`
- Run after schema changes

### Create New Migration
```bash
npm run supabase:migration:new add_new_table
```
- Creates new migration file
- Add your SQL changes
- Name should describe the change

### Check Schema Differences
```bash
npm run supabase:db:diff
```
- Shows differences between local and remote
- Helps before pushing changes

### Re-link Project
```bash
npm run supabase:link
```
- Re-link if you need to change projects
- Useful after cloning repo

### Direct Supabase Commands
```bash
# Start local Supabase (Docker required)
supabase start

# Stop local Supabase
supabase stop

# Reset local database
supabase db reset

# Open Supabase Studio (local UI)
supabase studio

# List all projects
supabase projects list

# View project API settings
supabase projects api-keys --project-ref YOUR_REF
```

---

## 🔄 Common Workflows

### 1. Make Database Schema Changes

```bash
# Create a new migration
npm run supabase:migration:new add_storyteller_bio

# Edit the migration file in supabase/migrations/
# Add your SQL

# Test locally (if you have Docker)
supabase db reset

# Push to production
npm run supabase:db:push

# Update TypeScript types
npm run supabase:types
```

### 2. Deploy After Code Changes

```bash
# Build and test locally
npm run build
npm run start

# Commit changes
git add .
git commit -m "Add new feature"
git push

# Vercel auto-deploys from GitHub
# Or deploy manually:
npm run vercel:deploy
```

### 3. Sync Database Schema to Code

```bash
# Pull latest schema from production
npm run supabase:db:pull

# Generate TypeScript types
npm run supabase:types

# Commit the updated types
git add src/lib/database.types.ts
git commit -m "Update database types"
```

### 4. Check Production Issues

```bash
# View deployment logs
npm run vercel:logs

# Check Supabase status
npm run supabase:status

# Pull latest env vars (in case they changed)
npm run vercel:env
```

### 5. Clone Project on New Machine

```bash
# Install dependencies
npm install

# Link to Vercel
npm run setup:vercel

# Link to Supabase
npm run setup:supabase

# Pull environment variables
npm run vercel:env

# Generate types
npm run supabase:types

# Ready to develop!
npm run dev
```

---

## 🔐 Environment Variables

### Vercel Dashboard Method
1. Go to `https://vercel.com/[your-username]/[project-name]/settings/environment-variables`
2. Add variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY` (secret, not public)
3. Run `npm run vercel:env` to pull locally

### CLI Method
```bash
# Add a variable
npx vercel env add VARIABLE_NAME

# Remove a variable
npx vercel env rm VARIABLE_NAME

# Pull all to .env.local
npm run vercel:env
```

---

## 📊 Database Migrations Best Practices

### Creating Migrations
```bash
# Always create a migration for schema changes
npm run supabase:migration:new descriptive_name

# Migration file location:
# supabase/migrations/[timestamp]_descriptive_name.sql
```

### Example Migration
```sql
-- Add bio field to portraits table
ALTER TABLE portraits 
ADD COLUMN bio TEXT;

-- Add index for performance
CREATE INDEX idx_portraits_storyteller_id 
ON portraits(storyteller_id);
```

### Applying Migrations
```bash
# Test locally (requires Docker)
supabase db reset

# Apply to production
npm run supabase:db:push
```

---

## 🎯 Pro Tips

1. **Always test builds locally before deploying:**
   ```bash
   npm run build && npm run start
   ```

2. **Keep types synced after schema changes:**
   ```bash
   npm run supabase:db:pull && npm run supabase:types
   ```

3. **Use preview deployments for testing:**
   ```bash
   npm run vercel:deploy:preview
   ```

4. **Monitor production logs regularly:**
   ```bash
   npm run vercel:logs
   ```

5. **Keep migrations small and focused:**
   - One migration = one logical change
   - Name migrations clearly
   - Add comments in SQL

6. **Never edit migrations after pushing:**
   - Create a new migration to fix issues
   - Migrations are immutable once applied

---

## 🆘 Troubleshooting

### "No existing credentials found"
```bash
# Re-login to Vercel
npx vercel login
```

### "Not linked to any remote project"
```bash
# Link to Supabase
npm run supabase:link
```

### "Permission denied" on Vercel deploy
```bash
# Check you're logged in as correct user
npx vercel whoami

# Re-link project
npm run vercel:link
```

### TypeScript errors after schema change
```bash
# Regenerate types
npm run supabase:types

# Restart TypeScript server in VS Code
# Cmd+Shift+P → "TypeScript: Restart TS Server"
```

### Environment variables not working
```bash
# Pull latest from Vercel
npm run vercel:env

# Restart dev server
npm run dev
```

---

## 📚 Quick Reference

| Task | Command |
|------|---------|
| Deploy to production | `npm run vercel:deploy` |
| Deploy preview | `npm run vercel:deploy:preview` |
| Pull env vars | `npm run vercel:env` |
| View logs | `npm run vercel:logs` |
| Pull database schema | `npm run supabase:db:pull` |
| Update types | `npm run supabase:types` |
| Create migration | `npm run supabase:migration:new name` |
| Push migrations | `npm run supabase:db:push` |
| Check status | `npm run supabase:status` |
| Generate icons | `npm run icons` |

---

## 🔗 Additional Resources

- **Vercel CLI Docs**: https://vercel.com/docs/cli
- **Supabase CLI Docs**: https://supabase.com/docs/guides/cli
- **GitHub Integration**: https://vercel.com/docs/git/vercel-for-github
- **Database Migrations**: https://supabase.com/docs/guides/cli/local-development

---

**Next Steps:**
1. Run `npm run setup` to connect both CLIs
2. Run `npm run vercel:env` to pull environment variables
3. Run `npm run supabase:types` to generate database types
4. Start developing with `npm run dev`
