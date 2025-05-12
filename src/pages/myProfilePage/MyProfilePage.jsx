import React, { useState, useEffect } from 'react';
import BG1 from "../../assets/bg1.jpg";
import {
  EditOutlined
} from '@ant-design/icons';
import { Avatar, Button } from 'antd';
import SelectImageModal from "../../components/SelectImageModal/SelectImageModal";
import SelectBannerModal from "../../components/SelectBannerModal/SelectBannerModal";


export default function MyProfilePage() {
  const userData = {
    displayName: "GYL",
    gender: "men",
    username: "Guan",
    email: "123@qq.com",
    phoneNumber: "10086",
    introduction: "I am a student",
    avatarURL: BG1,
    bannerURL: "",
    bannerColor: "#6495ED",
  };
  useEffect(() => {
    // 通过请求或get本地存储获取用户信息

  }, []);

  const [displayName, setDisplayName] = useState(userData.displayName);
  const [gender, setGender] = useState(userData.gender);
  const [username, setUsername] = useState(userData.username);
  const [email, setEmail] = useState(userData.email);
  const [phoneNumber, setPhoneNumber] = useState(userData.phoneNumber);
  const [introduction, setIntroduction] = useState(userData.introduction);
  const [avatarUrl, setAvatarUrl] = useState(userData.avatarURL);
  const [bannerUrl, setBannerUrl] = useState(userData.bannerURL);
  const [bannerColor, setBannerColor] = useState(userData.bannerColor);

  const [isAvatarModalVisible, setIsAvatarModalVisible] = useState(false);
  const [isBannerModalVisible, setIsBannerModalVisible] = useState(false);
  // const [confirmLoading, setConfirmLoading] = useState(false);

  const handleAvatarModalVisible = (v) => {
    setIsAvatarModalVisible(v);
  };
  const handleBannerModalVisible = (v) => {
    setIsBannerModalVisible(v);
  };

  const setAvatarUrlTool = (url) => {
    setAvatarUrl(url);
  };
  const setBannerUrlTool = (url) => {
    setBannerUrl(url);
  };
  const setBannerColorTool = (color) => {
    setBannerColor(color);
    // 存储到本地进行持久化，防止刷新页面后失效
  };

  const handleUploadAvatar = () => {
    setIsAvatarModalVisible(true);
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
          // Tailwind CSS 是一个 原子类框架，它在 构建阶段（build time） 使用工具（如 PostCSS 或 CLI）静态分析你的类名，比如 bg-red-500、bg-[#2ccf6d]，然后只编译用到的类名。
          // 但当你用变量拼接（bg-[#${bannerColor}]）时，Tailwind 无法提前识别变量值，所以对应的 CSS 类就不会被生成。
          // 所以我们需要使用 inline style 来动态设置背景颜色。
          className={`w-full h-[120px] rounded-t-lg relative group overflow-hidden`}
          style={{ backgroundColor: `${bannerColor}` }}
        >
          {bannerUrl === "" ? (<></>) : (
            <img
              src={bannerUrl}
              alt="BannerImgae"
              className="w-full h-full object-cover" />)}
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer text-white text-xl font-medium">
            <EditOutlined className="mr-[5px]" /> Replace banner
          </div>
        </div>
        <SelectBannerModal
          visible={isBannerModalVisible}
          handleVisible={handleBannerModalVisible}
          setBannerUrl={setBannerUrlTool}
          bannerColor={bannerColor}
          setBannerColor={setBannerColorTool}
        />
        {/* 头像和昵称 */}
        <div className="w-full h-[80px] flex items-center px-[20px]">
          <div className="relative flex justify-center items-center rounded-full w-[90px] h-[90px] bg-[#f3f3f4] dark:bg-[#36373e] -mt-[45px]">
            <div className="relative group w-20 h-20 rounded-full overflow-hidden">
              {
                avatarUrl === "" ?
                  <Avatar className='size-full text-[40px] bg-green-400'>{username[0]}</Avatar> :
                  <Avatar className='size-full text-[40px]' src={avatarUrl} />
              }
              {/* 悬停遮罩，添加上传文件的弹窗和背景遮罩 */}
              <div
                onClick={handleUploadAvatar}
                className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer">
                <EditOutlined className="text-white text-xl font-medium" />
              </div>
              <SelectImageModal
                visible={isAvatarModalVisible}
                handleVisible={handleAvatarModalVisible}
                setAvatarUrl={setAvatarUrlTool}
              />
            </div>
          </div>
          <div className="text-lightTextColor dark:text-darkTextColor text-xl font-bold ml-[10px] mb-[36px]">
            {displayName}
          </div>
        </div>

        {/* 相关信息 */}
        <div className="w-full flex-1 rounded-b-lg px-[20px] pb-[20px]">
          <div className="flex flex-col w-full h-full bg-lightBackgroundColor dark:bg-darkBackgroundColor rounded-lg text-base font-semibold text-lightTextColor dark:text-darkTextColor">
            {/* 昵称（最开始用户的昵称等于用户名）、性别、用户名、邮箱、手机号码、个人简介。 修改密码放在setting中 */}
            <div className="w-full h-[60px] px-[20px] flex justify-between items-center">
              <div>{`Display Name: ${displayName}`}</div>
              <Button
                // onClick={}
                type="primary"
                className="text-[16px] rounded-[6px]" >
                Edit
              </Button>
            </div>
            <div className="w-full h-[60px] px-[20px] flex justify-between items-center">
              <div>{`Gender: ${gender}`}</div>
              <Button
                // onClick={}
                type="primary"
                className="text-[16px] rounded-[6px]" >
                Edit
              </Button>
            </div>
            <div className="w-full h-[60px] px-[20px] flex justify-between items-center">
              <div>{`Username: ${username}`}</div>
              <Button
                // onClick={}
                type="primary"
                className="text-[16px] rounded-[6px]" >
                Edit
              </Button>
            </div>
            <div className="w-full h-[60px] px-[20px] flex justify-between items-center">
              <div>{`Email: ${email}`}</div>
              <Button
                // onClick={}
                type="primary"
                className="text-[16px] rounded-[6px]" >
                Edit
              </Button>
            </div>
            <div className="w-full h-[60px] px-[20px] flex justify-between items-center">
              <div>{`Phone Number: ${phoneNumber}`}</div>
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
                {introduction}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
