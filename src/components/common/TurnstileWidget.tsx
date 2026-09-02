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

  // Use real configured site key (0x4AAAAAAEkYe7hsfnXhxfvB)
  const siteKey = configuredSiteKey;

  if (!siteKey) {
    return null;
  }

  return (
    <div className={`flex justify-center my-3 w-full ${className}`}>
      <Turnstile
        siteKey={siteKey}
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
