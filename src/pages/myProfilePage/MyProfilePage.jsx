import React, { useState } from 'react';
import BG1 from "../../assets/bg1.jpg";
import {
  EditOutlined
} from '@ant-design/icons';
import { Avatar, Button } from 'antd';
import SelectImageModal from "../../components/SelectImageModal/SelectImageModal";
import SelectBannerModal from "../../components/SelectBannerModal/SelectBannerModal";


export default function MyProfilePage() {
  const [isVisible, setIsVisible] = useState(false);
  const [isBannerModalVisible, setIsBannerModalVisible] = useState(false);
  // const [confirmLoading, setConfirmLoading] = useState(false);
  const handleVisible = (v) => {
    setIsVisible(v);
  };
  const handleBannerModalVisible = (v) => {
    setIsBannerModalVisible(v);
  };

  // const UserAvatar = ""; // 头像的URL
  const UserAvatar = BG1;
  const userFirstName = "G";

  const handleUploadAvatar = () => {
    setIsVisible(true);
  };

  const handleUploadBanner = () => {
    setIsBannerModalVisible(true);
  };

  return (
    <div className='w-full min-h-screen flex justify-center items-center'>
      <div className="flex flex-col justify-center items-center min-w-[800px] min-h-[600px] w-1/2 h-2/3 bg-[#f3f3f4] dark:bg-[#36373e] rounded-lg">
        {/* 背景框，为遮罩层添加上传文件的弹窗和背景遮罩，弹窗中有colorPicker */}
        <div
          onClick={handleUploadBanner}
          className="w-full h-[120px] bg-blue-400 rounded-t-lg relative group overflow-hidden">
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer text-white text-xl font-medium">
            <EditOutlined className="mr-[5px]" /> Replace banner
          </div>
          <SelectBannerModal
            visible={isBannerModalVisible}
            handleVisible={handleBannerModalVisible}
          />
        </div>
        {/* 头像和昵称 */}
        <div className="w-full h-[80px] flex items-center px-[20px]">
          <div className="relative flex justify-center items-center rounded-full w-[90px] h-[90px] bg-[#f3f3f4] dark:bg-[#36373e] -mt-[45px]">
            <div className="relative group w-20 h-20 rounded-full overflow-hidden">
              {
                UserAvatar === "" ?
                  <Avatar className='size-full text-[40px] bg-green-400'>{userFirstName}</Avatar> :
                  <Avatar className='size-full text-[40px]' src={UserAvatar} />
              }
              {/* 悬停遮罩，添加上传文件的弹窗和背景遮罩 */}
              <div
                onClick={handleUploadAvatar}
                className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer">
                <EditOutlined className="text-white text-xl font-medium" />
              </div>
              <SelectImageModal
                visible={isVisible}
                handleVisible={handleVisible}
              />
            </div>
          </div>
          <div className="text-lightTextColor dark:text-darkTextColor text-xl font-bold ml-[10px] mb-[36px]">
            User Nick Name
          </div>
        </div>

        {/* 相关信息 */}
        <div className="w-full flex-1 rounded-b-lg px-[20px] pb-[20px]">
          <div className="flex flex-col w-full h-full bg-lightBackgroundColor dark:bg-darkBackgroundColor rounded-lg text-base font-semibold text-lightTextColor dark:text-darkTextColor">
            {/* 昵称（最开始用户的昵称等于用户名）、性别、用户名、邮箱、手机号码、个人简介。 修改密码放在setting中 */}
            <div className="w-full h-[60px] px-[20px] flex justify-between items-center">
              <div>{`Display Name: ${1}`}</div>
              <Button
                // onClick={}
                type="primary"
                className="text-[16px] rounded-[6px]" >
                Edit
              </Button>
            </div>
            <div className="w-full h-[60px] px-[20px] flex justify-between items-center">
              <div>{`Gender: ${1}`}</div>
              <Button
                // onClick={}
                type="primary"
                className="text-[16px] rounded-[6px]" >
                Edit
              </Button>
            </div>
            <div className="w-full h-[60px] px-[20px] flex justify-between items-center">
              <div>{`Username: ${1}`}</div>
              <Button
                // onClick={}
                type="primary"
                className="text-[16px] rounded-[6px]" >
                Edit
              </Button>
            </div>
            <div className="w-full h-[60px] px-[20px] flex justify-between items-center">
              <div>{`Email: ${1}`}</div>
              <Button
                // onClick={}
                type="primary"
                className="text-[16px] rounded-[6px]" >
                Edit
              </Button>
            </div>
            <div className="w-full h-[60px] px-[20px] flex justify-between items-center">
              <div>{`Phone Number: ${1}`}</div>
              <Button
                // onClick={}
                type="primary"
                className="text-[16px] rounded-[6px]" >
                Edit
              </Button>
            </div>
            <div className="w-full flex flex-col flex-1 px-[20px] py-[14px]">
              <div className='flex justify-between items-center mb-3'>
                <div>{`Introduction: `}</div>
                <Button
                  // onClick={}
                  type="primary"
                  className="text-[16px] rounded-[6px]" >
                  Edit
                </Button>
              </div>
              <div className='w-full flex-1 font-medium break-words overflow-hidden line-clamp-4 text-ellipsis'>
                {`test words${1} the max lines is 4`}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
