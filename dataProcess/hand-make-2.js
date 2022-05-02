// unique array
Array.from(new Set(arr));
function uniqueArray(array) {
  let map = {};
  let res = [];
  for (var i = 0; i < array.length; i++) {
    if (!map.hasOwnProperty([array[i]])) {
      map[array[i]] = 1;
      res.push(array[i]);
    }
  }
  return res;
}

// hand make flat
function _flat(arr, depth) {
  if (!Array.isArray(arr) || depth <= 0) {
    return arr;
  }
  return arr.reduce((prev, cur) => {
    if (Array.isArray(cur)) {
      return prev.concat(_flat(cur, depth - 1));
    } else {
      return prev.concat(cur);
    }
  }, []);
}

// hand make push
Array.prototype.push = function () {
  for (let i = 0; i < arguments.length; i++) {
    this[this.length] = arguments[i];
  }
  return this.length;
};

// hand make filter
Array.prototype.filter = function (fn) {
  if (typeof fn !== "function") {
    throw new TypeError(fn + " is not a function");
  }
  const res = [];
  for (let i = 0; i < this.length; i++) {
    fn(this[i]) && res.push(this[i]);
  }
  return res;
};

// hand make map
Array.prototype.map = function (fn) {
  if (typeof fn !== "function") {
    throw new TypeError(fn + " is not a function");
  }
  const res = [];
  for (let i = 0, len = this.length; i < len; i++) {
    res.push(fn(this[i]));
  }
  return res;
};
