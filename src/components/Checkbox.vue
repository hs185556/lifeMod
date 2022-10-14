<script setup lang="ts">
import { ref } from "vue";

// 定义传参和传函
const props = defineProps<{
  label: string;
  initialValue?: boolean;
}>();
const emits = defineEmits<{
  (e: "onCheck", checked: boolean): void;
}>();

// 属性
const { label } = props;
let checked = ref(props.initialValue || false);

// 选中与取消事件
function onCheck() {
  checked.value = !checked.value;
  emits("onCheck", checked.value);
}
</script>

<template>
  <span class="checkbox-wrapper" @click="onCheck">
    <span class="checkbox-label">{{ label }}</span>
    <span class="iconfont icon-checkbox" v-if="!checked"></span>
    <span class="iconfont icon-checkboxchecked" v-if="checked"></span>
  </span>
</template>

<style scoped lang="scss">
.checkbox-wrapper {
  font-size: 19px;
  font-weight: 550;
  margin-bottom: 12px;
  margin-right: 20px;
  display: inline-block;
  .checkbox-label {
    margin-right: 12px;
  }
  .iconfont {
    font-size: inherit;
  }
}
</style>
