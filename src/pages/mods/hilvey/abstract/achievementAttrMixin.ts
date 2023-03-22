import { ref } from "vue";
import { modAchievements } from "pages/mods/constant";

export default (Base) =>
  class extends Base {
    // 已有成就
    achievement = this.store.get("keep", "achievement") || {};
    // 当前模板成就
    achievements = modAchievements[this.mod] || [];
  };
