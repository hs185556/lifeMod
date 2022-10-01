import { ref, inject } from "vue";
import Random from "utils/random";

export default function useTalent() {
  const message = inject("message");

  // 天赋数量上限
  const maxTalentNum = 2;
  // 已选天赋数
  const checkedTalentNum = ref(0);
  // 天赋池
  const talentPool = [
    {
      label: "天资聪颖",
      value: "talent-intelligence",
      desc: "初始智慧+15",
      checked: 0,
    },
    { label: "高门大户", value: "big-hourse", desc: "初始财富+50", checked: 0 },
    {
      label: "阅读专注",
      value: "reading-focus",
      desc: "学习效率提高50%",
      checked: 0,
    },
    {
      label: "生财有道",
      value: "earning-efficiency",
      desc: "赚钱效率提高15%",
      checked: 0,
    },
  ];
  // 抽取的天赋
  const talents = ref([]);
  // 抽取天赋
  const drawTalents = () => {
    checkedTalentNum.value = 0;
    talents.value = Random.arrayItems(talentPool, 3);
  };

  // 选择/取消天赋
  const toggleTalent = (idx) => {
    const talent = talents.value[idx];
    if (talent.checked) {
      // 取消勾选
      checkedTalentNum.value--;
      talent.checked = 0;
    } else {
      if (checkedTalentNum.value >= maxTalentNum) {
        message.warning("选择数量达到上限");
        return;
      }
      // 勾选
      checkedTalentNum.value++;
      talent.checked = 1;
    }
  };

  // 初始化
  drawTalents();

  return {
    maxTalentNum,
    checkedTalentNum,
    talents,
    toggleTalent,
    drawTalents,
  };
}
