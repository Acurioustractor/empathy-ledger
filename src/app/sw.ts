import { defaultCache } from '@serwist/next/worker';
import { installSerwist } from '@serwist/sw';

declare let self: any;
declare let clients: any;

installSerwist({
  precacheEntries: self.__SW_MANIFEST,
  skipWaiting: true,
  clientsClaim: true,
  navigationPreload: true,
  runtimeCaching: defaultCache,
});

// Push notification handling
self.addEventListener('push', (event: any) => {
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
self.addEventListener('notificationclick', (event: any) => {
  event.notification.close();

  const url = event.notification.data?.url || '/';

  event.waitUntil(
    clients.openWindow(url)
  );
});
