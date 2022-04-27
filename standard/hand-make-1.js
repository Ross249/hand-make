// Object.create
function create(obj) {
  function F() {}
  F.prototype = obj;
  return new F();
}

// instanceof
function myInstanceOf(left, right) {
  let proto = Object.getPrototypeOf(left),
    prototype = right.prototype;

  while (true) {
    if (!proto) return false;
    if (proto === prototype) return true;
    proto = Object.getPrototypeOf(proto);
  }
}

// hand-make new
function objectFactory() {
  let newObject = null;
  let constructor = Array.prototype.shift.call(arguments);

  let res = null;

  if (typeof constructor !== "function") {
    console.error("type error");
    return;
  }

  newObject = Object.create(constructor.prototype);
  res = constructor.apply(newObject, arguments);
  let flag = res && (typeof res === "object" || typeof res === "function");
  return flag ? res : newObject;
}

// hand-make Promise
const PENDING = "pending";
const RESOLVED = "resolved";
const REJECTED = "rejected";

function MyPromise(fn) {
  var self = this;
  this.state = PENDING;
  this.value = null;
  this.resolvedCallbacks = [];
  this.rejectedCallbacks = [];
  function resolve(value) {
    if (value instanceof MyPromise) {
      return value.then(resolve, reject);
    }
    setTimeout(() => {
      if (self.state === PENDING) {
        self.state = RESOLVED;
        self.value = value;
        self.resolvedCallbacks.forEach((callback) => {
          callback(value);
        });
      }
    }, 0);
  }

  function reject(value) {
    // 保证代码的执行顺序为本轮事件循环的末尾
    setTimeout(() => {
      // 只有状态为 pending 时才能转变
      if (self.state === PENDING) {
        // 修改状态
        self.state = REJECTED;

        // 设置传入的值
        self.value = value;

        // 执行回调函数
        self.rejectedCallbacks.forEach((callback) => {
          callback(value);
        });
      }
    }, 0);
  }
  // 将两个方法传入函数执行
  try {
    fn(resolve, reject);
  } catch (e) {
    // 遇到错误时，捕获错误，执行 reject 函数
    reject(e);
  }
}

MyPromise.prototype.then = function (onResolved, onRejected) {
  onResolved = typeof onResolved === "function" ? onResolved : (value) => value;
  onRejected =
    typeof onRejected === "function"
      ? onRejected
      : (value) => {
          throw value;
        };
  if (this.state === PENDING) {
    this.resolvedCallbacks.push(onResolved);
    this.rejectedCallbacks.push(onRejected);
  }
  if (this.state === RESOLVED) {
    onResolved(this.value);
  }
  if (this.state === REJECTED) {
    onRejected(this.value);
  }
};

// hand-make Promise.then
function then(onFulfilled, onRejected) {
  const self = this;
  return new MyPromise((resolve, reject) => {
    let fulfilled = () => {
      try {
        const res = onFulfilled(self.value);
        return res instanceof MyPromise
          ? res.then(resolve, reject)
          : resolve(res);
      } catch (e) {
        return reject(e);
      }
    };
    let rejected = () => {
      try {
        const res = onRejected(self.value);
        return res instanceof MyPromise
          ? res.then(resolve, reject)
          : reject(res);
      } catch (e) {
        return reject(e);
      }
    };
    switch (self.status) {
      case PENDING:
        self.onFulfilledCallbacks.push(fulfilled);
        self.onRejectedCallbacks.push(rejected);
        break;
      case RESOLVED:
        fulfilled();
        break;
      case REJECTED:
        rejected();
        break;
    }
  });
}
