import {
  effectScope,
  getCurrentInstance,
  inject,
  reactive,
  toRefs,
  computed,
} from "vue";
import { SymbolPinia } from "@/symbol";

export function defineStore(idOrOptions, setup) {
  // 第一个参数可能是id，或者对象
  let id;
  let options;

  if (typeof idOrOptions === "string") {
    id = idOrOptions;
    options = setup;
  } else {
    options = idOrOptions;
    id = idOrOptions.id;
  }

  const isSetupStore = typeof setup === "function";

  function useStore() {
    // 获取当前vue运行的实例
    const currentInstance = getCurrentInstance();
    const pinia = currentInstance && inject(SymbolPinia);
    // 如果实例存在,用inject注册到当前实例上

    if (!pinia._s.has(id)) {
      // 判断当前store上面有没有已经注册过的id
      if (isSetupStore) {
        createSetupStore(id, setup, pinia);
      } else {
        createOptionsStore(id, options, pinia);
      }
    }
    const store = pinia._s.get(id);
    return store;
  }
  return useStore;
}

function createSetupStore(id, setup, pinia) {
  const store = reactive({});
  let scope;
  const setupStore = pinia._e.run(() => {
    scope = effectScope();
    return scope.run(() => setup());
  });
  function warpAction(name, action) {
    return function () {
      // 触发action
      let ret = action.apply(store, arguments);
      return ret;
    };
  }
  for (let key in setupStore) {
    const prop = setupStore[key];
    if (typeof prop === "function") {
      // 解决 action中this的问题  解构赋值时候,this会改变
      // const counter = useStore()
      // const {add} = counter
      // const counterAdd = (num)=>{
      //   add(num)
      // }
      setupStore[key] = warpAction(key, prop);
    }
  }
  //   把当前的setupStore 合并到reactive里面,确保是一个响应式
  Object.assign(store, setupStore);
  pinia._s.set(id, store);
  return store;
}

function createOptionsStore(id, options, pinia) {
  let { state, getters, actions } = options;

  let scope;

  const store = reactive({});

  function setup() {
    // pinia.state是一个ref 要用value接受值
    pinia.state.value[id] = state ? state() : {};
    //  localState 的值要转换响应式，否则getter不能响应
    const localState = toRefs(pinia.state.value[id]);
    return Object.assign(
      localState,
      actions,
      Object.keys(getters || {}).reduce((computedCetters, name) => {
        computedCetters[name] = computed(() => {
          // 获取当前的store
          return getters[name].call(store, store);
        });
        return computedCetters;
      }, {})
    );
  }

  const setupStore = pinia._e.run(() => {
    scope = effectScope();
    return scope.run(() => setup());
  });

  function warpAction(name, action) {
    return function () {
      // 触发action
      let ret = action.apply(store, arguments);
      return ret;
    };
  }

  for (let key in setupStore) {
    const prop = setupStore[key];
    if (typeof prop === "function") {
      // 解决 action中this的问题  解构赋值时候,this会改变
      // const counter = useStore()
      // const {add} = counter
      // const counterAdd = (num)=>{
      //   add(num)
      // }
      // 这个写法 绕过了vue更改不生效 的坑
      setupStore[key] = warpAction(key, prop);
    }
  }

  // 把当前的setupStore 合并到reactive里面,确保是一个响应式
  Object.assign(store, setupStore);

  pinia._s.set(id, store);
}
