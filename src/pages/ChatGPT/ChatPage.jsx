import React from 'react';
import StartArea from '../../components/ChatGPT/StartArea';

export default function ChatPage() {
  return (
    <div className='flex'>
      {/* <SideBar /> */}
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
