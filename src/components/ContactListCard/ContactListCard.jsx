import React from 'react';
import BG1 from "../../assets/bg1.jpg";

export default function ContactListCard() {
  const handleClick = () => {
    console.log("点击了联系人卡片");
  };
  return (
    <div
      className="cursor-pointer flex justify-center items-center p-3 max-w-80 h-28 bg-[#e5e5e5] hover:bg-[#d8d8d8] dark:bg-gray-500 dark:hover:bg-gray-600 shadow-lg"
      onClick={handleClick}>
      <div className="flex justify-center items-center flex-shrink-0 w-[72px] h-[72px] rounded-full shadow-md bg-[#A2E9C1]">
        {/* 这里放用户头像 */}
        <img
          src={BG1}
          alt="Community"
          className="w-full h-full object-cover rounded-full" />
      </div>
      {/* 
        BUG：名字div的长度无法截断且会挤占头像的位置导致头像无法正常显示 
        fiexed：
          1、给头像的div设置flex-shrink-0阻止flex项收缩；（非必须设置）
          2、给名字的div添加 min-w-0 覆盖默认最小宽度限制；（必须设置！因为该设置允许内容收缩）
          3、给H3的父元素加上显式宽度w-full，truncate生效的前提是其父元素有宽度限制（必须设置，否则会向右突破边界，不会截断）
      */}
      <div className="flex flex-1 min-w-0 items-center h-[72px] border-l border-gray-300 m-3">
        <div className="pl-3 w-full">
          <h3 className="truncate text-lightTextColor dark:text-darkTextColor text-lg font-bold">
            WebDeveloperNameIsWebDeveloper
          </h3>
        </div>
      </div>
    </div>
  );
}
