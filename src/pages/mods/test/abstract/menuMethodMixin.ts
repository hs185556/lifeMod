import { ref, reactive } from "vue";
import type { MenuType } from "@/components/MenuType";

export default (Base) =>
  class extends Base {
    // 检查固定事件
    checkFixedEvent = () => {
      this.fixedEvents
        .filter((v) => this.now % v.commonFactor === 0)
        .forEach((v) => this.confirmMenu(v));
    };
    // 菜单确认
    confirmMenu = (menu) => {
      if (menu.confirm) {
        this.confirm(`确定要${menu.label}吗？`, () => {
          this.runMenu(menu);
        })
        return;
      }

      this.runMenu(menu);
    }
    // 执行菜单
    runMenu = (menu) => {
      if (!menu.desc) {
        this[menu.callback](menu.params);
        return;
      }

      this.records.value.push({ day: this.now, text: menu.desc });
      this.now += menu.duration;
      this[menu.callback](menu.params);
    };
    // 点击菜单项
    clickMenuItem = (menu) => {
      this.checkFixedEvent();
      this.confirmMenu(menu);
      this.deposit();
    };
  };
