import React from 'react';
import BG1 from "../../assets/bg1.jpg";

export default function ConversationListCard({ count = 100 }) {
  return (
    <div className="cursor-pointer flex justify-center items-center p-3 max-w-80 h-28 bg-[#e5e5e5] hover:bg-[#d8d8d8] dark:bg-gray-500 dark:hover:bg-gray-600 shadow-lg">
      <div className="relative flex justify-center items-center flex-shrink-0 w-[72px] h-[72px] rounded-full shadow-md bg-[#A2E9C1]">
        {count > 0 && (
          <div className="absolute w-[72px] h-[72px] z-10">
            <span className="absolute right-0 top-0 h-6 w-6 inline-flex items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
              {count > 99 ? '99+' : count}
            </span>
          </div>
        )}

        {/* 这里放用户头像 */}
        <img
          src={BG1}
          alt="Community"
          className="w-full h-full object-cover rounded-full" />
      </div>

      <div className="flex flex-1 min-w-0 items-center h-[72px] border-l border-gray-300 m-3">
        <div className="pl-3 w-full flex flex-col">
          <h3 className="truncate text-lightTextColor dark:text-darkTextColor text-lg font-bold">
            WebDeveloperNameIsWebDeveloper
          </h3>
          <h3 className="truncate text-lightTextColor dark:text-darkTextColor text-base">
            The last message in the chat.
          </h3>
          <h3 className="truncate text-lightTextColor dark:text-darkTextColor text-xs">
            2020-01-01 12:00
          </h3>
        </div>
      </div>
    </div>
  );
}
