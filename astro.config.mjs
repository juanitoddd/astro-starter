// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';

import tailwindcss from '@tailwindcss/vite';

import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
  integrations: [react()],

  vite: {
    plugins: [tailwindcss()]
  },

  i18n: {
    locales: ["en", "de", "it"],
    defaultLocale: "en",
  },

  redirects: {
    "/": "/en",
    "/en/home": "/en",
    "/de/home": "/de",
    // "/en": "/en/goals",
  },

  server: {
    allowedHosts: ["baringuitar.com", "preview.baringuitar.com", "cms.baringuitar.com"],
    headers: {
      // Do not set X-Frame-Options to DENY or SAMEORIGIN if another origin must embed this app.
      // Prefer CSP frame-ancestors for fine-grained control:
      'Content-Security-Policy': "frame-ancestors 'self' baringuitar.com cms.baringuitar.com preview.baringuitar.com",
    },
  },

  adapter: node({
    mode: "standalone"
  })
});