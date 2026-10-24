import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath } from "node:url";
const root = fileURLToPath(new URL(".", import.meta.url));
const base = "/bird-hill-orbit-bay/";
export default defineConfig({
  root: root + "pages/grok",
  base,
  publicDir: root + "public",
  resolve: { alias: { "@": root + "src" } },
  plugins: [
    { name: "pages-asset-paths", enforce: "pre",
      transform(code, id) {
        if (!id.includes("/src/") || !/\.[tj]sx?$/.test(id)) return;
        return code.replace(/(["'])\/work\//g, "$1" + base + "work/");
      }
    },
    tailwindcss(), react()
  ],
  build: { outDir: root + "dist-pages", emptyOutDir: true }
});
