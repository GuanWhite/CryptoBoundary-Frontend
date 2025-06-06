import React, { useState } from 'react';
import { Input, Upload, Tooltip } from 'antd';
import {
  PlusOutlined,
} from '@ant-design/icons';

const { TextArea } = Input;

const InputBox = () => {
  const [value, setValue] = useState('');

  const handleClick = () => { };

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
      <div className="relative bg-[#F3F4F6] dark:bg-[#404045] h-[36px] w-full px-[19px] flex justify-between items-center">
        <Tooltip placement="bottom" title="Upload image or file">
          <Upload className='hover:bg-[#e7e7e7] dark:hover:bg-[#3a3a3a] size-[32px] rounded-lg'>
            <span className='size-[32px] flex justify-center items-center'>
              <PlusOutlined className='text-[18px] text-slate-900 dark:text-white' />
            </span>
          </Upload>
        </Tooltip>
        <button
          className="size-[36px] rounded-full bg-black text-white hover:bg-gray-600 flex justify-center items-center disabled:bg-gray-300 disabled:cursor-not-allowed dark:bg-white dark:text-black dark:hover:bg-gray-300 dark:disabled:bg-gray-500 dark:disabled:text-gray-400"
          disabled={value.trim() === ''}
          onClick={handleClick}>
          <svg viewBox='0 0 32 32' fill='none'>
            <path
              fillRule='evenodd'
              clipRule='evenodd'
              d='M15.1918 8.90615C15.6381 8.45983 16.3618 8.45983 16.8081 8.90615L21.9509 14.049C22.3972 14.4953 22.3972 15.2189 21.9509 15.6652C21.5046 16.1116 20.781 16.1116 20.3347 15.6652L17.1428 12.4734V22.2857C17.1428 22.9169 16.6311 23.4286 15.9999 23.4286C15.3688 23.4286 14.8571 22.9169 14.8571 22.2857V12.4734L11.6652 15.6652C11.2189 16.1116 10.4953 16.1116 10.049 15.6652C9.60265 15.2189 9.60265 14.4953 10.049 14.049L15.1918 8.90615Z'
              fill='currentColor'
            ></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default InputBox;