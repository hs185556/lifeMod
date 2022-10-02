<script setup>
import { provide, ref } from "vue";
import { useRouter } from "vue-router";
import Choice from "./choice";
import Main from "./main";
import useAbstract from "./abstract";

const router = useRouter();
const abstract = useAbstract();
provide("abstract", abstract);

// 单页面组件切换 （为支持/每次刷新单例模式，采用单页面）
const cIds = ["choice", "main"];
let cId = ref(router.currentRoute.value.query?.cId || "choice");
provide("next", function () {
  cId.value = cIds[cIds.findIndex((v) => v === cId.value) + 1];
});
</script>

<template>
  <Choice v-if="cId === 'choice'"></Choice>
  <Main v-if="cId === 'main'"></Main>
</template>

<style scoped></style>
