import React, { useState } from 'react';
import { useNavigate } from "react-router";
import {
  AppstoreOutlined,
  SlidersOutlined,
  SettingOutlined,
  OpenAIOutlined,
  ProfileOutlined,
  DiscordOutlined,
  DollarOutlined,
  TeamOutlined
} from '@ant-design/icons';
import { Menu } from 'antd';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import logoSVG from "../../assets/react.svg";

const items = [
  {
    key: 'profile',            // 唯一的key值，点击后会传递给onClick函数
    label: 'My profile',       // 页面上显示的文字
    icon: <ProfileOutlined />, // 显示的图标
  },
  {
    key: 'chat',
    label: 'ChatGPT',
    icon: <OpenAIOutlined />,
  },
  {
    key: 'easychat',
    label: 'Easychat',
    icon: <TeamOutlined />,
    children: [
      { key: 'contacts', label: 'Contacts' },
      { key: 'chats', label: 'Chats' },
    ],
  },
  {
    key: 'communitys',
    label: 'Communitys', // 这里应该是选择具体社区的首页
    icon: <DiscordOutlined />,
    children: [
      { key: 'allcommunitys', label: 'All Communitys' },      // 应用中所有的社区
      { key: 'mycommunitys', label: 'My Communitys' },        // 我创建的社区
      { key: 'joinedcommunitys', label: 'Joined Communitys' },  // 我加入了的社区
    ],
  },
  {
    key: 'tokens',
    label: 'Tokens',
    icon: <DollarOutlined />,
  },
  {
    key: 'exchange',
    label: 'Crypto Exchange',
    icon: <SlidersOutlined />,
    children: [
      { key: '1', label: 'Option 1' },
      { key: '2', label: 'Option 2' },
      { key: '3', label: 'Option 3' },
      { key: '4', label: 'Option 4' },
    ],
  },
  {
    key: 'app',
    label: 'Applications',
    icon: <AppstoreOutlined />,
    children: [
      { key: '5', label: 'Option 5' },
      { key: '6', label: 'Option 6' },
      {
        key: 'sub3',
        label: 'Submenu',
        children: [
          { key: '7', label: 'Option 7' },
          { key: '8', label: 'Option 8' },
        ],
      },
    ],
  },
  {
    key: 'setting',
    label: 'Settings',
    icon: <SettingOutlined />,
  },
];

export default function SideNav({ theme = "dark" }) {
  const [current, setCurrent] = useState('');
  const navigate = useNavigate();

  const onClick = e => {
    // 点哪个选项，mian区域就渲染哪个内容
    console.log('click ', e);
    setCurrent(e.key);
    navigate(`/${e.key}`);
  };
  return (
    <div className='w-[205px] min-h-screen bg-lightSidenavColor dark:bg-darkSidenavColor text-lightTextColor dark:text-darkTextColor'>
      {/* 添加一些其他的信息 */}
      <div className='w-full h-[80px] flex justify-center items-center px-[24px]'>
        <img src={logoSVG} alt="logo" className="size-[40px]" />
      </div>
      <Menu
        className='bg-lightSidenavColor dark:bg-darkSidenavColor text-lightTextColor dark:text-darkTextColor'
        theme={theme}
        onClick={onClick}
        style={{ width: 205 }}
        // defaultOpenKeys={['sub1']} // 初始展开的 SubMenu 菜单项 key 数组
        defaultSelectedKeys={['allcommunitys']} // 默认选中的菜单
        selectedKeys={[current]}
        mode="inline"
        items={items}
      />
      <div className='w-full flex justify-center items-center px-[24px] py-[10px]'>
        <ThemeToggle />
      </div>

      {/* 用户状态信息工具箱 */}
      <div className=''>

      </div>
    </div>
  );
}
