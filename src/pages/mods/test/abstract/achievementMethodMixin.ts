export default (Base) =>
  class extends Base {
    // 达成成就
    reachAchievements = () => {
      const list = [];
      this.achievements.forEach((element) => {
        switch (element.value) {
          case "wisdomAndMoney":
            if (this.money.value >= 400 && this.wisdom.value >= 100) {
              list.push(element.value);
            }
            break;
          case "supperrich":
            if (this.money.value >= 600) {
              list.push(element.value);
            }
            break;
        }
      });
      this.store.set("keep", "achievement", "test", Array.from(
        new Set([...list, ...(this.achievement[this.mod] || [])])
      ));
    };
  };
