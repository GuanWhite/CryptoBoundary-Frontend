import React, { useState } from 'react';
import { Input, Button, Upload } from 'antd';
import {
  SendOutlined,
  FileAddOutlined,
  PlusOutlined,
} from '@ant-design/icons';

const { TextArea } = Input;

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
          className="overflow-auto scrollbar font-baseFont border-none text-base bg-transparent hover:bg-transparent focus:bg-transparent dark:bg-transparent dark:hover:bg-transparent dark:focus:bg-transparent dark:text-[#f5f5f5] focus:shadow-none placeholder:text-slate-400"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Ask anything..."
          autoSize={{ minRows: 1, maxRows: 10 }}
        />
      </div>
      <div className="relative bg-[#F3F4F6] dark:bg-[#404045] h-8 w-full px-[19px] flex justify-between items-center">
        <Upload className='hover:bg-[#e7e7e7] dark:hover:bg-[#3a3a3a] size-[32px] rounded-lg'>
          <span className='size-[32px] flex justify-center items-center'>
            <PlusOutlined className='text-[18px] text-slate-900 dark:text-white' />
          </span>
        </Upload>
        <Button
          type="primary"
          className="font-baseFont absolute inset-y-0 right-0 h-full w-20 mr-2 rounded-full bg-[#4d6bfe]"
          // icon={<PoweroffOutlined />}
          loading={loadings[3]}
          onClick={() => enterLoading(3)}>
          <SendOutlined />
        </Button>
      </div>
    </div>
  );
};

export default InputBox;