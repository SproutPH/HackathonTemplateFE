import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    // host: "sprout.hackaton.test",
    port: 5173,
    proxy: {
      "/api": {
        // target: "http://ca-ecomm-bff-api-test.blackcoast-5832bae2.southeastasia.azurecontainerapps.io",
        target: "",
        changeOrigin: true,
        secure: false,
      },
      "/ec/api": {
        target: "",
        changeOrigin: true,
        secure: false,
      },
    },
  },
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
