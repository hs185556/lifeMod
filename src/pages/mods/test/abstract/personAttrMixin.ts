import { ref } from "vue";

export default (Base) =>
  class extends Base {
    // 金钱
    money = ref(this.store.get("abstract", "money") || 0);
    // 智慧
    wisdom = ref(this.store.get("abstract", "wisdom") || 0);
    // 智慧增长基数
    wisdomAddBase = this.store.get("abstract", "wisdomAddBase") || 4;
    // 赚钱速率
    earnMoneyRate = this.store.get("abstract", "earnMoneyRate") || 1;
  };
