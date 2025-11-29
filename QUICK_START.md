# 🚀 Empathy Ledger PWA - Quick Start

## ✅ What's Done

1. **PWA Infrastructure** ✅
   - Manifest created (`src/app/manifest.ts`)
   - Service worker configured (`src/app/sw.ts`)
   - Next.js config updated for Serwist
   - Offline page created

2. **Magic Link Auth** ✅
   - Auth callback route (`src/app/auth/callback/route.ts`)
   - Auth error page (`src/app/auth/error/page.tsx`)
   - Storyteller creation API (`src/app/api/storytellers/create/route.ts`)
   - QR code generation built-in

3. **Dependencies Installed** ✅
   - @serwist/next
   - @serwist/sw
   - qrcode
   - @types/qrcode

4. **Documentation** ✅
   - Complete implementation guide (`IMPLEMENTATION_GUIDE.md`)
   - Best practices included
   - Troubleshooting section

---

## 🎯 Next Steps (In Order)

### Step 1: Create App Icons

You need two icon files in the `public` directory:

```bash
# Create icons (use your logo/artwork)
# Method 1: Use online tool
# Visit: https://realfavicongenerator.net/

# Method 2: Use ImageMagick (if installed)
convert your-logo.png -resize 192x192 public/icon-192.png
convert your-logo.png -resize 512x512 public/icon-512.png

# Method 3: Use a simple colored circle (temporary)
# Just create two 192x192 and 512x512 PNG files with your brand color
```

### Step 2: Create Admin Panel UI

Create `src/app/admin/page.tsx` - **Full code is in IMPLEMENTATION_GUIDE.md, Section 4.1**

Quick copy/paste location: Search for "Create Admin Page" in the guide.

### Step 3: Create Install Prompt Component

1. Create `src/components/InstallPrompt.tsx` - **Full code in IMPLEMENTATION_GUIDE.md, Section 5.1**
2. Add to exports in `src/components/index.ts`:
   ```typescript
   export { InstallPrompt } from './InstallPrompt';
   ```
3. Import and use in dashboard (code in guide Section 5.2)

### Step 4: Configure Supabase

**In Supabase Dashboard:**

1. Go to **Authentication** → **URL Configuration**
2. Set:
   - **Site URL**: `https://your-vercel-url.vercel.app`
   - **Redirect URLs**: Add `https://your-vercel-url.vercel.app/auth/callback`

3. Go to **Authentication** → **Email Templates**
4. Customize "Magic Link" template (template in guide Section 3.1)

5. Go to **Authentication** → **Providers**
6. Enable **Email** provider

### Step 5: Test Locally

```bash
# Build the app
npm run build

# Start production server
npm run start

# Visit http://localhost:3000
```

**Test checklist:**
- [ ] Visit `/admin` - should show form
- [ ] Create a storyteller with your email
- [ ] Check email for magic link
- [ ] Click magic link - should auto-login to dashboard
- [ ] Check browser DevTools → Application → Service Workers
- [ ] Go offline (DevTools → Network → Offline) - should show offline page

### Step 6: Deploy to Vercel

```bash
git add .
git commit -m "Add PWA support and magic link authentication

- Configured Serwist for service worker
- Added magic link authentication
- Created admin panel for storyteller onboarding
- Implemented QR code generation
- Added offline support
"
git push

# Vercel will auto-deploy
```

### Step 7: Test on Real Devices

After deployment:

1. **On iOS**:
   - Open Safari
   - Visit your Vercel URL
   - Tap Share → Add to Home Screen
   - Open the installed app

2. **On Android**:
   - Open Chrome
   - Visit your Vercel URL
   - Tap "Install" banner
   - Open the installed app

---

## 📱 Usage Flow

### Artist Side (You)

1. Visit `https://your-app.vercel.app/admin`
2. Fill in storyteller details (name, email)
3. Click "Generate Access"
4. Show QR code to storyteller OR download/send link

### Storyteller Side (Them)

1. Scan QR code (or click link)
2. Opens in browser
3. Auto-logged in via magic link
4. Sees "Add to Home Screen" prompt
5. Installs app
6. Can view/edit/approve their story
7. Gets notifications when story is uploaded

---

## 🔧 Troubleshooting

### Service Worker Not Registering

```bash
# Check in browser console
navigator.serviceWorker.getRegistrations().then(console.log)

# Force unregister and rebuild
navigator.serviceWorker.getRegistrations().then(regs =>
  regs.forEach(reg => reg.unregister())
);
```

### Icons Not Showing

Make sure files exist:
```bash
ls -la public/icon-*.png
```

### Magic Link Not Working

1. Check Supabase Dashboard → Authentication → URL Configuration
2. Verify callback URL is added to redirect URLs
3. Check email spam folder
4. Try with a different email

---

## 💡 File Locations

All implementation code is in:

1. **`IMPLEMENTATION_GUIDE.md`** - Complete guide (you're here!)
2. **Admin Panel**: Section 4.1
3. **Install Prompt**: Section 5.1
4. **Icons Guide**: Section 2.2
5. **Supabase Config**: Section 3.1

---

## ⚡ Quick Commands

```bash
# Install dependencies (if needed)
npm install

# Development
npm run dev

# Build for production
npm run build

# Test production build locally
npm run start

# Deploy
git push  # Auto-deploys to Vercel
```

---

## 🎨 Customization

### Change App Name/Colors

Edit `src/app/manifest.ts`:
```typescript
{
  name: 'Your App Name',
  short_name: 'Short Name',
  theme_color: '#your-color',
  background_color: '#your-bg-color',
}
```

### Change QR Code Colors

Edit `src/app/api/storytellers/create/route.ts`:
```typescript
color: {
  dark: '#your-dark-color',
  light: '#your-light-color',
}
```

---

## 📞 Support

- **Issues**: File an issue on GitHub
- **Questions**: Check IMPLEMENTATION_GUIDE.md
- **Supabase**: https://supabase.com/docs
- **PWA**: https://web.dev/pwa-checklist/

---

**You're almost there!** Just need to:
1. Create icons (10 min)
2. Copy admin panel code (5 min)
3. Configure Supabase (5 min)
4. Test and deploy (10 min)

**Total time to launch**: ~30 minutes
