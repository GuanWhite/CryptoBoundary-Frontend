import React, { useState } from 'react';
import { Input, Select, Space, Button, notification } from 'antd';
import { MobileOutlined, MailOutlined, LockOutlined, UserOutlined, GoogleOutlined, FacebookOutlined, GithubOutlined, LinkedinOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router";
import { registerRoute, loginRoute } from "../../utils/APIRoutes";
import axios from "axios";
import StartButton from '../../components/StartButton/StartButton';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [registerCode, setRegisterCode] = useState(''); // 验证码
  const [registerData, setRegisterData] = useState({
    username: '',
    password: '',
    email: '',
  });
  const [isShowCode, setIsShowCode] = useState(false);

  // const options = [
  //   {
  //     value: 'zhejiang',
  //     label: 'Zhejiang',
  //   },
  //   {
  //     value: 'jiangsu',
  //     label: 'Jiangsu',
  //   },
  // ];
  const handleChange = (event) => {
    setRegisterData({ ...registerData, [event.target.name]: event.target.value });
  };

  // 将参数传给后端发送验证码或前端调用其他发送验证码的api
  const sendEmailCode = async (params) => {
    if (isShowCode) { // 倒计时未结束,不能重复点击
      return;
    }
    setIsShowCode(true);

    // 调发送短信接口
    axios.get('/admin/send', {
      params: {
        phone: dataForm.phone,
      }
    }).then(res => {
      console.success(res.data);
    }).catch(error => {
      console.error(error);
    });

    // 倒计时
    const active = setInterval(() => {
      setTime((preSecond) => {
        if (preSecond <= 1) {
          setIsShowCode(false);
          clearInterval(active);
          // 重置秒数
          return 60;
        }
        return preSecond - 1;
      });
    }, 1000);

    return {
      responseCode: '000000', // 模拟成功响应
      responseMsg: "Verification code sent successfully!",
    };
  };

  const handleSendCode = async () => {
    // 模拟获取到的邮箱
    userEmail = "123@qq.com";
    // 将邮箱作为参数传入
    // 解构返回的对象，拿出对象中的成功或失败状态，并进行验证
    const res = await sendEmailCode(userEmail);
    if (res.responseCode === '000000') {
      notification.success({
        message: '发送成功,请填写收到的验证码',
      });
    } else {
      // 失败逻辑
    }
  };
  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (type, msg, des) => {
    api[type]({
      message: msg,
      description: des,
    });
  };

  const handleRegister = async (event) => {
    // 1.验证邮箱验证码是否正确，正确才可以注册
    if (registerCode === '123456') {
      const { email, username, password } = registerData;
      const { data } = await axios.post(registerRoute, {
        username,
        email,
        password,
      });

      if (data.status === false) {
        openNotificationWithIcon('error', 'Registration Failure', 'The server seems to have malfunctioned, please try again later!');
      }
      if (data.status === true) {
        // 设置本地存储 + 向服务器发送cookie
        // localStorage.setItem(
        //   process.env.REACT_APP_LOCALHOST_KEY,
        //   JSON.stringify(data.user)
        // );
        // 2.清空注册表单
        setRegisterData({
          username: '',
          password: '',
          email: '',
        });
        setRegisterCode('');
        // 3.提示“注册成功，现在去登陆吧”
        openNotificationWithIcon('success', 'Registered Successfully', 'Let\'s go log in now!');
      }
    } else {
      openNotificationWithIcon('error', 'Registration Failure', 'Verification code filled in incorrectly!');
    }
  };

  return (
    <div className='flex bg-lightBackgroundColor dark:bg-darkBackgroundColor justify-center items-center min-h-screen w-full p-[20px]'>
      {/* <Space.Compact>
        <Select defaultValue="Zhejiang" options={options} />
        <Input defaultValue="Xihu District, Hangzhou" />
      </Space.Compact> */}
      <div className="flex justify-center items-center w-[850px] h-[550px] bg-lightContentColor dark:bg-darkContentColor rounded-[30px] rounded-[0 0 30px rgba(0, 0, 0, 0.2)] m-[20px] overflow-hidden">
        <div className="w-1/2 h-full bg-lightContentColor dark:bg-darkContentColor text-lightTextColor dark:text-darkTextColor flex justify-center items-center text-center p-[40px] z-1">
          <form className="w-full" action="">
            <h1 className="text-[36px] my-[-10px] mx-[0px]">Registration</h1>
            <div className="flex justify-center items-center my-[15px] mx-0 font-medium border-solid border-2 border-lightBorderColor dark:border-darkBorderColor rounded-lg hover:border-primaryColor">
              <Input
                className="w-full py-[13px] pl-[20px] pr-[10px] bg-transparent hover:bg-transparent focus:bg-transparent border-none text-[16px] font-medium text-lightTextColor dark:text-darkTextColor focus:shadow-none placeholder:text-placeholderColor font-[baseFont]"
                placeholder="Username"
                required
                name="username"
                onChange={(e) => handleChange(e)} />
              <UserOutlined className="text-[20px] pl-[10px] pr-[20px]" />
            </div>
            <div className="flex justify-center items-center my-[15px] mx-0 font-medium border-solid border-2 border-lightBorderColor dark:border-darkBorderColor rounded-lg hover:border-primaryColor">
              <Input
                className="w-full py-[13px] pl-[20px] pr-[10px] bg-transparent hover:bg-transparent focus:bg-transparent border-none text-[16px] font-medium text-lightTextColor dark:text-darkTextColor focus:shadow-none placeholder:text-placeholderColor font-[baseFont]"
                type="email"
                placeholder="Email"
                required
                name="email"
                onChange={(e) => handleChange(e)} />
              <MailOutlined className="text-[20px] pl-[10px] pr-[20px]" />
            </div>
            <div className="relative my-[15px] mx-0 font-medium">
              <Input
                className="w-full py-[13px] pr-[160px] pl-[20px] bg-[#eee] rounded-lg outline-none border-none text-[16px] font-medium text-[#333] focus:shadow-none focus:z-0 hover:z-0 font-[baseFont]"
                placeholder="Verification code"
                required
                maxLength={6}
                onChange={(e) => setRegisterCode(e.target.value)} />

              <div className="send-code">
                {isShowCode ? (<Button type="primary" disabled>{`Resend ${time}s`}</Button>) : (<Button type="primary" onClick={handleSendCode}>{`Send Code`}</Button>)}
              </div>
            </div>
            <div className="relative my-[15px] mx-0 font-medium">
              <Input.Password
                className="w-full py-[13px] pr-[50px] pl-[20px] bg-[#eee] rounded-lg outline-none border-none text-[16px] font-medium text-[#333] focus:shadow-none focus:z-0 hover:z-0 font-[baseFont]"
                placeholder="Password"
                required
                name="password"
                onChange={(e) => handleChange(e)} />
              <LockOutlined className="absolute right-[20px] top-1/2 text-[20px] text-[#888] translate-y-50" />
            </div>
            <button
              className="w-full h-[48px] bg-primaryColor dark:text-darkTextColor text-darkTextColor rounded-[8px] shadow-[0 0 10px rgba(0, 0, 0, 0.1)] border-none cursor-pointer text-[16px] font-semibold"
              onClick={(e) => handleRegister(e)}>
              Register
            </button>
            <p className="text-[14.5px] my-[10px] mx-[0px]">or register with social platforms</p>
            <div className="flex justify-center">
              <a className="inline-flex p-[10px] text-[24px] text-lightTextColor dark:text-darkTextColor no-underline mx-[8px]" href="#"><GoogleOutlined /></a>
              <a className="inline-flex p-[10px] text-[24px] text-lightTextColor dark:text-darkTextColor no-underline mx-[8px]" href="#"><FacebookOutlined /></a>
              <a className="inline-flex p-[10px] text-[24px] text-lightTextColor dark:text-darkTextColor no-underline mx-[8px]" href="#"><GithubOutlined /></a>
              <a className="inline-flex p-[10px] text-[24px] text-lightTextColor dark:text-darkTextColor no-underline mx-[8px]" href="#"><LinkedinOutlined /></a>
            </div>
          </form>
        </div>
        <div className="bg-lightContentColor dark:bg-darkContentColor text-lightTextColor dark:text-darkTextColor w-1/2 h-full flex justify-center items-center">
          <div className="flex flex-col justify-center items-center">
            <h1 className="text-[36px] my-[-10px] mx-[0px]">Hello, Welcome!</h1>
            <p className='pt-[8px] pb-[16px]'>Already have an account?</p>
            {/* <button
              className="w-[160px] h-[48px] bg-transparent rounded-[8px] shadow-none border-solid border-2 border-primaryColor dark:border-darkTextColor border-lightTextColor cursor-pointer text-[16px] font-semibold"
              onClick={handleGoToLoginClick}>
              Login
            </button> */}
            <StartButton buttonName="Login" navProps="/login" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;