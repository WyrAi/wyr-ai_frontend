import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { v4 as uuid } from "uuid";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        outDir: "dist",
        entryFileNames: `[name]` + uuid() + `.js`,
        chunkFileNames: `[name]` + uuid() + `.js`,
        assetFileNames: `[name]` + uuid() + `.[ext]`,
      },
    },
  },
});
