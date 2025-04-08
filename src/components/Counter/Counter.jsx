import React, { useState } from 'react';
import "./Counter.less"

const Counter = () => {
  const [counter, setCounter] = useState(0);
  const decreament = () => {
    setCounter(counter - 1);
  };
  const increament = () => {
    setCounter(counter + 1);
  };
  const reset = () => {
    setCounter(0);
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