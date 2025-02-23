import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import themePlugin from "@replit/vite-plugin-shadcn-theme-json";
import path, { dirname } from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
import { fileURLToPath } from "url";

// Resolve __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Define plugins dynamically
const plugins = [
  react(),
  runtimeErrorOverlay(),
  themePlugin(),
];

// Conditionally import @replit/vite-plugin-cartographer only in development mode
if (process.env.NODE_ENV !== "production" && process.env.REPL_ID) {
  import("@replit/vite-plugin-cartographer")
    .then((m) => plugins.push(m.cartographer()))
    .catch((err) => console.error("Failed to load cartographer plugin:", err));
}

// Export Vite configuration
export default defineConfig({
  plugins,
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client", "src"),
      "@shared": path.resolve(__dirname, "shared"),
    },
  },
  root: path.resolve(__dirname, "client"),
  build: {
    outDir: path.resolve(__dirname, "dist"), // Adjusted for Vercel
    emptyOutDir: true,
  },
});
