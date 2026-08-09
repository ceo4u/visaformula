// PM2 ecosystem config — runs the Astro SSR server
// Usage: pm2 start ecosystem.config.cjs
// Make sure environment variables are set in /etc/environment or .env on the VPS

module.exports = {
  apps: [
    {
      name: 'visaformula',
      script: './dist/server/entry.mjs',
      instances: 1,
      exec_mode: 'fork',
      autorestart: true,
      watch: false,
      max_memory_restart: '512M',
      env_production: {
        NODE_ENV: 'production',
        HOST: '0.0.0.0',
        PORT: 4321,
      },
      error_file: './logs/pm2-error.log',
      out_file:   './logs/pm2-out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    },
  ],
};
