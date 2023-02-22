import { ref, reactive } from "vue";
import type { MenuType } from "@/components/MenuType";

export default (Base) =>
  class extends Base {
    // 检查固定事件
    checkFixedEvent = () => {
      this.fixedEvents
        .filter((v) => this.now % v.commonFactor === 0)
        .forEach((v) => this.runMenu(v));
    };
    // 执行菜单
    runMenu = (menu) => {
      this.records.value.push({ day: this.now, text: menu.desc });
      this.now += menu.duration;
      this[menu.callback](menu.params);
    };
    // 天数检查 返true继续执行
    checkDay = () => {
      if (this.now > this.dayLimit) {
        const [pass, reward] = this.check();
        this.store.increase("keep", "currency", reward);
        this.records.value.push({
          time: "",
          text: `你${pass ? "通关了" : "没通关"}，获得了${reward}￥`,
        });
        this.menus.length = 0;
        this.menus.push({ label: "结束转生", callback: "endLife" });
      }
      return this.now <= this.dayLimit;
    };
    // 点击菜单项
    clickMenuItem = (menu) => {
      this.checkFixedEvent();
      this.runMenu(menu);
      const flag = this.checkDay();
      // this.scrollToBottom();
      flag && this.deposit();
    };
  };
