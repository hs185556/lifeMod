<script setup lang="ts">
import { ref, reactive, nextTick, inject } from "vue";
import { useRouter } from "vue-router";
import Menu from "components/Menu.vue";
import type { MenuType } from "@/components/MenuType";
import { useModStore } from "store/mod";

const {
  money,
  wisdom,
  dayLimit,
  menus,
  records,
  clickMenuItem,
  scrollToBottom,
  contentDom
} = inject("abstract");

</script>

<template>
  <div class="header">
    <div>
      <p>智慧: {{ wisdom }}</p>
      <p>金钱: {{ money }}</p>
      <p>天数: {{ dayLimit }}</p>
    </div>
  </div>

  <div class="content" ref="contentDom">
    <!-- 文字描述 -->
    <template v-for="item of records" :key="item.day">
      <div class="desc">
        <div class="day">{{ item.day }}</div>
        <div class="text">{{ item.text }}</div>
      </div>
    </template>
    <!-- 菜单 -->
    <Menu
      :menus="menus"
      @itemclick="
        (v) => {
          clickMenuItem(v);
          scrollToBottom(contentDom);
        }
      "
    ></Menu>
  </div>
</template>

<style scoped lang="scss">
.header {
  height: 220px;
  display: flex;
  justify-content: space-evenly;
}
.content {
  height: calc(100% - 220px);
  overflow: auto;
  .desc {
    display: flex;
    margin-bottom: 5px;
    .day {
      width: 50px;
      height: 50px;
      line-height: 50px;
      font-size: 20px;
      font-weight: bold;
    }
    .text {
      flex: 1;
      padding: 8px;
      text-align: left;
      display: flex;
      align-items: center;
    }
  }
}
</style>
