import React from 'react';
import {
  UserOutlined,
} from '@ant-design/icons';
import BG1 from "../../assets/bg1.jpg";

export default function CommunityCard() {
  return (
    <div className="relative mt-[60px] mb-[5px] flex w-80 flex-col rounded-xl bg-lightContentColor dark:bg-darkContentColor shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <div className="relative mx-4 -mt-6 h-40 overflow-hidden rounded-xl bg-clip-border shadow-lg group">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600">
          <img
            src={BG1}
            alt="Community"
            className="w-full h-full object-cover" />
          <div className="absolute right-0 bottom-0 flex items-center space-x-2 bg-emerald-50/50 dark:bg-emerald-900/50 px-3 py-1 rounded-xl" >
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
            <span className="text-sm text-emerald-600 dark:text-emerald-400 font-medium"><UserOutlined />Online: 10902</span>
          </div>
        </div>
      </div>

      <div className="p-6 w-full">
        <h5 className="truncate mb-2 block text-xl font-bold leading-snug text-lightTextColor dark:text-darkTextColor antialiased">
          Community NameCommunity NameCommunity NameCommunity NameCommunity NameCommunity Name
        </h5>
        {/*
          BUG：line-clamp-5不起作用，无法截断 ；实在不行考虑限制最高高度
          fixed：
            1、删除 max-h-[144px]：line-clamp 本身通过行数控制高度，固定高度会与行数控制逻辑冲突
            2、添加 overflow-hidden：强制隐藏超出容器部分（line-clamp 生效必要条件）
            3、保持 text-ellipsis：显示省略号（需配合 overflow 使用）和 line-clamp-6
            4、添加 break-words：允许长单词换行（避免单个单词过长撑破布局）
            5、父容器需有宽度约束（示例中父容器 p-6 的父级应有宽度限制），若外层没有明确宽度，可在当前容器添加 max-w-[...]
        */}
        <p className="break-words overflow-hidden line-clamp-6 text-ellipsis font-light text-gray-700 dark:text-[#F6F0FC] antialiased">
          Community describe. Nulla dolor velit adipisicingadipisicingadipisicingadipisicing duis excepteur esse in duis nostrud occaecat mollit incididunt deserunt sunt. Ut ut sunt laborum ex occaecat eu tempor labore enim adipisicing minim ad. Est in quis eu dolore occaecat excepteur fugiat dolore nisi aliqua fugiat enim ut cillum. Labore enim duis nostrud eu. Est ut eiusmod consequat irure quis deserunt ex. Enim laboris dolor magna pariatur. Dolor et ad sint voluptate sunt elit mollit officia ad enim sit consectetur enim.
        </p>
      </div>

      <div className="p-6 pt-0">
        <button
          className=" w-full px-6 py-3 font-bold text-white rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/40 transition-all duration-300 hover:-translate-y-0.5"
          onClick={() => { console.log('Join Now'); }}>
          Join Now
        </button>
      </div>
    </div>
  );
}
