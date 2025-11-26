# The Empathy Ledger

A mystical, consent-based portrait gallery where storytellers share their stories and visitors can leave single-word messages. Built for art exhibitions exploring themes of presence, witnessing, and digital consent.

## Features

- **Mystical Portrait Grid** - Floating particles, golden threads connecting souls, ethereal glows
- **Real-time Pulse System** - Storytellers feel when someone views their portrait (phone vibrations)
- **Single-Word Messages** - Visitors can leave one sacred word for storytellers
- **Consent-First Design** - Storytellers can withdraw their portrait at any time
- **Storyteller Dashboard** - View stats, messages, and control visibility
- **Admin Panel** - Manage portraits and exhibition stats

## Quick Start

### 1. Clone and Install

```bash
cd empathy-ledger-app
npm install
```

### 2. Set Up Supabase (Free)

1. Go to [supabase.com](https://supabase.com) and create a free account
2. Create a new project
3. Go to **SQL Editor** and run the contents of `supabase-schema.sql`
4. Go to **Settings > API** and copy your:
   - Project URL
   - `anon` public key
   - `service_role` key (for admin features)

### 3. Configure Environment

```bash
cp .env.example .env.local
```

Edit `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Deploy to Vercel

### One-Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-repo/empathy-ledger-app)

### Manual Deploy

1. Push to GitHub
2. Import to [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy!

## Project Structure

```
empathy-ledger-app/
├── src/
│   ├── app/
│   │   ├── page.tsx              # Main portrait grid
│   │   ├── dashboard/page.tsx    # Storyteller dashboard
│   │   ├── admin/page.tsx        # Admin panel
│   │   ├── api/
│   │   │   ├── portraits/        # Portrait CRUD
│   │   │   ├── messages/         # Message handling
│   │   │   ├── pulse/            # Real-time events
│   │   │   └── push/             # Push notifications
│   │   ├── layout.tsx
│   │   └── globals.css
│   ├── components/
│   │   ├── MysticalBackground.tsx
│   │   ├── PortraitCard.tsx
│   │   ├── ExpandedView.tsx
│   │   └── PulseLog.tsx
│   ├── hooks/
│   │   ├── useRealtimePulse.ts   # Real-time subscriptions
│   │   └── usePortraits.ts       # Portrait data hooks
│   └── lib/
│       ├── supabase.ts           # Supabase client
│       ├── database.types.ts     # TypeScript types
│       ├── vibration.ts          # Vibration patterns
│       └── pushNotifications.ts  # Push notification utils
├── public/
│   ├── sw.js                     # Service worker
│   └── manifest.json             # PWA manifest
├── supabase-schema.sql           # Database schema
└── .env.example                  # Environment template
```

## How It Works

### For Visitors

1. Browse the mystical portrait grid
2. Hover over portraits (storyteller feels a gentle pulse)
3. Click to engage deeper (stronger pulse)
4. Leave a single word message (most meaningful pulse)

### For Storytellers

1. Receive an access code when portrait is added
2. Visit `/dashboard?code=YOUR_CODE`
3. See real-time stats: views, engagements, messages
4. Feel phone vibrations when witnessed
5. Toggle visibility anytime (withdraw/restore)

### Vibration Patterns

| Event | Pattern | Feeling |
|-------|---------|---------|
| Hover | `[80]` | Brief acknowledgment |
| View | `[100, 50, 100]` | Soft pulse |
| Click | `[200, 100, 200, 100, 200]` | Stronger engagement |
| Message | `[300, 100, 300, 100, 500]` | Sustained, meaningful |

## Adding Portraits

### Via Admin Panel

1. Go to `/admin`
2. Enter image URL, name, and storyteller ID
3. Copy the generated access code
4. Share dashboard link with storyteller

### Via API

```bash
curl -X POST http://localhost:3000/api/portraits \
  -H "Content-Type: application/json" \
  -d '{
    "imageUrl": "https://example.com/portrait.jpg",
    "name": "Soul Name",
    "storytellerId": "email@example.com"
  }'
```

Response includes `accessCode` and `dashboardUrl`.

## Testing the Pulse System

### Without Supabase (Demo Mode)

The app works with demo data if Supabase isn't configured. Perfect for testing the UI.

### With Supabase (Full Features)

1. Set up Supabase as described above
2. Add a portrait via admin panel
3. Open dashboard in one browser tab
4. Open main grid in another tab (or phone)
5. Hover/click portraits and watch pulses appear in dashboard!

### Testing Phone Vibrations

1. Open dashboard on your phone
2. Enable "pulse vibrations" toggle
3. Have someone interact with your portrait on desktop
4. Feel the vibrations!

## Physical Object Integration (Future)

The system is designed to connect to physical LED objects. The pulse events can trigger:

- **WiFi LED pebbles** - Glow when witnessed
- **IoT devices** - Via webhooks/MQTT
- **Custom hardware** - Arduino/ESP32 with WebSocket

See `src/lib/vibration.ts` for the pattern definitions that translate to LED behaviors.

## Customization

### Theme Colors

Edit `tailwind.config.js`:

```js
colors: {
  void: {
    deep: '#0a0908',    // Background
    mid: '#12100e',
    light: '#1a1816',
  },
  accent: {
    DEFAULT: '#e8c47c', // Golden warmth
  },
}
```

### Particle Effects

In `MysticalBackground.tsx`:

```tsx
<MysticalBackground
  particleCount={80}  // Number of floating particles
  speed={0.3}         // Movement speed
/>
```

## License

MIT - Use freely for your art exhibitions and experiments.

## Credits

Built with love for the Empathy Ledger art exhibition.

- Next.js 14
- Supabase (real-time database)
- Tailwind CSS
- Vercel (deployment)
