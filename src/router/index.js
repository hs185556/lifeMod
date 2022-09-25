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
];

// 创建路由
const router = createRouter({
  history: createWebHistory(),
  routes,
});

// 导出路由
export default router;
