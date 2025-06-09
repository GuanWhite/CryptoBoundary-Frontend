import React from 'react';
import InputBox from './InputBox';
import BubbleItem from './BubbleItem';

export default function ChatArea({ chatId, data }) {
  
  const chatData = data.filter(item => item.conversation_id === chatId);
  console.log(chatId, chatData);
  return (
    <div className='h-full w-full flex flex-col justify-start items-center'>
      <div className='w-full flex-1'>
        {chatData[0].messages.map((item, index) => <BubbleItem key={index} role={item.role} context={item.content} />)}
      </div>
      <InputBox />
    </div>
  );
}
