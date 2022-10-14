<script setup>
import { provide, ref, onMounted } from "vue";
import useStore from "utils/store";
import Message from "components/Message";
import Music from "components/Music";

const message = ref(null);
const music = ref(null);

onMounted(() => {
  provide("message", message.value);
  provide("music", music.value);
});

// 单例模式
const store = useStore();
provide("store", store);
</script>

<template>
  <router-view />
  <Message ref="message" />
  <Music ref="music" />
</template>

<style scoped></style>
