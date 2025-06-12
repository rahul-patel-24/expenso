import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig({
  base: "/",
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 5173, // ✅ This is your frontend port
    strictPort: true,
    host: true,
    proxy: {
      // ✅ Proxy /api to your backend running at localhost:5000
      "/api": {
        target: process.env.VITE_API_URLL,
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
