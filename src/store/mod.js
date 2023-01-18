import { defineStore } from "utils/pinia";
import { computed, reactive, toRefs, ref } from "vue";
import Local from "utils/local";
import Obj from "utils/obj";

export const useModStore = defineStore('mod',()=>{
  const dataPool = ref(Local.get("data-pool"));

  // 设置合并 支持对象/不定参
  const set = function (...data) {
    // 对象
    if (data.length === 1 && typeof data[0] === "object") {
      const val = Obj.merge(dataPool.value, data[0]);
      dataPool.value = val;
      Local.set("data-pool", val);
      return val;
    }
    // 不定参
    if (data.length > 1) {
      const nVal = data[data.length - 1];
      const keys = data.slice(0, -1);
      // 倒着组装
      let val = nVal;
      for (let i = keys.length - 1; i >= 0; i--) {
        val = { [keys[i]]: val };
      }
      // 合并
      val = Obj.merge(dataPool.value, val);
      // 赋值
      dataPool.value = val;
      Local.set("data-pool", val);
      return val;
    }
  };
  // 读取 支持不定参
  const get = function (...keys) {
    let val;
    keys.forEach((key) => {
      val = (val || dataPool.value)?.[key];
    });
    return val;
  };
  // 增加 支持不定参
  const increase = function (...keysAndNum) {
    const num = keysAndNum[keysAndNum.length - 1];
    const keys = keysAndNum.slice(0, -1);
    if (typeof num !== "number") {
      return;
    }

    const val = get(...keys) || 0;
    const nVal = val + num;
    set(...keys, nVal);
    return nVal;
  };
  // 清除
  const clear = (flag) => {
    if (flag) {
      dataPool.value = {};
      Local.set("data-pool", {});
    } else {
      const val = { keep: get("keep") };
      dataPool.value = val;
      Local.set("data-pool", val);
    }
  };

  return {
    set,
    get,
    increase,
    clear,
  };
})

/* export const useStore = defineStore('mian',()=>{
  const state = reactive({a:1})
  const double = computed(()=>{
    return state.a*2
  })
  const add = (num)=> state.a +=num
  return { ...toRefs(state),double,add }
}) */

/* import { defineStore } from "utils/pinia";
export const useStore = defineStore({
  id: "main",
  state: () => {
    return {
      a: 1,
    };
  },
  getters: {
    double: (store) => {
      return store.a * 2;
    },
  },
  actions: {
    add(num) {
      this.a += 1;
    },
  },
}); */