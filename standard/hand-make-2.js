// hand-make promise.all
function promiseAll(promise) {
  return new Promise(function (resolve, reject) {
    if (!Array.isArray(promise)) {
      throw new TypeError("promiseAll: argument is not an array");
    }
    var resolveCount = 0;
    var promiseNum = promise.length;
    var resolveResult = [];
    for (let i = 0; i < promiseNum; i++) {
      Promise.resolve(promise[i]).then(
        (value) => {
          resoledCount++;
          resolveResult[i] = value;
          if (resolvedCount === promiseNum) {
            return resolve(resolveResult);
          }
        },
        (error) => {
          return reject(error);
        }
      );
    }
  });
}
// test
let p1 = new Promise(function (resolve, reject) {
  setTimeout(function () {
    resolve(1);
  }, 1000);
});
let p2 = new Promise(function (resolve, reject) {
  setTimeout(function () {
    resolve(2);
  }, 2000);
});
let p3 = new Promise(function (resolve, reject) {
  setTimeout(function () {
    resolve(3);
  }, 3000);
});
promiseAll([p3, p1, p2]).then((res) => {
  console.log(res); // [3, 1, 2]
});

// hand-make promise.race
Promise.race = function (args) {
  return new Promise((resolve, reject) => {
    for (let i = 0, len = args.length; i < len; i++) {
      args[i].then(resolve, reject);
    }
  });
};

// debounce
function debounce(fn, wait) {
  let timer = null;
  return function () {
    let context = this,
      args = arguments;

    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    timer = setTimeout(() => {
      fn.apply(context, args);
    }, wait);
  };
}

// throttle
function throttle(fn, delay) {
  let curTime = Date.now();
  return function () {
    let context = this,
      args = arguments,
      nowTime = Date.now();
    if (nowTime - curTime >= delay) {
      curTime = Date.now();
      return fn.apply(context, args);
    }
  };
}

// typeof
function getType(value) {
  if (value === null) {
    return value + "";
  }
  if (typeof value === "object") {
    let valueClass = Object.prototype.toString.call(value),
      type = valueClass.split(" ")[1].split(" ");
    type.pop();
    return type.join(" ").toLowerCase();
  } else {
    return typeof value;
  }
}
