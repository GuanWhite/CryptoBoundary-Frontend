class LazyMan {
  constructor(name) {
    this.tasks = [];
    console.log(`Hi, I am ${name}`);
    setTimeout(() => this.next(), 0); // 立即启动任务执行
  }

  next() {
    const task = this.tasks.shift(); // 获取下一个任务
    task && task();
  }

  sleep(time) {
    const fn = () => {
      setTimeout(() => {
        console.log(`Waited ${time} seconds`);
        this.next(); // 继续下一个任务
      }, time * 1000);
    };
    this.tasks.push(fn); // 将任务添加到队列
    return this; // 支持链式调用
  }

  sleepFirst(time) {
    const fn = () => {
      setTimeout(() => {
        console.log(`Waited ${time} seconds`);
        this.next(); // 继续下一个任务
      }, time * 1000);
    };
    this.tasks.unshift(fn); // 将任务添加到队列的最前面
    return this; // 支持链式调用
  }

  eat(food) {
    const fn = () => {
      console.log(`I am eating ${food}`);
      this.next(); // 继续下一个任务
    };
    this.tasks.push(fn); // 将任务添加到队列
    return this; // 支持链式调用
  }

  walk(distance) {
    const fn = () => {
      console.log(`I walked ${distance} meters`);
      this.next(); // 继续下一个任务
    };
    this.tasks.push(fn);
    return this; // 支持链式调用
  }
}

// 使用示例
new LazyMan("Jack").sleep(2).eat("lunch").walk(5).sleepFirst(3).eat("dinner");


class _LazyMan {
  queue = [];
  constructor(name) {
    this.sayName(name);

    setTimeout(() => {
      this.next();
    });
  }

  next() {
    const fn = this.queue.shift();
    fn && fn();
  }

  _holdOn(time) {
    return () => {
      setTimeout(() => {
        console.log(`Wake up after ${time} second`);
        this.next();
      }, time * 1000);
    };
  }

  sayName(name) {
    const fn = () => {
      console.log(`Hi! This is ${name}!`);
      this.next();
    };
    this.queue.push(fn);
  }

  sleep(time) {
    this.queue.push(this._holdOn(time));
    return this;
  }

  eat(some) {
    const fn = () => {
      console.log(`Eat ${some}~`);
      this.next();
    };
    this.queue.push(fn);
    return this;
  }

  sleepFirst(time) {
    this.queue.unshift(this._holdOn(time));
    return this;
  }
}

const LazyMan = (name) => new _LazyMan(name);

LazyMan('Hank').sleepFirst(2).eat('dinner').sleep(3).eat('supper');
