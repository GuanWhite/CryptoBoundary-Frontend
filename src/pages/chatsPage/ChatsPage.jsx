import React from 'react';
import ConversationListCard from '../../components/ConversationListCard/ConversationListCard';
import ChatRoomPage from '../chatRoomPage/ChatRoomPage';
import SearchBox from '../../components/SearchBox/SearchBox';
import EndLine from '../../components/EndLine/EndLine';

export default function ChatsPage() {
  return (
    <div className='min-h-screen w-full flex'>
      <div className="max-h-screen overflow-auto scrollbar bg-[#e5e5e5] dark:bg-gray-500">
        <div className="w-full flex justify-center items-center p-3 pt-6">
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
        <EndLine />
      </div>
      <div className="flex flex-1">
        <ChatRoomPage />
      </div>
    </div>
  );
}
