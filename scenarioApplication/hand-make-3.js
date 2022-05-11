// fibonacci
// 递归
function fn(n) {
  if (n == 0) return 0;
  if (n == 1) return 1;
  return fn(n - 2) + fn(n - 1);
}
// 优化
function fibonacci2(n) {
  const arr = [1, 1, 2];
  const arrLen = arr.length;

  if (n <= arrLen) {
    return arr[n];
  }

  for (let i = arrLen; i < n; i++) {
    arr.push(arr[i - 1] + arr[i - 2]);
  }

  return arr[arr.length - 1];
}
// 非递归
function fn(n) {
  let pre1 = 1;
  let pre2 = 1;
  let current = 2;

  if (n <= 2) {
    return current;
  }

  for (let i = 2; i < n; i++) {
    pre1 = pre2;
    pre2 = current;
    current = pre1 + pre2;
  }

  return current;
}

// longest common substring
var lengthOfLongestSubstring = function (s) {
  let map = new Map();
  let i = -1;
  let res = 0;
  let n = s.length;
  for (let j = 0; j < n; j++) {
    if (map.has(s[j])) {
      i = Math.max(i, map.get(s[j]));
    }
    res = Math.max(res, j - i);
    map.set(s[j], j);
  }
  return res;
};

// hand-make setInterval by setTimeout
function mySetInterval(fn, timeout) {
  var timer = { flag: true };
  function interval() {
    if (timer.flag) {
      fn();
      setTimeout(interval, timeout);
    }
  }
  setTimeout(interval, timeout);
  return timer;
}

// hand-make jsonp
function addScript(src) {
  const script = document.createElement("script");
  script.src = src;
  script.type = "text/javascript";
  document.body.appendChild(script);
}
addScript("http://localhost:3000/jsonp?callback=handleRes");
function handleRes(res) {
  console.log(res);
}
handleRes({ a: 1, b: 2 });

// is cycle object
const isCycleObject = (obj, parent) => {
  const parentArr = parent || [obj];
  for (let i in obj) {
    if (typeof ob[i] === "object") {
      let flag = false;
      parentArr.forEach((pObj) => {
        if (pObj === obj[i]) {
          flag = true;
        }
      });
      if (flag) return true;
      flag = isCycleObject(obj[i], [...parentArr, obj[i]]);
      if (flag) return true;
    }
  }
  return false;
};
