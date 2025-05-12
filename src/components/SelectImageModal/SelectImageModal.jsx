import React, { useState } from 'react';
import { Button, Input, Modal, Upload, message } from "antd";
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

export default function SelectImageModal({
  confirmLoading = false,
  visible = false,
  handleVisible,
  onLaunch = async () => false,
}) {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();
  // limit file type and size less than 4MB
  const beforeUpload = file => {
    const allowTypes = ['image/png', 'image/jpeg', 'image/webp', 'image/gif'];
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

  };

  const handleCancel = () => {
    handleVisible(false);
    setImageUrl("");
    setImageFileList([]);
  };

  const handleChange = info => {
    handleVisible(false);
    // if (info.file.status === 'uploading') {
    //   setLoading(true);
    //   return;
    // }
    // if (info.file.status === 'done') {
    //   // Get this url from response in real world.
    //   // getBase64(info.file.originFileObj, url => {
    //   //   setLoading(false);
    //   //   setImageUrl(url);
    //   // });
    //   setLoading(false);
    // }
  };
  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type="button">
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  const uploadArea = (
    <div className="flex my-[20px]">
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
        {/* // <input type="file" id="file" className="hidden" /> */}
      </label>
    </div>
  );

  return (
    // <div className='flex justify-center items-center'>
    <Modal
      width={548}
      height={540}
      background-color={"#393a41"}
      centered
      open={visible}
      footer={null}  // 禁用默认的底部按钮
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
    >
      <div className="p-6 size-[500px] flex flex-col justify-center items-center">
        <h2 className="text-xl font-semibold">Select an Image</h2>
        {/* <div className="flex my-[20px]">
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
        </div> */}
        <Upload
          // name="avatar"
          // listType="picture-circle"
          className="h-[200px] w-[300px]"
          showUploadList={false}
          action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
          beforeUpload={beforeUpload}
          onChange={handleChange}
        >
          {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadArea}
        </Upload>
        <div className='font-thin text-base'>
          Upload a PNG, JPG, or GIF under 10MB. Images should be at least 680x240.
        </div>
      </div>

    </Modal>
  );
}
