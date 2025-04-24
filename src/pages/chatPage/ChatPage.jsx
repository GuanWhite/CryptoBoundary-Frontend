import "./ChatPage.less";
import React from 'react';
import InputBox from "../../components/InputBox/InputBox";

const ChatPage = () => {
  return (
    // 浅色：侧边栏#f3f5f6 输入框边框#dce0e9 输入框#F3F4F6 背景#ffffff
    // 深色：侧边栏#212327 输入框边框#5a5a69 输入框#404045 背景#292a2d
    <div className="w-full min-h-screen max-h-fit bg-[#ffffff] text-slate-900 dark:bg-[#292a2d] dark:text-white px-12">
      <div className="w-2/5 min-h-screen max-h-fit mx-auto bg-[#ffffff] text-slate-900 dark:bg-[#292a2d] dark:text-white py-5 flex flex-col items-center justify-center">
        <h1 className="text-3xl mb-5">May I help you?</h1>
        {/* <div className="chatpage-outputArea">
          
        </div> */}
        <div className="w-full h-fit">
          <InputBox />
        </div>
      </div>
    </div>
  );
};

export default ChatPage;