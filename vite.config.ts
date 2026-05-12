import netlifyPlugin from "@netlify/vite-plugin-react-router";
import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [tailwindcss(), reactRouter(), netlifyPlugin()],
  resolve: {
    tsconfigPaths: true,
  },
  // Browser loaders call the API from the Vite origin. Without this proxy,
  // cross-origin requests to Django fail CORS and client-side navigations
  // (e.g. Link to /stories) never complete even though a full-page load works (SSR).
  server: {
    proxy: {
      "/api": {
        target: "http://127.0.0.1:8000",
        changeOrigin: true,
      },
    },
  },
});
