import { ref } from "vue";

export default (Base) =>
  class extends Base {
    rename = (menu, name) => {
      this.name.value = name;
      this.energy.value -= menu.energy;
      return name;
    };
    chat = (menu) => {
      this.temperature.value = Number(
        (
          this.temperature.value + Math.max(0.1 * this.temperature.value, 0.1)
        ).toFixed(1)
      );
      this.energy.value -= menu.energy;
      const rList = [
        { value: 1, respond: "极度冷淡" },
        { value: 10, respond: "不冷不热" },
        { value: 50, respond: "特别热情" },
      ];
      return (rList.find((x) => this.temperature.value >= x.value) || rList[0])
        .respond;
    };
    patHead = (menu) => {
      this.temperature.value = Number(
        (
          this.temperature.value + Math.max(0.1 * this.temperature.value, 0.1)
        ).toFixed(1)
      );
      this.energy.value -= menu.energy;
      const rList = [
        { value: 1, respond: "极度冷淡" },
        { value: 10, respond: "不冷不热" },
        { value: 50, respond: "特别热情" },
      ];
      return (rList.find((x) => this.temperature.value >= x.value) || rList[0])
        .respond;
    };
    eat = (menu) => {
      if (this.hungry.value != 0) {
        this.temperature.value = Number(
          (
            this.temperature.value + Math.max(0.1 * this.temperature.value, 0.1)
          ).toFixed(1)
        );
        this.hungry.value -= this.hungry.value >= 30 ? 30 : this.hungry.value;
        this.energy.value -= menu.energy;
      }
      const rList = [
        { value: 0, respond: "她说她吃饱了" },
        { value: 30, respond: "她不紧不慢的吃了一点" },
        { value: 60, respond: "她很积极的来吃饭了" },
        { value: 90, respond: "她吃得狼吞虎咽" },
      ];
      return (rList.find((x) => this.hungry.value >= x.value) || rList[0])
        .respond;
    };
    bath = (menu) => {
      if (this.dirty.value != 0) {
        this.temperature.value = Number(
          (
            this.temperature.value + Math.max(0.1 * this.temperature.value, 0.1)
          ).toFixed(1)
        );
        this.dirty.value -= this.dirty.value >= 30 ? 30 : this.dirty.value;
        this.energy.value -= menu.energy;
      }
      const rList = [
        { value: 0, respond: "她说不想洗澡" },
        { value: 30, respond: "她不紧不慢的洗澡" },
        { value: 60, respond: "她很积极的来洗澡了" },
        { value: 90, respond: "她洗得迫不及待" },
      ];
      return (rList.find((x) => this.dirty.value >= x.value) || rList[0])
        .respond;
    };
    sleep = (menu) => {
      if (this.energy.value >= 100) {
        return "她现在不想睡觉";
      }
      this.energy.value -= menu.energy;
      this.energy.value = Math.min(this.energy.value + 80, 100);
      return "她去睡觉了";
    };
  };
