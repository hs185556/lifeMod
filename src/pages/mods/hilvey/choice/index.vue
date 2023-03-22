<script setup>
import { ref, inject } from "vue";
import { useModStore } from "store/mod";

const {
  maxTalentNum,
  checkedTalentNum,
  talents,
  toggleTalent,
  reDrawTalents,
  start,
} = inject("abstract");
</script>

<template>
  <div class="header">选择天赋 {{ checkedTalentNum }}/{{ maxTalentNum }}</div>
  <div class="content">
    <!-- 游戏币 -->
    <div class="talent-refresh">
      ㅤ
      <span @click="reDrawTalents()">
        <span class="iconfont icon-refresh"></span>
      </span>
    </div>
    <!-- 天赋+说明+状态 -->
    <div class="talents">
      <div
        class="talent"
        v-for="(item, idx) of talents"
        :key="item.label"
        @click="toggleTalent(idx)"
      >
        <span class="talent-label">{{ item.label }}</span>
        <span class="talent-desc">&nbsp;{{ item.desc }}</span>
        <span class="talent-checked">
          <span class="iconfont icon-selected" v-if="item.checked"></span>
          <span class="iconfont icon-unselected" v-else></span>
        </span>
        <div style="clear: both"></div>
      </div>
    </div>
    <div class="btn" @click="start()">开始</div>
  </div>
</template>

<style scoped lang="scss">
.header {
  padding: 3em;
  font-weight: 700;
  font-size: 30px;
}
.content {
  padding: 0 2em;
  text-align: left;
  .talent-refresh {
    margin-bottom: 15px;
    span {
      float: right;
    }
  }
  .talents {
    margin-bottom: 50px;
    .talent {
      .talent-label {
        font-weight: bold;
      }
      .talent-checked {
        float: right;
      }
    }
  }
}
</style>
