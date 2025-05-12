import React, { useState } from 'react';
import { Button, Input, Modal, Upload, message } from "antd";
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

export default function SelectBannerModal({
  visible = false,
  handleVisible,
  setBannerUrl
}) {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();

  // limit file type and size less than 4MB
  const beforeUpload = file => {
    const allowTypes = ['image/png', 'image/jpeg', 'image/wepg', 'image/gif'];
    const isAllowed = allowTypes.includes(file.type);
    if (!isAllowed) {
      message.error("You can only upload jpeg/png/webp/gif file!");
      return;
    }
    const isLt4M = file.size / 1024 / 1024 < 4;
    if (!isLt4M) {
      message.error("Image must smaller than 4MB!");
      return;
    }
    return isAllowed && isLt4M;
  };

  const handleUpload = file => {

    // 1、post上传至服务器（此过程显示loading）
    // 2、将服务器响应的头像url保存到状态变量中（由于当前组件用不到该图片，而父组件需要使用，所以通过子传父，将该图片url回传给父组件）
    // setAvatarUrl(res.url);
    // 3、停止显示loading并关闭Modal
    handleVisible(false);
    console.log("upload successfully", file);
  };

  const handleCancel = () => {
    handleVisible(false);
    console.log(visible);
    // setImageUrl("");
    // setImageFileList([]);
  };

  return (
    <Modal
      width={548}
      height={540}
      centered
      open={visible}
      footer={null}  // 禁用默认的底部按钮
      // confirmLoading={confirmLoading}
      onCancel={handleCancel}
    >
      <div className="p-6 size-[500px] flex flex-col justify-center items-center">
        <h2 className="text-xl font-semibold">Select an Image</h2>
        <Upload
          // name="avatar" // 发到后台的文件参数名
          // withCredentials	//上传请求时是否携带 cookie
          className="h-[200px] w-[300px] my-[20px]"
          showUploadList={false}
          // action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload" // 上传的地址，用customRequest覆盖后可实现自定义上传
          customRequest={handleUpload}  // 自定义上传请求
          beforeUpload={beforeUpload}   // 上传文件之前的钩子，参数为上传的文件
        // onChange={handleChange}       // 上传文件改变时的回调
        >
          <label
            htmlFor="file"
            className="h-[200px] w-[300px] flex flex-col gap-5 cursor-pointer items-center justify-center border-2 border-dashed border-gray-300 bg-white p-6 rounded-[10px] shadow-[0px_48px_35px_-48px_rgba(0,0,0,0.1)]"
          >
            <div className="flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="h-20 fill-gray-600"
              >
                <path
                  fill=""
                  d="M10 1C9.73478 1 9.48043 1.10536 9.29289 1.29289L3.29289 7.29289C3.10536 7.48043 3 7.73478 3 8V20C3 21.6569 4.34315 23 6 23H7C7.55228 23 8 22.5523 8 22C8 21.4477 7.55228 21 7 21H6C5.44772 21 5 20.5523 5 20V9H10C10.5523 9 11 8.55228 11 8V3H18C18.5523 3 19 3.44772 19 4V9C19 9.55228 19.4477 10 20 10C20.5523 10 21 9.55228 21 9V4C21 2.34315 19.6569 1 18 1H10ZM9 7H6.41421L9 4.41421V7ZM14 15.5C14 14.1193 15.1193 13 16.5 13C17.8807 13 19 14.1193 19 15.5V16V17H20C21.1046 17 22 17.8954 22 19C22 20.1046 21.1046 21 20 21H13C11.8954 21 11 20.1046 11 19C11 17.8954 11.8954 17 13 17H14V16V15.5ZM16.5 11C14.142 11 12.2076 12.8136 12.0156 15.122C10.2825 15.5606 9 17.1305 9 19C9 21.2091 10.7909 23 13 23H20C22.2091 23 24 21.2091 24 19C24 17.1305 22.7175 15.5606 20.9844 15.122C20.7924 12.8136 18.858 11 16.5 11Z"
                  clipRule="evenodd"
                  fillRule="evenodd"
                ></path>
              </svg>
            </div>
            <div className="flex items-center justify-center">
              <span className="font-normal text-gray-600">Click to upload image</span>
            </div>
          </label>
        </Upload>
        <div className='font-thin text-base w-[300px]'>
          Upload a PNG, JPG, WEPG, or GIF under 4MB.
        </div>
      </div>
    </Modal>
  );
}
