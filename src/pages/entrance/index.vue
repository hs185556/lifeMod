<script setup>
import { ref, inject } from "vue";
import { useRouter } from "vue-router";

const store = inject("store");
const router = useRouter();

const mod = store.get("mod");
const records = store.get("records");

// 跳转页面
function toPage(type) {
  switch (type) {
    case "mod":
      router.push({ path: "/mod" });
      break;
    case "last":
      router.push({ path: `/mod-${mod}`, query: { cId: "main" } });
      break;
  }
}
</script>

<template>
  <div class="header">人生Mod</div>
  <div class="content">
    <div class="btn" @click="toPage('mod')">开始游戏</div>
    <div class="btn" v-if="mod && records?.length" @click="toPage('last')">
      继续游戏
    </div>
    <div class="btn">成就</div>
    <div class="btn">设置</div>
    <div class="btn">退出</div>
  </div>
</template>

<style scoped>
.header {
  padding: 3em;
  font-weight: 700;
  font-size: 30px;
}
.content {
  padding: 0 4em;
}
</style>
