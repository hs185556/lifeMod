<script setup>
import { ref, inject } from "vue";
import { useRouter } from "vue-router";
import { modAchievements } from "pages/mods/constant";

const store = inject("store");
const router = useRouter();

const achievement = store.get("keep", "achievement");
// 全部成就

// 分类
let classify = ref("test");

// 点击分类
const clickTab = (val) => {
  classify.value = val;
};
// 跳转页面
function toPage() {
  router.push({ path: "/" });
}
</script>

<template>
  <div class="header">
    <span
      class="iconfont icon-close-square-fill close-icon"
      @click="toPage"
    ></span>
  </div>
  <div class="content">
    <div class="achieve">
      <div
        class="achieve-item"
        v-for="(item, index) of modAchievements[classify]"
        :key="item"
      >
        <div class="title">
          <span>{{ index }}</span
          >{{ achievement && achievement[classify].includes(item.value) ? item.title : "???" }}
        </div>
        <div class="desc">解锁条件:{{ item.condition }}</div>
      </div>
    </div>
    <div class="classify">
      <div class="classify-item" @click="clickTab('test')">
        <div :class="{ active: classify === 'test' }">测试</div>
      </div>
      <div class="classify-item" @click="clickTab('novice')">
        <div :class="{ active: classify === 'novice' }">新手</div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.header {
  font-weight: 550;
  font-size: 30px;
  height: 150px;
  .close-icon {
    font-size: 60px;
    position: absolute;
    right: 5px;
    top: 23px;
  }
}
.content {
  display: flex;
  .achieve {
    flex: 1;
    overflow: auto;
    height: calc(100vh - 150px);
    .achieve-item {
      background: -webkit-gradient(
        linear,
        left top,
        right bottom,
        from($bg-color-deep),
        to($bg-color)
      );
      color: #d1c8ce;
      padding: 16px;
      border-radius: 5px;
      margin-left: 23px;
      margin-bottom: 12px;
      text-align: left;
      .title {
        font-size: 22px;
        font-weight: 550;
        margin-bottom: 40px;
        span {
          font-size: 30px;
          display: inline-block;
          margin-right: 12px;
        }
      }
      .desc {
        font-size: 17px;
      }
    }
  }
  .classify {
    overflow: auto;
    height: calc(100vh - 150px);
    width: 80px;
    display: flex;
    flex-direction: column;
    .classify-item {
      font-size: 20px;
      font-weight: 700;
      margin-bottom: 50px;
      > div {
        padding: 10px 6px;
        width: 22px;
        border-radius: 5px;
        margin: 0 auto;
      }
      > div.active {
        color: $color-reverse;
        background: -webkit-gradient(
          linear,
          left top,
          right bottom,
          from($bg-color-deep),
          to($bg-color)
        );
      }
    }
  }
}
</style>
