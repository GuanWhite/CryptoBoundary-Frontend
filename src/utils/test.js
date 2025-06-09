function findNodeById(tree, id) {
  for (const node of tree) {
    if (node.id === id) return node;
    if (node.children) {
      const found = findNodeById(node.children, id);
      if (found) return found;
    }
  }
  return null;
}

// 使用示例
const node = findNodeById(data2, 5);
console.log(node);
// 输出：{ id: 5, label: '二级 2-1' }

function getDescendantIds(node) {
  const ids = [node.id];
  if (node.children) {
    node.children.forEach(child => {
      ids.push(...getDescendantIds(child));
    });
  }
  return ids;
}

// 使用示例
const node = findNodeById(data2, 1); // 先获取节点
const descendantIds = getDescendantIds(node);
console.log(descendantIds);
// 输出：[1, 4, 9, 10]

function convertToIdNestedArray(tree) {
  return tree.map(node => {
    if (node.children && node.children.length > 0) {
      return [node.id, convertToIdNestedArray(node.children)];
    }
    return [node.id];
  });
}

// 使用示例
console.log(convertToIdNestedArray(tree));

function getAllIds(tree, result) {
  //遍历树  获取id数组
  for (const i in tree) {
    result.push(tree[i].id); // 遍历项目满足条件后的操作
    if (tree[i].children) {
      //存在子节点就递归
      getAllIds(tree[i].children, result);
    }
  }
  return result;
}

getAllIds(tree, []);

function convertToIdNestedArray(tree) {
  return tree.map(node => {
    if (node.children && node.children.length > 0) {
      return [node.id, convertToIdNestedArray(node.children)];
    }
    return [node.id];
  });
}

// 使用示例
const nestedIds = convertToIdNestedArray(tree);
console.log(JSON.stringify(nestedIds));
/* 输出：
[
[1, [[4, [[9], [10]]]]],
[2, [[5], [6]]],
[3, [[7], [8]]]
]
*/

function getDescendantIds(node) {
  const ids = [node.id];
  if (node.children) {
    node.children.forEach(child => {
      ids.push(...getDescendantIds(child));
    });
  }
  return ids;
}

// 使用示例
const node = findNodeById(data2, 1); // 先获取节点
const descendantIds = getDescendantIds(node);
console.log(descendantIds);
// 输出：[1, 4, 9, 10]

function parseParam(url) {
  const paramsStr = /.+\?(.+)$/.exec(url)[1]; // 将 ? 后面的字符串取出来
  const paramsArr = paramsStr.split('&'); // 将字符串以 & 分割后存到数组中
  let paramsObj = {};
  // 将 params 存到对象中
  paramsArr.forEach(param => {
    if (/=/.test(param)) { // 处理有 value 的参数
      let [key, val] = param.split('='); // 分割 key 和 value
      val = decodeURIComponent(val); // 解码
      val = /^\d+$/.test(val) ? parseFloat(val) : val; // 判断是否转为数字

      if (paramsObj.hasOwnProperty(key)) { // 如果对象有 key，则添加一个值
        paramsObj[key] = [].concat(paramsObj[key], val);
      } else { // 如果对象没有这个 key，创建 key 并设置值
        paramsObj[key] = val;
      }
    } else { // 处理没有 value 的参数
      paramsObj[param] = true;
    }
  });
  return paramsObj;
}

let arr = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];

let timer = null;

const sleep = (time, light) => {
  return new Promise((resolve, reject) => {
    clearInterval(timer);
    timer = setInterval(() => {
      console.log(light);
    }, 1000);
    setTimeout(resolve, time);
  });
};

const main = async () => {
  while (true) {
    await sleep(5000, '红灯');
    await sleep(2000, '黄灯');
    await sleep(3000, '绿灯');
    clearInterval(timer);
  }
};

main();
for (let i = 0; i <= 10; i++) {   //用var打印的都是11
  setTimeout(() => {
    console.log(i);
  }, 1000 * i);
}

for (var i = 1; i <= 10; i++) {
  (function (i) {
    setTimeout(function () {
      console.log(i);
    }, 1000 * i);
  })(i);
}

//setTimeout实现方式
var countdownTime = 10; //倒计时秒数

var countdown = function () {
  var setTimeoutHandler = setTimeout(function () {
    countdownTime--;
    console.log('倒计时：' + countdownTime + ' 秒');

    if (countdownTime === 0) {
      console.log('倒计时结束！');
      clearTimeout(setTimeoutHandler);
    } else {
      countdown();
    }

  }, 1000);
};

countdown();

//setInterval实现方式
var countdownTime = 10; //倒计时秒数

var countdown = function () {
  var setIntervalHandler = setInterval(function () {
    countdownTime--;
    console.log('倒计时：' + countdownTime + ' 秒');

    if (countdownTime === 0) {
      console.log('倒计时结束！');
      clearInterval(setIntervalHandler);
    }

  }, 1000);
};

countdown();

var countdownTime = 10; //倒计时秒数

var countdown = function () {
  var setIntervalHandler = setInterval(function () {
    countdownTime--;
    console.log('倒计时：' + countdownTime + ' 秒');
    if (countdownTime === 0) {
      console.log('倒计时结束！');
      clearInterval(setIntervalHandler);
    }
  }, 1000);
};

const active = setInterval(() => {
  setTime(preSecond => {
    if (preSecond <= 1) {
      clearInterval(active);
      return 0;
    }
    return preSecond - 1;
  });
}, 1000);

countdown();

var countIndex = 1; //倒计时任务执行次数
const timeout = 1000; //时间间隔1秒
const startTime = new Date().getTime();

function countdown(interval) {
  setTimeout(function () {
    const endTime = new Date().getTime();

    //误差
    const deviation = endTime - (startTime + countIndex * timeout);
    console.log('第' + countIndex + '次：累计误差 ' + deviation + ' ms');

    countIndex++;

    //执行下一次倒计时
    countdown(timeout);
  }, interval);
}
countdown(timeout);

var countIndex = 1; //倒计时任务执行次数
const timeout = 1000; //时间间隔1秒
const startTime = new Date().getTime();

function countdown(interval) {
  setTimeout(function () {
    const endTime = new Date().getTime();
    //误差
    const deviation = endTime - (startTime + countIndex * timeout);
    countIndex++;
    //执行下一次倒计时，去除误差的影响
    countdown(timeout - deviation);
  }, interval);
}
countdown(timeout);

document.addEventListener('visibilityChange', function () {
  if (!document.hidden) {
    // get newest time
  }
});

// 递归
function fn(n) {
  if (n == 0) return 0;
  if (n == 1) return 1;
  return fn(n - 2) + fn(n - 1);
}
// 优化
function fibonacci2(n) {
  const arr = [1, 1, 2];
  const arrLen = arr.length;

  if (n <= arrLen) {
    return arr[n];
  }

  for (let i = arrLen; i < n; i++) {
    arr.push(arr[i - 1] + arr[i - 2]);
  }

  return arr[arr.length - 1];
}
// 非递归
function fn(n) {
  let pre1 = 1;
  let pre2 = 1;
  let current = 2;

  if (n <= 2) {
    return current;
  }

  for (let i = 2; i < n; i++) {
    pre1 = pre2;
    pre2 = current;
    current = pre1 + pre2;
  }

  return current;
}

var lengthOfLongestSubstring = function (s) {
  let map = new Map();
  let i = -1;
  let res = 0;
  let n = s.length;
  for (let j = 0; j < n; j++) {
    if (map.has(s[j])) {
      i = Math.max(i, map.get(s[j]));
    }
    res = Math.max(res, j - i);
    map.set(s[j], j);
  }
  return res;
};

var minSubArrayLen = function (target, nums) {
  const n = nums.length;
  let ans = n + 1;
  let sum = 0; // 子数组元素和
  let left = 0; // 子数组左端点
  for (let right = 0; right < n; right++) { // 枚举子数组右端点
    sum += nums[right];
    while (sum >= target) { // 满足要求
      ans = Math.min(ans, right - left + 1);
      sum -= nums[left++]; // 左端点右移
    }
  }
  return ans <= n ? ans : 0;
};