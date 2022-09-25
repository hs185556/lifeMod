import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    // 配置路径别名
    alias: {
      "@": path.resolve(__dirname, "src"),
      pages: "@/pages",
      mods: "@/mods",
      assets: "@/assets",
      router: "@/router",
    },
    // 省略文件后缀
    extensions: ["", ".js", ".json", ".vue", ".scss", ".css"],
  },
});
