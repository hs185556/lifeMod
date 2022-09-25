<script setup>
import { ref } from 'vue'
const msg = ref('入口页')
let date = new Date().toLocaleDateString()
</script>

<template>
    <h1>{{ msg }}</h1>
    <p>今天的日期是: {{ date }}</p>
</template>