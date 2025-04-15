import React from 'react';
import "./InputBox.less";

const InputBox = () => {
  return (
    <div className='inputbox-container'>
      <div className="inputbox-inputArea">
        <input type={"text"} placeholder="Ask anything"></input>
      </div>
      <div className="inputbox-buttonArea">
        <button className="inputbox-button">send</button>
      </div>
    </div>
  );
};

export default InputBox;