<script setup>
import { inject } from "vue";
import { useRouter } from "vue-router";

const store = inject("store");
const router = useRouter();

// 跳转页面
function toPage(mod) {
  store.replace({
    "game-currency": store.get("game-currency"),
    achievement: store.get("achievement"),
  });
  store.set({ mod });
  router.push({ path: `/mod-${mod}` });
}
</script>

<template>
  <div class="header">Mod</div>
  <div class="content">
    <div class="btn" @click="toPage('test')">测试Mod</div>
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
