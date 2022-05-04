// json to tree
function jsonToTree(data) {
  let res = [];
  if (!Array.isArray(data)) {
    return res;
  }
  let map = {};
  data.forEach((item) => {
    map[item.id] = item;
  });
  data.forEach((item) => {
    let parent = map[item.parentId];
    if (parent) {
      (parent.children || (parent.children = [])).push(item);
    } else {
      res.push(item);
    }
  });
  return res;
}

// sum
function sum(...args) {
  let sum = 0;
  args.forEach((item) => {
    sum += item * 1;
  });
  return sum;
}

// parse url
function parseParams(url) {
  const paramsStr = /.+\?(.+)$/.exec(url)[1];
  const paramsArr = paramsStr.split("&");
  let paramsObj = {};
  paramsArr.forEach((param) => {
    if (/=/.test(param)) {
      let [key, val] = param.split("=");
      val = decodeURIComponent(val);
      val = /^\d+$/.test(val) ? parseFloat(val) : val;
      if (paramsObj.hasOwnProperty(key)) {
        paramsObj[key] = [].concat(paramsObj[key], val);
      } else {
        paramsObj[key] = val;
      }
    } else {
      paramsObj[param] = true;
    }
  });
  return paramsObj;
}
