import React, {useState} from 'react';
import './ColorPicker.less';

const ColorPicker = () => {
  const [color,setColor] = useState("#ffffff");

  return (
    <div className='color-picker-container'>
      <h1>Color Picker</h1>
      <div className="show-color-box" style={{background:color}}>picked color is {color}</div>
      <label>Pick a color:</label>
      <input type="color" value={color} onChange={(e) => setColor(e.target.value)} />
    </div>
  );
};

export default ColorPicker;