<script setup>
import { provide } from 'vue'
import useStore from 'utils/store'

// 单例模式
const store = useStore();
provide('store', store)
</script>

<template>
  <router-view />
</template>

<style scoped></style>
