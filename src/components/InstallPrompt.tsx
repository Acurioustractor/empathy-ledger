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
