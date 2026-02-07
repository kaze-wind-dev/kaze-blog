// @ts-check
import { defineConfig, envField } from "astro/config";
import netlify from "@astrojs/netlify";
import { SITE_URL } from "./src/constants";
import sitemap from "@astrojs/sitemap";

import partytown from "@astrojs/partytown";

// https://astro.build/config
export default defineConfig({
  site: SITE_URL,
  adapter: netlify(),

  env: {
    schema: {
      MICROCMS_API_KEY: envField.string({
        context: "server",
        access: "secret",
        optional: false,
      }),
      MICROCMS_SERVICE_DOMAIN: envField.string({
        context: "server",
        access: "secret",
        optional: false,
      }),
      ZENN_USERNAME: envField.string({
        context: "client",
        access: "public",
        optional: false,
      }),
    },
  },

  image: {
    remotePatterns: [
      { protocol: "https", hostname: "images.microcms-assets.io" },
    ],
  },

  integrations: [
    sitemap(),
    partytown({
      config: {
        forward: ["dataLayer.push"],
      },
    }),
  ],
});
