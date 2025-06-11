console.log(111);
p()
  .then(result => {
    console.log(`p result:${result}`);
  })
  .catch(err => {
    console.log(`p err :${err}`);
  });
p1()
  .then(result => {
    console.log(`p1 result:${result}`);
  })
  .catch(err => {
    console.log(`p1 err :${err}`);
  });
p2()
  .then(result => {
    console.log(`p2 result:${result}`);
  })
  .catch(err => {
    console.log(`p2 err :${err.message}`);
  });
function p() {
  return new Promise((resolve, reject) => {
    console.log(222);
    setTimeout(() => {
      console.log('async in p');
      reject('err in p');
      console.log('content after p reject');
    }, 200);
  });
}
function p1() {
  return new Promise((resolve, reject) => {
    console.log(333);
    setTimeout(() => {
      console.log('async in p1');
      resolve('resolev in p1');
      console.log('content after p1 resolve');
    }, 250);
  });
}
function p2() {
  return new Promise((resoleve, reject) => {
    console.log(444);
    setTimeout(() => {
      console.log('async in p2');
      return reject(new Error('p2error'));
      console.log('content after p2 return');
    }, 300);
  });
}

async function async1() {
  console.log("async1 start");
  await async2();
  console.log("async1 end");
}

async function async2() {
  console.log("async2");
}

console.log("js start");
setTimeout(function () {
  console.log("timeout");
}, 0);

async1();

new Promise(function (resolve) {
  console.log("promise");
  resolve();
}).then(function () {
  console.log("then");
});

console.log("js end");
const obj = {
  a: 1,
  b: {
    c: 2
  }
};
const { a, b: { c } } = obj;
console.log(a, b, c); // 报错：b is not defined