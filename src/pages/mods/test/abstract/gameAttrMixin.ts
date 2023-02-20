import { ref } from "vue";

export default (Base) =>
  class extends Base {
    // 天数限制
    dayLimit = 30;
    // 当前天数
    now = this.store.get("run", "now") || 1;
    // 文字记录
    records = ref(this.store.get("run", "records") || []);
  };
