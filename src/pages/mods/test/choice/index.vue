<script setup>
import { ref } from "vue";
import { inject } from "vue";

const store = inject("store");
const { talents, maxTalentNum, drawTalents, effectTalents } = inject('abstract');
const next = inject('next');

const mod = store.get("mod");
const gameCurrency = ref(store.get("game-currency") || 0);

// 重新抽取天赋
const reDrawTalents = () => {
  // 检查余额
  if (gameCurrency.value > 5) {
    gameCurrency.value = store.increase('game-currency', -5);
    drawTalents();
  } else {
    alert("你没钱");
  }
};

// 已选天赋数
let selectedTalentNum = ref(0);

// 选择天赋
const toggleTalent = (idx) => {
  const talent = talents.value[idx];
  // 取消勾选
  if (talent.checked) {
    selectedTalentNum.value--;
    talent.checked = 0;
  } else {
    // 勾选
    if (selectedTalentNum.value >= maxTalentNum) {
      alert("选择数量达到上限");
      return;
    }
    selectedTalentNum.value++;
    talent.checked = 1;
  }
};

// 开始游戏
function newLife() {
  effectTalents();
  next();
}
</script>

<template>
  <div class="header">选择天赋 {{ selectedTalentNum }}/2</div>
  <div class="content">
    <!-- 游戏币 -->
    <div class="game-currency">
      游戏币：{{ gameCurrency }}
      <span @click="reDrawTalents()">&nbsp;刷新</span>
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
        <span class="talent-checked">&nbsp;{{ item.checked ? "✓" : "◯" }}</span>
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
