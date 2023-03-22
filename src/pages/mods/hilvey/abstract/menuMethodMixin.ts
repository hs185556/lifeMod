import { ref, reactive } from "vue";
import type { MenuType } from "@/components/MenuType";

export default (Base) =>
  class extends Base {
    // 检查固定事件
    checkFixedEvent = () => {
      this.fixedEvents
        .filter((v) => {
          const [factor, offset] = v.range.split("-");
          return this.now.value % Number(factor) <= Number(offset);
        })
        .forEach((v) => this.popup(v));
    };
    // 三种弹出窗，confirm、prompt
    popup = (menu) => {
      if (menu.confirm) {
        const rs = confirm(`确定要${menu.label}吗？`);
        rs && this.runMenu(menu);
        return;
      }
      if (menu.prompt) {
        const rs = prompt(menu.desc);
        rs && this.runMenu(menu, rs);
        return;
      }

      this.runMenu(menu);
    };
    // 执行菜单
    runMenu = (menu, params?) => {
      if (this.energy.value === 0 && menu.label != "睡觉") {
        return "她现在太疲劳了";
      }
      if (!menu.desc) {
        this[menu.callback](menu, menu.params || params);
        return;
      }
      this.now.value = Number((this.now.value + menu.duration).toFixed(2));
      const respond = this[menu.callback](menu, menu.params || params);
      this.records.value.push({
        day: this.now.value,
        text: menu.desc + (respond ? respond : ""),
      });
    };
    // 点击菜单项
    clickMenuItem = (menu) => {
      this.checkFixedEvent();
      this.popup(menu);
      this.deposit();
    };
    // 存储到本地
    deposit = () => {
      // T1 set方法再优化下，支持对象
      this.store.set("run", "menus", this.menus);
      this.store.set("run", "records", this.records.value.slice(-3));
      this.store.set("run", "now", this.now.value);

      this.store.set("abstract", "name", this.name.value);
      this.store.set("abstract", "temperature", this.temperature.value);
      this.store.set("abstract", "hungry", this.hungry.value);
      this.store.set("abstract", "dirty", this.dirty.value);
      this.store.set("abstract", "energy", this.energy.value);
    };
  };
