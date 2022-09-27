<script setup>
import Abstract from "./abstract";
import Menu from "./menu";
</script>

<template>
  <div class="header">
    <Abstract />
  </div>
  <div class="content"><Menu /></div>
</template>

<style scoped>
.header {
  height: 220px;
}
.content {
  height: calc(100% - 220px);
  overflow: auto;
}
</style>
