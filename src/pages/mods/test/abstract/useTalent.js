import { ref } from "vue";
import Random from 'utils/random';

export default function useTalent() {
  // 天赋数量上限
  const maxTalentNum = 2;
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
    talents.value = Random.arrayItems(talentPool, 3);
  };

  // 初始化
  drawTalents();

  return {
    maxTalentNum,
    talents,
    drawTalents,
  };
}
