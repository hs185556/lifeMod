export default {
  get: (key) => {
    return JSON.parse(localStorage.getItem(key) || "{}");
  },
  set: (key, val) => {
    localStorage.setItem(key, JSON.stringify(val));
  },
};
