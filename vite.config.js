import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

import path from "path";

import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
// import viteCompression from 'vite-plugin-compression';
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";

// https://vitejs.dev/config/
export default defineConfig({
  base:"./",

  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    // viteCompression()
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      components: path.resolve(__dirname, "src/components"),
      assets: path.resolve(__dirname, "src/assets"),
      views: path.resolve(__dirname, "src/views"),
      utils: path.resolve(__dirname, "src/utils"),
      apis: path.resolve(__dirname, "src/apis"),
    },
  },
  server: {
    port: 3000,
    open: true,
  },
  preview: {
    port: 3030,
    open: true,
  },
});
