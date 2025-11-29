# Empathy Ledger PWA + Magic Link Implementation Guide

## 🚀 Overview

This guide walks you through implementing a Progressive Web App (PWA) with magic link authentication for the Empathy Ledger art exhibition project.

---

## ⚠️ Prerequisites

### Required Disk Space
**You need to free up disk space before proceeding!**

Run these commands to check and clean up:
```bash
# Check available disk space
df -h

# Clean npm cache
npm cache clean --force

# Remove unused node_modules (if safe)
cd "/Volumes/OS_FIELD_B/Code/Empathy Ledger Art Exhibition/empathy-ledger-app"
rm -rf node_modules
npm install  # Reinstall fresh

# Clear system caches (macOS)
sudo periodic daily weekly monthly
```

### System Requirements
- **Node.js**: 18.x or later
- **Disk Space**: At least 2GB free
- **Supabase Project**: Already set up ✅
- **Vercel Account**: For deployment ✅

---

## 📦 Phase 1: Install Dependencies

Once you have freed up disk space, run:

```bash
cd "/Volumes/OS_FIELD_B/Code/Empathy Ledger Art Exhibition/empathy-ledger-app"

# Install PWA dependencies
npm install @serwist/next @serwist/sw

# Install QR code generation
npm install qrcode @types/qrcode

# Install sharp for image optimization (PWA icons)
npm install sharp
```

---

## 🎨 Phase 2: PWA Setup

### 2.1 Web App Manifest

**File**: `src/app/manifest.ts` ✅ (Already created)

This defines how your app appears when installed.

### 2.2 Create App Icons

You need to create icons in the `public` directory:

**Required Sizes:**
- `public/icon-192.png` (192x192px)
- `public/icon-512.png` (512x512px)

**Quick Generation with ImageMagick:**
```bash
# If you have a master icon (e.g., logo.svg or logo.png)
convert logo.png -resize 192x192 public/icon-192.png
convert logo.png -resize 512x512 public/icon-512.png
```

**Or use an online tool:**
- https://realfavicongenerator.net/
- https://favicon.io/favicon-converter/

### 2.3 Configure Next.js for Serwist

**File**: `next.config.mjs`

Replace contents with:

```javascript
import withSerwistInit from '@serwist/next';

const withSerwist = withSerwistInit({
  swSrc: 'src/app/sw.ts',
  swDest: 'public/sw.js',
  cacheOnNavigation: true,
  reloadOnOnline: true,
  disable: process.env.NODE_ENV === 'development',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: '**.supabase.co',
      },
    ],
  },
};

export default withSerwist(nextConfig);
```

### 2.4 Create Service Worker

**File**: `src/app/sw.ts`

```typescript
import { defaultCache } from '@serwist/next/worker';
import type { PrecacheEntry } from '@serwist/precaching';
import { installSerwist } from '@serwist/sw';

declare const self: ServiceWorkerGlobalScope & {
  __SW_MANIFEST: (PrecacheEntry | string)[] | undefined;
};

installSerwist({
  precacheEntries: self.__SW_MANIFEST,
  skipWaiting: true,
  clientsClaim: true,
  navigationPreload: true,
  runtimeCaching: defaultCache,
  offlineFallbackPage: '/offline',
});

// Push notification handling
self.addEventListener('push', (event) => {
  if (!event.data) return;

  const data = event.data.json();
  const { title, body, icon, badge, tag } = data;

  event.waitUntil(
    self.registration.showNotification(title, {
      body,
      icon: icon || '/icon-192.png',
      badge: badge || '/icon-192.png',
      tag: tag || 'empathy-ledger',
      vibrate: [200, 100, 200],
      requireInteraction: true,
      data: {
        url: data.url || '/',
      },
    })
  );
});

// Notification click handling
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  const url = event.notification.data?.url || '/';

  event.waitUntil(
    clients.openWindow(url)
  );
});
```

### 2.5 Create Offline Fallback Page

**File**: `src/app/offline/page.tsx`

```typescript
import Link from 'next/link';
import { MysticalBackground } from '@/components';

export default function OfflinePage() {
  return (
    <main className="min-h-screen bg-void-deep relative overflow-hidden">
      <MysticalBackground particleCount={20} speed={0.1} />

      <div className="relative z-10 min-h-screen flex items-center justify-center px-8">
        <div className="max-w-md text-center animate-fade-in">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-accent/20 flex items-center justify-center">
            <svg
              className="w-8 h-8 text-accent"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M18.364 5.636a9 9 0 010 12.728m0 0l-2.829-2.829m2.829 2.829L21 21M15.536 8.464a5 5 0 010 7.072m0 0l-2.829-2.829m-4.243 2.829a4.978 4.978 0 01-1.414-2.83m-1.414 5.658a9 9 0 01-2.167-9.238m7.824 2.167a1 1 0 111.414 1.414m-1.414-1.414L3 3m8.293 8.293l1.414 1.414"
              />
            </svg>
          </div>

          <h1 className="text-2xl text-text-primary font-serif mb-3">
            You're offline
          </h1>

          <p className="text-text-muted text-sm font-serif mb-8">
            Your connection to the void has been severed. Reconnect to continue your journey.
          </p>

          <Link
            href="/"
            className="inline-block px-6 py-3 bg-accent/20 text-accent rounded-md font-serif text-sm hover:bg-accent/30 transition-colors"
          >
            Try again
          </Link>
        </div>
      </div>
    </main>
  );
}
```

### 2.6 Register Service Worker in Layout

**File**: `src/app/layout.tsx`

Add this to your root layout (inside the `<body>` tag):

```typescript
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#e8c47c" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
      </head>
      <body className={geistSans.variable + ' ' + geistMono.variable}>
        {children}

        {/* PWA Service Worker Registration */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', () => {
                  navigator.serviceWorker.register('/sw.js');
                });
              }
            `,
          }}
        />
      </body>
    </html>
  );
}
```

---

## 🔐 Phase 3: Magic Link Authentication

### 3.1 Configure Supabase Auth Settings

**In Supabase Dashboard:**

1. Go to **Authentication** → **URL Configuration**
2. Set **Site URL**: `https://your-domain.vercel.app`
3. Add **Redirect URLs**:
   - `https://your-domain.vercel.app/auth/callback`
   - `http://localhost:3000/auth/callback` (development)

4. Go to **Authentication** → **Email Templates**
5. Customize "Magic Link" template:

```html
<h2>Access Your Empathy Ledger Story</h2>
<p>Click the link below to access your sacred space:</p>
<p><a href="{{ .ConfirmationURL }}">Access Your Dashboard</a></p>
<p>This link expires in 1 hour and can only be used once.</p>
```

6. Go to **Authentication** → **Providers**
7. Enable **Email** provider
8. Configure:
   - ✅ Enable Email Signup
   - ✅ Confirm Email (disable for magic links)
   - ✅ Secure Email Change

### 3.2 Create Storyteller Management API

**File**: `src/app/api/storytellers/create/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase';
import QRCode from 'qrcode';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone } = body;

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    const supabase = createServerClient();

    // Create user with Supabase Auth (magic link)
    const { data: authData, error: authError } = await supabase.auth.admin.generateLink({
      type: 'magiclink',
      email,
      options: {
        data: {
          name,
          phone,
        },
      },
    });

    if (authError) {
      console.error('Auth error:', authError);
      return NextResponse.json(
        { error: 'Failed to create storyteller account' },
        { status: 500 }
      );
    }

    // Generate QR code from magic link
    const magicLink = authData.properties.action_link;
    const qrCodeDataURL = await QRCode.toDataURL(magicLink, {
      width: 400,
      margin: 2,
      color: {
        dark: '#e8c47c',
        light: '#0a0908',
      },
    });

    // Create storyteller record
    const storytellerId = authData.user.id;

    // @ts-expect-error - Supabase type inference issue
    const { error: insertError } = await supabase
      .from('portraits')
      .insert({
        storyteller_id: storytellerId,
        visible: false, // Default to hidden until story is uploaded and approved
      });

    if (insertError) {
      console.error('Insert error:', insertError);
      // Non-fatal - user is created but portrait record failed
    }

    return NextResponse.json({
      success: true,
      storyteller: {
        id: storytellerId,
        email,
        name,
        phone,
      },
      magicLink,
      qrCode: qrCodeDataURL,
      accessCode: authData.user.id.slice(0, 8), // First 8 chars of UUID for easy reference
    });
  } catch (error) {
    console.error('Create storyteller error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
```

### 3.3 Create Auth Callback Handler

**File**: `src/app/auth/callback/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const token_hash = searchParams.get('token_hash');
  const type = searchParams.get('type');
  const next = searchParams.get('next') || '/dashboard';

  if (token_hash && type) {
    const supabase = createServerClient();

    const { error } = await supabase.auth.verifyOtp({
      type: type as any,
      token_hash,
    });

    if (!error) {
      // Redirect to dashboard with success
      return NextResponse.redirect(new URL(next, request.url));
    }
  }

  // Redirect to error page
  return NextResponse.redirect(new URL('/auth/error', request.url));
}
```

### 3.4 Create Auth Error Page

**File**: `src/app/auth/error/page.tsx`

```typescript
import Link from 'next/link';
import { MysticalBackground } from '@/components';

export default function AuthErrorPage() {
  return (
    <main className="min-h-screen bg-void-deep relative overflow-hidden">
      <MysticalBackground particleCount={40} speed={0.2} />

      <div className="relative z-10 min-h-screen flex items-center justify-center px-8">
        <div className="max-w-md text-center animate-fade-in">
          <h1 className="text-2xl text-text-primary font-serif mb-3">
            Authentication Failed
          </h1>

          <p className="text-text-muted text-sm font-serif mb-8">
            Your magic link has expired or is invalid. Please request a new one.
          </p>

          <Link
            href="/"
            className="inline-block px-6 py-3 bg-accent/20 text-accent rounded-md font-serif text-sm hover:bg-accent/30 transition-colors"
          >
            Return to Ledger
          </Link>
        </div>
      </div>
    </main>
  );
}
```

---

## 🎨 Phase 4: Artist Admin Panel

### 4.1 Create Admin Page

**File**: `src/app/admin/page.tsx`

```typescript
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { MysticalBackground } from '@/components';

interface StorytellerData {
  id: string;
  email: string;
  name?: string;
  magicLink: string;
  qrCode: string;
  accessCode: string;
}

export default function AdminPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<StorytellerData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('/api/storytellers/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create storyteller');
      }

      setResult(data);
      // Clear form
      setName('');
      setEmail('');
      setPhone('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  const downloadQR = () => {
    if (!result) return;

    const link = document.createElement('a');
    link.download = `storyteller-${result.accessCode}-qr.png`;
    link.href = result.qrCode;
    link.click();
  };

  const sendSMS = async () => {
    if (!result) return;
    // TODO: Implement SMS via Twilio
    alert('SMS feature coming soon!');
  };

  return (
    <main className="min-h-screen bg-void-deep relative overflow-hidden">
      <MysticalBackground particleCount={30} speed={0.15} />

      <div className="relative z-10 px-8 py-12">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl text-text-primary font-serif mb-2">
            Artist Admin Panel
          </h1>
          <p className="text-text-muted text-sm font-serif mb-12">
            Create storyteller accounts and generate access links
          </p>

          {!result ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-text-muted text-sm font-serif mb-2">
                  Name (optional)
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-void-deep border border-accent/20 rounded-md px-4 py-3 text-text-primary font-serif outline-none focus:border-accent transition-colors"
                  placeholder="Soul's name"
                />
              </div>

              <div>
                <label className="block text-text-muted text-sm font-serif mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-void-deep border border-accent/20 rounded-md px-4 py-3 text-text-primary font-serif outline-none focus:border-accent transition-colors"
                  placeholder="storyteller@example.com"
                />
              </div>

              <div>
                <label className="block text-text-muted text-sm font-serif mb-2">
                  Phone (optional)
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-void-deep border border-accent/20 rounded-md px-4 py-3 text-text-primary font-serif outline-none focus:border-accent transition-colors"
                  placeholder="+1 234 567 8900"
                />
              </div>

              {error && (
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-md">
                  <p className="text-red-400 text-sm font-serif">{error}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={loading || !email}
                className="w-full px-6 py-4 bg-accent text-void-deep rounded-md font-serif font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:bg-accent/90"
              >
                {loading ? 'Creating...' : 'Generate Access'}
              </button>
            </form>
          ) : (
            <div className="space-y-6 animate-fade-in">
              <div className="p-6 bg-accent/5 border border-accent/20 rounded-lg">
                <h2 className="text-xl text-text-primary font-serif mb-4">
                  Storyteller Created
                </h2>

                <div className="space-y-3 mb-6">
                  <div>
                    <span className="text-text-faint text-xs font-serif">Email:</span>
                    <p className="text-text-primary font-serif">{result.email}</p>
                  </div>
                  {result.name && (
                    <div>
                      <span className="text-text-faint text-xs font-serif">Name:</span>
                      <p className="text-text-primary font-serif">{name}</p>
                    </div>
                  )}
                  <div>
                    <span className="text-text-faint text-xs font-serif">Access Code:</span>
                    <p className="text-accent font-serif font-mono">{result.accessCode}</p>
                  </div>
                </div>

                {/* QR Code */}
                <div className="mb-6 p-4 bg-void-deep rounded-lg">
                  <Image
                    src={result.qrCode}
                    alt="QR Code"
                    width={300}
                    height={300}
                    className="mx-auto"
                  />
                </div>

                {/* Actions */}
                <div className="space-y-3">
                  <button
                    onClick={downloadQR}
                    className="w-full px-4 py-3 bg-accent text-void-deep rounded-md font-serif text-sm hover:bg-accent/90 transition-colors"
                  >
                    Download QR Code
                  </button>

                  <button
                    onClick={() => copyToClipboard(result.magicLink)}
                    className="w-full px-4 py-3 bg-accent/20 text-accent rounded-md font-serif text-sm hover:bg-accent/30 transition-colors"
                  >
                    Copy Magic Link
                  </button>

                  <button
                    onClick={sendSMS}
                    className="w-full px-4 py-3 bg-accent/10 text-accent rounded-md font-serif text-sm hover:bg-accent/20 transition-colors"
                  >
                    Send via SMS
                  </button>
                </div>
              </div>

              <button
                onClick={() => setResult(null)}
                className="w-full px-4 py-3 text-text-muted font-serif text-sm hover:text-text-primary transition-colors"
              >
                Create Another
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
```

---

## 📱 Phase 5: Install Prompt Component

### 5.1 Create Install Prompt

**File**: `src/components/InstallPrompt.tsx`

```typescript
'use client';

import { useEffect, useState } from 'react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    // Check if already installed
    const isStandaloneMode = window.matchMedia('(display-mode: standalone)').matches;
    setIsStandalone(isStandaloneMode);

    if (isStandaloneMode) return;

    // Listen for install prompt
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);

      // Show prompt after 3 seconds
      setTimeout(() => setShowPrompt(true), 3000);
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === 'accepted') {
      setDeferredPrompt(null);
      setShowPrompt(false);
    }
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    // Don't show again this session
    sessionStorage.setItem('install-prompt-dismissed', 'true');
  };

  // Don't show if already installed or dismissed
  if (isStandalone || !showPrompt || sessionStorage.getItem('install-prompt-dismissed')) {
    return null;
  }

  // iOS-specific instructions
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

  if (isIOS) {
    return (
      <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-gradient-to-t from-void-deep via-void-deep to-transparent">
        <div className="max-w-md mx-auto p-4 bg-accent/10 border border-accent/20 rounded-lg backdrop-blur">
          <button
            onClick={handleDismiss}
            className="absolute top-2 right-2 text-text-faint hover:text-text-muted"
          >
            ✕
          </button>

          <p className="text-text-primary font-serif text-sm mb-2">
            Install Empathy Ledger
          </p>
          <p className="text-text-muted font-serif text-xs mb-3">
            Tap <strong>Share</strong> → <strong>Add to Home Screen</strong>
          </p>
          <div className="flex gap-2 text-accent">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M16 5l-1.42 1.42-1.59-1.59V16h-1.98V4.83L9.42 6.42 8 5l4-4 4 4zm4 14H4a2 2 0 0 0-2 2v2h20v-2a2 2 0 0 0-2-2z"/>
            </svg>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 max-w-md mx-auto">
      <div className="p-4 bg-gradient-to-r from-accent/20 to-accent/10 border border-accent/30 rounded-lg backdrop-blur-md shadow-xl animate-fade-in-up">
        <button
          onClick={handleDismiss}
          className="absolute top-2 right-2 text-text-faint hover:text-text-muted transition-colors"
        >
          ✕
        </button>

        <h3 className="text-text-primary font-serif font-medium mb-1">
          Add to Home Screen
        </h3>
        <p className="text-text-muted font-serif text-sm mb-4">
          Install Empathy Ledger for quick access and offline viewing
        </p>

        <div className="flex gap-3">
          <button
            onClick={handleInstall}
            className="flex-1 px-4 py-2 bg-accent text-void-deep rounded-md font-serif text-sm font-medium hover:bg-accent/90 transition-colors"
          >
            Install
          </button>
          <button
            onClick={handleDismiss}
            className="px-4 py-2 text-text-muted font-serif text-sm hover:text-text-primary transition-colors"
          >
            Not now
          </button>
        </div>
      </div>
    </div>
  );
}
```

### 5.2 Add to Dashboard

In `src/app/dashboard/page.tsx`, add the install prompt:

```typescript
import { InstallPrompt } from '@/components/InstallPrompt';

export default function DashboardPage() {
  return (
    <>
      <Suspense fallback={...}>
        <DashboardContent />
      </Suspense>

      <InstallPrompt />
    </>
  );
}
```

---

## 🚀 Phase 6: Deployment

### 6.1 Build and Test Locally

```bash
# Build the app
npm run build

# Test the production build locally
npm run start

# Open http://localhost:3000 and test:
# - PWA install prompt
# - Service worker registration
# - Offline functionality
```

### 6.2 Deploy to Vercel

```bash
# Commit all changes
git add .
git commit -m "Implement PWA with magic link authentication"
git push

# Vercel will auto-deploy from GitHub
```

### 6.3 Configure Environment Variables in Vercel

In Vercel Dashboard → Settings → Environment Variables:

```
NEXT_PUBLIC_SUPABASE_URL=your-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
NEXT_PUBLIC_VAPID_PUBLIC_KEY=your-vapid-key
```

---

## ✅ Phase 7: Testing Checklist

### PWA Installation
- [ ] Manifest loads correctly (`/manifest.json`)
- [ ] Icons display properly (192px, 512px)
- [ ] Install prompt appears on supported devices
- [ ] App installs to home screen
- [ ] Opens in standalone mode (no browser UI)
- [ ] Theme color matches design

### Service Worker
- [ ] Service worker registers successfully
- [ ] Offline page works when disconnected
- [ ] Images cache correctly
- [ ] Push notifications work
- [ ] Updates apply properly

### Magic Link Auth
- [ ] Email sends with magic link
- [ ] Link logs user in automatically
- [ ] Redirects to dashboard
- [ ] Invalid/expired links show error
- [ ] Session persists across app restarts

### Admin Panel
- [ ] Can create new storyteller
- [ ] QR code generates correctly
- [ ] Magic link copies to clipboard
- [ ] QR code downloads as PNG
- [ ] Form validation works
- [ ] Error handling displays properly

### User Flow
- [ ] Scan QR → Opens web app
- [ ] Auto-login works
- [ ] Install prompt appears
- [ ] App icon added to home screen
- [ ] Dashboard loads correctly
- [ ] Notifications work
- [ ] Can toggle visibility
- [ ] Messages display properly

---

## 🔧 Troubleshooting

### Service Worker Not Registering

Check browser console for errors:
```javascript
navigator.serviceWorker.getRegistrations().then(console.log);
```

Manually unregister and re-register:
```javascript
navigator.serviceWorker.getRegistrations().then(regs =>
  regs.forEach(reg => reg.unregister())
);
```

### Install Prompt Not Showing

Requirements for install prompt:
- HTTPS (or localhost)
- Valid manifest
- Service worker registered
- Not already installed
- User engagement (click/tap)

### Magic Link Not Working

Check Supabase Dashboard → Authentication → URL Configuration:
- Site URL is correct
- Redirect URLs include callback route
- Email template is enabled

### Push Notifications Failing

Check:
- VAPID keys are set correctly
- Notification permission granted
- Service worker is active
- Push subscription is saved to database

---

## 📚 Additional Resources

- [Next.js PWA Guide](https://nextjs.org/docs/app/guides/progressive-web-apps)
- [Serwist Documentation](https://serwist.pages.dev/)
- [Supabase Magic Link Docs](https://supabase.com/docs/guides/auth/passwordless-login/auth-magic-link)
- [Web.dev PWA Checklist](https://web.dev/pwa-checklist/)
- [PWA Icon Generator](https://www.pwabuilder.com/imageGenerator)

---

## 🎯 Next Steps

1. **Free up disk space** and install dependencies
2. **Generate app icons** (192px, 512px)
3. **Configure Supabase** auth settings
4. **Test locally** with `npm run build && npm run start`
5. **Deploy to Vercel**
6. **Test on real devices** (iOS and Android)
7. **Optional**: Add SMS integration with Twilio
8. **Optional**: Implement NFC tags for auto-login

---

## 💡 Future Enhancements

- **Biometric auth**: Face ID / Touch ID login
- **NFC tags**: Tap-to-login with physical tags
- **Multi-language**: i18n support
- **Voice notes**: Record audio stories
- **Collaborative stories**: Multiple storytellers per portrait
- **Advanced analytics**: Engagement tracking
- **Data export**: Download story as PDF/JSON

---

**Questions?** Check the troubleshooting section or review the source code in each implementation file.
