import React, { useState } from 'react';
import { Input, Button } from 'antd';


const { TextArea } = Input;

// const InputBox = () => {
//   return (
//     <div className='inputbox-container'>
//       <div className="inputbox-inputArea">
//         <input type={"text"} placeholder="Ask anything"></input>
//       </div>
//       <div className="inputbox-buttonArea">
//         <button className="inputbox-button">send</button>
//       </div>
//     </div>
//   );
// };
const InputBox = () => {
  const [value, setValue] = useState('');
  const [loadings, setLoadings] = useState([]);

  const enterLoading = index => {
    setLoadings(prevLoadings => {
      const newLoadings = [...prevLoadings];
      newLoadings[index] = true;
      return newLoadings;
    });
    setTimeout(() => {
      setLoadings(prevLoadings => {
        const newLoadings = [...prevLoadings];
        newLoadings[index] = false;
        return newLoadings;
      });
    }, 3000);
  };

  return (
    // 浅色：侧边栏#f3f5f6 输入框边框#dce0e9 输入框#F3F4F6 背景#ffffff
    // 深色：侧边栏#212327 输入框边框#5a5a69 输入框#404045 背景#292a2d
    <div className='font-baseFont bg-[#F3F4F6] dark:bg-[#404045] h-fit w-full rounded-2xl p-4'>
      <div className="bg-[#F3F4F6] dark:bg-[#404045] h-fit w-full p-2">
        <TextArea
          className="font-baseFont border-none text-base bg-[#F3F4F6] hover:bg-[#F3F4F6] focus:bg-[#F3F4F6] dark:bg-[#404045] dark:hover:bg-[#404045] dark:focus:bg-[#404045] dark:text-[#f5f5f5] focus:shadow-none placeholder:text-slate-400"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Ask anything..."
          autoSize={{ minRows: 1, maxRows: 10 }}
        />
      </div>
      <div className="relative bg-[#F3F4F6] dark:bg-[#404045] h-8 w-full p-2">
        {/* <button className="absolute inset-y-0 right-0 h-full w-20 mr-2 rounded-full bg-[#4d6bfe]">Send</button> */}
        <Button
          type="primary"
          className="font-baseFont absolute inset-y-0 right-0 h-full w-20 mr-2 rounded-full bg-[#4d6bfe]"
          // icon={<PoweroffOutlined />}
          loading={loadings[3]}
          onClick={() => enterLoading(3)}>
          Send
        </Button>
      </div>
    </div>
  );
};

export default InputBox;