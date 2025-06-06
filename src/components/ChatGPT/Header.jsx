import React, { useState, useEffect, useRef } from 'react';
import {
  FormOutlined,
  MenuOutlined,
} from '@ant-design/icons';
import { Tooltip, Avatar } from 'antd';
import SelectModelItem from './SelectModelItem';

export default function Header({ isOpenSideBar, setIsOpenSideBar }) {
  const [isShowSelectModel, setIsShowSelectModel] = useState(false);
  const openSideBar = () => {
    setIsOpenSideBar(prev => !prev);
  };
  const newChat = () => { };
  const clickUser = () => { };
  const dropdownRef = useRef(null);

  // 点击外部关闭下拉菜单
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsShowSelectModel(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const clickSelectModel = () => {
    setIsShowSelectModel(prev => !prev);
  };

  return (
    <div className='flex justify-between items-center p-[12px] h-[56px]'>
      {/* 左侧盒子 */}
      <div className='flex items-center'>
        {!isOpenSideBar &&
          <div className='flex items-center'>
            <Tooltip placement="bottomLeft" title="Open sidebar">
              <span>
                <button
                  className="hover:bg-[#e7e7e7] dark:hover:bg-[#3a3a3a] size-[40px] rounded-lg px-2"
                  onClick={openSideBar}>
                  <MenuOutlined className="text-[24px]" />
                </button>
              </span>
            </Tooltip>
            <Tooltip placement="bottom" title="New a chat">
              <span>
                <button
                  className="hover:bg-[#e7e7e7] dark:hover:bg-[#3a3a3a] size-[40px] rounded-lg px-2"
                  onClick={newChat}>
                  <FormOutlined className="text-[24px]" />
                </button>
              </span>
            </Tooltip>
          </div>}
        <div className="" ref={dropdownRef}>
          <button
            className="flex cursor-pointer items-center gap-1 py-1.5 px-3 text-lg hover:bg-[#e7e7e7] dark:hover:bg-[#3a3a3a] rounded-lg"
            onClick={clickSelectModel}>
            <div>ChatGPT</div>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="icon-md text-token-text-tertiary">
              <path fillRule="evenodd" clipRule="evenodd" d="M5.29289 9.29289C5.68342 8.90237 6.31658 8.90237 6.70711 9.29289L12 14.5858L17.2929 9.29289C17.6834 8.90237 18.3166 8.90237 18.7071 9.29289C19.0976 9.68342 19.0976 10.3166 18.7071 10.7071L12.7071 16.7071C12.5196 16.8946 12.2652 17 12 17C11.7348 17 11.4804 16.8946 11.2929 16.7071L5.29289 10.7071C4.90237 10.3166 4.90237 9.68342 5.29289 9.29289Z" fill="currentColor"></path>
            </svg>
          </button>
          {isShowSelectModel && <SelectModelItem className="" />}
        </div>
      </div>

      {/* 右侧盒子 */}
      <div className='flex items-center'>
        <button
          className="px-2"
          onClick={clickUser}>
          <Avatar style={{ backgroundColor: '#f56a00', verticalAlign: 'middle' }} size={32}>
            {"G"}
          </Avatar>
        </button>
      </div>
    </div>
  );
}
