import mdx from "@astrojs/mdx"
import sitemap from "@astrojs/sitemap"
import tailwind from "@astrojs/tailwind"
import vercel from "@astrojs/vercel/serverless"
import decapCmsOauth from "astro-decap-cms-oauth"
import { defineConfig } from "astro/config"

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: vercel(),
  integrations: [
    mdx(),
    sitemap(),
    tailwind(),
    decapCmsOauth(),
  ],
  vite: {
    resolve: {
      alias: {
        '@components': './src/components',
        '@layouts': './src/layouts',
      },
    },
  },
})
