import { ref, reactive } from "vue";
import type { MenuType } from "@/components/MenuType";

export default (Base) =>
  class extends Base {
    // 菜单
    menus = reactive<MenuType[]>(
      this.store.get("run", "menus") || [
        { label: "修改名字", desc: `你决定将${this.name}改名为：`, duration: 0, energy: 1, callback: "rename", prompt: true },
        { label: "搭讪", desc: `你跟${this.name}聊天，她对你`, duration: 0.1, energy: 5, callback: "chat" },
        { label: "摸头", desc: `你摸了摸${this.name}的头，她对你`, duration: 0.01, energy: 5, callback: "patHead" },
        { label: "吃饭", desc: `你叫${this.name}来吃饭，`, duration: 0.1, energy: 10, callback: "eat" },
        { label: "洗澡", desc: `你让${this.name}洗澡，`, duration: 0.1, energy: 10, callback: "bath" },
        { label: "睡觉", desc: `对于睡觉这件事，`, duration: 0.3, energy: 0, callback: "sleep" },
        { label: "结束", desc: `你确定结束游戏吗`, duration: 0, callback: "finish", confirm: true },
      ]
    );
    // 固定事件
    fixedEvents: MenuType[] = reactive(
      this.store.get("run", "fixedEvents") || [
        { label: "睡觉", desc: `对于睡觉这件事，`, duration: 0.3, energy: 0, callback: "sleep", /* params: undefined, */ range: "1-0.3", },
      ]
    );
  };
