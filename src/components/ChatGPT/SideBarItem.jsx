import React, { useState } from 'react';

export default function SideBarItem({ chatId, setChatID, context }) {
  const [isActive, setIsActive] = useState(false);
  const handelClick = () => {
    console.log(chatId);
    setChatID(chatId);
    setIsActive(true);
  };
  return (
    <button
      // className={`mx-[6px] px-[10px] py-[8px] hover:bg-[#e7e7e7] dark:hover:bg-[#3a3a3a] rounded-lg truncate cursor-pointer ${isActive?'bg-[#eaeaea]':''} dark:focus:bg-[#232323] text-left`}
      className='mx-[6px] px-[10px] py-[8px] hover:bg-[#e7e7e7] dark:hover:bg-[#3a3a3a] rounded-lg truncate cursor-pointer focus:bg-[#eaeaea] dark:focus:bg-[#232323] text-left'
      // 选中的背景颜色不是通过 isActive 来控制，而是通过 focus 来控制，导致切换主题（或其他行为）时会丢失选中的效果
      onClick={handelClick}>
      {context}
    </button>
  );
}
