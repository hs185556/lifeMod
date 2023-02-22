import { ref, nextTick } from "vue";

export default (Base) =>
  class extends Base {
    // 结束转生
    endLife = () => {
      this.reachAchievements();
      this.store.clear();
      this.router.push({ path: "/" });
    };
    // 存
    deposit = () => {
      this.store.set("abstract", "money", this.money.value);
      this.store.set("abstract", "wisdom", this.wisdom.value);
      this.store.set("abstract", "wisdomAddBase", this.wisdomAddBase);
      this.store.set("abstract", "earnMoneyRate", this.earnMoneyRate);
      this.store.set("run", "menus", this.menus);
      this.store.set("run", "records", this.records.value.slice(-3));
      this.store.set("run", "now", this.now);
    }
    // 开始游戏
    newLife = () => {
      this.effectTalents();
      this.next();
    }
    // 滚动到底部
    scrollToBottom = (contentDom) => {
      if (!contentDom) {
        return;
      }
      nextTick(function () {
        contentDom.scrollTo({
          top: contentDom.scrollHeight,
          // 平滑滚动
          behavior: "smooth",
        });
      });
    };
  };
