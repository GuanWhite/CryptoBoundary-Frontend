import React from 'react';
import {
  CloseOutlined,
  FormOutlined,
  SearchOutlined,
  OpenAIOutlined,
} from '@ant-design/icons';
import SideBarItem from './SideBarItem';

export default function SideBar({isOpenSideBar, setIsOpenSideBar}) {
  const closeSideBar = () => {
    setIsOpenSideBar(prev => !prev);
  };
  const newChat = () => {
    console.log("new chat");
  };

  return (
    <div className='min-h-screen w-[210px] flex flex-col dark:bg-[#171717] bg-[#f9f9f9] max-h-screen overflow-auto scrollbar '>
      {/* 工具箱 */}
      <div className="sticky top-0 flex justify-between items-center pt-[12px] px-[8px] h-[56px] dark:bg-[#171717] bg-[#f9f9f9]">
        <button
          className="hover:bg-[#e7e7e7] dark:hover:bg-[#3a3a3a] size-[40px] rounded-lg px-2"
          onClick={newChat}>
          <OpenAIOutlined className="text-[24px]" />
        </button>
        <button
          className="hover:bg-[#e7e7e7] dark:hover:bg-[#3a3a3a] size-[40px] rounded-lg px-2"
          onClick={closeSideBar}>
          <CloseOutlined className="text-[24px]" />
        </button>
      </div>

      {/* 功能栏 */}
      <div className="flex flex-col mx-[3px] last:mb-5 mt-2 select-none">
        <div
          className='mx-[6px] px-[10px] py-[8px] hover:bg-[#e7e7e7] dark:hover:bg-[#3a3a3a] rounded-lg flex items-center gap-1.5 cursor-pointer'
          onClick={newChat}>
          <FormOutlined />
          <span>New chat</span>
        </div>
        <div className='mx-[6px] px-[10px] py-[8px] hover:bg-[#e7e7e7] dark:hover:bg-[#3a3a3a] rounded-lg flex items-center gap-1.5 cursor-pointer'>
          <SearchOutlined />
          <span>Search chat</span>
        </div>
      </div>

      {/* 历史记录 */}
      {/* 这是一个伪类前缀，用于选择父元素中的最后一个子元素。它对应于 CSS 的 :last-child 伪类。
      当使用 last: 前缀时，Tailwind CSS 会为父元素中的最后一个子元素应用指定的样式。
      last:mb-5 的意思是：为父元素中的最后一个子元素设置底部外边距为 1.25rem（20px）。 
      */}
      <div className="flex flex-col mx-[3px] last:mb-5 mt-5 select-none">
        <div className='mx-[6px] px-[10px] py-[8px] flex items-center text-[#babac1] cursor-default'>
          Chat history
        </div>
        <SideBarItem context={'Test content'} />
        <SideBarItem context={'User Greeting'} />
        <SideBarItem context={'May i help you'} />
        <SideBarItem context={'Pages notFoundPage NotFoundPage'} />
        <SideBarItem context={'Test content'} />
        <SideBarItem context={'User Greeting'} />
        <SideBarItem context={'May i help you'} />
        <SideBarItem context={'Pages notFoundPage NotFoundPage'} /><SideBarItem context={'Test content'} />
        <SideBarItem context={'User Greeting'} />
        <SideBarItem context={'May i help you'} />
        <SideBarItem context={'Pages notFoundPage NotFoundPage'} /><SideBarItem context={'Test content'} />
        <SideBarItem context={'User Greeting'} />
        <SideBarItem context={'May i help you'} />
        <SideBarItem context={'Pages notFoundPage NotFoundPage'} /><SideBarItem context={'Test content'} />
        <SideBarItem context={'User Greeting'} />
        <SideBarItem context={'May i help you'} />
        <SideBarItem context={'Pages notFoundPage NotFoundPage'} /><SideBarItem context={'Test content'} />
        <SideBarItem context={'User Greeting'} />
        <SideBarItem context={'May i help you'} />
        <SideBarItem context={'Pages notFoundPage NotFoundPage'} /><SideBarItem context={'Test content'} />
        <SideBarItem context={'User Greeting'} />
        <SideBarItem context={'May i help you'} />
        <SideBarItem context={'Pages notFoundPage NotFoundPage'} /><SideBarItem context={'Test content'} />
        <SideBarItem context={'User Greeting'} />
        <SideBarItem context={'May i help you'} />
        <SideBarItem context={'Pages notFoundPage NotFoundPage'} /><SideBarItem context={'Test content'} />
        <SideBarItem context={'User Greeting'} />
        <SideBarItem context={'May i help you'} />
        <SideBarItem context={'Pages notFoundPage NotFoundPage'} /><SideBarItem context={'Test content'} />
        <SideBarItem context={'User Greeting'} />
        <SideBarItem context={'May i help you'} />
        <SideBarItem context={'Pages notFoundPage NotFoundPage'} /><SideBarItem context={'Test content'} />
        <SideBarItem context={'User Greeting'} />
        <SideBarItem context={'May i help you'} />
        <SideBarItem context={'Pages notFoundPage NotFoundPage'} /><SideBarItem context={'Test content'} />
        <SideBarItem context={'User Greeting'} />
        <SideBarItem context={'May i help you'} />
        <SideBarItem context={'Pages notFoundPage NotFoundPage'} /><SideBarItem context={'Test content'} />
        <SideBarItem context={'User Greeting'} />
        <SideBarItem context={'May i help you'} />
        <SideBarItem context={'Pages notFoundPage NotFoundPage'} /><SideBarItem context={'Test content'} />
        <SideBarItem context={'User Greeting'} />
        <SideBarItem context={'May i help you'} />
        <SideBarItem context={'Pages notFoundPage NotFoundPage'} /><SideBarItem context={'Test content'} />
        <SideBarItem context={'User Greeting'} />
        <SideBarItem context={'May i help you'} />
        <SideBarItem context={'Pages notFoundPage NotFoundPage'} /><SideBarItem context={'Test content'} />
        <SideBarItem context={'User Greeting'} />
        <SideBarItem context={'May i help you'} />
        <SideBarItem context={'Pages notFoundPage NotFoundPage'} /><SideBarItem context={'Test content'} />
        <SideBarItem context={'User Greeting'} />
        <SideBarItem context={'May i help you'} />
        <SideBarItem context={'Pages notFoundPage NotFoundPage'} /><SideBarItem context={'Test content'} />
        <SideBarItem context={'User Greeting'} />
        <SideBarItem context={'May i help you'} />
        <SideBarItem context={'Pages notFoundPage NotFoundPage'} /><SideBarItem context={'Test content'} />
        <SideBarItem context={'User Greeting'} />
        <SideBarItem context={'May i help you'} />
        <SideBarItem context={'Pages notFoundPage NotFoundPage'} /><SideBarItem context={'Test content'} />
        <SideBarItem context={'User Greeting'} />
        <SideBarItem context={'May i help you'} />
        <SideBarItem context={'Pages notFoundPage NotFoundPage'} /><SideBarItem context={'Test content'} />
        <SideBarItem context={'User Greeting'} />
        <SideBarItem context={'May i help you'} />
        <SideBarItem context={'Pages notFoundPage NotFoundPage'} /><SideBarItem context={'Test content'} />
        <SideBarItem context={'User Greeting'} />
        <SideBarItem context={'May i help you'} />
        <SideBarItem context={'Pages notFoundPage NotFoundPage'} /><SideBarItem context={'Test content'} />
        <SideBarItem context={'User Greeting'} />
        <SideBarItem context={'May i help you'} />
        <SideBarItem context={'Pages notFoundPage NotFoundPage'} /><SideBarItem context={'Test content'} />
        <SideBarItem context={'User Greeting'} />
        <SideBarItem context={'May i help you'} />
        <SideBarItem context={'Pages notFoundPage NotFoundPage'} /><SideBarItem context={'Test content'} />
        <SideBarItem context={'User Greeting'} />
        <SideBarItem context={'May i help you'} />
        <SideBarItem context={'Pages notFoundPage NotFoundPage'} /><SideBarItem context={'Test content'} />
        <SideBarItem context={'User Greeting'} />
        <SideBarItem context={'May i help you'} />
        <SideBarItem context={'Pages notFoundPage NotFoundPage'} />
      </div>
    </div>
  );
}
