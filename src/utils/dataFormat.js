// 格式化函数
function formatDate(date, format) {
  const map = {
    'Y': date.getFullYear(),
    'M': date.getMonth() + 1, // getMonth() 返回的是0-11，所以要加1
    'D': date.getDate(),
    'H': date.getHours(),
    'm': date.getMinutes(),
    's': date.getSeconds(),
  };

  return format.replace(/Y|M|D|H|m|s/g, match => {
    let value = map[match];
    if (match === 'M' || match === 'D' || match === 'H' || match === 'm' || match === 's') {
      // 小于10时前面补零
      value = value < 10 ? '0' + value : value;
    }
    return value;
  });
}

// 使用示例
const date = new Date();
const formattedDate = formatDate(date, 'YYYY-MM-DD HH:mm:ss');
console.log(formattedDate); // 输出类似：2025-01-04 15:25:45

function formatDate(date, format) {
  const map = {
    'YYYY': date.getFullYear(),
    'MM': String(date.getMonth() + 1).padStart(2, '0'),
    'DD': String(date.getDate()).padStart(2, '0'),
    'HH': String(date.getHours()).padStart(2, '0'),
    'mm': String(date.getMinutes()).padStart(2, '0'),
    'ss': String(date.getSeconds()).padStart(2, '0'),
  };

  return format.replace(/YYYY|MM|DD|HH|mm|ss/g, match => {
    return map[match] ? map[match] : match;
  });
}

let arr1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
for (let i = 0; i < arr.length; i++) {
  const randomIndex = Math.round(Math.random() * (arr.length - 1 - i)) + i;
  [arr[i], arr[randomIndex]] = [arr[randomIndex], arr[i]];
}
console.log(arr);

const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
function randerArr(arr) {
  // 浅拷贝
  let newArr = arr.slice(0), flag = [], n = arr.length;

  for (let i = 0; i < n; i++) {
    // 如果这个下标之前被交换过则不再交换，防止重复
    if (flag[i]) continue;

    let temp = parseInt(Math.random() * n);
    while (temp === i) temp = parseInt(Math.random() * n);
    // 标记交换过的
    flag[i] = true;
    flag[temp] = true;
    // 交换
    let swap = newArr[i];
    newArr[i] = newArr[temp];
    newArr[temp] = swap;
  }
  return newArr;
}
console.log(randerArr(arr));

let format = n => {
  let num = n.toString(); // 转成字符串
  let decimals = '';
  // 判断是否有小数
  num.indexOf('.') > -1 ? decimals = num.split('.')[1] : decimals;
  let len = num.length;
  if (len <= 3) {
    return num;
  } else {
    let temp = '';
    let remainder = len % 3;
    decimals ? temp = '.' + decimals : temp;
    if (remainder > 0) { // 不是3的整数倍
      return num.slice(0, remainder) + ',' + num.slice(remainder, len).match(/\d{3}/g).join(',') + temp;
    } else { // 是3的整数倍
      return num.slice(0, len).match(/\d{3}/g).join(',') + temp;
    }
  }
};
format(12323.33);  // '12,323.33'
format(12323);     // '12,323'


