// ============================================================
// src/components/common/TurnstileWidget.tsx
// Cloudflare Turnstile React Component Wrapper
// Compatible with Astro React islands and Next.js / React
// ============================================================

import React from 'react';
import { Turnstile } from '@marsidev/react-turnstile';

interface TurnstileWidgetProps {
  onSuccess: (token: string) => void;
  onError?: () => void;
  onExpire?: () => void;
  theme?: 'light' | 'dark' | 'auto';
  className?: string;
}

export const TurnstileWidget: React.FC<TurnstileWidgetProps> = ({
  onSuccess,
  onError,
  onExpire,
  theme = 'light',
  className = '',
}) => {
  const configuredSiteKey =
    (typeof import.meta !== 'undefined' && import.meta.env?.NEXT_PUBLIC_TURNSTILE_SITE_KEY) ||
    (typeof import.meta !== 'undefined' && import.meta.env?.PUBLIC_TURNSTILE_SITE_KEY) ||
    process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ||
    process.env.PUBLIC_TURNSTILE_SITE_KEY ||
    '0x4AAAAAAEkYe7hsfnXhxfvB';

  // Cloudflare Turnstile restricts production keys to approved hostnames (e.g. travltik.com).
  // When running on localhost, Cloudflare throws "Unable to connect to website" if localhost is not in the allowed domains.
  // Cloudflare's official testing sitekey '1x00000000000000000000AA' always passes on localhost/dev.
  const [activeSiteKey, setActiveSiteKey] = React.useState<string>(configuredSiteKey);

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const host = window.location.hostname;
      const isLocal = host === 'localhost' || host === '127.0.0.1' || host.startsWith('192.168.') || host.endsWith('.local');
      if (isLocal) {
        // Use Cloudflare's official localhost test sitekey
        setActiveSiteKey('1x00000000000000000000AA');
      } else {
        setActiveSiteKey(configuredSiteKey);
      }
    }
  }, [configuredSiteKey]);

  if (!activeSiteKey) {
    return null;
  }

  return (
    <div className={`flex justify-center my-3 w-full ${className}`}>
      <Turnstile
        siteKey={activeSiteKey}
        onSuccess={onSuccess}
        onError={onError}
        onExpire={onExpire}
        options={{
          theme,
          size: 'flexible',
        }}
      />
    </div>
  );
};
export default TurnstileWidget;
