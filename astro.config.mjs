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
    envPrefix: ['PUBLIC_', 'NEXT_PUBLIC_', 'RESEND_', 'EMAIL_', 'DATABASE_', 'TURNSTILE_'],
    define: {
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
    },
    ssr: {
      external: ['resend', 'pg', 'bcryptjs', 'nodemailer', 'firebase-admin', 'firebase-admin/app', 'firebase-admin/auth'],
      noExternal: ['lucide-react', 'firebase', 'firebase/app', 'firebase/auth', '@marsidev/react-turnstile'],
    },
    resolve: {
      dedupe: ['react', 'react-dom'],
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    optimizeDeps: {
      include: [
        'react',
        'react-dom',
        'react/jsx-runtime',
        'lucide-react',
        'firebase/app',
        'firebase/auth',
        '@marsidev/react-turnstile',
      ],
      force: false,
    },
  },
});
