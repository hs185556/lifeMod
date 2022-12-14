<script setup lang="ts">
import { ref, reactive, nextTick, inject } from "vue";
import { useRouter } from "vue-router";
import Menu from "components/Menu.vue";
import type { MenuType } from "@/components/MenuType";

const store = inject("store");
const {
  money,
  wisdom,
  dayLimit,
  reachAchievements,
  study,
  work,
  consum,
  check,
} = inject("abstract");
const router = useRouter();

// 必须和模板里的 ref 同名
const contentDom = ref(null);
// 当前天数
let now = store.get("run", "now") || 1;
// 菜单
const menus = reactive<MenuType[]>(
  store.get("run", "menus") || [
    {
      label: "分类1",
      children: [
        { label: "学习", desc: "你学习了2天", duration: 2, callback: "study" },
      ],
    },
    { label: "工作", desc: "你工作了1天", duration: 1, callback: "work" },
  ]
);
// 固定事件
const fixedEvents: MenuType[] = reactive(
  store.get("run", "fixedEvents") || [
    {
      label: "吃大餐",
      desc: "你周末去吃大餐，消费了3￥",
      duration: 0,
      callback: "consum",
      params: 3,
      commonFactor: 7,
    },
  ]
);
// 文字记录
const records = ref(store.get("run", "records") || []);

// 结束转生
const endLife = () => {
  reachAchievements();
  store.clear();
  router.push({ path: "/" });
};
// 菜单事件
const menuEvent = {
  study,
  work,
  consum,
  endLife,
};

// 检查固定事件
const checkFixedEvent = () => {
  fixedEvents
    .filter((v) => now % v.commonFactor === 0)
    .forEach((v) => runMenu(v));
};
// 执行菜单
const runMenu = (menu) => {
  records.value.push({ day: now, text: menu.desc });
  now += menu.duration;
  menuEvent[menu.callback](menu.params);
};
// 天数检查 返true继续执行
const checkDay = () => {
  if (now > dayLimit) {
    const [pass, reward] = check();
    store.increase("keep", "currency", reward);
    records.value.push({
      time: "",
      text: `你${pass ? "通关了" : "没通关"}，获得了${reward}￥`,
    });
    menus.length = 0;
    menus.push({ label: "结束转生", callback: "endLife" });
  }
  return now <= dayLimit;
};
// 滚动到底部
const scrollToBottom = () => {
  nextTick(function () {
    contentDom.value.scrollTo({
      top: contentDom.value.scrollHeight,
      // 平滑滚动
      behavior: "smooth",
    });
  });
};
// 存
function deposit() {
  store.set("abstract", "money", money.value);
  store.set("run", "menus", menus);
  store.set("run", "records", records.value.slice(-3));
  store.set("run", "now", now);
}
const clickMenuItem = (menu) => {
  checkFixedEvent();
  runMenu(menu);
  const flag = checkDay();
  scrollToBottom();
  flag && deposit();
};
</script>

<template>
  <div class="header">
    <div>
      <p>智慧: {{ wisdom }}</p>
      <p>金钱: {{ money }}</p>
      <p>天数: {{ dayLimit }}</p>
    </div>
  </div>

  <div class="content" ref="contentDom">
    <!-- 文字描述 -->
    <template v-for="item of records" :key="item.day">
      <div class="desc">
        <div class="day">{{ item.day }}</div>
        <div class="text">{{ item.text }}</div>
      </div>
    </template>
    <!-- 菜单 -->
    <Menu :menus="menus" @itemclick="clickMenuItem"></Menu>
  </div>
</template>

<style scoped lang="scss">
.header {
  height: 220px;
  display: flex;
  justify-content: space-evenly;
}
.content {
  height: calc(100% - 220px);
  overflow: auto;
  .desc {
    display: flex;
    margin-bottom: 5px;
    .day {
      width: 50px;
      height: 50px;
      line-height: 50px;
      font-size: 20px;
      font-weight: bold;
    }
    .text {
      flex: 1;
      padding: 8px;
      text-align: left;
      display: flex;
      align-items: center;
    }
  }
}
</style>
