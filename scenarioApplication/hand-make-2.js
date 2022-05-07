// find the most word
function findMostWord(article) {
  // 合法性判断
  if (!article) return;
  // 参数处理
  article = article.trim().toLowerCase();
  let wordList = article.match(/[a-z]+/g),
    visited = [],
    maxNum = 0,
    maxWord = "";
  article = " " + wordList.join("  ") + " ";
  // 遍历判断单词出现次数
  wordList.forEach(function (item) {
    if (visited.indexOf(item) < 0) {
      // 加入 visited
      visited.push(item);
      let word = new RegExp(" " + item + " ", "g"),
        num = article.match(word).length;
      if (num > maxNum) {
        maxNum = num;
        maxWord = item;
      }
    }
  });
  return maxWord + "  " + maxNum;
}

// async fetch
(async () => {
  class HttpRequestUtil {
    async get(url) {
      const res = await fetch(url);
      const data = await res.json();
      return data;
    }
    async post(url, data) {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      return result;
    }
    async put(url, data) {
      const res = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify(data),
      });
      const result = await res.json();
      return result;
    }
    async delete(url, data) {
      const res = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify(data),
      });
      const result = await res.json();
      return result;
    }
  }
  const httpRequestUtil = new HttpRequestUtil();
  const res = await httpRequestUtil.get("http://golderbrother.cn/");
  console.log(res);
})();

// extends by prototype
//父方法
function SupperFunction(flag1) {
  this.flag1 = flag1;
}

//子方法
function SubFunction(flag2) {
  this.flag2 = flag2;
}

//父实例
var superInstance = new SupperFunction(true);

//子继承父
SubFunction.prototype = superInstance;

//子实例
var subInstance = new SubFunction(false);
//子调用自己和父的属性
subInstance.flag1;
subInstance.flag2;

// two side bind
let obj = {};
let input = document.getElementById("input");
let span = document.getElementById("span");
// 数据劫持
Object.defineProperty(obj, "text", {
  configurable: true,
  enumerable: true,
  get() {
    console.log("获取数据了");
  },
  set(newVal) {
    console.log("数据更新了");
    input.value = newVal;
    span.innerHTML = newVal;
  },
});
// 输入监听
input.addEventListener("keyup", function (e) {
  obj.text = e.target.value;
});

// router
class Route {
  constructor() {
    // 路由存储对象
    this.routes = {};
    // 当前hash
    this.currentHash = "";
    // 绑定this，避免监听时this指向改变
    this.freshRoute = this.freshRoute.bind(this);
    // 监听
    window.addEventListener("load", this.freshRoute, false);
    window.addEventListener("hashchange", this.freshRoute, false);
  }
  // 存储
  storeRoute(path, cb) {
    this.routes[path] = cb || function () {};
  }
  // 更新
  freshRoute() {
    this.currentHash = location.hash.slice(1) || "/";
    this.routes[this.currentHash]();
  }
}
