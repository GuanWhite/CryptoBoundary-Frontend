MyPromise.prototype.then = function (onFulfilled, onReject) {
  // 优化点：解决 onFufilled，onRejected 没有传值的问题
  onFulfilled = typeof onFulfilled === "function" ? onFulfilled : (v) => v;
  // 优化点：错误的值要让后面访问到，所以这里也要抛出错误，不然会在之后 then 的 resolve 中捕获
  onRejected = typeof onRejected === "function" ? onRejected : (err) => { throw err; };

  // 每次调用 then 都返回一个新的 promise
  return new MyPromise((resolve, reject) => {
    if (this.state === FULFILLED) {
      // onFulfilled 和 onRejected 需要被异步调用，这里用 setTimeout 模拟异步
      setTimeout(() => {
        try {
          let x = onFulfilled(this.value);  // x可能是一个proimise
          resolvePromise(promise2, x, resolve, reject);
        } catch (e) {
          reject(e);
        }
      }, 0);
    }

    if (this.state === REJECTED) {
      setTimeout(() => {
        try {
          let x = onRejected(this.reason);
          resolvePromise(promise2, x, resolve, reject);
        } catch (e) {
          reject(e);
        }
      }, 0);
    }

    if (this.state === PENDING) {
      this.onResolvedCallbacks.push(() => {
        setTimeout(() => {
          try {
            let x = onFulfilled(this.value);
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        }, 0);
      });

      this.onRejectedCallbacks.push(() => {
        setTimeout(() => {
          try {
            let x = onRejected(this.reason);
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        }, 0);
      });
    }
  });
};

const resolvePromise = (promise2, x, resolve, reject) => {
  // 自己等待自己完成是错误的实现，用一个类型错误，结束掉 promise  Promise/A+ 2.3.1
  if (promise2 === x) {
    return reject(new TypeError("Chaining cycle detected for promise #<Promise>"));
  }
  let called;
  // 后续的条件要严格判断 保证代码能和别的库一起使用
  if ((typeof x === "object" && x != null) || typeof x === "function") {
    try {
      // 为了判断 resolve 过了的，就不用再 reject 了（比如 reject 和 resolve 同时调用的时候）
      let then = x.then;
      if (typeof then === "function") {
        // 不要写成 x.then，直接 then.call 就可以了 因为 x.then 会再次取值，Object.defineProperty
        then.call(
          x, (y) => {
            // 根据 promise 的状态决定是成功还是失败
            if (called) return;
            called = true;
            // 递归解析的过程（因为可能 promise 中还有 promise）
            resolvePromise(promise2, y, resolve, reject);
          }, (r) => {
            // 只要失败就失败
            if (called) return;
            called = true;
            reject(r);
          });
      } else {
        resolve(x);  // 如果 x.then 是个普通值就直接返回 resolve 作为结果
      }
    } catch (e) {
      if (called) return;
      called = true;
      reject(e);
    }
  } else {
    resolve(x);  // 如果 x 是个普通值就直接返回 resolve 作为结果
  }
};

Promise.myAll = (promises) => {
  return new Promise((resolve, reject) => {
    let count = 0, result = []; // 计数器和结果
    promises.forEach((p, i) => {
      // 注意有的数组项有可能不是Promise，需要手动转化一下
      Promise.resolve(p).then(val => { // 成功时
        count++;
        result[i] = val; // 收集每个Promise的返回值
        // 当所有的Promise都成功了，那么将返回的Promise结果设置为result
        if (count === promises.length) {
          resolve(result);
        }
      }, err => { // 失败时
        reject(err);
      });
    });
  });
};

Promise.myRace = (promises) => {
  return new Promise((resolve, reject) => {
    promises.forEach(p => {
      Promise.resolve(p).then(val => {
        resolve(val);
      }, err => {
        reject(err);
      });
    });
  });
};

Promise.myAllSettled = (promises) => {
  return new Promise((resolve, reject) => {
    let result = [];

    promises.forEach((p, i) => {
      Promise.resolve(p).then(val => {
        // 成功属性设置 
        result.push({
          status: 'fulfilled',
          value: val
        });

        if (result.length === promiseArr.length) {
          resolve(result);
        }
      }, err => {
        // 失败属性设置
        result.push({
          status: 'rejected',
          reason: err
        });
        if (result.length === promiseArr.length) {
          resolve(result);
        }
      });
    });
  });
};

Promise.any = function (promiseArr) {
  return new Promise((resolve, reject) => {
    let index = 0;
    if (promiseArr.length === 0) return;
    promiseArr.forEach((p, i) => {
      Promise.resolve(p).then(val => {
        resolve(val);
      }, err => {
        index++;
        if (index === promiseArr.length) {
          reject(new AggregateError('All promises were rejected'));
        }
      });
    });
  });
};