// ajax in promise
function getJson(url) {
  let promise = new Promise(function (resolve, reject) {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onreadystatechange = function () {
      if (this.readyState !== 4) {
        return;
      }
      if (this.status === 200) {
        resolve(this.response);
      } else {
        reject(new Error(this.statusText));
      }
    };
    xhr.onerror = function () {
      reject(new Error(this.statusText));
    };
    xhr.responseType = "json";
    xhr.setRequestHeader("Accept", "application/json");
    xhr.send(null);
  });
  return promise;
}

// shallow copy
let target = { a: 1 };
let ob2 = { b: 2 };
let ob3 = { c: 3 };
Object.assign(target, ob2, ob3);
console.log(target);
// or
let obj1 = { a: 1, b: { c: 1 } };
let obj2 = { ...obj1 };
obj1.a = 2;
console.log(obj1);
console.log(obj2);
obj1.b.c = 2;
console.log(obj1);
console.log(obj2);
// or
let arr = [1, 2, 3, 4];
console.log(arr.slice());
console.log(arr.slice() === arr);
console.log(arr.concat());
console.log(arr.concat() === arr);
// or
function shallowCopy(obj) {
  if (!obj || typeof obj !== "object") return;
  let newObj = Array.isArray(obj) ? [] : {};
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      newObj[key] = obj[key];
    }
  }
  return newObj;
}

// deep copy
let o1 = { a: 0, b: { c: 0 } };
let o2 = JSON.parse(JSON.stringify(o1));
o1.a = 1;
o1.b.c = 1;
console.log(o1);
console.log(o2);
// or
var _ = require("loadsh");
var object1 = { a: 1, b: { f: { g: 1 } }, c: [1, 2, 3] };
var object2 = _.cloneDeep(object1);
console.log(object1.b.f === object2.b.f);
// or
function deepCopy(obj) {
  if (!obj || typeof obj !== "object") return;
  let newObj = Array.isArray(obj) ? [] : {};
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      newObj[key] =
        typeof obj[key] === "object" ? deepCopy(obj[key]) : obj[key];
    }
  }
  return newObj;
}
