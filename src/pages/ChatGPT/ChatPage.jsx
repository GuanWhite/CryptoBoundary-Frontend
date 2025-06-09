import React, { useState } from 'react';
import StartArea from '../../components/ChatGPT/StartArea';
import ChatArea from '../../components/ChatGPT/ChatArea';
import SideBar from '../../components/ChatGPT/SideBar';
import Header from '../../components/ChatGPT/Header';
import { chatsHistoryMockData } from '../../chatsHistoryMockData';
import { useEffect } from 'react';

export default function ChatPage() {
  const [isOpenSideBar, setIsOpenSideBar] = useState(false);
  const [chatID, setChatID] = useState(''); // 可以考虑用useContext
  // const [chatData, setChatData] = useState('');
  // useEffect(() => {
  //   setChatData(chatsHistoryMockData.filter((_,item)=>{
  //     item.conversation_id === chatID;
  //   }));
  // }, [chatID]);
  return (
    <div className='flex text-slate-900 dark:text-white'>
      {isOpenSideBar &&
        <SideBar
          isOpenSideBar={isOpenSideBar}
          setIsOpenSideBar={setIsOpenSideBar}
          chatID={chatID}
          setChatID={setChatID}
          data={chatsHistoryMockData}
          // tailwind不能使用动态类名，所以这里使用模板字符串拼接无效(看人家用好像可以)
          className='transition duration-300 ease-linear overflow-hidden' />
      }
      <div className='flex flex-1 flex-col justify-center items-center min-h-screen max-h-fit bg-[#ffffff] dark:bg-[#292a2d]'>
        <div className='w-full'>
          <Header isOpenSideBar={isOpenSideBar} setIsOpenSideBar={setIsOpenSideBar} setChatID={setChatID}/>
        </div>
        <div className="min-w-[375px] xs:w-[460px] lg:w-[620px] xl:w-[768px] flex-1 p-[10px] pb-0">
          {chatID === '' ? <StartArea className='flex-1' /> : <ChatArea chatId={chatID} data={chatsHistoryMockData} />}
        </div>
        <div className='py-2 text-[#5d5d5d] dark:text-[#f3f3f3] text-[12px]'>ChatGPT may also make mistakes. Please verify important information.</div>
      </div>
    </div>
  );
}
