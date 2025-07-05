import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from "@astrojs/tailwind";
import decapCmsOauth from 'astro-decap-cms-oauth';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://fogcityjazz.com',
  integrations: [mdx(), sitemap(), tailwind(), decapCmsOauth()]
});
