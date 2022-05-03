// repeat
function repeat(s, n) {
  return new Array(n + 1).join(s);
}
// or
function repeat(s, n) {
  return n > 0 ? s.concat(repeat(s, --n)) : "";
}

// reverse
String.prototype._reverse = function (a) {
  return a.split("").reverse().join("");
};

// format number like 1,000,000
let format = (n) => {
  let num = n.toString();
  let decimals = "";
  num.indexOf(".") > -1 ? (decimals = num.split(".")[1]) : decimals;
  let len = num.length;
  if (len <= 3) {
    return num;
  } else {
    let temp = "";
    let remainder = len % 3;
    decimals ? (temp = "." + decimals) : temp;
    if (remainder > 0) {
      return (
        num.slice(0, remainder) +
        "," +
        num.slice(remainder, len).match(/\d{3}/g).join(",") +
        temp
      );
    } else {
      return num.slice(0, len).match(/\d{3}/g).join(",") + temp;
    }
  }
};

// sum big number
function sumBigNumber(a, b) {
  let res = "";
  let temp = 0;
  a = a.split("");
  b = b.split("");
  while (a.length || b.length || temp) {
    temp += ~~a.pop() + ~~b.pop();
    res = (temp % 10) + res;
    temp = temp > 9;
  }
  return res.replace(/^0+/, "");
}

// currying
var add = function (m) {
  var temp = function (n) {
    return add(m + n);
  };
  temp.toString = function () {
    return m;
  };
  return temp;
};
// or
function add(...args) {
  return args.reduce((a, b) => a + b);
}
function currying(fn) {
  let args = [];
  return function temp(...newArgs) {
    if (newArgs.length) {
      args = [...args, ...newArgs];
      return temp;
    } else {
      let val = fn.apply(this, args);
      args = [];
      return val;
    }
  };
}
let addCurry = currying(add);

// turn arraylike to array
Array.prototype.slice.call(arraylike);
// or
Array.from(arraylike);
// or
Array.prototype.splice.call(arraylike, 0);
// or
Array.prototype.concat.apply([], arraylike);

// sum by reduce
arr.reduce((prev, cur) => {
  return prev + cur;
}, 0);
// or
arr.flat(Infinity).reduce((prev, cur) => {
  return prev + cur;
}, 0);
// or
arr.reudce((prev, cur) => {
  return prev + cur["a"];
}, 0);
