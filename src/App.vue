<script setup>
import { provide, ref, onMounted } from "vue";
import Message from "components/Message";
import Music from "components/Music";

const message = ref(null);
const music = ref(null);

onMounted(() => {
  provide("message", message.value);
  provide("music", music.value);
});

</script>

<template>
  <router-view />
  <Message ref="message" />
  <Music ref="music" />
</template>

<style scoped></style>
