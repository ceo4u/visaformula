import type { APIRoute } from 'astro';

// In-memory click events store for analytics backend API
let clickLogsStore: any[] = [];

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();

    if (!data.adTitle || !data.adType) {
      return new Response(JSON.stringify({ error: 'Missing required ad tracking fields' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const eventRecord = {
      id: 'click_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
      adId: data.adId || data.adTitle.toLowerCase().replace(/[^a-z0-9]/g, '_'),
      adTitle: data.adTitle,
      adType: data.adType, // 'classified' | 'sponsored'
      category: data.category || 'General',
      destination: data.destination || 'N/A',
      targetUrl: data.targetUrl || '',
      userEmail: data.userEmail || 'Guest (Anonymous)',
      userName: data.userName || 'Guest',
      userRole: data.userRole || 'guest',
      device: data.device || 'desktop',
      pageUrl: data.pageUrl || '/',
      timestamp: data.timestamp || new Date().toISOString(),
      ip: request.headers.get('x-forwarded-for') || request.headers.get('cf-connecting-ip') || '127.0.0.1',
    };

    // Store in memory (latest 500 events)
    clickLogsStore.unshift(eventRecord);
    if (clickLogsStore.length > 500) {
      clickLogsStore = clickLogsStore.slice(0, 500);
    }

    return new Response(JSON.stringify({ success: true, trackedEvent: eventRecord }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

export const GET: APIRoute = async () => {
  return new Response(JSON.stringify({ logs: clickLogsStore, count: clickLogsStore.length }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};
