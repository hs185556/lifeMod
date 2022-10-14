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
    path: "/achievement",
    component: () => import("pages/achievement"),
  },
  {
    path: "/setting",
    component: () => import("pages/setting"),
  },
  {
    path: "/mod",
    component: () => import("pages/mod"),
  },
  {
    path: "/mod-test",
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
