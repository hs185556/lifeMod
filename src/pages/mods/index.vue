<script setup>
// 采用嵌套组件的结构，用来支持依赖注入，实现单例模式
import { provide, ref } from "vue";
import { useRouter } from "vue-router";
import { useModStore } from "store/mod";
const modules = import.meta.glob([`./*/*/index.vue`, `./*/*/index.ts`], {
  import: "default",
  eager: true,
});

const store = useModStore();
const mod = store.get("mod");

const Choice = modules[`./${mod}/choice/index.vue`];
const Main = modules[`./${mod}/main/index.vue`];
const useMyAbs = modules[`./${mod}/abstract/index.ts`];

const router = useRouter();
const myAbs = useMyAbs();
provide("abstract", myAbs);

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
