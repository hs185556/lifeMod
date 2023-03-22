export default {
  arrayItems: (arr, num) => {
    // 不改变原数组
    const myArr = JSON.parse(JSON.stringify(arr));
    const rs = [];
    for (let idx = 0; idx < num; idx++) {
      const rIdx = Math.floor(Math.random() * myArr.length);
      rs.push(myArr[rIdx]);
      myArr.splice(rIdx, 1);
    }
    return rs.filter(v => v);
  },
};
