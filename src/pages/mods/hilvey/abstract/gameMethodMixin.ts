import { ref, nextTick } from "vue";

export default (Base) =>
  class extends Base {
    finish = () => {
      this.reachAchievements();
      this.store.clear();
      this.router.push({ path: "/" });
    };
    // 开始游戏
    start = () => {
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
