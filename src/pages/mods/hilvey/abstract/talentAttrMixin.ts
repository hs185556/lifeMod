import { ref } from "vue";

export default (Base) =>
  class extends Base {
    // 天赋数量上限
    maxTalentNum = 2;
    // 已选天赋数
    checkedTalentNum = ref(0);
    // 天赋池
    talentPool = [
      /* {
        label: "天资聪颖",
        value: "talent-intelligence",
        desc: "初始智慧+15",
        checked: 0,
      }, */
    ];
    // 抽取的天赋
    talents = ref([]);
  };
