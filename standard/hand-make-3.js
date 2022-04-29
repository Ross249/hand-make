// hand-make call
Function.prototype.myCall = function (context) {
  if (typeof this != "function") {
    console.error("not a function");
  }

  let args = [...arguments].slice(1),
    result = null;
  context = context || window;
  context.fn = this;
  result = context.fn(...args);
  delete context.fn;
  return result;
};

// hand-make apply
Function.prototype.myApply = function (context) {
  if (typeof this != "function") {
    throw new TypeError("not a function");
  }
  let result = null;
  context = context || window;
  context.fn = this;
  if (arguments[1]) {
    result = context.fn(...arguments[1]);
  } else {
    result = context.fn();
  }
  delete context.fn;
  return result;
};

// hand-make bind
Function.prototype.myBind = function (context) {
  if (typeof this !== "function") {
    throw new TypeError("not a function");
  }

  var args = [...arguments].slice(1),
    fn = this;
  return function Fn() {
    return fn.apply(
      this instanceof Fn ? this : context,
      args.concat([...arguments])
    );
  };
};

// curry
function curry(fn, args) {
  let length = fn.length;

  args = args || [];

  return function () {
    let subArgs = args.slice(0);
    for (let i = 0; i < arguments.length; i++) {
      subArgs.push(arguments[i]);
    }

    if (subArgs.length >= length) {
      return fn.apply(null, subArgs);
    } else {
      return curry.call(this, fn, subArgs);
    }
  };
}
// es6
function curry(fn, ...args) {
  return fn.length <= args.length ? fn(...args) : curry.bind(null, fn, ...args);
}

// hand-make ajax
const SERVER_URL = "/server";
let xhr = new XMLHttpRequest();
xhr.open("GET", SERVER_URL, true);
xhr.onreadystatechange = function () {
  if (this.readyState !== 4) return;
  if (this.status === 200) {
    handle(this.response);
  } else {
    console.error(this.statusText);
  }
};

xhr.onerror = function () {
  console.error(this.statusText);
};
xhr.responseType = "json";
xhr.setRequestHeader("Accept", "application/json");
xhr.send(null);
