// src/utils/trackAdClick.ts
export interface AdClickPayload {
  adId: string;
  adTitle: string;
  adType: 'classified' | 'sponsored';
  category?: string;
  destination?: string;
  targetUrl?: string;
}

export function isUserLoggedIn(): boolean {
  if (typeof window === 'undefined') return false;
  const seekerEmail = localStorage.getItem('seeker_email');
  const seekerFirst = localStorage.getItem('seeker_firstName');
  const expertEmail = localStorage.getItem('expert_email');
  const expertBusiness = localStorage.getItem('expert_businessName');
  const userStr = localStorage.getItem('visaformula_user');

  return Boolean(
    seekerEmail ||
    seekerFirst ||
    expertEmail ||
    expertBusiness ||
    (userStr && userStr !== 'null')
  );
}

export async function trackAdClick(payload: AdClickPayload) {
  try {
    if (typeof window === 'undefined') return;

    // 1. Identify current user from LocalStorage
    const seekerEmail = localStorage.getItem('seeker_email');
    const seekerFirst = localStorage.getItem('seeker_firstName');
    const expertEmail = localStorage.getItem('expert_email');
    const expertBusiness = localStorage.getItem('expert_businessName');
    const userStr = localStorage.getItem('visaformula_user');

    let userEmail = 'Guest (Anonymous)';
    let userRole = 'guest';
    let userName = 'Guest';

    if (expertEmail || expertBusiness) {
      userEmail = expertEmail || 'Expert User';
      userRole = 'expert';
      userName = expertBusiness || 'Consultant';
    } else if (seekerEmail || seekerFirst) {
      userEmail = seekerEmail || 'Seeker User';
      userRole = 'seeker';
      userName = seekerFirst || 'Visa Seeker';
    } else if (userStr && userStr !== 'null') {
      try {
        const parsed = JSON.parse(userStr);
        if (parsed?.email) userEmail = parsed.email;
        if (parsed?.displayName) userName = parsed.displayName;
        if (parsed?.type) userRole = parsed.type;
      } catch (e) {}
    }

    // 2. Build complete analytics event payload
    const clickEvent = {
      adId: payload.adId,
      adTitle: payload.adTitle,
      adType: payload.adType,
      category: payload.category || 'General',
      destination: payload.destination || 'N/A',
      targetUrl: payload.targetUrl || '',
      userEmail,
      userName,
      userRole,
      device: window.innerWidth < 1024 ? 'mobile' : 'desktop',
      pageUrl: window.location.pathname,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
    };

    console.log('📊 [Ad Click Tracked]:', clickEvent);

    // 3. LocalStorage Log Buffer (for offline resilience and instant client-side audit)
    const existingLogsStr = localStorage.getItem('vf_ad_click_logs');
    const existingLogs = existingLogsStr ? JSON.parse(existingLogsStr) : [];
    existingLogs.unshift(clickEvent);
    localStorage.setItem('vf_ad_click_logs', JSON.stringify(existingLogs.slice(0, 100)));

    // 4. Send to backend analytics API endpoint (beacon/fetch)
    if (navigator.sendBeacon) {
      const blob = new Blob([JSON.stringify(clickEvent)], { type: 'application/json' });
      navigator.sendBeacon('/api/analytics/track-click', blob);
    } else {
      fetch('/api/analytics/track-click', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(clickEvent),
      }).catch(err => console.warn('Analytics API error:', err));
    }
  } catch (err) {
    console.error('Error tracking ad click:', err);
  }
}

export function handleAdClickWithAuth(e: React.MouseEvent, payload: AdClickPayload) {
  // Always track the click attempt
  trackAdClick(payload);

  // Check if user is logged in
  if (!isUserLoggedIn()) {
    e.preventDefault();
    // Redirect non-registered users directly to the Signup role selection page
    window.location.href = `/signup?redirect=${encodeURIComponent(payload.targetUrl || '/classifieds')}`;
  }
}
