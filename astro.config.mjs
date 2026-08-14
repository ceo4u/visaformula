import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import node from '@astrojs/node';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://astro.build/config
export default defineConfig({
  site: 'https://tavltik.com',
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
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
  },
});
