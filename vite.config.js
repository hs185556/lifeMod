import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    // 配置路径别名
    alias: {
      "@": path.resolve(__dirname, "src"),
      pages: "@/pages",
      assets: "@/assets",
      router: "@/router",
      utils: "@/utils",
    },
    // 省略文件后缀
    extensions: ["", ".js", ".json", ".vue", ".scss", ".css"],
  },
  css: {
    preprocessorOptions: {
      // 配置scss
      scss: {
        additionalData: '@import "./src/assets/style/main.scss";',
      },
    },
  },
});
