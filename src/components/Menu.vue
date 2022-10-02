<script setup lang="ts">
import { ref } from "vue";
import type { MenuType } from "./MenuType";

// 定义传参和传函
const props = defineProps<{
  menus: MenuType[];
}>();
const emits = defineEmits<{
  (e: "itemclick", menu: MenuType): void;
}>();

const { menus } = props;

// 菜单列表
const menusList = ref([menus]);
// 返回的菜单
const backMenu = {
  label: "返回",
  exe: () => {
    menusList.value.pop();
  },
};

// 点击菜单项事件
const handleClick = (menu) => {
  // 进入下一级菜单
  if (Array.isArray(menu.children)) {
    menusList.value.push([...menu.children, backMenu]);
    return;
  }
  // 返回菜单
  if (menu.label === "返回") {
    menu.exe();
    return;
  }
  // 恢复初始菜单
  menusList.value = [menus];
  // 触发传递的点击函数
  emits("itemclick", menu);
};
</script>

<template>
  <div class="menu">
    <div
      class="menu-item"
      v-for="menu of menusList[menusList.length - 1]"
      :key="menu.label"
      @click="handleClick(menu)"
    >
      <div class="btn">{{ menu.label }}</div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.menu {
  margin-left: 60px;
  margin-bottom: 50px;
  margin-right: 12px;
  .menu-item {
    &:last-child {
      border-bottom: 0;
    }
  }
}
</style>
