import { ref } from "vue";

export default function useStore() {
  const dataPool = ref(JSON.parse(localStorage.getItem("data-pool") || "{}"));

  const set = function (data) {
    const newValue = { ...dataPool.value, ...data };
    dataPool.value = newValue;
    localStorage.setItem("data-pool", JSON.stringify(newValue));
  };
  const get = function (key) {
    return dataPool.value[key];
  };

  return {
    set,
    get,
  };
}
