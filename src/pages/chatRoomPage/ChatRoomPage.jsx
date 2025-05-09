import React, { useRef, useState } from "react";
import {
  SendOutlined,
  SmileOutlined,
  FileAddOutlined,
  MessageOutlined,
  PhoneOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';

export default function ChatRoomPage() {
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
    const minToolsHeight = 100;
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
      <div ref={mainRef} className="p-3 min-h-[80px] overflow-auto scrollbar flex flex-1 flex-col space-y-2">
        <div className="chat-message self-end bg-blue-500 text-white max-w-xs rounded-lg px-3 py-1.5 text-sm">
          Hello! How can I assist you today?
        </div>
        <div className="chat-message self-start bg-zinc-500 text-white max-w-xs rounded-lg px-3 py-1.5 text-sm">
          Hello! I need a Chatbot!
        </div>
        <div className="chat-message self-end bg-blue-500 text-white max-w-xs rounded-lg px-3 py-1.5 text-sm">
          Hello! How can I assist you today?
        </div>
        <div className="chat-message self-start bg-zinc-500 text-white max-w-xs rounded-lg px-3 py-1.5 text-sm">
          Hello! I need a Chatbot!
        </div><div className="chat-message self-end bg-blue-500 text-white max-w-xs rounded-lg px-3 py-1.5 text-sm">
          Hello! How can I assist you today?
        </div>
        <div className="chat-message self-start bg-zinc-500 text-white max-w-xs rounded-lg px-3 py-1.5 text-sm">
          Hello! I need a Chatbot!
        </div><div className="chat-message self-end bg-blue-500 text-white max-w-xs rounded-lg px-3 py-1.5 text-sm">
          Hello! How can I assist you today?
        </div>
        <div className="chat-message self-start bg-zinc-500 text-white max-w-xs rounded-lg px-3 py-1.5 text-sm">
          Hello! I need a Chatbot!
        </div><div className="chat-message self-end bg-blue-500 text-white max-w-xs rounded-lg px-3 py-1.5 text-sm">
          Hello! How can I assist you today?
        </div>
        <div className="chat-message self-start bg-zinc-500 text-white max-w-xs rounded-lg px-3 py-1.5 text-sm">
          Hello! I need a Chatbot!
        </div><div className="chat-message self-end bg-blue-500 text-white max-w-xs rounded-lg px-3 py-1.5 text-sm">
          Hello! How can I assist you today?
        </div>
        <div className="chat-message self-start bg-zinc-500 text-white max-w-xs rounded-lg px-3 py-1.5 text-sm">
          Hello! I need a Chatbot!
        </div><div className="chat-message self-end bg-blue-500 text-white max-w-xs rounded-lg px-3 py-1.5 text-sm">
          Hello! How can I assist you today?
        </div>
        <div className="chat-message self-start bg-zinc-500 text-white max-w-xs rounded-lg px-3 py-1.5 text-sm">
          Hello! I need a Chatbot!
        </div><div className="chat-message self-end bg-blue-500 text-white max-w-xs rounded-lg px-3 py-1.5 text-sm">
          Hello! How can I assist you today?
        </div>
        <div className="chat-message self-start bg-zinc-500 text-white max-w-xs rounded-lg px-3 py-1.5 text-sm">
          Hello! I need a Chatbot!
        </div><div className="chat-message self-end bg-blue-500 text-white max-w-xs rounded-lg px-3 py-1.5 text-sm">
          Hello! How can I assist you today?
        </div>
        <div className="chat-message self-start bg-zinc-500 text-white max-w-xs rounded-lg px-3 py-1.5 text-sm">
          Hello! I need a Chatbot!
        </div><div className="chat-message self-end bg-blue-500 text-white max-w-xs rounded-lg px-3 py-1.5 text-sm">
          Hello! How can I assist you today?
        </div>
        <div className="chat-message self-start bg-zinc-500 text-white max-w-xs rounded-lg px-3 py-1.5 text-sm">
          Hello! I need a Chatbot!
        </div><div className="chat-message self-end bg-blue-500 text-white max-w-xs rounded-lg px-3 py-1.5 text-sm">
          Hello! How can I assist you today?
        </div>
        <div className="chat-message self-start bg-zinc-500 text-white max-w-xs rounded-lg px-3 py-1.5 text-sm">
          Hello! I need a Chatbot!
        </div><div className="chat-message self-end bg-blue-500 text-white max-w-xs rounded-lg px-3 py-1.5 text-sm">
          Hello! How can I assist you today?
        </div>
        <div className="chat-message self-start bg-zinc-500 text-white max-w-xs rounded-lg px-3 py-1.5 text-sm">
          Hello! I need a Chatbot!
        </div><div className="chat-message self-end bg-blue-500 text-white max-w-xs rounded-lg px-3 py-1.5 text-sm">
          Hello! How can I assist you today?
        </div>
        <div className="chat-message self-start bg-zinc-500 text-white max-w-xs rounded-lg px-3 py-1.5 text-sm">
          Hello! I need a Chatbot!
        </div><div className="chat-message self-end bg-blue-500 text-white max-w-xs rounded-lg px-3 py-1.5 text-sm">
          Hello! How can I assist you today?
        </div>
        <div className="chat-message self-start bg-zinc-500 text-white max-w-xs rounded-lg px-3 py-1.5 text-sm">
          Hello! I need a Chatbot!
        </div><div className="chat-message self-end bg-blue-500 text-white max-w-xs rounded-lg px-3 py-1.5 text-sm">
          Hello! How can I assist you today?
        </div>
        <div className="chat-message self-start bg-zinc-500 text-white max-w-xs rounded-lg px-3 py-1.5 text-sm">
          Hello! I need a Chatbot!
        </div><div className="chat-message self-end bg-blue-500 text-white max-w-xs rounded-lg px-3 py-1.5 text-sm">
          Hello! How can I assist you today?
        </div>
        <div className="chat-message self-start bg-zinc-500 text-white max-w-xs rounded-lg px-3 py-1.5 text-sm">
          Hello! I need a Chatbot!
        </div><div className="chat-message self-end bg-blue-500 text-white max-w-xs rounded-lg px-3 py-1.5 text-sm">
          Hello! How can I assist you today?
        </div>
        <div className="chat-message self-start bg-zinc-500 text-white max-w-xs rounded-lg px-3 py-1.5 text-sm">
          Hello! I need a Chatbot!
        </div><div className="chat-message self-end bg-blue-500 text-white max-w-xs rounded-lg px-3 py-1.5 text-sm">
          Hello! How can I assist you today?
        </div>
        <div className="chat-message self-start bg-zinc-500 text-white max-w-xs rounded-lg px-3 py-1.5 text-sm">
          Hello! I need a Chatbot!
        </div><div className="chat-message self-end bg-blue-500 text-white max-w-xs rounded-lg px-3 py-1.5 text-sm">
          Hello! How can I assist you today?
        </div>
        <div className="chat-message self-start bg-zinc-500 text-white max-w-xs rounded-lg px-3 py-1.5 text-sm">
          Hello! I need a Chatbot!
        </div><div className="chat-message self-end bg-blue-500 text-white max-w-xs rounded-lg px-3 py-1.5 text-sm">
          Hello! How can I assist you today?
        </div>
        <div className="chat-message self-start bg-zinc-500 text-white max-w-xs rounded-lg px-3 py-1.5 text-sm">
          Hello! I need a Chatbot!
        </div><div className="chat-message self-end bg-blue-500 text-white max-w-xs rounded-lg px-3 py-1.5 text-sm">
          Hello! How can I assist you today?
        </div>
        <div className="chat-message self-start bg-zinc-500 text-white max-w-xs rounded-lg px-3 py-1.5 text-sm">
          Hello! I need a Chatbot!
        </div><div className="chat-message self-end bg-blue-500 text-white max-w-xs rounded-lg px-3 py-1.5 text-sm">
          Hello! How can I assist you today?
        </div>
        <div className="chat-message self-start bg-zinc-500 text-white max-w-xs rounded-lg px-3 py-1.5 text-sm">
          Hello! I need a Chatbot!
        </div><div className="chat-message self-end bg-blue-500 text-white max-w-xs rounded-lg px-3 py-1.5 text-sm">
          Hello! How can I assist you today?
        </div>
        <div className="chat-message self-start bg-zinc-500 text-white max-w-xs rounded-lg px-3 py-1.5 text-sm">
          Hello! I need a Chatbot!
        </div><div className="chat-message self-end bg-blue-500 text-white max-w-xs rounded-lg px-3 py-1.5 text-sm">
          Hello! How can I assist you today?
        </div>
        <div className="chat-message self-start bg-zinc-500 text-white max-w-xs rounded-lg px-3 py-1.5 text-sm">
          Hello! I need a Chatbot!
        </div><div className="chat-message self-end bg-blue-500 text-white max-w-xs rounded-lg px-3 py-1.5 text-sm">
          Hello! How can I assist you today?
        </div>
        <div className="chat-message self-start bg-zinc-500 text-white max-w-xs rounded-lg px-3 py-1.5 text-sm">
          Hello! I need a Chatbot!
        </div><div className="chat-message self-end bg-blue-500 text-white max-w-xs rounded-lg px-3 py-1.5 text-sm">
          Hello! How can I assist you today?
        </div>
        <div className="chat-message self-start bg-zinc-500 text-white max-w-xs rounded-lg px-3 py-1.5 text-sm">
          Hello! I need a Chatbot!
        </div><div className="chat-message self-end bg-blue-500 text-white max-w-xs rounded-lg px-3 py-1.5 text-sm">
          Hello! How can I assist you today?
        </div>
        <div className="chat-message self-start bg-zinc-500 text-white max-w-xs rounded-lg px-3 py-1.5 text-sm">
          Hello! I need a Chatbot!
        </div><div className="chat-message self-end bg-blue-500 text-white max-w-xs rounded-lg px-3 py-1.5 text-sm">
          Hello! How can I assist you today?
        </div>
        <div className="chat-message self-start bg-zinc-500 text-white max-w-xs rounded-lg px-3 py-1.5 text-sm">
          Hello! I need a Chatbot!
        </div><div className="chat-message self-end bg-blue-500 text-white max-w-xs rounded-lg px-3 py-1.5 text-sm">
          Hello! How can I assist you today?
        </div>
        <div className="chat-message self-start bg-zinc-500 text-white max-w-xs rounded-lg px-3 py-1.5 text-sm">
          Hello! I need a Chatbot!
        </div><div className="chat-message self-end bg-blue-500 text-white max-w-xs rounded-lg px-3 py-1.5 text-sm">
          Hello! How can I assist you today?
        </div>
        <div className="chat-message self-start bg-zinc-500 text-white max-w-xs rounded-lg px-3 py-1.5 text-sm">
          Hello! I need a Chatbot!
        </div><div className="chat-message self-end bg-blue-500 text-white max-w-xs rounded-lg px-3 py-1.5 text-sm">
          Hello! How can I assist you today?
        </div>
        <div className="chat-message self-start bg-zinc-500 text-white max-w-xs rounded-lg px-3 py-1.5 text-sm">
          Hello! I need a Chatbot!
        </div><div className="chat-message self-end bg-blue-500 text-white max-w-xs rounded-lg px-3 py-1.5 text-sm">
          Hello! How can I assist you today?
        </div>
        <div className="chat-message self-start bg-zinc-500 text-white max-w-xs rounded-lg px-3 py-1.5 text-sm">
          Hello! I need a Chatbot!
        </div><div className="chat-message self-end bg-blue-500 text-white max-w-xs rounded-lg px-3 py-1.5 text-sm">
          Hello! How can I assist you today?
        </div>
        <div className="chat-message self-start bg-zinc-500 text-white max-w-xs rounded-lg px-3 py-1.5 text-sm">
          Hello! I need a Chatbot!
        </div><div className="chat-message self-end bg-blue-500 text-white max-w-xs rounded-lg px-3 py-1.5 text-sm">
          Hello! How can I assist you today?
        </div>
        <div className="chat-message self-start bg-zinc-500 text-white max-w-xs rounded-lg px-3 py-1.5 text-sm">
          Hello! I need a Chatbot!
        </div><div className="chat-message self-end bg-blue-500 text-white max-w-xs rounded-lg px-3 py-1.5 text-sm">
          Hello! How can I assist you today?
        </div>
        <div className="chat-message self-start bg-zinc-500 text-white max-w-xs rounded-lg px-3 py-1.5 text-sm">
          Hello! I need a Chatbot!
        </div><div className="chat-message self-end bg-blue-500 text-white max-w-xs rounded-lg px-3 py-1.5 text-sm">
          Hello! How can I assist you today?
        </div>
        <div className="chat-message self-start bg-zinc-500 text-white max-w-xs rounded-lg px-3 py-1.5 text-sm">
          Hello! I need a Chatbot!
        </div><div className="chat-message self-end bg-blue-500 text-white max-w-xs rounded-lg px-3 py-1.5 text-sm">
          Hello! How can I assist you today?
        </div>
        <div className="chat-message self-start bg-zinc-500 text-white max-w-xs rounded-lg px-3 py-1.5 text-sm">
          Hello! I need a Chatbot!
        </div><div className="chat-message self-end bg-blue-500 text-white max-w-xs rounded-lg px-3 py-1.5 text-sm">
          Hello! How can I assist you today?
        </div>
        <div className="chat-message self-start bg-zinc-500 text-white max-w-xs rounded-lg px-3 py-1.5 text-sm">
          Hello! I need a Chatbot!
        </div><div className="chat-message self-end bg-blue-500 text-white max-w-xs rounded-lg px-3 py-1.5 text-sm">
          Hello! How can I assist you today?
        </div>
        <div className="chat-message self-start bg-zinc-500 text-white max-w-xs rounded-lg px-3 py-1.5 text-sm">
          Hello! I need a Chatbot!
        </div><div className="chat-message self-end bg-blue-500 text-white max-w-xs rounded-lg px-3 py-1.5 text-sm">
          Hello! How can I assist you today?
        </div>
        <div className="chat-message self-start bg-zinc-500 text-white max-w-xs rounded-lg px-3 py-1.5 text-sm">
          Hello! I need a Chatbot!
        </div><div className="chat-message self-end bg-blue-500 text-white max-w-xs rounded-lg px-3 py-1.5 text-sm">
          Hello! How can I assist you today?
        </div>
        <div className="chat-message self-start bg-zinc-500 text-white max-w-xs rounded-lg px-3 py-1.5 text-sm">
          Hello! I need a Chatbot!
        </div><div className="chat-message self-end bg-blue-500 text-white max-w-xs rounded-lg px-3 py-1.5 text-sm">
          Hello! How can I assist you today?
        </div>
        <div className="chat-message self-start bg-zinc-500 text-white max-w-xs rounded-lg px-3 py-1.5 text-sm">
          Hello! I need a Chatbot!
        </div><div className="chat-message self-end bg-blue-500 text-white max-w-xs rounded-lg px-3 py-1.5 text-sm">
          Hello! How can I assist you today?
        </div>
        <div className="chat-message self-start bg-zinc-500 text-white max-w-xs rounded-lg px-3 py-1.5 text-sm">
          Hello! I need a Chatbot!
        </div><div className="chat-message self-end bg-blue-500 text-white max-w-xs rounded-lg px-3 py-1.5 text-sm">
          Hello! How can I assist you today?
        </div>
        <div className="chat-message self-start bg-zinc-500 text-white max-w-xs rounded-lg px-3 py-1.5 text-sm">
          Hello! I need a Chatbot!
        </div><div className="chat-message self-end bg-blue-500 text-white max-w-xs rounded-lg px-3 py-1.5 text-sm">
          Hello! How can I assist you today?
        </div>
        <div className="chat-message self-start bg-zinc-500 text-white max-w-xs rounded-lg px-3 py-1.5 text-sm">
          Hello! I need a Chatbot!
        </div><div className="chat-message self-end bg-blue-500 text-white max-w-xs rounded-lg px-3 py-1.5 text-sm">
          Hello! How can I assist you today?
        </div>
        <div className="chat-message self-start bg-zinc-500 text-white max-w-xs rounded-lg px-3 py-1.5 text-sm">
          Hello! I need a Chatbot!
        </div><div className="chat-message self-end bg-blue-500 text-white max-w-xs rounded-lg px-3 py-1.5 text-sm">
          Hello! How can I assist you today?
        </div>
        <div className="chat-message self-start bg-zinc-500 text-white max-w-xs rounded-lg px-3 py-1.5 text-sm">
          Hello! I need a Chatbot!
        </div><div className="chat-message self-end bg-blue-500 text-white max-w-xs rounded-lg px-3 py-1.5 text-sm">
          Hello! How can I assist you today?
        </div>
        <div className="chat-message self-start bg-zinc-500 text-white max-w-xs rounded-lg px-3 py-1.5 text-sm">
          Hello! I need a Chatbot!
        </div>
      </div>

      {/* 调整高度的分隔条 */}
      <div
        onMouseDown={startDrag}
        className="h-[3px] cursor-ns-resize hover:bg-primaryColor"
        style={{ background: `${bgColor}` }}
      />

      {/* 表情选择、文件上传、聊天记录查询、音视频通话、输入框和发送按钮resize-y cursor-ns-resize */}
      <div style={{ height: `${toolsHeight}px` }} className="overflow-auto scrollbar px-3 py-2 dark:border-zinc-700 flex flex-col">
        {/* tools box */}
        <div className="w-full h-[40px] bg-green-500 flex-shrink-0">
        <SmileOutlined />
        <FileAddOutlined />
        <MessageOutlined />

        <PhoneOutlined />
        <VideoCameraOutlined />
        </div>
        {/* input area */}
        <div className="w-full flex-1 h-[20px] bg-red-500">

        </div>
        {/* send button */}
        <div className="w-full h-[20px] bg-blue-500 flex-shrink-0">
        <SendOutlined />
        </div>
        {/* <div className="flex gap-2">
          <input
            placeholder="Type your message..."
            className="flex-1 p-2 border rounded-lg dark:bg-zinc-700 dark:text-white dark:border-zinc-600 text-sm"
            id="chatInput"
            type="text"
          />
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1.5 px-3 rounded-lg transition duration-300 ease-in-out text-sm"
            id="sendButton"
          >
            Send
          </button>
        </div> */}
      </div>
    </div>
  );
}
