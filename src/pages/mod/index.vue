<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

// 跳转页面
function toPage() {
  router.push({ path: "/choice" });
}
</script>

<template>
  <div class="header">Mod</div>
  <div class="content">
    <div class="btn" @click="toPage()">测试Mod</div>
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
