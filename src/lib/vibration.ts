/**
 * Vibration patterns for different pulse events
 * These translate the emotional weight of interactions into physical feedback
 */

export const VIBRATION_PATTERNS = {
  // Someone is viewing your portrait (soft, gentle)
  view: [100, 50, 100],

  // Someone hovered over your portrait (brief acknowledgment)
  hover: [80],

  // Someone clicked/engaged with your portrait (stronger)
  click: [200, 100, 200, 100, 200],

  // Someone left a message (sustained, meaningful)
  message: [300, 100, 300, 100, 500],

  // Your portrait became visible (celebration)
  visible: [100, 50, 100, 50, 100, 50, 300],

  // Your portrait was withdrawn (quiet acknowledgment)
  withdrawn: [200, 200, 200],
} as const;

export type VibrationEvent = keyof typeof VIBRATION_PATTERNS;

/**
 * Trigger a vibration pattern
 * Safely handles browsers/devices that don't support vibration
 */
export function triggerVibration(event: VibrationEvent): boolean {
  if (typeof navigator === 'undefined' || !navigator.vibrate) {
    console.log(`[Pulse] Vibration not supported, event: ${event}`);
    return false;
  }

  try {
    const pattern = VIBRATION_PATTERNS[event];
    navigator.vibrate(pattern);
    console.log(`[Pulse] Vibration triggered: ${event}`);
    return true;
  } catch (error) {
    console.error('[Pulse] Vibration failed:', error);
    return false;
  }
}

/**
 * Check if vibration is supported
 */
export function isVibrationSupported(): boolean {
  return typeof navigator !== 'undefined' && 'vibrate' in navigator;
}

/**
 * Request permission to vibrate (some browsers require user gesture)
 */
export function requestVibrationPermission(): Promise<boolean> {
  return new Promise((resolve) => {
    if (!isVibrationSupported()) {
      resolve(false);
      return;
    }

    // Try a silent vibration to test
    try {
      navigator.vibrate(1);
      resolve(true);
    } catch {
      resolve(false);
    }
  });
}
