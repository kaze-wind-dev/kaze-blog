// @ts-check
import { defineConfig, envField } from "astro/config";

// https://astro.build/config
export default defineConfig({
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
});
