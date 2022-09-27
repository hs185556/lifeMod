<script setup>
import { useRouter } from "vue-router";
import useStore from "utils/store";

const router = useRouter();
const store = useStore();

const mod = store.get("mod");

// 跳转页面
function toPage() {
  router.push({ path: `/${mod}` });
}
</script>

<template>
  <div class="header">选择天赋</div>
  <div class="content">
    <div class="btn" @click="toPage()">转生</div>
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
