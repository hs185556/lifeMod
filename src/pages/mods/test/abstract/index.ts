import { inject } from "vue";
import { modAchievements } from "pages/mods/constant";
import { useModStore } from 'store/mod';
import useAbstract from "./useAbstract";

export default function useAchievement() {
  const abstract = useAbstract();
  const { money, wisdom } = abstract;

  const store = useModStore();
  const mod = store.get("mod");
  // 已有成就
  const achievement = store.get("keep", "achievement") || {};
  // 当前模板成就
  const achievements = modAchievements[mod] || [];

  // 达成成就
  const reachAchievements = () => {
    const list = [];
    achievements.forEach((element) => {
      switch (element.value) {
        case "wisdomAndMoney":
          if (money.value >= 400 && wisdom.value >= 100) {
            list.push(element.value);
          }
          break;
        case "supperrich":
          if (money.value >= 600) {
            list.push(element.value);
          }
          break;
      }
    });
    store.set("keep", "achievement", "test", Array.from(
      new Set([...list, ...(achievement[mod] || [])])
    ));
  };

  return {
    ...abstract,
    reachAchievements,
  };
}
