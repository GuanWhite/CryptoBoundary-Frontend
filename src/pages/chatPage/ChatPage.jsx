import "./ChatPage.less";
import React from 'react';
import InputBox from "../../components/InputBox/InputBox";

const ChatPage = () => {

  return (
    // 浅色：侧边栏#f3f5f6 输入框边框#dce0e9 输入框#F3F4F6 背景#ffffff
    // 深色：侧边栏#212327 输入框边框#5a5a69 输入框#404045 背景#292a2d
    <div className="flex text-slate-900 dark:text-white">
      <div className="flex dark:bg-[#171717] bg-[#f9f9f9] w-[250px]">sidebar</div>
      <div className="flex-1 min-h-screen max-h-fit bg-[#ffffff] dark:bg-[#292a2d] flex flex-col">
        <div className="flex">
          top
        </div>
        <div className="shrink-0 w-2/5 flex-1 mx-auto bg-[#ffffff] text-slate-900 dark:bg-[#292a2d] dark:text-white py-5 flex flex-col items-center justify-center">
          <h1 className="text-3xl mb-5">May I help you?</h1>

          <div className="w-full h-fit">
            <InputBox />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;