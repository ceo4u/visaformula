import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import node from '@astrojs/node';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://astro.build/config
export default defineConfig({
  site: 'https://travltik.com',
  output: 'server',
  adapter: node({
    mode: 'standalone'
  }),
  integrations: [
    react(),
    tailwind({
      applyBaseStyles: false,
    }),
  ],
  vite: {
    envPrefix: ['PUBLIC_', 'NEXT_PUBLIC_', 'RESEND_', 'EMAIL_', 'DATABASE_'],
    ssr: {
      external: ['resend', 'pg', 'bcryptjs', 'nodemailer', 'firebase-admin', 'firebase-admin/app', 'firebase-admin/auth'],
      // Firebase client SDK must NOT be treated as external on the client side
      noExternal: ['firebase', 'firebase/app', 'firebase/auth'],
    },
    optimizeDeps: {
      // Force Vite to always pre-bundle these on startup — prevents 504 Outdated Optimize Dep
      include: [
        'firebase/app',
        'firebase/auth',
      ],
      force: false, // set to true only if you want to force re-optimization on every startup
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
  },
});
