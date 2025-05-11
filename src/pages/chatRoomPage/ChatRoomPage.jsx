import React, { useRef, useState } from "react";
import MessageBubbleBox from "../../components/MessageBubbleBox/MessageBubbleBox";
import { Input, Button } from 'antd';
import {
  SendOutlined,
  SmileOutlined,
  FileAddOutlined,
  MessageOutlined,
  PhoneOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
const { TextArea } = Input;
import BG1 from "../../assets/bg1.jpg";

export default function ChatRoomPage() {
  const [value, setValue] = useState('');

  const [toolsHeight, setToolsHeight] = useState(200);
  const [bgColor, setBgColor] = useState("#9ca3af"); // 默认背景色
  const isDragging = useRef(false);
  const containerRef = useRef(null);
  const mainRef = useRef(null);

  const startDrag = (e) => {
    isDragging.current = true;
    document.addEventListener("mousemove", handleDrag);
    document.addEventListener("mouseup", stopDrag);
  };

  const handleDrag = (e) => {
    if (!isDragging.current || !containerRef.current) return;

    if (mainRef.current) {
      mainRef.current.scrollTop = mainRef.current.scrollHeight;
    }

    const containerRect = containerRef.current.getBoundingClientRect();
    const offsetY = e.clientY - containerRect.top;
    const headerHeight = 84;
    const minToolsHeight = 164;
    const maxToolsHeight = containerRect.height - headerHeight - minToolsHeight;

    // 计算 tools 高度
    const newToolsHeight = containerRect.height - offsetY;
    const clampedHeight = Math.max(Math.min(newToolsHeight, maxToolsHeight), minToolsHeight);

    setToolsHeight(clampedHeight);
    setBgColor("#6495ED");
  };

  const stopDrag = () => {
    isDragging.current = false;
    setBgColor("#9ca3af");
    document.removeEventListener("mousemove", handleDrag);
    document.removeEventListener("mouseup", stopDrag);
  };
  return (
    <div ref={containerRef} className="w-full max-h-screen flex flex-col bg-[#f5f5f5] dark:bg-zinc-800 overflow-hidden">
      {/* 聊天室标题和[在线状态?] */}
      <div className="h-[84px] p-4 border-b dark:border-zinc-700 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-zinc-800 dark:text-white">
          Chatting with CQQ
        </h2>
      </div>

      {/* 
        聊天记录显示区域
        先加载近期时间段的聊天记录，向上滚动的时候触发加载更多聊天记录
      */}
      <div ref={mainRef} className="px-[30px] py-3 min-h-[80px] overflow-auto scrollbar flex flex-1 flex-col space-y-2">
        <MessageBubbleBox
          contentText="Hello! How can I assist you today?Hello! How can I assist you today?Hello! How can I assist you today?Hello! How can I assist you today?Hello! How can I assist you today?Hello! How can I assist you today?Hello! How can I assist you today?Hello! How can I assist you today?Hello! How can I assist you today?Hello! How can I assist you today?Hello! How can I assist you today?Hello! How can I assist you today?Hello! How can I assist you today?Hello! How can I assist you today?Hello! How can I assist you today?Hello! How can I assist you today?Hello! How can I assist you today?Hello! How can I assist you today?Hello! How can I assist you today?Hello! How can I assist you today?Hello! How can I assist you today?Hello! How can I assist you today?Hello! How can I assist you today?Hello! How can I assist you today?Hello! How can I assist you today?Hello! How can I assist you today?Hello! How can I assist you today?Hello! How can I assist you today?Hello! How can I assist you today?Hello! How can I assist you today?Hello! How can I assist you today?Hello! How can I assist you today?Hello! How can I assist you today?Hello! How can I assist you today?Hello! How can I assist you today?Hello! How can I assist you today?Hello! How can I assist you today?Hello! How can I assist you today?Hello! How can I assist you today?Hello! How can I assist you today?Hello! How can I assist you today?Hello! How can I assist you today?"
          avatarImage={
            <img
              src={BG1}
              alt="User avatar"
              className="w-full h-full object-cover rounded-full"
            />
          }
          isMe={false}
        />
        <MessageBubbleBox
          contentText="Hello! I need a Chatbot!"
          avatarImage={
            <img
              src={BG1}
              alt="User avatar"
              className="w-full h-full object-cover rounded-full"
            />
          }
          isMe={true}
        />
      </div>

      {/* 调整高度的分隔条 */}
      <div
        onMouseDown={startDrag}
        className="h-[3px] cursor-ns-resize hover:bg-primaryColor"
        style={{ background: `${bgColor}` }}
      />

      {/* 表情选择、文件上传、聊天记录查询、音视频通话、输入框和发送按钮resize-y cursor-ns-resize */}
      <div style={{ height: `${toolsHeight}px` }} className="overflow-auto scrollbar px-3 pt-2 pb-4 dark:border-zinc-700 flex flex-col">
        {/* tools box */}
        <div className="w-full h-[40px] flex-shrink-0 flex justify-between items-center">
          <div className="px-[16px] flex items-center">
            <SmileOutlined className="text-[24px] mx-[10px] text-gray-600 dark:text-gray-200" />
            <FileAddOutlined className="text-[24px] mx-[10px] text-gray-600 dark:text-gray-200" />
            <MessageOutlined className="text-[24px] mx-[10px] text-gray-600 dark:text-gray-200" />
          </div>
          <div className="px-[16px] flex items-center">
            <PhoneOutlined className="text-[24px] mx-[10px] text-gray-600 dark:text-gray-200" />
            <VideoCameraOutlined className="text-[24px] mx-[10px] text-gray-600 dark:text-gray-200" />
          </div>
        </div>
        {/* input area */}
        <div className="w-full flex-1 min-h-[60px] flex p-[18px]">
          <TextArea
            className="flex-1 overflow-auto scrollbar font-baseFont border-none text-base bg-[#F3F4F6] hover:bg-[#F3F4F6] focus:bg-[#F3F4F6] dark:bg-[#404045] dark:hover:bg-[#404045] dark:focus:bg-[#404045] dark:text-[#f5f5f5] focus:shadow-none placeholder:text-slate-400"
            style={{ resize: 'none' }}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Type your message..."
          />
        </div>
        {/* send button */}
        <div className="w-full h-[40px] flex-shrink-0 flex justify-end items-center px-[16px]">
          <Button
            // onClick={}
            type="primary"
            className="h-full text-[16px] rounded-[6px]" >
            Send
            <SendOutlined className="text-[24px]" />
          </Button>
        </div>
      </div>
    </div>
  );
}
