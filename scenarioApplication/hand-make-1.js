// red-green-yellow
const task = (timer, light, callback) => {
  setTimeout(() => {
    if (light === "red") {
      red();
    } else if (light === "green") {
      green();
    } else if (light === "yellow") {
      yellow();
    }
    callback();
  }, timer);
};
task(3000, "red", () => {
  task(2000, "green", () => {
    task(1000, "yellow", Function.prototype);
  });
});
// or
const task1 = (timer, light) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (light === "red") {
        red();
      } else if (light === "green") {
        green();
      } else if (light === "yellow") {
        yellow();
      }
      resolve();
    }, timer);
  });
const step = () => {
  task1(3000, "red").then(() => {
    task1(2000, "green").then(() => {
      task1(1000, "yellow").then(() => {
        step();
      });
    });
  });
};
// or
const taskRunner = async () => {
  await task(3000, "red");
  await task(2000, "green");
  await task(1000, "yellow");
  taskRunner();
};
taskRunner();

// 1,2,3,4 one second
for (var i = 0; i < 5; i++) {
  (function (i) {
    setTimeout(function () {
      console.log(i);
    }, i * 1000);
  })(i);
}
// or
for (let i = 0; i < 5; i++) {
  setTimeout(function () {
    console.log(i);
  }, i * 1000);
}

// childern count number
function childNum(num, count) {
  let allplayer = [];
  for (let i = 0; i < num; i++) {
    allplayer[i] = i + 1;
  }
  let exitCount = 0;
  let counter = 0;
  let curIndex = 0;
  while (exitCount < num - 1) {
    if (allplayer[curIndex] !== 0) counter++;
    if (counter === count) {
      allplayer[curIndex] = 0;
      counter = 0;
      exitCount++;
    }
    curIndex++;
    if (curIndex === num) {
      curIndex = 0;
    }
  }
  for (i = 0; i < num; i++) {
    if (allplayer[i] !== 0) {
      return allplayer[i];
    }
  }
}

// load pictures
let imageAsync = (url) => {
  return new Promise((resolve, reject) => {
    let img = new Image();
    img.src = url;
    img.onload = () => {
      resolve(img);
    };
    img.onerror = (err) => {
      reject(err);
    };
  });
};
imageAsync("url")
  .then(() => {
    console.log("ok");
  })
  .catch((error) => {
    console.log(error);
  });

// publish-subscribe
class EventCenter{
	let handlers = {};
	addEventListener(type,handler){
		if(!this.handlers[type]){
			this.handlers[type] = [];
		}
		this.handlers[type].push(handler);
	};
	dispatchEvent(type,params){
		if(!this.handlers[type]){
			return;
		}
		this.handlers[type].forEach(handler => {
			handler(...params);
		}
	};
	removeEventListener(type,handler){
		if(!this.handlers[type]){
			return;
		}
		if(!handler){
			delete this.handlers[type]
		}else{
			const index = this.handlers[type].findIndex(el => el === handler);
			if(index === -1){
				return;
			}
			this.handlers[type].splice(index,1);
			if(this.handlers[type].length === 0){
				delete this.handlers[type];
			}
		}
	}
}