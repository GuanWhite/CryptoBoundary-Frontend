import React from 'react';
import ContactListCard from '../../components/ContactListCard/ContactListCard';
import AddFriendButton from '../../components/AddFriendButton/AddFriendButton';
import SearchBox from '../../components/SearchBox/SearchBox';
import EndLine from '../../components/EndLine/EndLine';

export default function ContactsPage() {
  return (
    <div className='min-h-screen w-full flex'>
      <div className="pt-[10px] max-h-screen overflow-auto scrollbar bg-[#e5e5e5] dark:bg-gray-500">
        {/* 联系人工具箱 */}
        <div className="w-full flex justify-center items-center p-3">
          <AddFriendButton />
        </div>
        <div className="w-full flex justify-center items-center p-3">
          <SearchBox />
        </div>
        {/* 联系人列表 A-Z, #排序，每个块都有border*/}
        <div>
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
        </div>
        {/* 列表结束标志 */}
        <EndLine />
      </div>
      {/* 
        在右侧展示联系人的相关信息和管理联系人（修改备注，删除联系人，朋友的来源），未点击联系人卡片时显示“快去找人聊天吧”，
        点击了联系人卡片（通过状态变量记录联系人卡片的key来判断是否点击了）则显示相应的信息 
      */}
      <div>

      </div>
    </div>
  );
}
