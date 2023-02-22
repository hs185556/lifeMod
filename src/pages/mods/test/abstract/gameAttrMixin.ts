import { ref, inject } from "vue";

export default (Base) =>
  class extends Base {
    // 当前天数
    now = this.store.get("run", "now") || 1;
    // 文字记录
    records = ref(this.store.get("run", "records") || []);
    // 内容节点
    contentDom = ref(null);
  };
