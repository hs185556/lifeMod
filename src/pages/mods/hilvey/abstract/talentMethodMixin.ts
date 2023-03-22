import { ref } from "vue";
import Random from "utils/random";

export default (Base) =>
  class extends Base {
    constructor() {
      super();
      this.drawTalents();
    }

    // 抽取天赋
    drawTalents = () => {
      this.checkedTalentNum.value = 0;
      this.talents.value = Random.arrayItems(this.talentPool, 3);
    };
    // 选择/取消天赋
    toggleTalent = (idx) => {
      const talent = this.talents.value[idx];
      if (talent.checked) {
        // 取消勾选
        this.checkedTalentNum.value--;
        talent.checked = 0;
      } else {
        if (this.checkedTalentNum.value >= this.maxTalentNum) {
          this.message.warning("天赋数上限");
          return;
        }
        // 勾选
        this.checkedTalentNum.value++;
        talent.checked = 1;
      }
    };
    // 天赋生效
    effectTalents = () => {
      /* this.talents.value
        .filter((v) => v.checked)
        .forEach((talent) => {
          switch (talent.value) {
            case "talent-intelligence":
              this.wisdom.value += 15;
              break;
          }
        }); */
    };
    // 重新抽取天赋
    reDrawTalents = () => {
      this.drawTalents();
    };
  };
