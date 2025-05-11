import React from 'react';
import BG1 from "../../assets/bg1.jpg";
import {
  EditOutlined
} from '@ant-design/icons';

export default function MyProfilePage() {
  return (
    <div className='w-full min-h-screen flex justify-center items-center'>
      <div className="flex flex-col justify-center items-center min-w-[800px] min-h-[600px] w-1/2 h-2/3 bg-[#f3f3f4] dark:bg-[#36373e] rounded-lg">
        {/* 背景框 */}
        <div className="w-full h-[120px] bg-blue-600 rounded-t-lg">

        </div>
        {/* 头像和昵称 */}
        <div className="w-full h-[90px] bg-green-600 flex items-center">
          <div className="flex justify-center items-center rounded-full w-[90px] h-[90px] bg-red-500">
            <div className="relative group w-20 h-20 rounded-full overflow-hidden">
              {/* 头像图像 */}
              <img
                src={BG1}
                alt="Avatar"
                className="w-full h-full object-cover"
              />
              {/* 悬停遮罩 */}
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer">
                {/* <span className="text-white text-sm font-medium"></span> */}
                <EditOutlined className="text-white text-xl font-medium" />
              </div>
            </div>
          </div>
          <div className="">
            user Nick name
          </div>
        </div>

        {/* 相关信息 */}
        <div className="w-full flex-1 bg-pink-600 rounded-b-lg">

        </div>
      </div>
    </div>
  );
}
