import { createRouter, createWebHistory } from "vue-router";

// 下面使用了es6的对象增强写法，命名必须是routes
const routes = [
  {
    path: "/",
    redirect: "entrance",
  },
  {
    path: "/entrance",
    component: () => import("pages/entrance"),
  },
  {
    path: "/mod",
    component: () => import("pages/mod"),
  },
  {
    path: "/choice",
    component: () => import("pages/choice"),
  },
  {
    path: "/test",
    component: () => import("pages/mods/test"),
  },
];

// 创建路由
const router = createRouter({
  history: createWebHistory(),
  routes,
});

// 导出路由
export default router;