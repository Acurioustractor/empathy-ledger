// Service Worker for Empathy Ledger
// Handles push notifications and vibration triggers

const CACHE_NAME = 'empathy-ledger-v1';

// Vibration patterns (same as client)
const VIBRATION_PATTERNS = {
  view: [100, 50, 100],
  hover: [80],
  click: [200, 100, 200, 100, 200],
  message: [300, 100, 300, 100, 500],
  visible: [100, 50, 100, 50, 100, 50, 300],
  withdrawn: [200, 200, 200],
};

// Install event
self.addEventListener('install', (event) => {
  console.log('[SW] Installing service worker');
  self.skipWaiting();
});

// Activate event
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating service worker');
  event.waitUntil(clients.claim());
});

// Push event - handle incoming push notifications
self.addEventListener('push', (event) => {
  console.log('[SW] Push received');

  let data = { type: 'view', title: 'Empathy Ledger', body: 'Someone is viewing your story' };

  if (event.data) {
    try {
      data = event.data.json();
    } catch (e) {
      console.error('[SW] Failed to parse push data:', e);
    }
  }

  const options = {
    body: data.body || 'A soul draws near',
    icon: '/icon-192.png',
    badge: '/icon-192.png',
    vibrate: VIBRATION_PATTERNS[data.type] || VIBRATION_PATTERNS.view,
    tag: 'empathy-pulse',
    renotify: true,
    data: {
      type: data.type,
      portraitId: data.portraitId,
      url: data.url || '/',
    },
    actions: [
      {
        action: 'view',
        title: 'View',
      },
      {
        action: 'dismiss',
        title: 'Dismiss',
      },
    ],
  };

  // Show notification
  event.waitUntil(
    self.registration.showNotification(data.title || 'Empathy Ledger', options)
  );

  // Also trigger vibration directly (for when app is open)
  if (navigator.vibrate && VIBRATION_PATTERNS[data.type]) {
    navigator.vibrate(VIBRATION_PATTERNS[data.type]);
  }
});

// Notification click event
self.addEventListener('notificationclick', (event) => {
  console.log('[SW] Notification clicked');

  event.notification.close();

  if (event.action === 'dismiss') {
    return;
  }

  const url = event.notification.data?.url || '/dashboard';

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((windowClients) => {
      // Check if there's already a window open
      for (const client of windowClients) {
        if (client.url.includes('/dashboard') && 'focus' in client) {
          return client.focus();
        }
      }
      // Open new window
      if (clients.openWindow) {
        return clients.openWindow(url);
      }
    })
  );
});

// Message event - handle messages from the main app
self.addEventListener('message', (event) => {
  console.log('[SW] Message received:', event.data);

  if (event.data.type === 'TRIGGER_VIBRATION') {
    const pattern = VIBRATION_PATTERNS[event.data.vibration] || VIBRATION_PATTERNS.view;
    if (navigator.vibrate) {
      navigator.vibrate(pattern);
    }
  }

  if (event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
