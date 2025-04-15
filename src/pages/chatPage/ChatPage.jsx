import "./ChatPage.less";
import React from 'react';
import InputBox from "../../components/InputBox/InputBox";

const ChatPage = () => {
  return (
    <div className="chatpage-container">
      <div className="chatpage-main">
        <h1>May I help you?</h1>
        <div className="chatpage-outputArea">
          
        </div>
        <div className="chatpage-inputbox">
          <InputBox />
        </div>
      </div>
    </div>
  );
};

export default ChatPage;