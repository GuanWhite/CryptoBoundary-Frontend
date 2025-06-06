import React, { useState } from 'react';
import StartArea from '../../components/ChatGPT/StartArea';
import SideBar from '../../components/ChatGPT/SideBar';
import Header from '../../components/ChatGPT/Header';

export default function ChatPage() {
  const [isOpenSideBar, setIsOpenSideBar] = useState(false);
  return (
    <div className='flex text-slate-900 dark:text-white'>
      {isOpenSideBar &&
        <SideBar
          isOpenSideBar={isOpenSideBar}
          setIsOpenSideBar={setIsOpenSideBar}
          // tailwind不能使用动态类名，所以这里使用模板字符串拼接无效
          className='transition duration-300 ease-linear overflow-hidden' />
      }
      <div className='flex flex-1 flex-col justify-center items-center min-h-screen max-h-fit bg-[#ffffff] dark:bg-[#292a2d]'>
        <div className='w-full'>
          <Header isOpenSideBar={isOpenSideBar} setIsOpenSideBar={setIsOpenSideBar} />
        </div>
        <div className="min-w-[375px] xs:w-[460px] lg:w-[620px] xl:w-[768px] flex-1 p-[10px]">
          <StartArea className='flex-1' />
        </div>
        <div className='py-2 text-[#5d5d5d] dark:text-[#f3f3f3]'>ChatGPT may also make mistakes. Please verify important information.</div>
      </div>
    </div>
  );
}
