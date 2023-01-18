<script setup>
import { ref, inject } from "vue";
import { useModStore } from 'store/mod';

const store = useModStore();
const {
  maxTalentNum,
  checkedTalentNum,
  talents,
  toggleTalent,
  drawTalents,
  effectTalents,
} = inject("abstract");
const next = inject("next");
const message = inject("message");

const gameCurrency = ref(store.get("keep", "currency") || 0);

// 重新抽取天赋
const reDrawTalents = () => {
  // 检查余额
  if (gameCurrency.value > 5) {
    gameCurrency.value = store.increase("keep", "currency", -5);
    drawTalents();
  } else {
    message.warning("游戏币不足");
  }
};

// 开始游戏
function newLife() {
  effectTalents();
  next();
}
</script>

<template>
  <div class="header">选择天赋 {{ checkedTalentNum }}/{{ maxTalentNum }}</div>
  <div class="content">
    <!-- 游戏币 -->
    <div class="game-currency">
      游戏币：{{ gameCurrency }}
      <span @click="reDrawTalents()">
        5币&nbsp;
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
    <div class="btn" @click="newLife()">转生</div>
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
  .game-currency {
    margin-bottom: 50px;
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
