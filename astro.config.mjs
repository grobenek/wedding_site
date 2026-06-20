import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://svadba.szathmary.sk',
  output: 'static',
  // No base needed since it's a root subdomain, not a subpath
});
