import { ref } from "vue";

export default (Base) =>
  class extends Base {
    // 学习
    study = () => {
      this.wisdom.value += Math.floor(this.wisdomAddBase);
      this.deposit();
    }
    // 工作
    work = () => {
      // (基本工资 + 智慧加成) * 金钱倍率
      this.money.value += Math.floor((2 + this.wisdom.value * 0.5) * this.earnMoneyRate);
      this.deposit();
    }
    // 消费
    consum = (num) => {
      this.money.value -= num;
      this.deposit();
    }
  };
