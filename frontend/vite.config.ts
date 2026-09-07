import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],

  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "./src"),
    },
  },

  server: {
    fs: {
      allow: [
        path.resolve(import.meta.dirname, "."),
        path.resolve(import.meta.dirname, "../javascript-basic-exercises"),
      ],
    },
  },
});
