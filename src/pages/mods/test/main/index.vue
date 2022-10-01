<script setup>
import { ref, reactive, nextTick, inject } from "vue";
import { useRouter } from "vue-router";
import Menu from "components/Menu";

const store = inject("store");
const { money, wisdom, dayLimit, study, work, check } = inject("abstract");
const router = useRouter();

// 必须和模板里的 ref 同名
const contentDom = ref(null);
// 当前天数
let now = 1;
// 菜单
const menus = reactive([
  {
    label: "分类1",
    children: [
      { label: "学习", desc: "你学习了2天", duration: 2, exe: () => study() },
    ],
  },
  { label: "工作", desc: "你工作了1天", duration: 1, exe: () => work() },
]);
// 文字记录
const records = ref([]);

// 返回
const back = () => {
  router.push({ path: "/" });
};
// 点击菜单项
const clickMenuItem = (menu) => {
  menu.exe();
  records.value.push({ day: now, text: menu.desc });
  now += menu.duration;

  // 滚动到底部
  nextTick(function () {
    contentDom.value.scrollTo({
      top: contentDom.value.scrollHeight,
      // 平滑滚动
      // behavior: "smooth",
    });
  });

  // 天数检查
  if (now > dayLimit) {
    const [pass, reward] = check();
    store.increase("game-currency", reward);
    records.value.push({
      time: "",
      text: `你${pass ? "通关了" : "没通关"}，获得了${reward}￥`,
    });
    menus.length = 0;
    menus.push({ label: "结束", exe: () => back() });
  }
};
</script>

<template>
  <div class="header">
    <p>智慧: {{ wisdom }}</p>
    <p>金钱: {{ money }}</p>
    <p>天数: {{ dayLimit }}</p>
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
}
.content {
  height: calc(100% - 220px);
  overflow: auto;
  .desc {
    display: flex;
    margin-bottom: 5px;
    .day {
      width: 60px;
      height: 60px;
      line-height: 60px;
      font-size: 20px;
      font-weight: bold;
    }
    .text {
      flex: 1;
      border: 1px solid #000;
      padding: 10px;
      text-align: left;
      display: flex;
      align-items: center;
    }
  }
}
</style>
