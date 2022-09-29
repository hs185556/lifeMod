import { ref } from "vue";
import Local from "./Local";

export default function useStore() {
  const dataPool = ref(Local.get("data-pool"));

  // 设置
  const set = function (data) {
    const val = { ...dataPool.value, ...data };
    dataPool.value = val;
    Local.set("data-pool", val);
  };
  // 读取
  const get = function (key) {
    return dataPool.value[key];
  };
  // 增加
  const increase = function (key, num) {
    const val = (dataPool.value[key] || 0) + num;
    const tDataPool = {
      ...dataPool.value,
      [key]: val,
    };
    dataPool.value = tDataPool;
    Local.set("data-pool", tDataPool);
    return val;
  };

  return {
    set,
    get,
    increase,
  };
}
