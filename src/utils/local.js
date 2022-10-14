export default {
  get: (key) => {
    const item = localStorage.getItem(key);
    return JSON.parse(item?.startsWith("{") ? item : "{}")
  },
  set: (key, val) => {
    localStorage.setItem(key, JSON.stringify(val));
  },
};
