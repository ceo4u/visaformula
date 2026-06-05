import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel/serverless';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://visara.com',
  output: 'hybrid',
  adapter: vercel({
    webAnalytics: {
      enabled: true,
    },
  }),
  integrations: [
    react(),
    tailwind({
      applyBaseStyles: false,
    }),
    sitemap({
      filter: (page) => !page.includes('/dashboard') && !page.includes('/consultant'),
    }),
  ],
  vite: {
    ssr: {
      noExternal: ['framer-motion', 'lucide-react'],
    },
    resolve: {
      alias: {
        '@': '/src',
      },
    },
  },
});
