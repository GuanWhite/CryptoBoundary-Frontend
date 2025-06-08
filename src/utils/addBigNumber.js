function sumBigNumber(a, b) {
  let res = '';
  let temp = 0;

  a = a.split('');
  b = b.split('');

  while (a.length || b.length || temp) {
    temp += ~~a.pop() + ~~b.pop();
    res = (temp % 10) + res;
    temp = temp > 9;
  }
  return res.replace(/^0+/, '');
}

function sumBigNumber(num1, num2) {
  let i = num1.length - 1; // 指针指向 num1 的末尾
  let j = num2.length - 1; // 指针指向 num2 的末尾
  let carry = 0; // 进位标志
  let result = ''; // 存储结果

  // 从右到左逐位相加
  while (i >= 0 || j >= 0 || carry > 0) {
    // 获取当前位的数字，若指针越界则用 0 代替
    const digit1 = i >= 0 ? parseInt(num1[i--]) : 0;
    const digit2 = j >= 0 ? parseInt(num2[j--]) : 0;

    const sum = digit1 + digit2 + carry;  // 计算当前位的和（包括进位）
    result = (sum % 10) + result;  // 当前位的值
    carry = Math.floor(sum / 10);  // 更新进位
  }
  return result;
}

// 测试用例
console.log(sumBigNumber("123", "456"));     // "579"
console.log(sumBigNumber("999", "1"));       // "1000"

function multiplyBigNum(num1, num2) {
  //判断输入是不是数字
  if (isNaN(num1) || isNaN(num2)) return "";
  num1 = num1 + "";
  num2 = num2 + "";
  let len1 = num1.length,
    len2 = num2.length;
  let pos = [];

  //j放外面，先固定被乘数的一位，分别去乘乘数的每一位，更符合竖式演算法
  for (let j = len2 - 1; j >= 0; j--) {
    for (let i = len1 - 1; i >= 0; i--) {
      //两个个位数相乘，最多产生两位数，index1代表十位，index2代表个位
      let index1 = i + j,
        index2 = i + j + 1;
      //两个个位数乘积加上当前位置个位已累积的数字，会产生进位，比如08 + 7 = 15，产生了进位1
      let mul = num1[i] * num2[j] + (pos[index2] || 0);
      //mul包含新计算的十位，加上原有的十位就是最新的十位
      pos[index1] = Math.floor(mul / 10) + (pos[index1] || 0);
      //mul的个位就是最新的个位
      pos[index2] = mul % 10;
    }
  }

  //去掉前置0
  let result = pos.join("").replace(/^0+/, "");

  return result - 0 || '0';
}
function render(template, data) {
  const reg = /\{\{(\w+)\}\}/; // 模板字符串正则
  if (reg.test(template)) { // 判断模板里是否有模板字符串
    const name = reg.exec(template)[1]; // 查找当前模板里第一个模板字符串的字段
    template = template.replace(reg, data[name]); // 将第一个模板字符串渲染
    return render(template, data); // 递归的渲染并返回渲染后的结构
  }
  return template; // 如果模板没有模板字符串直接返回
}

function calculateNestedArrayDepth(arr) {
  if (!Array.isArray(arr)) {
    return 0;
  }

  let maxDepth = 0;
  for (let i = 0; i < arr.length; i++) {
    const depth = calculateNestedArrayDepth(arr[i]);
    if (depth > maxDepth) {
      maxDepth = depth;
    }
  }
  return maxDepth + 1;
}

// 示例使用
const nestedArray = [1, [2, [3, [4, [5]]]]];
console.log(calculateNestedArrayDepth(nestedArray)); // 输出: 5

// 转换前：
source = [{
  id: 1,
  pid: 0,
  name: 'body'
}, {
  id: 2,
  pid: 1,
  name: 'title'
}, {
  id: 3,
  pid: 2,
  name: 'div'
}];

// 转换为: 
tree = [{
  id: 1,
  pid: 0,
  name: 'body',
  children: [{
    id: 2,
    pid: 1,
    name: 'title',
    children: [{
      id: 3,
      pid: 1,
      name: 'div'
    }]
  }]
}];
function jsonToTree(data) {
  // 初始化结果数组，并判断输入数据的格式
  let result = [];
  if (!Array.isArray(data)) {
    return result;
  }
  // 使用map，将当前对象的id与当前对象对应存储起来
  let map = {};
  data.forEach(item => {
    map[item.id] = item;
  });
  // 
  data.forEach(item => {
    let parent = map[item.pid];
    if (parent) {
      (parent.children || (parent.children = [])).push(item);
    } else {
      result.push(item);
    }
  });
  return result;
}

const tree = [
  {
    id: 1,
    name: "Node 1",
    children: [
      {
        id: 2,
        name: "Node 1.1",
        children: [],
      },
      {
        id: 3,
        name: "Node 1.2",
        children: [
          {
            id: 4,
            name: "Node 1.2.1",
            children: [],
          },
          {
            id: 5,
            name: "Node 1.2.2",
            children: [],
          },
        ],
      },
    ],
  },
  {
    id: 6,
    name: "Node 2",
    children: [],
  },
];
function findAncestorsById(tree, id, result = []) {
  for (const node of tree) {
    if (node.id === id) {
      result.push(id);
      return result;
    }
    if (node.children.length) {
      const temp = findAncestorsById(node.children, id, result);
      if (temp) {
        result.push(node.id);
        return result;
      }
    }
  }
  return null;
}

findAncestorsById(tree,5)

# ==手写题==

[javascript - 前端面试js高频手写大全 - 个人文章 - SegmentFault 思否](https://segmentfault.com/a/1190000038910420)

[死磕 36 个 JS 手写题（搞懂后，提升真的大）作为一个程序员，代码能力毋庸置疑是非常非常重要的，就像现在为什么大厂面 - 掘金](https://juejin.cn/post/6946022649768181774)

[JS 手写代码 | 前端面试派](https://www.mianshipai.com/docs/written-exam/JS-writing.html)



## getType函数

typeof 可以正确识别：Undefined、Boolean、Number、String、Symbol、Function 等类型的数据，但是对于其他的都会认为是 object，比如 Null、Date 等，所以通过 typeof 来判断数据类型会不准确。为了获取详细的变量类型，可以使用 `Object.prototype.toString` 实现。

```js
// 写法一：
function getType1(data) {
  let originType = Object.prototype.toString.call(data) // 获取内部属性值
  let index = originType.indexOf(' ') // 以空格分割
  let type = originType.slice(index + 1, -1) // 截取
  return type.toLowerCase()
}
// 写法二：(推荐)
function getType2(data) {
  // 1.用Object原型上的toString方法将传入的obj转成字符串表示（通过call将this指向obj以表明要转换的目标）
  // 2.上面的方法返回的字符串格式通常是 [object Type]，其中 Type 是对象的类型。例如：数组 []，返回 [object Array]。
  // 3.slice方法用于提取字符串的一部分，slice(8, -1) 表示从第 8 个字符开始提取，直到倒数第 1 个字符（不包括倒数第 1 个字符）。即Type中的内容
  // 4.toLowerCase是用于将字符串中的所有字符转换为小写。
	return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
}

getType1([])        // 'array'
getType1({})        // 'object'
getType1(new Date)  // 'date'
```



## new关键字

new 运算符用来创建用户自定义的对象类型的实例或者具有构造函数的内置对象的实例。

实现要点：

- new 会产生一个新对象；
- 新对象需要能够访问到构造函数的属性，所以需要重新指定它的原型；
- 构造函数可能会显示返回；

实现代码：

```js
function objectFactory() {
    var obj = new Object()
    Constructor = [].shift.call(arguments);
    obj.__proto__ = Constructor.prototype;
    var ret = Constructor.apply(obj, arguments);
    
    // ret || obj 这里这么写考虑了构造函数显示返回 null 的情况
    return typeof ret === 'object' ? ret || obj : obj;
};
```

使用方法：

```js
function person(name, age) {
    this.name = name
    this.age = age
}
let p = objectFactory(person, '布兰', 12)
console.log(p)  // { name: '布兰', age: 12 }
```



## instanceof关键字

`instanceof`用于判断一个实例是否是其父类或者祖先类型的实例。`instanceof`在查找的过程中会遍历左边变量的原型链，直到找到右边变量的 `prototype` 查找失败，返回 `false`。

```js
let myInstanceof = (target,origin) => {
  while(target) {
    if(target.__proto__ === origin.prototype) {
      return true
    }
    target = target.__proto__
  }
  return false
}
let a = [1,2,3]
console.log(myInstanceof(a,Array));  // true
console.log(myInstanceof(a,Object));  // true
```

## 继承

手写代码见[这里](#JS的继承方式)



## 数组原型方法flat

数组扁平化就是将 `[1, [2, [3]]]` 这种多层的数组拍平成一层 `[1, 2, 3]`。使用`Array.prototype.flat` 可以直接将多层数组拍平成一层：

```js
// 传入的参数是要剥去的深度层数，默认值为1，这里指定为2，即，将深度剥去两层
var arr1 = [1, 2, [3, 4, [5, 6]]];
arr1.flat(2);  // [1, 2, 3, 4, 5, 6]

var arr2 = [1, 2, [3, 4, [5, 6]]];
arr2.flat();   // [1, 2, 3, 4, [5, 6]]

//使用 Infinity，可展开任意深度的嵌套数组
var arr4 = [1, 2, [3, 4, [5, 6, [7, 8, [9, 10]]]]];
arr4.flat(Infinity);  // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
```

注意：`flat()` 方法返回一个新的数组，原始数组不受影响。`flat()` 方法会移除数组中的空项。



手写实现：

```js
function flatten(arr) {
  // Array.prototype.some 是 JavaScript 数组的一个方法，用于检查数组中是否至少有一个元素满足给定的条件。
  // 这里的条件是 Array.isArray(item)，即检查数组中的某个元素是否仍然是数组。
  // 如果 arr 中至少有一个元素是数组，some 方法会返回 true，否则返回 false。
  // 循环表示只要 arr 中还有嵌套的数组，就会继续执行，直到 arr 中不再有嵌套数组为止。
  while (arr.some(item => Array.isArray(item))) {
    // [].concat(...arr) 的作用是将 arr 中的所有元素（包括嵌套数组）展开并合并到一个新数组中。
    arr = [].concat(...arr);
  }
  return arr;
}
```



## 数组原型方法forEach

```js
// 参数callback是一个函数，用于对数组中的每个元素执行操作。
// 参数thisArg（可选）：指定 callback 函数中 this 的值。
Array.prototype.forEach2 = function(callback, thisArg) {
  // 如果 this 是 null 或 undefined，说明调用 forEach2 的对象无效，抛出类型错误。
  if (this == null) {
    throw new TypeError('this is null or not defined');
  }
  // 如果 callback 不是函数，抛出类型错误。
  if (typeof callback !== "function") {
    throw new TypeError(callback + ' is not a function');
  }
  // 将调用forEach2的数组实例转化为对象形式
  const obj = Object(this);  // this就是当前的数组
  const len = obj.length >>> 0;  // 后面有解释
  let k = 0;
  while (k < len) {
    // 检查索引k是否是数组obj的有效属性。这是为了跳过稀疏数组中的“空洞”（即未定义的索引）。
    if (k in obj) {
      // 使用call方法是为了显式绑定 thisArg。
      // 然后将余下的参数传递给callback函数。
      callback.call(thisArg, obj[k], k, obj);
    }
    k++;
  }
}

// 测试
const arr = [1, 2, 3];
arr.forEach2(function(item, index, array) {
    console.log(`元素: ${item}, 索引: ${index}, 数组: ${array}`);
});

// 输出:
// 元素: 1, 索引: 0, 数组: 1,2,3
// 元素: 2, 索引: 1, 数组: 1,2,3
// 元素: 3, 索引: 2, 数组: 1,2,3
```

注意：`>>> 0` 是无符号右移操作符，它的作用是将 `length` 转换为一个 32 位无符号整数。这种操作可以确保 `len` 是一个非负整数，即使 `length` 是负数或非数值类型。其实底层做了 2 层转换，第一是非 number 转成 number 类型，第二是将 number 转成 Uint32 类型。

## 数组原型方法map

数组的**map()** 方法会返回一个新的数组，这个新数组中的每个元素对应原数组中的对应位置元素调用一次提供的函数后的返回值。

基于上面 forEach 的实现结构能够很容易写出 map 的实现：

```js
Array.prototype.map2 = function(callback, thisArg) {
  if (this == null) {
    throw new TypeError('this is null or not defined');
  }
  if (typeof callback !== "function") {
    throw new TypeError(callback + ' is not a function');
  }
  const obj = Object(this);
  const len = obj.length >>> 0;
  let k = 0, res = [];
  while (k < len) {
    if (k in obj) {
      res[k] = callback.call(thisArg, obj[k], k, obj);
    }
    k++;
  }
  return res;
}
```



## 数组原型方法filter

```js
Array.prototype.filter2 = function(callback, thisArg) {
  if (this == null) {
    throw new TypeError('this is null or not defined');
  }
  if (typeof callback !== "function") {
    throw new TypeError(callback + ' is not a function');
  }
  const obj = Object(this);
  const len = obj.length >>> 0;
  let k = 0, res = [];
  while (k < len) {
    if (k in obj) {
      if (callback.call(thisArg, obj[k], k, obj)) {
        res.push(obj[k]);
      }
    }
    k++;
  }
  return res;
}
```



## 数组原型方法some

some() 方法用于检测数组中的元素是否满足指定条件（函数提供）。

some() 方法会依次执行数组的每个元素：

- 如果有一个元素满足条件，则表达式返回`true` , 剩余的元素不会再执行检测。
- 如果没有满足条件的元素，则返回`false`。

**注意：** some() 不会对空数组进行检测。some() 不会改变原始数组。



基于上面的forEach的代码结构进行原生实现：

```js
Array.prototype.some2 = function(callback, thisArg) {
  if (this == null) {
    throw new TypeError('this is null or not defined');
  }
  if (typeof callback !== "function") {
    throw new TypeError(callback + ' is not a function');
  }
  const obj = Object(this);
  const len = obj.length >>> 0;
  let k = 0;
  while (k < len) {
    if (k in obj) {
      if (callback.call(thisArg, obj[k], k, obj)) {
        return true;
      }
    }
    k++;
  }
  return false;
}
```



## 数组原型方法reduce

reduce() 方法接收一个函数作为累加器，数组中的每个值（从左到右）开始缩减，最终为一个值，是ES5中新增的又一个数组逐项处理方法。

**注意:** reduce() 对于空数组是不会执行回调函数的。



原生实现：

```js
Array.prototype.reduce2 = function(callback, initialValue) {
  if (this == null) {
    throw new TypeError('this is null or not defined');
  }
  if (typeof callback !== "function") {
    throw new TypeError(callback + ' is not a function');
  }
  const obj = Object(this);
  const len = obj.length >>> 0;
  let k = 0, acc;
  
  if (arguments.length > 1) {
    acc = initialValue;
  } else {
    // 没传入初始值的时候，取数组中第一个非 empty 的值为初始值
    while (k < len && !(k in obj)) {
      k++;
    }
    if (k > len) {
      throw new TypeError('Reduce of empty array with no initial value');
    }
      acc = obj[k++];
  }
  while (k < len) {
    if (k in obj) {
      // callback中的参数是规定的，前两个必需，后两个可选
      acc = callback(acc, obj[k], k, obj);
    }
    k++;
  }
  return acc;
}
```



-----



## 函数原型方法call

使用一个指定的 this 值和一个或多个参数来调用一个函数。

实现步骤：

- 判断调用对象是否为函数，即使是定义在函数的原型上的，但是可能出现使用 call 等方式调用的情况。
- 判断传入上下文对象是否存在，如果不存在，则设置为 window 。
- 处理传入的参数，截取第一个参数后的所有参数。
- 将函数作为上下文对象的一个属性。
- 使用上下文对象来调用这个方法，并保存返回结果。
- 删除刚才新增的属性。
- 返回结果。

```js
Function.prototype.myCall = function(context) {
  // 判断调用对象
  if (typeof this !== "function") {
    console.error("type error");
  }
  // 获取参数
  let args = [...arguments].slice(1),
    result = null;
  // 判断 context 是否传入，如果未传入则设置为 window
  context = context || window;
  // 将调用函数设为对象的方法
  context.fn = this;
  // 调用函数
  result = context.fn(...args);
  // 将属性删除
  delete context.fn;
  return result;
};
```



## 函数原型方法apply

apply 和 call 一样，唯一的区别就是 call 是传入不固定个数的参数，而 apply 是传入一个数组。

实现步骤：

- 判断调用对象是否为函数，即使是定义在函数的原型上的，但是可能出现使用 call 等方式调用的情况。
- 判断传入上下文对象是否存在，如果不存在，则设置为 window 。
- 将函数作为上下文对象的一个属性。
- 判断参数值是否传入
- 使用上下文对象来调用这个方法，并保存返回结果。
- 删除刚才新增的属性
- 返回结果

```js
Function.prototype.myApply = function(context) {
  // 判断调用对象是否为函数
  if (typeof this !== "function") {
    throw new TypeError("Error");
  }
  let result = null;
  // 判断 context 是否存在，如果未传入则为 window
  context = context || window;
  // 将函数设为对象的方法
  context.fn = this;
  // 调用方法
  if (arguments[1]) {
    result = context.fn(...arguments[1]);
  } else {
    result = context.fn();
  }
  // 将属性删除
  delete context.fn;
  return result;
};
```



## 函数原型方法bind

bind 方法会创建一个新的函数，在 bind() 被调用时，这个新函数的 this 被指定为 bind() 的第一个参数，而其余参数将作为新函数的参数，供调用时使用。

实现步骤：

- 判断调用对象是否为函数，即使是定义在函数的原型上的，但是可能出现使用 call 等方式调用的情况。
- 保存当前函数的引用，获取其余传入参数值。
- 创建一个函数返回
- 函数内部使用 apply 来绑定函数调用，需要判断函数作为构造函数的情况，这个时候需要传入当前函数的 this 给 apply 调用，其余情况都传入指定的上下文对象。

实现代码：

```js
Function.prototype.myBind = function(context) {
  // 判断调用对象是否为函数
  if (typeof this !== "function") {
    throw new TypeError("Error");
  }
  // 获取参数
  var args = [...arguments].slice(1),
    fn = this;
  return function Fn() {
    // 根据调用方式，传入不同绑定值
    return fn.apply(
      this instanceof Fn ? this : context,
      args.concat(...arguments)
    );
  };
};
```



------

Promise手写参考：

- [Sunny-lucking/howToBuildMyPromise: 自己实现一个promise](https://github.com/Sunny-lucking/howToBuildMyPromise)
- [手写Promise.all()前言 面试官问：你了解Promise吗？用的多吗? 如果你说了解，用的多，面试官基本上不会 - 掘金](https://juejin.cn/post/6988740933885886472)
- [面试题 - 手写promise.all最近面试遇到的问题，面试官让手写一个promise.all，觉得这个问题值得思考， - 掘金](https://juejin.cn/post/6969767955420676133)
- [因为实现不了Promise.all，一场面试凉凉了Promise.all、new、apply、call、bind这些常见 - 掘金](https://juejin.cn/post/7038371452084551694)



## Promise.resolve

`Promsie.resolve(value)` 可以将任何值转成**值为 value 状态是 `fulfilled` 的 Promise**，但如果传入的值本身是 Promise 则会原样返回它。

`Promise.resolve(value) `方法返回一个以给定值解析后的[`Promise`](https://link.juejin.cn?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FJavaScript%2FReference%2FGlobal_Objects%2FPromise) 对象。

如果这个值是一个 promise ，那么将返回这个 promise ；

如果这个值是thenable（即带有[`"then" `](https://link.juejin.cn?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FJavaScript%2FReference%2FGlobal_Objects%2FPromise%2Fthen)方法），返回的promise会“跟随”这个thenable的对象，采用它的最终状态；否则返回的promise将以此值完成。

```js
// 1. 非Promise对象，非thenable对象
Promise.resolve(1).then(console.log) // 1

// 2. Promise对象成功状态
const p2 = new Promise((resolve) => resolve(2))

Promise.resolve(p2).then(console.log) // 2

// 3. Promise对象失败状态
const p3 = new Promise((_, reject) => reject('err3'))

Promise.resolve(p3).catch(console.error) // err3

// 4. thenable对象
const p4 = {
  then (resolve) {
    setTimeout(() => resolve(4), 1000)
  }
}
Promise.resolve(p4).then(console.log) // 4

// 5. 啥都没传
Promise.resolve().then(console.log) // undefined
```



手写实现：

```js
Promise.myResolve = function (value) {
  // 如果是Promise实例，直接返回即可
  if (value instanceof Promise) {
    return value;
  }
  // 否则其他情况一律再通过Promise包装一下 
  return new Promise(resolve => resolve(value));
}
```



## Promise.reject

`Promise.reject() `方法返回一个带有拒绝原因的`Promise`对象。

示例：

```js
Promise.reject(new Error('fail'))
  .then(() => console.log('Resolved'), 
        (err) => console.log('Rejected', err))
// 输出以下内容        
// Rejected Error: fail
//    at <anonymous>:2:16
```

手写实现：

```js
Promise.myReject = function (reason) {
  return new Promise((resolve, reject) => reject(reason))
}
```



## Promise.all

`Promise.all()`方法用于将多个 Promise 实例，包装成一个新的 Promise 实例。

```js
const p = Promise.all([p1, p2, p3, a])
```

最终`p`的状态由`p1`、`p2`、`p3`、`a`决定：

- 接收一个Promise数组，数组中如有非Promise项，则将此项包装成Promise并当做成功。
- 如果`p1`、`p2`、`p3`、`a`的状态都变成`fulfilled`，`p`的状态才会变成`fulfilled`，此时`p1`、`p2`、`p3`、`a`的返回值组成一个数组，传递给`p`的回调函数。
- 只要`p1`、`p2`、`p3`、`a`之中有一个被`rejected`，`p`的状态就变成`rejected`，此时第一个被`reject`的实例的返回值，会传递给`p`的回调函数。



手写代码：

```js
Promise.myAll = (promises) => {
  return new Promise((resolve, reject) => {
    // 计数器和结果
    let count = 0,result = [];

    if (promises.length === 0) {
      return resolve([]);
    }
    
    promises.forEach((p, i) => {
      // 注意有的数组项有可能不是Promise，需要手动转化一下
      Promise.resolve(p).then(val => { // 成功时
        count++;
        result[i] = val; // 收集每个Promise的返回值
        // 当所有的Promise都成功了，那么将返回的Promise结果设置为result
        if (count === promises.length) {
          resolve(result);
        }
      }, err =>{ // 失败时
        reject(err)
      })
    })
  })
}
```



给一个 Promise 数组，实现每个成员都进行，但是一个成功就停止：

要实现一个 Promise 数组，每个成员都执行，但只要有一个成功就停止，可以使用 `Promise.race` 和 `Promise.all` 结合的方式来实现。以下是代码实现：

```js
/**
 * 执行 Promise 数组，只要有一个成功就停止
 * @param {Array<Promise>} promises - Promise 数组
 * @returns {Promise} - 返回第一个成功的 Promise 结果，或所有 Promise 都失败时抛出错误
 */
function raceToSuccess(promises) {
  // 用于存储所有 Promise 的错误
  const errors = [];

  // 将每个 Promise 包装为成功时 resolve，失败时记录错误
  const wrappedPromises = promises.map((promise) =>
    promise.then(
      (result) => {
        // 如果有一个成功，直接 resolve
        return Promise.resolve(result);
      },
      (error) => {
        // 如果失败，记录错误并继续执行
        errors.push(error);
        return Promise.reject(error);
      }
    )
  );

  // 使用 Promise.race 来竞争第一个成功的 Promise
  return Promise.race(wrappedPromises).catch(() => {
    // 如果所有 Promise 都失败，抛出所有错误
    return Promise.reject(new AggregateError(errors, "All promises failed"));
  });
}
```

## Promise.race

`Promise.race()`方法同样是将多个 Promise 实例，包装成一个新的 Promise 实例。

```js
const p = Promise.race([p1, p2, p3])
```

只要`p1`、`p2`、`p3`之中有一个实例率先改变状态，`p`的状态就跟着改变。那个率先改变的 Promise 实例的返回值，就传递给`p`的回调函数。

手写实现：

```js
// 写法一：
Promise.myRace = (promises) => {
  return new Promise((resolve, reject) => {
    promises.forEach(p => {
      Promise.resolve(p).then(val => {
        resolve(val);
      }, err => {
        rejecte(err);
      })
    })
  })
}

// 写法二：
Promise.myRace = (promises) => {
  return new Promise((rs, rj) => {
    promises.forEach((p) => {
      // 对p进行一次包装，防止非Promise对象
      // 并且对齐进行监听，将我们自己返回的Promise的resolve，reject传递给p，哪个先改变状态，我们返回的Promise也将会是什么状态
      Promise.resolve(p).then(rs).catch(rj)
    })
  })
}
```



## Promise.allSettled

> 有时候，我们希望等到一组异步操作都结束了，不管每一个操作是成功还是失败，再进行下一步操作。显然`Promise.all`(其只要是一个失败了，结果即进入失败状态)不太适合，所以有了`Promise.allSettled`。

`Promise.allSettled()`方法接受一个数组作为参数，数组的每个成员都是一个 Promise 对象，并返回一个新的 Promise 对象。只有等到参数数组的所有 Promise 对象都发生状态变更（不管是`fulfilled`还是`rejected`），返回的 Promise 对象才会发生状态变更，一旦发生状态变更，状态总是`fulfilled`，不会变成`rejected`。并且具有如下特点：

1. 不管是全部成功还是有部分失败，最终都会进入`Promise.allSettled`的`.then`回调中。
2. 最后的返回值中，成功和失败的项都有`status`属性，成功时值是`fulfilled`，失败时是`rejected`。
3. 最后的返回值中，成功含有`value`属性，而失败则是`reason`属性。

手写代码：

```js
Promise.myAllSettled = (promises) => {
  return new Promise((resolve, reject) => {
    let result = []
    
    promises.forEach((p, i) => {
      Promise.resolve(p).then(val => {
        // 成功属性设置 
        result.push({
          status: 'fulfilled',
          value: val
        })
        
        if (result.length === promiseArr.length) {
          resolve(result) 
        }
      }, err => {
        result.push({
          status: 'rejected',
          reason: err
        })
        if (result.length === promiseArr.length) {
          resolve(result)
        }
      })
    })
  })
}
```



## Promise.any

Promise.any 的规则是这样：

- 空数组或者所有 Promise 都是 rejected，则返回状态是 rejected 的新 Promsie，且值为 AggregateError 的错误；
- 只要有一个是 fulfilled 状态的，则返回第一个是 fulfilled 的新实例；
- 其他情况都会返回一个 pending 的新实例；

手写代码：

```js
Promise.any = function(promiseArr) {
  return new Promise((resolve, reject) => {
    let index = 0;
    
    if (promiseArr.length === 0) return 
    promiseArr.forEach((p, i) => {
      Promise.resolve(p).then(val => {
        resolve(val)
      }, err => {
        index++
        if (index === promiseArr.length) {
          reject(new AggregateError('All promises were rejected'))
        }
      })
    })
  })
}
```



## Generator

[手写generator核心原理，再也不怕面试官问我generator原理 · Issue #6 · Sunny-lucking/blog](https://github.com/Sunny-lucking/blog/issues/6)

[手写generator核心原理，再也不怕面试官问我generator原理 - 知乎](https://zhuanlan.zhihu.com/p/216060145)

```js
var context = {
  next:0,
  prev: 0,
  done: false,
  stop: function stop () {
    this.done = true
  }
}


function gen$(context) {
    while (1) {
        switch (context.prev = context.next) {
            case 0:
                context.next = 2;
                return 'result1';

            case 2:
                context.next = 4;
                return 'result2';

            case 4:
                context.next = 6;
                return 'result3';

            case 6:
                context.stop();
                return undefined
        }
    }
}

let foo = function () {
    return {
        next: function () {
            value = gen$(context);
            done = context.done
            return {
                value,
                done
            }
        }
    }
}
```



## 深浅拷贝

深拷贝和浅拷贝是只针对Object和Array这样的引用数据类型的。

**浅拷贝和深拷贝的区别：**

- 浅拷贝：创建一个新对象，这个对象有着原始对象属性值的一份精确拷贝。如果属性是基本类型，拷贝的就是基本类型的值，如果属性是引用类型，拷贝的就是内存地址，如果其中一个对象改变了引用类型的属性，就会影响到另一个对象。
- 深拷贝：将一个对象从内存中完整的复制一份出来，从堆内存中开辟一个新区域存放。这样更改拷贝值就不影响旧的对象。



**浅拷贝：**

```js
function shallowCopy(obj) {
    if (typeof obj !== 'object') return;
    
    let newObj = obj instanceof Array ? [] : {};
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            newObj[key] = obj[key];
        }
    }
    return newObj;
}
```



**深拷贝：**

```js
// 简单版深拷贝：只考虑普通对象属性，不考虑内置对象和函数。
function deepClone(obj) {
    if (typeof obj !== 'object') return;
    var newObj = obj instanceof Array ? [] : {};
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            newObj[key] = typeof obj[key] === 'object' ? deepClone(obj[key]) : obj[key];
        }
    }
    return newObj;
}

// 复杂版深克隆：基于简单版的基础上，还考虑了内置对象比如 Date、RegExp 等对象和函数以及解决了循环引用的问题。
const isObject = (target) => (typeof target === "object" || typeof target === "function") && target !== null;

function deepClone(target, map = new WeakMap()) {
    if (map.get(target)) {
        return target;
    }
    // 获取当前值的构造函数：获取它的类型
    let constructor = target.constructor;
    // 检测当前对象target是否与正则、日期格式对象匹配
    if (/^(RegExp|Date)$/i.test(constructor.name)) {
        // 创建一个新的特殊对象(正则类/日期类)的实例
        return new constructor(target);  
    }
    if (isObject(target)) {
        map.set(target, true);  // 为循环引用的对象做标记
        const cloneTarget = Array.isArray(target) ? [] : {};
        for (let prop in target) {
            if (target.hasOwnProperty(prop)) {
                cloneTarget[prop] = deepClone(target[prop], map);
            }
        }
        return cloneTarget;
    } else {
        return target;
    }
}
```

## 观察者模式

[观察者模式, 发布-订阅, 事件总线 傻傻分不清？先有问题再有答案 如何理解观察者模式？ 有什么使用场景？ 发布订阅模式 - 掘金](https://juejin.cn/post/7413284830946295817)

它定义了对象间的一种一对多的关系，让多个观察者对象同时监听某一个主题对象，当一个对象发生改变时，所有依赖于它的对象都将得到通知。

**适用场景**

观察者模式适用于一个对象的状态变化需要通知多个其他对象，并且这些对象需要实时响应这些变化的场景。

> 例如，在Vue中，每个组件实例都有对应的观察者实例（Observer），这个观察者会在组件初始化的过程中将组件的数据变为响应式。在这个过程中，Vue会遍历这些数据，并将它们转化为getter/setter。这样，每次访问或修改这些数据时就会触发getter/setter。
>
> 当这些数据被用在视图上时，渲染函数将会被转化为一个"观察者"，即Watcher实例。每个依赖于某个数据的Watcher都将被添加到这个数据对应的Dep列表中。
>
> 当数据变化时，setter就会被触发，并通知对应的Dep实例。Dep实例则通知它所管理的所有Watcher实例，最后这些Watcher就会响应这个变化，例如更新视图。
>
> 所以，Vue的响应式系统就是通过观察者模式实现的。“数据”可以被看做是“主题”，“Watcher”可以被看做是“观察者”。当数据（主题）发生变化时，所有依赖于它的Watcher（观察者）都会被通知。

**写法一：**

```js
class Subject {
  constructor() {
    this.observers = [];
  }

  addObserver(observer) {
    this.observers.push(observer);
  }

  removeObserver(observer) {
    const index = this.observers.findIndex(obs => obs === observer);
    this.observers.splice(index, 1);
  }

  notify(data) {
    this.observers.forEach(observer => observer.update(data));
  }
}

class Observer {
  constructor()
  update(data) {
    console.log('Observer notified', data);
  }
}

const observer1 = new Observer();
const observer2 = new Observer();
const subject = new Subject();

subject.addObserver(observer1);
subject.addObserver(observer2);

subject.notify('Some data');  //所有观察者都会接收到 "Some data"
```

**写法二：**

```js
// 观察者
class Observer {
    constructor() {}
    update(val) {}
}
// 观察者列表
class ObserverList {
    constructor() {
        this.observerList = []
    }
    add(observer) {
        return this.observerList.push(observer);
    }
    remove(observer) {
        this.observerList = this.observerList.filter(ob => ob !== observer);
    }
    count() {
        return this.observerList.length;
    }
    get(index) {
        return this.observerList[index];
    }
}
// 目标
class Subject {
    constructor() {
        this.observers = new ObserverList();
    }
    addObserver(observer) {
        this.observers.add(observer);
    }
    removeObserver(observer) {
        this.observers.remove(observer);
    }
    notify(...args) {
        let obCount = this.observers.count();
        for (let index = 0; index < obCount; index++) {
            this.observers.get(i).update(...args);
        }
    }
}
```



## 发布订阅模式

观察者模式由具体目标调度，每个被订阅的目标里面都需要有对观察者的处理，会造成代码的冗余。而发布订阅模式则统一由调度中心处理，消除了发布者和订阅者之间的依赖。

发布订阅模式适用于需要实现事件的广播和订阅机制的场景，其中事件的发布者和订阅者之间不需要直接通信，而是通过一个中介（如消息队列或事件总线）来传递消息。

**适用场景**

- 事件处理系统：发布-订阅模式在事件驱动的系统中被广泛使用，比如DOM事件监听。在网页开发中，你可以为特定的DOM元素添加事件监听器，比如点击、双击、鼠标悬停等。当这些事件被触发时，所有订阅了相应事件的函数都会被执行。
- 消息队列：消息队列是分布式系统中常用的一种数据交换形式。发布-订阅模式可以用于实现消息队列，发布者将消息发送到消息队列，然后消息队列将消息路由到一个或多个已经订阅了这些消息的订阅者。
- 网络请求：在AJAX请求中，可以使用发布-订阅模式处理异步操作。比如你可以为请求的开始、结束、成功和失败等事件注册回调函数。

```js
class Publisher {
    constructor() {
        this.subscribers = {};
    }

    subscribe(event, callback) {
        if (!this.subscribers[event]) {
            this.subscribers[event] = [];
        }
        this.subscribers[event].push(callback);
    }

    unsubscribe(event, callback) {
        if (this.subscribers[event]) {
            this.subscribers[event] = this.subscribers[event].filter(sub => sub !== callback);
        }
    }

    publish(event, data) {
        if (this.subscribers[event]) {
            this.subscribers[event].forEach(callback => callback(data));
        }
    }
}

// Usage
const publisher = new Publisher();
publisher.subscribe('greeting', data => console.log(`Hello, ${data.name}!`));
publisher.publish('greeting', { name: 'Alice' });
publisher.unsubscribe('greeting', data => console.log(`Hello, ${data.name}!`));
```



## 事件总线 EventBus

所谓事件总线模式，其实就是实现发布订阅模式的一种方式 , 提供了一个中心化的事件处理系统，可以处理大量的事件和消息传递，并且支持复杂的事件处理逻辑，如事件过滤、优先级等。

**手写代码：**

```js
class EventBus {
  constructor() {
    this.listeners = {}; // 初始化一个 监听 对象，用于存储事件名称和对应的回调函数列表。
  }

  on(event, callback) {
    // 如果事件不存在，则创建一个新数组，用来存储该事件的回调函数列表
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(callback);  // 将回调函数 callback 添加到该事件的回调函数列表中
  }

  off(event, callback) {
    // 如果事件的回调函数列表存在，则从列表中移除指定的回调函数callback
    if (this.listeners[event]) {
      this.listeners[event] = this.listeners[event].filter(listener => listener !== callback);
    }
  }

  emit(event, data) {
    // 如果事件的回调函数列表存在，则遍历其回调函数列表，依次执行每个回调函数，并传入参数data
    if (this.listeners[event]) {
      this.listeners[event].forEach(callback => callback(data));
    }
  }
  
  emitOnce(event, once = false, ...data) {
    if (this.listeners[event]) {
      this.listeners[event].forEach(callback => callback(...data));
      // 如果 once 为 true，则在触发后删除该事件。
      if (once) {
        delete this.listeners[event]
      }
    }
  }
}

// Usage
const eventBus = new EventBus();
eventBus.on('message', message => console.log(`Received message: ${message}`));
eventBus.emit('message', 'Hello, Event Bus!');
eventBus.off('message', message => console.log(`Received message: ${message}`));
```



## 解析 URL 参数为对象

```js
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
    })
    
    return paramsObj;
}
```

## 大文件上传工具类

### Axios实现基础版

**功能点：**

- 大文件并发控制切片上传
- 断点续传（支持上传失败/中断后继续）

**实现思路：**

1. 文件切片处理

   读取用户上传的大文件（比如通过 `<input type="file">`）。

   设置一个切片大小（如 1MB），将整个文件按照该大小使用 File.prototype.slice() 方法切分成多个 Blob 切片。

   每个切片加上序号（chunkIndex）以便顺序管理。

2. 上传前先获取已上传记录

   向服务端发送一个初始化请求，带上文件的唯一标识（比如文件名+大小+lastModified 或使用 hash 算法如 SparkMD5）。

   服务端返回已上传切片列表（比如返回已上传的 chunkIndex 数组）。

   客户端比对所有切片，筛选出需要上传的未完成切片，这也是实现断点续传的关键。

3. 并发控制切片上传

   使用一个任务队列/并发池来上传切片，限制并发数量（例如最多同时上传 5 个切片）。

   每个上传任务通过 Axios.post() 上传切片数据，请求参数中携带：当前切片 blob、所属文件的标识、当前切片序号（chunkIndex）、切片总数（chunkTotal）

   上传失败的切片可设置重试次数，若失败则加入重试队列，或记录失败信息。

   > 并发控制可以通过自定义并发池（例如 async-pool、p-limit）或手动实现 promise 控制。

4. 上传成功后通知服务端合并

   所有切片上传完成后，客户端请求服务端一个**"合并切片"的接口**，通知服务端将这些切片按顺序合并成最终文件。

**实现代码：**

```js
import axios from 'axios';

export class AxiosUploader {
  constructor(file, options = {}) {
    this.file = file;  // 上传的文件对象
    this.chunkSize = options.chunkSize || 5 * 1024 * 1024;  // 分片大小，默认为5MB
    this.maxConcurrent = options.maxConcurrent || 4;  // 最大并发上传数，默认为4
    this.fileHash = '';  // 文件的哈希值，用于唯一标识文件
    this.fileChunks = [];  // 文件分片数组，存储文件的分片信息
    this.uploadedList = [];  // 已上传分片的索引数组
  }

  // 计算文件的SHA-256哈希值，或用Spark-MD5库实现
  async computeHash() {
    // 将文件转换为ArrayBuffer
    const buffer = await this.file.arrayBuffer();
    // 使用Web Crypto API计算文件的SHA-256哈希值
    const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
    // 将哈希值转换为十六进制字符串
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }

  // 初始化上传器，包括计算文件哈希值和获取已上传分片信息
  async init() {
    this.fileHash = await this.computeHash();  // 计算文件哈希值
    this.fileChunks = this.createChunks();  // 创建文件分片
    // 向服务器发送POST请求，获取已上传的分片索引
    const { data } = await axios.post('/upload/chunk/check', {
      fileHash: this.fileHash,
    });
    // 保存已上传的分片索引
    this.uploadedList = data.uploaded || [];
  }

  // 创建文件分片
  createChunks() {
    // 初始化分片数组
    const chunks = [];
    let index = 0;
    // 遍历文件，按分片大小切分文件
    for (let start = 0; start < this.file.size; start += this.chunkSize) {
      // 切分文件，获取分片
      const chunk = this.file.slice(start, start + this.chunkSize);
      // 将分片信息存储到chunks数组中
      chunks.push({ index, chunk });
      index++;
    }
    return chunks;
  }

  // 上传单个分片
  async uploadChunk({ index, chunk }) {
    // 创建FormData对象，用于封装分片数据
    const formData = new FormData();
    formData.append('fileHash', this.fileHash); // 文件哈希值
    formData.append('index', index); // 分片索引
    formData.append('chunk', chunk); // 分片数据

    // 使用axios发送POST请求，上传分片
    return axios.post('/upload/chunk', formData);
  }

  // 上传所有需要上传的分片
  async uploadAll() {
    // 筛选出需要上传的分片
    const toUpload = this.fileChunks.filter(
      ({ index }) => !this.uploadedList.includes(index)
    );

    // 初始化当前索引和并发池
    let current = 0;
    let active = [];

    // 定义上传下一个分片的函数
    const uploadNext = () => {
      // 根据最大并发数和需要上传的分片数量，控制并发上传
      while (current < toUpload.length && active.length < this.maxConcurrent) {
        const task = this.uploadChunk(toUpload[current++]);  // 获取当前分片任务
        active.push(task);  // 将任务添加到并发池

        // 在任务完成或失败后，从并发池中移除该任务，并触发下一个分片的上传
        task.finally(() => {
          active.splice(active.indexOf(task), 1);
          uploadNext(); // 触发下一个分片的上传
        });
      }

      return Promise.all(active);  // 返回所有并发任务的Promise.all
    };

    await uploadNext();  // 开始上传所有分片

    // 合并所有分片
    await axios.post('/upload/merge', {
      fileHash: this.fileHash, // 文件哈希值
      filename: this.file.name, // 文件名
      total: this.fileChunks.length, // 分片总数
    });
  }

  // 开始上传流程
  async start() {
    await this.init();  // 初始化上传器
    await this.uploadAll();  // 上传所有分片
  }
}
```

使用示例：

```js
input.addEventListener('change', async (e) => {
  const uploader = new AxiosUploader(e.target.files[0]);
  await uploader.start();
});
```

### 原生JS实现基础版

```js
function submitUpload() {
             const chunkSize = 2 * 1024 * 1024; // 分片大小2MB
             const file = document.getElementById('f1').files[0];
             const chunks = []; // 存储分片的数组
             const token = Date.now(); // 以时间戳作为token
             const name = file.name;
             // 如果想要显示上传进度，可以使用(已上传切片数*100/总切片数)来计算...
  
             // 文件分片
             let start = 0;
             while (start < file.size) {
                 const end = Math.min(start + chunkSize, file.size);
                 chunks.push(file.slice(start, end));
                 start = end;
             }
  
             // 上传分片
             const uploadChunk = async (index) => {
                 const fd = new FormData();
                 fd.append('file', chunks[index], `${name}`); // 修正文件名
                 fd.append('token', token);
                 fd.append('index', index);
                 return new Promise((resolve) => {
                     const xhr = new XMLHttpRequest();
                     xhr.open('POST', 'http://localhost:7399/upload', true);
                     // 设置请求头以发送 JSON 格式的参数（如果需要）
                     // xhr.setRequestHeader('Content-Type', 'multipart/form-data'); // 默认会自动设置
                     xhr.onload = () => {
                         console.log(`分片${index}上传结果:`, xhr.status, xhr.responseText);
                         resolve();
                     };
                     xhr.send(fd);
                 });
             };
             // 并发控制上传
             const concurrentUpload = async () => {
                 const CONCURRENT_LIMIT = 3; // 并发数
                 const total = chunks.length;
                 for (let i = 0; i < total; i += CONCURRENT_LIMIT) {
                     await Promise.all(
                         chunks.slice(i, i + CONCURRENT_LIMIT)
                             .map((_, idx) => uploadChunk(i + idx))
                     );
                     console.log(`已上传 ${Math.min(i + CONCURRENT_LIMIT, total)}/${total}`);
                 }
                 // 合并请求
                 const xhr = new XMLHttpRequest();
                 xhr.open('POST', 'http://localhost:7399/merge', true);
                 xhr.setRequestHeader('Content-Type', 'application/json');
                 xhr.onload = () => {
                     console.log('合并结果:', xhr.status, xhr.responseText);
                     alert(xhr.status === 200 ? '文件上传成功!' : '文件上传失败!');
                 };
                 xhr.send(JSON.stringify({
                     token: token,
                     filename: name,
                     chunkCount: chunks.length
                 }));
             };
             concurrentUpload().catch(console.error);
}
```



### Axios实现满血版

**具体功能点：**

- 大文件并发控制切片上传
- 显示上传进度（依靠服务器返回上传成功的分片数来计算百分比）
- 断点续传（支持上传失败/中断后继续）
- 秒传（通过计算文件 Hash + 检查文件 Hash 是否存在）
- 暂停上传
- 恢复上传

```js
// UploadManager.js
import axios from 'axios';

const CHUNK_SIZE = 5 * 1024 * 1024;  // 定义分片大小，默认为5MB
const MAX_CONCURRENT = 4;  // 定义最大并发上传数，默认为4

export class UploadManager {
  // 构造函数，初始化上传管理器
  constructor(file, options = {}) {
    this.file = file;  // 上传的文件对象
    this.chunkSize = options.chunkSize || CHUNK_SIZE;  // 分片大小，可由options指定，否则使用默认值
    this.maxConcurrent = options.maxConcurrent || MAX_CONCURRENT;  // 最大并发上传数，可由options指定，否则使用默认值
    this.onProgress = options.onProgress || (() => {});  // 上传进度回调函数，默认为空函数
    this.onComplete = options.onComplete || (() => {});  // 上传完成回调函数，默认为空函数
    this.fileHash = '';  // 文件的哈希值，用于唯一标识文件
    this.fileChunks = [];   // 文件分片数组，存储文件的分片信息
    this.uploadedList = [];  // 已上传分片的索引数组
    this.paused = false;  // 是否暂停上传
    this.controller = new AbortController();  // AbortController实例，用于取消上传
  }

  // 【秒传】计算文件的SHA-256哈希值
  async computeHash() {
    const chunks = []; // 创建分片数组
    let cur = 0;
    while (cur < this.file.size) {
      // 将文件按分片大小切分，存储到chunks数组中
      chunks.push(this.file.slice(cur, cur + this.chunkSize));
      cur += this.chunkSize;
    }

    const buffer = await this.file.arrayBuffer();  // 将文件转换为ArrayBuffer
    // 使用Web Crypto API计算文件的SHA-256哈希值
    const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
    // 将哈希值转换为十六进制字符串
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    this.fileHash = hashHex;  // 保存文件哈希值
    return hashHex;
  }

  // 检查文件是否已存在
  async checkFileExists() {
    // 向服务器发送POST请求，检查文件是否存在
    const { data } = await axios.post('/upload/check', {
      fileHash: this.fileHash, // 文件哈希值
      filename: this.file.name, // 文件名
    });
    return data; // 返回服务器响应的数据
  }

  // 获取已上传的分片索引
  async getUploadedChunks() {
    // 向服务器发送POST请求，获取已上传的分片索引
    const { data } = await axios.post('/upload/chunk/check', {
      fileHash: this.fileHash, // 文件哈希值
    });
    // 保存已上传的分片索引
    this.uploadedList = data.uploaded || [];
    return this.uploadedList;
  }

  // 创建文件分片
  createChunks() {
    // 清空分片数组
    this.fileChunks = [];
    let cur = 0;
    let index = 0;
    while (cur < this.file.size) {
      // 将文件按分片大小切分，存储到fileChunks数组中
      const chunk = this.file.slice(cur, cur + this.chunkSize);
      this.fileChunks.push({ chunk, index });
      cur += this.chunkSize;
      index++;
    }
  }

  // 上传单个分片
  async uploadChunk({ chunk, index }) {
    // 创建FormData对象，用于封装分片数据
    const formData = new FormData();
    formData.append('fileHash', this.fileHash); // 文件哈希值
    formData.append('filename', this.file.name); // 文件名
    formData.append('index', index); // 分片索引
    formData.append('chunk', chunk); // 分片数据

    // 使用axios发送POST请求，上传分片
    await axios.post('/upload/chunk', formData, {
      signal: this.controller.signal, // 使用AbortController控制请求取消
    });
  }

  // 合并分片
  async mergeChunks() {
    // 向服务器发送POST请求，请求合并分片
    await axios.post('/upload/merge', {
      fileHash: this.fileHash, // 文件哈希值
      filename: this.file.name, // 文件名
      total: this.fileChunks.length, // 分片总数
    });
  }

  // 开始上传
  async start() {
    // 设置暂停状态为false
    this.paused = false;
    // 重新创建AbortController实例
    this.controller = new AbortController();

    // 计算文件哈希值
    this.fileHash = await this.computeHash();
    // 检查文件是否已存在
    const status = await this.checkFileExists();
    if (status.uploaded) {
      // 如果文件已存在，直接调用onProgress和onComplete回调
      this.onProgress(100);
      this.onComplete();
      return;
    }

    // 创建文件分片
    this.createChunks();
    // 获取已上传的分片索引
    await this.getUploadedChunks();

    // 计算已上传分片的进度
    let uploaded = this.uploadedList.length;
    this.onProgress((uploaded / this.fileChunks.length) * 100);

    // 筛选出需要上传的分片
    const needUpload = this.fileChunks.filter(
      ({ index }) => !this.uploadedList.includes(index)
    );

    // 初始化并发池和当前索引
    let pool = [];
    let current = 0;

    // 定义上传下一个分片的函数
    const uploadNext = async () => {
      // 如果已暂停，直接返回
      if (this.paused) return;

      // 根据最大并发数和需要上传的分片数量，控制并发上传
      while (pool.length < this.maxConcurrent && current < needUpload.length) {
        const { chunk, index } = needUpload[current++];
        // 上传分片，并在上传完成后更新进度和并发池
        const task = this.uploadChunk({ chunk, index }).then(() => {
          uploaded++;
          this.onProgress((uploaded / this.fileChunks.length) * 100);
          pool.splice(pool.indexOf(task), 1);
          uploadNext();
        });
        pool.push(task);
      }

      // 如果所有分片都已上传完成，调用mergeChunks合并分片，并触发onComplete回调
      if (uploaded === this.fileChunks.length) {
        await this.mergeChunks();
        this.onComplete();
      }
    };

    // 开始上传
    uploadNext();
  }

  // 暂停上传
  pause() {
    // 设置暂停状态为true
    this.paused = true;
    // 使用AbortController取消所有正在进行的上传请求
    this.controller.abort();
  }

  // 恢复上传
  resume() {
    // 如果未暂停，直接返回
    if (!this.paused) return;
    // 调用start方法重新开始上传
    this.start();
  }
}
```

使用方式：

```JS
import { UploadManager } from './UploadManager';

const fileInput = document.querySelector('#file');

fileInput.addEventListener('change', (e) => {
  const file = e.target.files[0];
  const uploader = new UploadManager(file, {
    onProgress: (percent) => {
      console.log(`上传进度：${percent.toFixed(2)}%`);
    },
    onComplete: () => {
      console.log('上传完成！');
    },
  });

  window.uploader = uploader; // 可用于调试暂停/恢复
  uploader.start();
});

// 调用暂停、恢复：
window.uploader.pause();
window.uploader.resume();
```



### 纯原生JS实现满血版

```js
// NativeUploadManager.js

const CHUNK_SIZE = 5 * 1024 * 1024;
const MAX_CONCURRENT = 4;

export class NativeUploadManager {
  constructor(file, options = {}) {
    this.file = file;
    this.chunkSize = options.chunkSize || CHUNK_SIZE;
    this.maxConcurrent = options.maxConcurrent || MAX_CONCURRENT;
    this.onProgress = options.onProgress || (() => {});
    this.onComplete = options.onComplete || (() => {});
    this.fileHash = '';
    this.fileChunks = [];
    this.uploadedList = [];
    this.paused = false;
    this.abortController = new AbortController();
  }

  async computeHash() {
    const buffer = await this.file.arrayBuffer();
    const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }

  post(url, bodyObj) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('POST', url);
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.onload = () => {
        if (xhr.status === 200) {
          resolve(JSON.parse(xhr.responseText));
        } else {
          reject(new Error(`POST ${url} failed: ${xhr.status}`));
        }
      };
      xhr.onerror = reject;
      xhr.send(JSON.stringify(bodyObj));
    });
  }

  postFormData(url, formData) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('POST', url);
      xhr.onload = () => {
        if (xhr.status === 200) {
          resolve(xhr.responseText);
        } else {
          reject(new Error(`POST ${url} failed: ${xhr.status}`));
        }
      };
      xhr.onerror = reject;
      if (this.abortController.signal.aborted) {
        reject(new Error('Aborted'));
        return;
      }
      xhr.send(formData);
    });
  }

  async createChunks() {
    const chunks = [];
    let cur = 0;
    let index = 0;
    while (cur < this.file.size) {
      const chunk = this.file.slice(cur, cur + this.chunkSize);
      chunks.push({ chunk, index });
      cur += this.chunkSize;
      index++;
    }
    this.fileChunks = chunks;
  }

  async start() {
    this.paused = false;
    this.abortController = new AbortController();
    this.fileHash = await this.computeHash();
    const filename = this.file.name;

    const status = await this.post('/upload/check', {
      fileHash: this.fileHash,
      filename,
    });

    if (status.uploaded) {
      this.onProgress(100);
      this.onComplete();
      return;
    }

    await this.createChunks();
    const uploaded = await this.post('/upload/chunk/check', {
      fileHash: this.fileHash,
    });

    this.uploadedList = uploaded.uploaded || [];
    let uploadedCount = this.uploadedList.length;
    this.onProgress((uploadedCount / this.fileChunks.length) * 100);

    const needUpload = this.fileChunks.filter(
      ({ index }) => !this.uploadedList.includes(index)
    );

    let current = 0;
    let activeRequests = [];

    const uploadNext = () => {
      if (this.paused || current >= needUpload.length) return;

      while (activeRequests.length < this.maxConcurrent && current < needUpload.length) {
        const { chunk, index } = needUpload[current++];
        const formData = new FormData();
        formData.append('fileHash', this.fileHash);
        formData.append('filename', filename);
        formData.append('index', index);
        formData.append('chunk', chunk);

        const uploadPromise = this.postFormData('/upload/chunk', formData)
          .then(() => {
            uploadedCount++;
            this.onProgress((uploadedCount / this.fileChunks.length) * 100);
            activeRequests = activeRequests.filter(p => p !== uploadPromise);
            uploadNext();
          })
          .catch(err => {
            if (!this.paused) console.error(`Chunk ${index} failed:`, err);
          });

        activeRequests.push(uploadPromise);
      }

      // 监控所有上传结束
      Promise.all(activeRequests).then(async () => {
        if (uploadedCount === this.fileChunks.length && !this.paused) {
          await this.post('/upload/merge', {
            fileHash: this.fileHash,
            filename,
            total: this.fileChunks.length,
          });
          this.onProgress(100);
          this.onComplete();
        }
      });
    };

    uploadNext();
  }

  pause() {
    this.paused = true;
    this.abortController.abort(); // Cancel current xhrs
  }

  resume() {
    if (!this.paused) return;
    this.start();
  }
}
```

使用方式：

```html
<input type="file" id="fileInput" />
<button onclick="window.uploader.pause()">暂停</button>
<button onclick="window.uploader.resume()">恢复</button>

<script type="module">
  import { NativeUploadManager } from './NativeUploadManager.js';

  document.querySelector('#fileInput').addEventListener('change', e => {
    const file = e.target.files[0];
    const uploader = new NativeUploadManager(file, {
      onProgress: (percent) => {
        console.log(`上传进度：${percent.toFixed(2)}%`);
      },
      onComplete: () => {
        console.log('✅ 上传完成');
      },
    });

    window.uploader = uploader;
    uploader.start();
  });
</script>
```



## 字符串模板

```js
function render(template, data) {
    const reg = /\{\{(\w+)\}\}/; // 模板字符串正则
    if (reg.test(template)) { // 判断模板里是否有模板字符串
        const name = reg.exec(template)[1]; // 查找当前模板里第一个模板字符串的字段
        template = template.replace(reg, data[name]); // 将第一个模板字符串渲染
        return render(template, data); // 递归的渲染并返回渲染后的结构
    }
    return template; // 如果模板没有模板字符串直接返回
}
```

## ==滚动加载==

### 向上滚动加载

滚动到顶部的时候触发加载，原理是监听滚动事件，当滚动条接近顶部时（例如小于 50px），触发数据加载，并保持滚动位置不变。

```
滚动条向下滚动距离 <= 触发阈值
```

> 一个元素的 scrollTop 值是这个元素的内容顶部（卷起来的）到它的视口可见内容（的顶部）的距离的度量。当一个元素的内容没有产生垂直方向的滚动条，那么它的 scrollTop 值为0。

应用场景：**聊天室**
默认显示最新的消息，设定滚动条初始位置在最底下，然后向上滚动到顶部，就加载旧的消息，即自下往上的形式，并且要求滚动条的位置不变。

```jsx
import React, { useEffect, useRef, useState } from 'react';

const UpScrollList = () => {
  const [items, setItems] = useState({});
  const listRef = useRef(null);

  const loadMore = async () => {
    const el = listRef.current;
    const prevScrollHeight = el.scrollHeight;

    const newItems = await Axios.get(); // 加载更多数据
    setItems(prev => [...newItems.reverse(), ...prev]);

    setTimeout(() => {
      const newScrollHeight = el.scrollHeight;
      el.scrollTop = newScrollHeight - prevScrollHeight + el.scrollTop;
    }, 0); // next tick
  };

  const handleScroll = () => {
    const el = listRef.current;
    if (el.scrollTop <= 50) {
      loadMore();
    }
  };

  useEffect(() => {
    const el = listRef.current;
    if (el) {
      el.addEventListener('scroll', handleScroll);
      el.scrollTop = el.scrollHeight;  // 初始滚动到底部
      return () => el.removeEventListener('scroll', handleScroll);  // 组件卸载时移除监听
    }
  }, []);

  return (
    <div
      ref={listRef}
      style={{ height: '400px', overflowY: 'scroll', border: '1px solid #ccc' }}
    >
      {items.map((item, i) => (
        <div key={i} style={{ padding: '10px', borderBottom: '1px solid #eee' }}>
          {item}
        </div>
      ))}
    </div>
  );
};
```

### 向下滚动加载

滚动到底部时触发加载，原理是监听滚动事件，当滚动条接近底部，超过预设的触发阈值时，触发数据加载。

```
可视区高度 + 滚动条向下滚动距离 >= 内容实际高度 - 触发阈值
```

应用场景：**商城商品的展示**
默认滚动条在最顶上，然后向下滚动，滚动到底部就加载更多的数据。

```jsx
import React, { useEffect, useRef, useState } from 'react';

const DownScrollList = () => {
  const [items, setItems] = useState({});
  const listRef = useRef(null);

  const loadMore = async () => {
    const newItems = await Axios.get();
    setItems(prev => [...prev, ...newItems]);
  };

  const handleScroll = () => {
    const el = listRef.current;
    if (el.scrollTop + el.clientHeight >= el.scrollHeight - 100) {
      loadMore();
    }
  };

  useEffect(() => {
    const el = listRef.current;
    if (el) {
      el.addEventListener('scroll', handleScroll);
      return () => el.removeEventListener('scroll', handleScroll);
    }
  }, [items]);

  return (
    <div
      ref={listRef}
      style={{ height: '400px', overflowY: 'scroll', border: '1px solid #ccc' }}
    >
      {items.map((item, i) => (
        <div key={i} style={{ padding: '10px', borderBottom: '1px solid #eee' }}>
          {item}
        </div>
      ))}
    </div>
  );
};
```



## 图片懒加载

> [彻底玩转图片懒加载及底层实现原理图片懒加载其实已经是一个近乎“烂大街”的词语了，在大大小小的面试中也会被频繁的问到，我在 - 掘金](https://juejin.cn/post/6924918404444848136#heading-2)
>
> [前端必会的图片懒加载(三种方式) - 李云蹊 - 博客园](https://www.cnblogs.com/liyunxi/p/16699184.html)

当用户滚动相应可视区域，若可视区域有图片便加载，而在可视区域外未加载过的图片它们先不加载，如果用户滚动可视区域到它们时它们再加载，否则一律不加载。这样一来就大大提高了网页渲染的性能和减少不必要的浪费。

**原理：判断图片是否出现在可视区，若是，则给图片赋值src属性。**

那如何判断图片是否出现在可视区？主要有下面的几种方法：

### 方法一：`IntersectionObserver`

`IntersectionObserver`是浏览器原生的 API，可以用来监听目标元素与视口（或指定父元素）的交集变化，**性能最优**，无兼容性问题（IE 需 polyfill）。

实现步骤：

1. IntersectionObserver是浏览器原生提供的构造函数，先new一个实例：

   ```js
   const observer = new IntersectionObserver(callback, options);
   options = {
     root: null,        // 默认视口，可指定父元素
     threshold: 0.1,    // 10% 可见时触发
     rootMargin: '0px'  // 提前/延迟触发范围
   }
   ```

   其中它第一个参数callback是一个回调函数，当目标元素能看见会触发一次，目标元素看不见会再触发一次。

   第二个参数是一个可以用来配置 observer 实例的对象。如果`options`未指定，observer 实例默认使用文档视口作为 root，并且没有 margin，阈值为 0%（意味着即使一像素的改变都会触发回调函数）。

   > `root`：监听元素的祖先元素Element对象，其边界盒将被视作视口。目标在root的可见区域的任何不可见部分都会被视为不可见。
   >
   > `rootMargin`：一个在计算交叉值时添加至根的边界盒，中的一组偏移量，类型为字符串 (string) ，可以有效的缩小或扩大根的判定范围从而满足计算需要。语法大致和 CSS 中的 margin 等同。
   >
   > `threshold`：规定了一个监听目标与边界盒交叉区域的比例值，可以是一个具体的数值或是一组 0.0 到 1.0 之间的数组。若指定值为 0.0，则意味着监听元素即使与根有 1 像素交叉，此元素也会被视为可见。若指定值为 1.0，则意味着整个元素都在可见范围内时才算可见。

2. 使用实例通过observer属性可以为每一张图片绑定一个观察器：

   ```js
   for (let i of images) { observer.observe(i); }
   ```

3. callback回调函数中有一个参数entries，它是一个数组，其数组元素为当前改变了状态触发了事件的目标元素。具体利用的是isIntersecting属性，当目标元素在视口看得见为它true，不在时它为 false。

   因此，可以利用这个属性，当它为 true 时设置触发这个事件的图片的src属性值为data-src，开始加载。

   另外，当回来滚动时，图片会一会可见一会不可见，它都会触发回调函数，所以当某图片已经加载时我们要利用unobserve属性停掉它的观察器。

   ```js
   function callback(entries) {
     for (let i of entries) {
       if (i.isIntersecting) {
         console.log('元素进入视口', i.target);
         let img = i.target;  //  target 事件属性返回触发事件的元素
         let trueSrc = img.getAttribute("data-src");
         img.setAttribute("src", trueSrc);
         observer.unobserve(img);  // 结束观察
       }
     } 
   }
   ```

### 方法二：`getBoundingClientRect()`

通过`getBoundingClientRect()`的上下左右获取元素相对于视口的上下左右坐标位置，然后与当前窗口的高度`window.innerHeight`相比较，进而判断是否进入可视区域。比如，当元素对于窗口的位置小于当前窗口的高度时，那自然处于了窗口可视区了。

代码示例：

```js
function isInViewport(el) {
  const rect = el.getBoundingClientRect();
  return (
    rect.top <= window.innerHeight &&
    rect.bottom >= 0 &&
    rect.left <= window.innerWidth &&
    rect.right >= 0
  );
}

// 滚动事件监听（一般搭配节流函数使用）
window.addEventListener('scroll', throttle(() => {
  document.querySelectorAll('.lazy-item').forEach(el => {
    if (isInViewport(el)) {
      console.log('元素进入视口', el);
      let trueSrc = el.getAttribute("data-src");
      i.setAttribute("src", trueSrc);
    }
  });
}, 200));

function throttle(fn, delay, atleast) {
  var timeout = null,
    startTime = new Date();
  return function () {
    var curTime = new Date();
    clearTimeout(timeout);
    if (curTime - startTime >= atleast) {
      fn();
      startTime = curTime;
    } else {
      timeout = setTimeout(fn, delay);
    }
  };
}
```

### 方法三：`offsetTop` + `scrollTop`

本方法通过对比元素距离文档顶部的偏移量和滚动高度判断。以图片显示为例：

- `window.innerHeight` 是浏览器可视区的高度；

  > innerHeight和clientHeight的区别：前者返回**window**的内部高度，包括横向滚动条；后者返回的是**viewport的高度**，不算滚动条。

- `document.body.scrollTop || document.documentElement.scrollTop` 是浏览器滚动的过的距离；

- `imgs.offsetTop` 是元素顶部相对**最近的有定位祖先元素（offsetParent）**的距离（包括滚动条的距离）。若元素嵌套层次深，`offsetTop` 可能不足以准确计算它相对整个文档的偏移量，因此可以用递归计算；

- 内容达到显示区域的判定：`img.offsetTop < window.innerHeight + document.body.scrollTop && img.offsetTop + img.offsetHeight > document.body.scrollTop`

  即，当页面已滚动的高度加上可视区域的高度，大于元素顶部相对于文档的距离，并且页面已滚动的高度小于元素底部相对于文档的距离时，说明该元素已经进入了视口区域（即至少有一部分在屏幕内可见）。通俗的表达：如果页面当前可见的区域与该元素有交集（即该元素的顶部进入了视口，或者它的一部分还未滚出视口），就认为这个元素在视口中。

代码示例：

```js
function isInViewport(el) {
  // 获取当前页面已滚动的高度
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  // 获取浏览器可视区域高度的兼容写法
  const viewportHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
  // 递归计算元素相对文档顶部的距离
  const elOffsetTop = getOffsetTop(el);
  // 获取元素本身的高度
  const elHeight = el.offsetHeight;
  // 判断：元素是否出现在当前可视区域内（部分可见也算）
  return (scrollTop + viewportHeight > elOffsetTop) && (scrollTop < elOffsetTop + elHeight);
}

// 递归获取元素相对 document 顶部的 offsetTop 值
function getOffsetTop(el) {
  let offset = 0;
  while (el) {
    offset += el.offsetTop;
    el = el.offsetParent;
  }
  return offset;
}
```

## 虚拟列表

**原理：**

整个虚拟列表划分为三个区域，分别是上缓冲区(0/2个元素)，可视区(n个元素)，下缓冲区(2个元素)。当我们滚动到一个元素离开可视区范围内时，就去掉上缓冲区顶上的一个元素，然后再下缓冲区增加一个元素。这就是虚拟列表的核心原理了。

### 元素高度固定

**实现步骤：**

1. 首先先计算出由1000个元素撑起的盒子(称之为container)的高度，撑开盒子，让用户能进行滚动操作。
2. 计算出可视区的起始索引、上缓冲区的起始索引以及下缓冲区的结束索引（就像上图滚动后，上缓冲区的起始索引为2，可视区起始索引为4，下缓冲区结束索引为9）。
3. 采用绝对定位，计算上缓冲区到下缓冲区之间的每一个元素在contianer中的top值，只有知道top值才能让元素出现在可视区内。
4. 将上缓冲区到下缓冲区的元素塞到container中。

**实现代码：**

```jsx
import { useState } from 'react';
 
const FixedSizeList = (props) => {
  const { height, width, itemSize, itemCount, children: Child } = props;
  // 记录滚动掉的高度
  const [scrollOffset, setScrollOffset] = useState(0);
 
  // 外部容器高度
  const containerStyle = {
    position: 'relative',
    width,
    height,
    overflow: 'auto',
  };
 
  // 1000个元素撑起盒子的实际高度
  const contentStyle = {
    height: itemSize * itemCount,
    width: '100%',
  };
    
  const getCurrentChildren = () => {
    // 可视区起始索引
    const startIndex = Math.floor(scrollOffset / itemSize);
    // 上缓冲区起始索引
    const finialStartIndex = Math.max(0, startIndex - 2);
    // 可视区能展示的元素的最大个数
    const numVisible = Math.ceil(height / itemSize);
    // 下缓冲区结束索引
    const endIndex = Math.min(itemCount, startIndex + numVisible + 2);
    const items = [];
    // 根据上面计算的索引值，不断添加元素给container
    for (let i = finialStartIndex; i < endIndex; i++) {
      const itemStyle = {
        position: 'absolute',
        height: itemSize,
        width: '100%',
        // 计算每个元素在container中的top值
        top: itemSize * i,
      };
      items.push(
        <Child key={i} index={i} style={itemStyle} />
      );
    }
    return items;
  }
 
  // 当触发滚动就重新计算
  const scrollHandle = (event) => {
    const { scrollTop } = event.currentTarget;
    setScrollOffset(scrollTop);
  }
 
  return (
    <div style={containerStyle} onScroll={scrollHandle}>
       <div style={contentStyle}>
          {getCurrentChildren()}
       </div>
    </div>
  );
};
 
export default FixedSizeList;
```

**使用方式：**

```jsx
const Row = ({ index, style, forwardRef }) => {
  return (
    <div className={index % 2 ? 'list-item-odd' : 'list-item-even'} style={style} ref={forwardRef}>
      {`Row ${index}`}
    </div>
  )
}
 
const App = () => {
  return (
    <FixedSizeList
      className="list"
      height={200}
      width={200}
      itemSize={50}
      itemCount={1000}
    >
      {Row}
    </FixedSizeList>
  );
}
```



### 元素高度不定

**难点及解决方案：**

- 难点一：由于每个元素高度不一，我们起先无法直接计算出container的总高度。

  解决方案：可以通过遍历所有的Row计算出总高度；或者自己假设每一个元素的高度，在乘上个数，弄出一个假的但足够高的container让用户去触发滚动事件。无非就是为了容器足够高，让用户能进行滚动操作。

- 难点二：每个元素高度不一，每个元素的top值不能通过`itemSize * index`直接计算出top值。

- 难点三：每个元素高度不一，不能直接通过`scrollOffset / itemSize`计算出已被滚动掉的元素的个数，很难获取到可视区的起始索引。

  二和三的解决方案：难点二和难点三本质都一样，元素高度不一，导致不知道被滚动掉了多少元素，只要知道被滚动掉的元素的个数，top值和索引都迎刃而解。可以这样解决，每次只需要计算上缓冲区到下缓冲区之间的元素，并记录他们，并且记录下最底下的那个元素的索引，当用户进行滚动时，如果我们是向上滚动，就可以直接从已经计算好的记录里取，如果向下滚动，我们根据上一次记录的最大的索引的那个元素不断累加新元素的高度，直到它大于已经滚动掉的高度，此时的索引值就是可视区的起始索引了，这个起始索引所对应的top就是累加的高度。

**实现代码：**

```jsx
import { useState } from 'react';
 
// 元数据
const measuredData = {
  measuredDataMap: {},
  LastMeasuredItemIndex: -1,
};
 
const estimatedHeight = (defaultEstimatedItemSize = 50, itemCount) => {
  let measuredHeight = 0;
  const { measuredDataMap, LastMeasuredItemIndex } = measuredData;
  // 计算已经获取过真实高度的项的高度之和
  if (LastMeasuredItemIndex >= 0) {
    const lastMeasuredItem = measuredDataMap[LastMeasuredItemIndex];
    measuredHeight = lastMeasuredItem.offset + lastMeasuredItem.size;
  }
  // 未计算过真实高度的项数
  const unMeasuredItemsCount = itemCount - measuredData.LastMeasuredItemIndex - 1;
  // 预测总高度
  const totalEstimatedHeight = measuredHeight + unMeasuredItemsCount * defaultEstimatedItemSize;
  return totalEstimatedHeight;
}
 
const getItemMetaData = (props, index) => {
  const { itemSize } = props;
  const { measuredDataMap, LastMeasuredItemIndex } = measuredData;
  // 如果当前索引比已记录的索引要大，说明要计算当前索引的项的size和offset
  if (index > LastMeasuredItemIndex) {
    let offset = 0;
    // 计算当前能计算出来的最大offset值
    if (LastMeasuredItemIndex >= 0) {
      const lastMeasuredItem = measuredDataMap[LastMeasuredItemIndex];
      offset += lastMeasuredItem.offset + lastMeasuredItem.size;
    }
    // 计算直到index为止，所有未计算过的项
    for (let i = LastMeasuredItemIndex + 1; i <= index; i++) {
      const currentItemSize = itemSize(i);
      measuredDataMap[i] = { size: currentItemSize, offset };
      offset += currentItemSize;
    }
    // 更新已计算的项的索引值
    measuredData.LastMeasuredItemIndex = index;
  }
  return measuredDataMap[index];
};
 
const getStartIndex = (props, scrollOffset) => {
  const { itemCount } = props;
  let index = 0;
  while (true) {
    const currentOffset = getItemMetaData(props, index).offset;
    if (currentOffset >= scrollOffset) return index;
    if (index >= itemCount) return itemCount;
    index++
  }
}
 
const getEndIndex = (props, startIndex) => {
  const { height, itemCount } = props;
  // 获取可视区内开始的项
  const startItem = getItemMetaData(props, startIndex);
  // 可视区内最大的offset值
  const maxOffset = startItem.offset + height;
  // 开始项的下一项的offset，之后不断累加此offset，直到等于或超过最大offset，就是找到结束索引了
  let offset = startItem.offset + startItem.size;
  // 结束索引
  let endIndex = startIndex;
  // 累加offset
  while (offset <= maxOffset && endIndex < (itemCount - 1)) {
    endIndex++;
    const currentItem = getItemMetaData(props, endIndex);
    offset += currentItem.size;
  }
  return endIndex;
};
 
const getRangeToRender = (props, scrollOffset) => {
  const { itemCount } = props;
  const startIndex = getStartIndex(props, scrollOffset);
  const endIndex = getEndIndex(props, startIndex);
  return [
    Math.max(0, startIndex - 2),
    Math.min(itemCount - 1, endIndex + 2),
    startIndex,
    endIndex,
  ];
};
 
const VariableSizeList = (props) => {
  const { height, width, itemCount, itemEstimatedSize, children: Child } = props;
  const [scrollOffset, setScrollOffset] = useState(0);
 
  const containerStyle = {
    position: 'relative',
    width,
    height,
    overflow: 'auto',
    willChange: 'transform'
  };
 
  const contentStyle = {
    height: estimatedHeight(itemEstimatedSize, itemCount),
    width: '100%',
  };
 
  const getCurrentChildren = () => {
    const [startIndex, endIndex, originStartIndex, originEndIndex] = getRangeToRender(props, scrollOffset)
    const items = [];
    for (let i = startIndex; i <= endIndex; i++) {
      const item = getItemMetaData(props, i);
      const itemStyle = {
        position: 'absolute',
        height: item.size,
        width: '100%',
        top: item.offset,
      };
      items.push(
        <Child key={i} index={i} style={itemStyle} />
      );
    }
    return items;
  }
 
  const scrollHandle = (event) => {
    const { scrollTop } = event.currentTarget;
    setScrollOffset(scrollTop);
  }
 
  return (
    <div style={containerStyle} onScroll={scrollHandle}>
      <div style={contentStyle}>
        {getCurrentChildren()}
      </div>
    </div>
  );
};
 
export default VariableSizeList;
```

**使用方式：**

```jsx
const rowSizes = new Array(1000).fill(true).map(() => 25 + Math.round(Math.random() * 55))
const getItemSize = (index) => rowSizes[index];
 
const Row = ({ index, style }) => {
  return (
    <div className={index % 2 ? 'list-item-odd' : 'list-item-even'} style={style} >
      Row {index}
    </div>
  )
}
 
const App = () => {
  return (
    <VariableSizeList
      className="list"
      height={200}
      width={200}
      itemSize={getItemSize}
      itemCount={1000}
    >
      {Row}
    </VariableSizeList>
  );
}
```



## 函数防抖和节流

| 特性     | 防抖（Debounce）                                  | 节流（Throttle）                                   |
| -------- | ------------------------------------------------- | -------------------------------------------------- |
| 行为     | 频繁触发时只在**最后一次**操作结束后执行          | 固定时间间隔内**最多执行一次**                     |
| 使用场景 | 输入框搜索联想词、窗口 resize、按钮点击提交防连点 | 滚动监听、拖动、频繁动画刷新、颜色选择、resize缩放 |

### 函数防抖

触发高频事件 N 秒后只会执行一次，如果 N 秒内事件再次触发，则会重新计时。防抖的核心就是利用定时器`setTimeout()`来实现。

实现思路：

1. 声明一个定时器变量
2. 当鼠标每次滑动都先判断是否有定时器了，如果有定时器先清除以前的定时器
3. 如果没有定时器则开启定时器，记得存到变量里面
4. 在定时器里面调用要执行的函数

简单版：

```js
function debounce(fn, t){
  let timer = null;
	// return 返回一个匿名函数
  return function(){
    if(timer) clearTimeout(timer)
    timer = setTimeout(function(){
      fn(); // 加小括号调用 fn函数
    }, t)
  }
}
box.addEventListener('scroll', debounce(mouseMove, 500));
```

最终版：除了支持 this 和 event 外，还支持以下功能：

- 支持立即执行；
- 函数可能有返回值；
- 支持取消功能；

```js
function debounce(func, wait, immediate) {
    var timeout, result;
    
    var debounced = function () {
        var context = this;
        var args = arguments;
        
        if (timeout) clearTimeout(timeout);
        if (immediate) {
            // 如果已经执行过，不再执行
            var callNow = !timeout;
            timeout = setTimeout(function(){
                timeout = null;
            }, wait)
            if (callNow) result = func.apply(context, args)
        } else {
            timeout = setTimeout(function(){
                func.apply(context, args)
            }, wait);
        }
        return result;
    };

    debounced.cancel = function() {
        clearTimeout(timeout);
        timeout = null;
    };

    return debounced;
}
```

使用方法：

```js
var setUseAction = debounce(getUserAction, 10000, true);
// 使用防抖
node.onmousemove = setUseAction

// 取消防抖
setUseAction.cancel()
```



### 函数节流

触发高频事件，且 N 秒内只执行一次。

节流在间隔一段时间执行一次回调的场景有：

- 滚动加载，加载更多或滚到底部监听
- 搜索框，搜索联想功能

可以将时间戳写法的特性与定时器写法的特性相结合，实现一个更加精确的节流。实现如下：

```js
function throttled(fn, delay) {
    let timer = null
    let starttime = Date.now()
    return function () {
        let curTime = Date.now() // 当前时间
        let remaining = delay - (curTime - starttime)  // 从上一次到现在，还剩下多少多余时间
        let context = this
        let args = arguments
        clearTimeout(timer)
        if (remaining <= 0) {
            fn.apply(context, args)
            starttime = Date.now()
        } else {
            timer = setTimeout(fn, remaining);
        }
    }
}
```

最终版：支持取消节流；另外通过传入第三个参数，options.leading 来表示是否可以立即执行一次，opitons.trailing 表示结束调用的时候是否还要执行一次，默认都是 true。 注意设置的时候不能同时将 leading 或 trailing 设置为 false。

```js
function throttle(func, wait, options) {
    var timeout, context, args, result;
    var previous = 0;
    if (!options) options = {};

    var later = function() {
        previous = options.leading === false ? 0 : new Date().getTime();
        timeout = null;
        func.apply(context, args);
        if (!timeout) context = args = null;
    };

    var throttled = function() {
        var now = new Date().getTime();
        if (!previous && options.leading === false) previous = now;
        var remaining = wait - (now - previous);
        context = this;
        args = arguments;
        if (remaining <= 0 || remaining > wait) {
            if (timeout) {
                clearTimeout(timeout);
                timeout = null;
            }
            previous = now;
            func.apply(context, args);
            if (!timeout) context = args = null;
        } else if (!timeout && options.trailing !== false) {
            timeout = setTimeout(later, remaining);
        }
    };
    
    throttled.cancel = function() {
        clearTimeout(timeout);
        previous = 0;
        timeout = null;
    }
    return throttled;
}
```



## 函数柯里化

函数柯里化其实就是将使用多个参数的函数转换成一系列使用一个参数的函数的技术。

举例：

```js
function add(a, b, c) {
    return a + b + c
}
add(1, 2, 3)
let addCurry = curry(add)
addCurry(1)(2)(3)
```



应用场景：

- **参数复用**：柯里化可以将一个多参数函数转换为一系列单参数函数，从而复用部分参数。

  ```js
  const add = (a, b) => a + b;
  const add5 = curry(add)(5); // 固定第一个参数为 5
  console.log(add5(10)); // 输出 15
  ```

- **延迟执行**：柯里化可以延迟函数的执行，直到所有参数都满足条件。

  ```js
  const log = curry((level, message) => console.log(`[${level}] ${message}`));
  const logError = log('ERROR'); // 固定第一个参数为 'ERROR'
  logError('Something went wrong!'); // 输出 [ERROR] Something went wrong!
  ```

- **函数组合**：柯里化可以方便地实现函数组合（Function Composition），将多个函数串联起来。

  ```js
  const compose = (f, g) => x => f(g(x));
  const add1 = x => x + 1;
  const multiply2 = x => x * 2;
  const add1ThenMultiply2 = compose(multiply2, add1);
  console.log(add1ThenMultiply2(5)); // 输出 12
  ```



手写`curry`函数：

```js
function curry(fn) {
  let judge = (...args) => {
    // 返回一个新的函数 judge，用于逐步接收参数，直到参数数量满足 fn 的要求，然后执行 fn。使用 ...args 接收任意数量的参数
    if (args.length == fn.length) return fn(...args)
    return (...arg) => judge(...args, ...arg)
  }
  return judge
}
```



## 偏函数

偏函数就是将一个 n 参的函数转换成固定 x 参的函数，剩余参数（n - x）将在下次调用全部传入。

```js
function partial(fn, ...args) {
    return (...arg) => {
        return fn(...args, ...arg)
    }
}
```



## JSONP

JSONP 核心原理：script 标签不受同源策略约束，所以可以用来进行跨域请求，优点是兼容性好，但是只能用于 GET 请求；

```js
const jsonp = ({ url, params, callbackName }) => {
  // 用于生成最终的请求 URL
  const generateUrl = () => {
    let dataSrc = ''
    for (let key in params) {
      if (params.hasOwnProperty(key)) {
        dataSrc += `${key}=${params[key]}&`
      }
    }
    dataSrc += `callback=${callbackName}`
    return `${url}?${dataSrc}`
  }
  return new Promise((resolve, reject) => {
    // 创建一个 <script> 标签。
    const scriptEle = document.createElement('script')
    // 将生成的 URL 赋值给 scriptEle.src。
    scriptEle.src = generateUrl()
    // 将 <script> 标签添加到 document.body 中，浏览器会自动发起请求。
    document.body.appendChild(scriptEle)
    window[callbackName] = data => {
      resolve(data)
      document.removeChild(scriptEle)
    }
  })
}
```



使用方法：

```js
jsonp({
    url: 'https://example.com/api',
    params: { q: 'search', limit: 10 },
    callbackName: 'handleResponse'
}).then(data => {
    console.log('Data received:', data);
}).catch(error => {
    console.error('Error:', error);
});
```



## AJAX

手写原生AJAX：

```js
const getJSON = function(url) {
  return new Promise((resolve, reject) => {
    // 创建 XMLHttpRequest 对象
    const xhr = new XMLHttpRequest();

    // 初始化 GET 请求，使用异步模式（true）
    xhr.open('GET', url, true);

    // 设置请求头，指定接受的数据类型为 JSON
    xhr.setRequestHeader('Accept', 'application/json');

    // 监听 readyState 变化事件
    xhr.onreadystatechange = function() {
      // readyState 为 4 表示请求完成
      if (xhr.readyState !== 4) return;

      // 状态码为 200（成功）或 304（缓存有效）时，解析响应数据
      if (xhr.status === 200 || xhr.status === 304) {
        resolve(xhr.responseText);
      } else {
        // 请求失败时，返回错误信息（包含状态码和状态文本）
        reject(new Error(`Request failed with status ${xhr.status}: ${xhr.statusText}`));
      }
    };

    // 监听网络错误事件
    xhr.onerror = function() {
      reject(new Error('Network error'));
    };

    // 发送请求
    xhr.send();
  });
};
```



## 红绿灯

题目描述：

某个路口的红绿灯，会按照红灯亮5s，黄灯亮2s，绿灯亮3s这样的顺序无限循环。要求：每一秒打印当前在亮的灯。



解题思路：

封装一个sleep方法：用来在指定的时间段，每秒打印指定内容，入参是：时间和打印的内容。



代码实现：

```js
let timer = null

const sleep = (time, light) => {
  return new Promise((resolve, reject) => {
    clearInterval(timer)
    timer = setInterval(() => {
      console.log(light)
    }, 1000)
    setTimeout(resolve, time)
  })
}

const main = async () => {
  while (true) {
    await sleep(5000, '红灯')
    await sleep(2000, '黄灯')
    await sleep(3000, '绿灯')
    clearInterval(timer)
  }
}

main()
```



## React Hook 实现倒计时

实现简单的倒计时功能，用户输入一个值然后点击按钮开始倒计时。

```jsx
import React, { useState } from 'react';

export function App(props) {
  const [time, setTime] = useState();
  const handleClick = () => {
    const active = setInterval(() => {
      setTime(preSecond => {
        if (preSecond <= 1) {
          clearInterval(active);
          return 0;
        }
        return preSecond - 1;
      });
    }, 1000);
  };

  return (
    <div className='App'>
      <input type='text' onChange={e => setTime(e.target.value)} />
      <button onClick={handleClick}> click </button>
      <div>{time}</div>
    </div>
  );
}
```



实现倒计时功能的 React Hook，它会实时计算并返回距离未来时间戳的剩余天数、小时数、分钟数和秒数。

```react
import { useState, useEffect, useCallback } from 'react';

const useCountdown = (targetDate) => {
  const calculateTimeLeft = useCallback(() => {
    // 统一处理传入的时间参数
    const targetTime = new Date(targetDate).getTime();
    const now = new Date().getTime();
    const difference = targetTime - now;

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    // 计算剩余时间
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds };
  }, [targetDate]);

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    // 立即更新一次
    setTimeLeft(calculateTimeLeft());

    // 设置定时器每秒更新
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    // 清除定时器
    return () => clearInterval(timer);
  }, [targetDate, calculateTimeLeft]);

  return timeLeft;
};

export default useCountdown;
```

使用示例：

```react
import React from 'react';
import useCountdown from './useCountdown';

const CountdownTimer = () => {
  // 可以传入 Date 对象、时间戳或日期字符串
  const timeLeft = useCountdown('2023-11-03 18:30:00');
  
  return (
    <div>
      <h2>距离2023年11月3日18:30还有:</h2>
      <div>
        {timeLeft.days}天 {timeLeft.hours}小时 {timeLeft.minutes}分钟 {timeLeft.seconds}秒
      </div>
    </div>
  );
};

export default CountdownTimer;
```



## 手写VNode对象

手写 VNode 对象，表示如下 DOM 节点

```html
<div class="container">
  <img src="x1.png" />
  <p>hello</p>
</div>
```

代码：

```js
const vnode = {
  tag: 'div',
  props: {
    class: 'container',
  },
  children: [
    {
      tag: 'img',
      props: {
        src: 'x1.png',
      },
    },
    {
      tag: 'p',
      props: {},
      children: ['hello'],
    },
  ],
}
```

