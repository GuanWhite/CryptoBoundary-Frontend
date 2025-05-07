import React from 'react';
import ContactListCard from '../../components/ContactListCard/ContactListCard';
import ChatRoomPage from '../chatRoomPage/ChatRoomPage';

export default function ContactsPage() {
  return (
    <div className='min-h-screen w-full flex'>
      <div className="pt-[32px] h-full bg-[#e5e5e5]">
        <ContactListCard />
        <ContactListCard />
        <ContactListCard />
        <ContactListCard />
        <ContactListCard />
        <ContactListCard />
        <ContactListCard />
        <ContactListCard />
        <ContactListCard />
        <ContactListCard />
        <div className="w-72 mt-[1.5em] pt-[1.2em] border-t-[0.15em] border-dashed border-[rgba(0,0,0,0.15)]"/>
      </div>
      <ChatRoomPage />
    </div>
  );
}
