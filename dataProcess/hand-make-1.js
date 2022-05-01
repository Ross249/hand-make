// date process
const dateFormat = (dateInput, format) => {
  var day = dateInput.getDate();
  var month = dateInput.getMonth() + 1;
  var year = dateInput.getFullYear();
  format = format.replace(/yyyy/, year);
  format = format.replace(/MM/, month);
  format = format.replace(/dd/, day);
  return format;
};

// exchange a and b
a = a + b;
b = a - b;
a = a - b;

// random output
var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
for (var i = 0; i < arr.length; i++) {
  const randomIndex = Math.round(Math.random() * (arr.length - 1 - i)) + i;
  [arr[i], arr[randomIndex]] = [arr[randomIndex], arr[i]];
}
console.log(arr);
// or
let length = arr.length,
  randomIndex,
  temp;
while (length) {
  randomIndex = Math.floor(Math.random() * length--);
  temp = arr[length];
  arr[length] = arr[randomIndex];
  arr[randomIndex] = temp;
}

// array sum
let sum = arr.reduce((total, i) => (total += i), 0);
let arr = arr
  .toString()
  .split(",")
  .reduce((total, i) => (total += Number(i)), 0);
function add(arr) {
  if (arr.length == 1) return arr[0];
  return arr[0] + add(arr.slice(1));
}

// flat array
function flatten(arr) {
  let res = [];
  for (let i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i])) {
      res = res.concat(flatten(arr[i]));
    } else {
      res.push(arr[i]);
    }
  }
  return res;
}
// or
function flatten1(arr) {
  return arr.reduce(function (prev, next) {
    return prev.concat(Array.isArray(next) ? flatten1(next) : next);
  }, []);
}
// or
function flatten2(arr) {
  while (arr.some((item) => Array.isArray(item))) {
    arr = [].concat(...arr);
  }
  return arr;
}
// or
function flatten3(arr) {
  return arr.toString().split(",");
}
// or
function flatten4(arr) {
  return arr.flat(Infinity);
}
