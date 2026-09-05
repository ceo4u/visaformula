import { defineMiddleware } from 'astro:middleware';

export const onRequest = defineMiddleware(async (context, next) => {
  const url = new URL(context.request.url);
  const proto = context.request.headers.get('x-forwarded-proto') || url.protocol.replace(':', '');
  const host = context.request.headers.get('host') || url.host;

  // Enforce HTTPS & apex-to-www canonical domain in production
  if (proto === 'http' && !host.includes('localhost') && !host.includes('127.0.0.1')) {
    const targetHost = host === 'travltik.com' ? 'www.travltik.com' : host;
    return context.redirect(`https://${targetHost}${url.pathname}${url.search}`, 301);
  }
  if (host === 'travltik.com') {
    return context.redirect(`https://www.travltik.com${url.pathname}${url.search}`, 301);
  }

  const response = await next();

  // Strict Production Security Headers
  response.headers.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  // Must be 'unsafe-none' to permit seamless cross-origin communication with Google OAuth / Firebase popups without latency or window.closed blocks
  response.headers.set('Cross-Origin-Opener-Policy', 'unsafe-none');
  response.headers.set(
    'Content-Security-Policy',
    "default-src 'self'; " +
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://challenges.cloudflare.com https://checkout.razorpay.com https://cdn.jsdelivr.net https://apis.google.com https://accounts.google.com https://*.firebaseapp.com https://*.googleapis.com; " +
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://fonts.cdnfonts.com; " +
    "img-src 'self' data: https: blob:; " +
    "font-src 'self' data: https://fonts.gstatic.com https://fonts.cdnfonts.com; " +
    "connect-src 'self' https: wss:; " +
    "frame-src 'self' https://challenges.cloudflare.com https://api.razorpay.com https://checkout.razorpay.com https://accounts.google.com https://travltik.firebaseapp.com https://visaformula-auth.firebaseapp.com https://*.firebaseapp.com;"
  );

  return response;
});
