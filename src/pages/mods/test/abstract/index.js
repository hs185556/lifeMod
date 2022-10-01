import { ref } from "vue";
import useTalent from "./useTalent";

export default function useAbstract() {
  const { maxTalentNum, checkedTalentNum, talents, toggleTalent, drawTalents } =
    useTalent();

  // 金钱
  const money = ref(0);
  // 智慧
  const wisdom = ref(0);
  // 天数限制
  const dayLimit = 30;
  // 智慧增长基数
  let wisdomAddBase = 4;
  // 赚钱速率
  let earnMoneyRate = 1;

  // 学习
  function study() {
    wisdom.value += Math.floor(wisdomAddBase);
  }
  // 工作
  function work() {
    // (基本工资 + 智慧加成) * 金钱倍率
    money.value += Math.floor((2 + wisdom.value * 0.5) * earnMoneyRate);
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
    money,
    wisdom,
    dayLimit,
    maxTalentNum,
    checkedTalentNum,
    talents,
    toggleTalent,
    drawTalents,
    effectTalents,
    study,
    work,
    check,
  };
}
