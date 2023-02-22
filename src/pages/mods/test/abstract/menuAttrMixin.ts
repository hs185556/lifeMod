import { ref, reactive } from "vue";
import type { MenuType } from "@/components/MenuType";

export default (Base) =>
  class extends Base {
    // 菜单
    menus = reactive<MenuType[]>(
      this.store.get("run", "menus") || [
        {
          label: "分类1",
          children: [
            { label: "学习", desc: "你学习了2天", duration: 2, callback: "study" },
          ],
        },
        { label: "工作", desc: "你工作了1天", duration: 1, callback: "work" },
        { label: "结束转生", desc: "" , duration: 0, callback: "endLife", confirm: true }
      ]
    );
    // 固定事件
    fixedEvents: MenuType[] = reactive(
      this.store.get("run", "fixedEvents") || [
        {
          label: "吃大餐",
          desc: "你周末去吃大餐，消费了3￥",
          duration: 0,
          callback: "consum",
          params: 3,
          commonFactor: 7,
        },
      ]
    );
  };
