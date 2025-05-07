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

      <div className="p-6">
        <h5 className="truncate mb-2 block text-xl font-bold leading-snug text-lightTextColor dark:text-darkTextColor antialiased">
          Community NameCommunity NameCommunity NameCommunity NameCommunity NameCommunity Name
        </h5>
        {/* BUG：line-clamp-5不起作用，无法截断 ；实在不行考虑限制最高高度*/}
        <p className="block line-clamp-6 max-h-[144px] text-ellipsis font-light text-gray-700 dark:text-[#F6F0FC] antialiased">
          Community describe. Nulla dolor velit adipisicing duis excepteur esse in duis nostrud occaecat mollit incididunt deserunt sunt. Ut ut sunt laborum ex occaecat eu tempor labore enim adipisicing minim ad. Est in quis eu dolore occaecat excepteur fugiat dolore nisi aliqua fugiat enim ut cillum. Labore enim duis nostrud eu. Est ut eiusmod consequat irure quis deserunt ex. Enim laboris dolor magna pariatur. Dolor et ad sint voluptate sunt elit mollit officia ad enim sit consectetur enim.
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
