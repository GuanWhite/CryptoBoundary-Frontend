import React, { useState } from "react";
import './HistorySidebar.less';

const HistorySidebar = () => {
  // 模拟对话数据
  const mockChats = [
    { id: 1, title: "今天的会话", date: new Date() },
    { id: 2, title: "昨天的会话", date: new Date(Date.now() - 86400000) },
    { id: 3, title: "上周的会话", date: new Date(Date.now() - 7 * 86400000) },
    { id: 4, title: "二月的会话", date: new Date("2025-02-10") },
    { id: 5, title: "一月的会话", date: new Date("2025-01-22") },
    { id: 6, title: "去年的会话", date: new Date("2024-11-30") },
  ];

  // 按时间分类
  function groupChatsByTime(chats) {
    const now = new Date();
    const groups = {
      今天: [],
      "过去30天": [],
      三月: [],
      二月: [],
      一月: [],
      "2024年及更早": [],
    };

    chats.forEach((chat) => {
      const d = chat.date;
      const daysAgo = (now - d) / (1000 * 60 * 60 * 24);
      const month = d.getMonth();
      const year = d.getFullYear();

      if (daysAgo < 1) {
        groups["今天"].push(chat);
      } else if (daysAgo < 30) {
        groups["过去30天"].push(chat);
      } else if (month === 2 && year === 2025) {
        groups["三月"].push(chat);
      } else if (month === 1 && year === 2025) {
        groups["二月"].push(chat);
      } else if (month === 0 && year === 2025) {
        groups["一月"].push(chat);
      } else {
        groups["2024年及更早"].push(chat);
      }
    });

    return groups;
  }

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const groupedChats = groupChatsByTime(mockChats);

  return (
    <div className={`main-content ${sidebarOpen ? "sidebar-open" : "sidebar-closed"}`}>
      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? "open" : "closed"}`}>
        <h2>会话历史</h2>
        {Object.entries(groupedChats).map(([group, chats]) => (
          <div key={group} className="chat-group">
            <h3>{group}</h3>
            <ul>
              {chats.map((chat) => (
                <li key={chat.id}>{chat.title}</li>
              ))}
            </ul>
          </div>
        ))}
      </aside>

      {/* Main Area */}
      <div className="main-content">
        {/* Toggle Button */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="toggle-button"
        >
          {sidebarOpen ? "关闭边栏" : "打开边栏"}
        </button>

        {/* Chat Area Centered */}
        <div className="chat-wrapper">
          <div className="chat-box">
            <h1>ChatGPT 对话区域</h1>
            <p>这是对话的内容区域，它会在页面中始终居中显示。</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistorySidebar;