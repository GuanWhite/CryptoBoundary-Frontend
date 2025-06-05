import React from 'react';
import StartArea from '../../components/ChatGPT/StartArea';
import SideBar from '../../components/ChatGPT/SideBar';

export default function ChatPage() {
  return (
    <div className='flex text-slate-900 dark:text-white'>
      <SideBar />
      <div className='flex flex-col'>
        {/* <Header /> */}
        <StartArea />
        {/* PC端聊天框尺寸：
            最小460px + px-[16px]
            最大768px，
        <ChatArea /> */}
      </div>
    </div>
  );
}
