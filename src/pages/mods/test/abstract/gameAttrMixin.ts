import { ref, inject } from "vue";

export default (Base) =>
  class extends Base {
    // 天数限制
    dayLimit = 30;
    // 当前天数
    now = this.store.get("run", "now") || 1;
    // 文字记录
    records = ref(this.store.get("run", "records") || []);
    // 游戏货币
    gameCurrency = ref(this.store.get("keep", "currency") || 0);
    // 内容节点
    contentDom = ref(null);
  };
