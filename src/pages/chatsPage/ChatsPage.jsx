import React from 'react';
import ConversationListCard from '../../components/ConversationListCard/ConversationListCard';
import ChatRoomPage from '../chatRoomPage/ChatRoomPage';
import SearchBox from '../../components/SearchBox/SearchBox';

export default function ChatsPage() {
  return (
    <div className='min-h-screen w-full flex'>
      <div className="pt-[10px] max-h-screen overflow-auto scrollbar bg-[#e5e5e5] dark:bg-gray-500">
        <div className="w-full flex justify-center items-center p-3">
          <SearchBox />
        </div>
        <ConversationListCard />
        <ConversationListCard />
        <ConversationListCard />
        <ConversationListCard />
        <ConversationListCard />
        <ConversationListCard />
        <ConversationListCard />
        <ConversationListCard />
        <ConversationListCard />
        <ConversationListCard />
        <ConversationListCard />
        <ConversationListCard />

        <div className="w-full mt-[1.5em] pt-[1.2em] border-t-[0.15em] border-dashed border-[rgba(0,0,0,0.15)]" />
      </div>
      <ChatRoomPage />
    </div>
  );
}
