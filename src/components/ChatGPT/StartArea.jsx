import React from 'react';
import InputBox from './InputBox';

export default function StartArea() {
  return (
    <div className='h-full w-full flex flex-col justify-start items-center'>
      <h1 className="text-[28px] mb-5 mt-[30dvh]">What can I help with?</h1>
      <InputBox />
    </div>
  );
}
