import { ref, inject } from "vue";
import useTalent from "./useTalent";
import { useModStore } from 'store/mod';

export default function useAbstract() {
  const talent = useTalent();
  const { talents } = talent;
  
  const store = useModStore();
  // 金钱
  const money = ref(store.get("abstract", "money") || 0);
  // 智慧
  const wisdom = ref(store.get("abstract", "wisdom") || 0);
  // 天数限制
  const dayLimit = 30;
  // 智慧增长基数
  let wisdomAddBase = store.get("abstract", "wisdomAddBase") || 4;
  // 赚钱速率
  let earnMoneyRate = store.get("abstract", "earnMoneyRate") || 1;

  // 存
  function deposit() {
    store.set("abstract", "money", money.value);
    store.set("abstract", "wisdom", wisdom.value);
    store.set("abstract", "wisdomAddBase", wisdomAddBase);
    store.set("abstract", "earnMoneyRate", earnMoneyRate);
  }

  // 学习
  function study() {
    wisdom.value += Math.floor(wisdomAddBase);
    deposit();
  }
  // 工作
  function work() {
    // (基本工资 + 智慧加成) * 金钱倍率
    money.value += Math.floor((2 + wisdom.value * 0.5) * earnMoneyRate);
    deposit();
  }
  // 消费
  function consum(num) {
    money.value -= num;
    deposit();
  }
  // 检查通关
  function check() {
    return [money.value >= 300, parseInt(money.value / 10)]; // 是否通关、奖励
  }

  // 天赋生效
  const effectTalents = () => {
    talents.value
      .filter((v) => v.checked)
      .forEach((talent) => {
        switch (talent.value) {
          case "talent-intelligence":
            wisdom.value += 15;
            break;
          case "big-hourse":
            money.value += 50;
            break;
          case "reading-focus":
            wisdomAddBase *= 1.5;
            break;
          case "earning-efficiency":
            earnMoneyRate *= 1.15;
            break;
        }
      });
  };

  return {
    ...talent,
    effectTalents,
    money,
    wisdom,
    dayLimit,
    study,
    work,
    consum,
    check,
  };
}
