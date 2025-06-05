import React from 'react';

export default function SideBarItem({context}) {
  return (
    <div className='mx-[6px] px-[10px] py-[8px] hover:bg-[#e7e7e7] dark:hover:bg-[#3a3a3a] rounded-lg truncate cursor-pointer'>{context}</div>
  );
}
