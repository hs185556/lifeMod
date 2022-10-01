<script setup lang="ts">
import { ref } from "vue";

// 定义类型
interface Menu {
  label: string;
  desc?: string;
  duration?: number;
  exe?: () => {};
  children?: Menu[];
}

// 定义传参和传函
const props = defineProps<{
  menus: Menu[];
}>();
const emits = defineEmits<{
  (e: "itemclick", menu: Menu): void;
}>();

const { menus } = props;

// 菜单列表
const menusList = ref([menus]);
// 返回上一级的菜单
const backMenu = {
  label: "返回上一级",
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
  // 返回上一级菜单
  if (menu.label === "返回上一级") {
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
      {{ menu.label }}
    </div>
  </div>
</template>

<style scoped lang="scss">
.menu {
  margin-left: 60px;
  border: 1px solid #000;
  margin-bottom: 50px;
  .menu-item {
    padding: 20px;
    text-align: center;
    line-height: 15px;
    border-bottom: 1px solid #000;
    &:last-child {
      border-bottom: 0;
    }
  }
}
</style>
