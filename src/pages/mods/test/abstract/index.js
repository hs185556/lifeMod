import { ref } from "vue";

export default function useStore() {
  const money = ref(0);
  const wisdom = ref(0);
  // 天数
  const days = 30;

  // 学习
  function study() {
    wisdom.value += 2;
  }

  // 工作
  function work() {
    money.value += 2 * (1 + Math.floor(wisdom.value * 0.5));
  }

  // 检查通关
  function check() {
    return [money.value > 300, parseInt(money.value / 10)]; // 是否通关、奖励
  }

  return {
    money,
    wisdom,
    days,
    study,
    work,
    check,
  };
}
