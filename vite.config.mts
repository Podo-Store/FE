import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { imageToWebpPlugin } from "vite-plugin-image-to-webp";

export default defineConfig({
  plugins: [react(), tailwindcss(), imageToWebpPlugin()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@utils": path.resolve(__dirname, "./src/utils"),
      "@api": path.resolve(__dirname, "./src/api"),
    },
  },
  server: {
    port: 3000,
  },
});
