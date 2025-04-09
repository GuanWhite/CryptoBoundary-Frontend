import React, { useState } from 'react';
import "./Counter.less";

const Counter = () => {
  const [counter, setCounter] = useState(0);
  // 如果计算时会使用到上一个状态值时，建议使用在更新函数中使用函数式更新
  const decreament = () => {
    // setCounter(counter - 1);
    setCounter(c => c - 1);  // 这样可以传递函数来基于前一个状态计算新状态
    /*
    函数式更新通过将状态计算延迟到React实际应用更新时执行，并确保每次计算都基于最新的前一个状态，完美解决了批量更新导致的状态更新丢失问题。
    这是React状态管理中最重要的模式之一，建议在以下场景总是使用函数式更新：
        1. 状态更新依赖于前一个状态时
        2. 连续多次更新同一个状态时
        3. 在异步回调中更新状态时
     */
  };
  const increament = () => {
    setCounter(counter => counter + 1);
  };
  const reset = () => {
    setCounter(0);
  };

  // 使用函数式更新在state中更新对象数据
  const [carObj, setCarObj] = useState({ name: "Benz", year: 2025 });
  const updataCar = (event) => {
    setCarObj(c => ({ ...c, name: "BMW", year: event.target.value }));
  };

  // 使用函数式更新在state中更新数组数据
  const [carList, setCarList] = useState(["Benz", "BMW", "Audi"]);
  const updateCarList = (event) => {
    setCarList(c => [...c, event.target.value]);
  };
  const removeOneCar = (index) => {
    // 当索引i不等于指定的index时，当前元素才会被保留在新数组中。
    setCarList(c => c.filter((_, i) => i !== index));
  };

  return (
    <div className="counter-contiar">
      <div className="counter-text">{counter}</div>
      <div className="button-boxs">
        <button className='counter-button' onClick={decreament}>Decreament</button>
        <button className='counter-button' onClick={reset}>Reset</button>
        <button className='counter-button' onClick={increament}>Increament</button>
      </div>
    </div>
  );
};

export default Counter;