<script setup>
import { provide, ref, onMounted } from "vue";
import useStore from "utils/store";
import Message from "components/Message";

const message = ref(null);

onMounted(() => {
  provide("message", message.value)
});

// 单例模式
const store = useStore();
provide("store", store);
</script>

<template>
  <router-view />
  <Message ref="message" />
</template>

<style scoped></style>
