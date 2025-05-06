import React, { useState } from 'react';
import axios from 'axios';
import HelloWithColor from '../../components/Hello/HelloWithColor';
import StartButton from '../../components/StartButton/StartButton';
import Header from '../../components/Header/Header';
import { Input, notification, Modal, Space, Select } from 'antd';
import { MailOutlined, LockOutlined, MobileOutlined, GoogleOutlined, FacebookOutlined, GithubOutlined, LinkedinOutlined } from "@ant-design/icons";


const LoginPage = () => {
  const [loginMode, setLoginMode] = useState("code"); // "code" or "password"
  const [phone, setPhone] = useState(""); // 手机号
  const [loginCode, setLoginCode] = useState(''); // 验证码
  const [email, setEmail] = useState(''); // 邮箱
  const [password, setPassword] = useState(''); // 密码


  const [countdown, setCountdown] = useState(60);
  const [available, setAvailable] = useState(false);

  // 将参数传给后端发送验证码或前端调用其他发送验证码的api
  const sendPhoneCode = async (params) => {
    // 判断手机号是否合法
    if (!/^1[3-9]\d{9}$/.test(params)) {
      // 手机号合法，发送验证码
      if (available) { // 倒计时未结束,不能重复点击
        return;
      }
      setAvailable(true);

      // 调发送验证码的接口
      // axios.get('/admin/send', {
      //   params: {
      //     phone: dataForm.phone,
      //   }
      // }).then(res => {
      //   console.success(res.data);
      // }).catch(error => {
      //   console.error(error);
      // });

      // 倒计时
      const active = setInterval(() => {
        setCountdown((preSecond) => {
          if (preSecond <= 1) {
            setAvailable(false);
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

    } else {
      // 手机号不合法
    }
  };

  const handleSendCode = async () => {
    // 将手机号状态变量作为参数传入
    // 解构返回的对象，拿出对象中的成功或失败状态，并进行验证
    const res = await sendPhoneCode(phone); // 这里的phone是手机号，实际使用时需要替换为真实的手机号
    if (res.responseCode === '000000') {
      notification.success({
        message: '发送成功,请填写收到的验证码',
      });
    } else {
      // 失败逻辑
    }
  };

  const handleLogin = async () => {
    // 1.区分登录方式
    if (loginMode === "code") {
      // 向后端请求验证码是否正确
      if (loginCode === '123123') {
        // 验证码正确则将手机号和验证码传给后端，若未注册则注册，若注册则进行下一步
        // axios.post('/admin/login', {})
        // 进行弹窗提示：登陆成功
        // 点击确认后跳转到home页面
        notification.success({
          message: '登录成功',
        });
      } else {
        // 验证码错误则弹窗提示
        notification.error({
          message: '验证码错误',
        });
      }
    } else {
      // 将邮箱和密码传给后端，若未注册则提示未注册，若注册则跳转到home页面
      axios.post('/admin/login', {
        email,
        password,
      });
    }
  };
  const options = [
    {
      value: 'China',
      label: '+86',
    },
    {
      value: 'USA',
      label: '+01',
    },
  ];

  return (
    // 加header会导致屏幕超长出现滚动条或主题内容不垂直居中问题（主题内容的父元素无法铺满剩余的高度）
    // 【解决：父盒子flex flex-col min-h-screen；子元素flex-1自动填充剩余空间，不需要再写高度和宽度】
    // 主体内容如何绝对在屏幕中间？用position才行？
    <div className='flex flex-col min-h-screen bg-lightBackgroundColor dark:bg-darkBackgroundColor'>
      <Header />
      <div className='flex-1 bg-lightBackgroundColor dark:bg-darkBackgroundColor flex flex-col justify-center items-center p-[20px]'>
        <div className="flex justify-center items-center w-[850px] h-[550px] bg-lightContentColor dark:bg-darkContentColor rounded-[30px] rounded-[0 0 30px rgba(0, 0, 0, 0.2)] m-[20px] overflow-hidden">
          <div className="bg-lightContentColor dark:bg-darkContentColor text-lightTextColor dark:text-darkTextColor w-1/2 h-full flex justify-center items-center">
            <div className="flex flex-col justify-center items-center">
              <div className='w-[360px] mb-[15px]'>
                <HelloWithColor className="bg-lightBackgroundColor dark:bg-darkBackgroundColor" />
              </div>
              <h1 className="text-[36px] my-[-10px] mx-[0px]">Welcome Back!</h1>
              <p className='pt-[8px] pb-[16px]'>Don't have an account?</p>
              <StartButton buttonName="Register" navProps="/register" />
            </div>
          </div>
          <div className="w-1/2 h-full bg-lightContentColor dark:bg-darkContentColor text-lightTextColor dark:text-darkTextColor flex justify-center items-center text-center p-[40px] z-1">
            <div className="w-full">
              {/* 切换top */}
              <div className="flex justify-evenly pb-3">
                <button
                  onClick={() => setLoginMode("code")}
                  className={`text-lg ${loginMode === "code" ? "font-semibold text-primaryColor border-b-4 border-primaryColor" : ""}`}
                >
                  验证码登录
                </button>
                <button
                  onClick={() => setLoginMode("password")}
                  className={`text-lg ${loginMode === "password" ? "font-semibold text-primaryColor border-b-4 border-primaryColor" : ""}`}
                >
                  邮箱登录
                </button>
              </div>
              {/* 根据tabs的值切换相应的登录方式 */}
              {loginMode === "code" ? <form className="w-full" action="">
                <div className="flex justify-center items-center my-[15px] mx-0 font-medium border-solid border-2 border-lightBorderColor dark:border-darkBorderColor rounded-lg hover:border-primaryColor">
                  {/* 下一步优化，手机号输入框可以支持多国家，提供一个下拉框来选择区号
                <Space.Compact>
                  <Select
                    // className='h-full bg-transparent hover:bg-transparent focus:bg-transparent border-none text-lightTextColor dark:text-darkTextColor focus:shadow-none'
                    defaultValue="China"
                    style={{ height: '100%', background: 'transparent', border: 'none', }}
                    options={options} />
                  <Input
                    className="w-full py-[13px] pl-[20px] pr-[10px] bg-transparent hover:bg-transparent focus:bg-transparent border-none text-[16px] font-medium text-lightTextColor dark:text-darkTextColor focus:shadow-none placeholder:text-placeholderColor font-[baseFont]"
                    placeholder="Phone Number"
                    required
                    name="phone"
                    onChange={(e) => setPhone(e.target.value)} />
                  <MobileOutlined className="text-[20px] pl-[10px] pr-[20px]" />
                </Space.Compact> */}
                  <Input
                    className="w-full py-[13px] pl-[20px] pr-[10px] bg-transparent hover:bg-transparent focus:bg-transparent border-none text-[16px] font-medium text-lightTextColor dark:text-darkTextColor focus:shadow-none placeholder:text-placeholderColor font-[baseFont]"
                    placeholder="Phone Number"
                    required
                    name="phone"
                    onChange={(e) => setPhone(e.target.value)} />
                  <MobileOutlined className="text-[20px] pl-[10px] pr-[20px]" />
                </div>
                <div className="flex justify-center items-center my-[15px] mx-0 font-medium">
                  <div className="w-3/5 border-solid border-2 border-lightBorderColor dark:border-darkBorderColor rounded-lg hover:border-primaryColor">
                    <Input
                      className="w-full py-[13px] px-[20px] bg-transparent hover:bg-transparent focus:bg-transparent border-none text-[16px] font-medium text-lightTextColor dark:text-darkTextColor focus:shadow-none placeholder:text-placeholderColor font-[baseFont]"
                      placeholder="Verification code"
                      required
                      maxLength={6}
                      onChange={(e) => setLoginCode(e.target.value)} />
                  </div>
                  <div className="w-2/5 ml-[20px] text-[16px]">
                    {available ?
                      (<div className="w-full h-full py-[13px] border-solid border-2 border-lightBorderColor dark:border-darkBorderColor rounded-lg cursor-not-allowed">{`Resend ${countdown}s`}</div>) :
                      (<div className="w-full h-full py-[13px] border-solid border-2 border-lightBorderColor dark:border-darkBorderColor rounded-lg hover:border-primaryColor cursor-pointer" onClick={handleSendCode}>{`Send Code`}</div>)
                    }
                  </div>
                </div>
              </form> :
                <form className="w-full" action="">
                  <div className="flex justify-center items-center my-[15px] mx-0 font-medium border-solid border-2 border-lightBorderColor dark:border-darkBorderColor rounded-lg hover:border-primaryColor">
                    <Input
                      className="w-full py-[13px] pl-[20px] pr-[10px] bg-transparent hover:bg-transparent focus:bg-transparent border-none text-[16px] font-medium text-lightTextColor dark:text-darkTextColor focus:shadow-none placeholder:text-placeholderColor font-[baseFont]"
                      type="email"
                      placeholder="Email Address"
                      required
                      name="email"
                      onChange={(e) => setEmail(e.target.value)} />
                    <MailOutlined className="text-[20px] pl-[10px] pr-[20px]" />
                  </div>
                  <div className="flex justify-center items-center my-[15px] mx-0 font-medium border-solid border-2 border-lightBorderColor dark:border-darkBorderColor rounded-lg hover:border-primaryColor">
                    <Input
                      className="w-full py-[13px] pl-[20px] pr-[0px] bg-transparent hover:bg-transparent focus:bg-transparent border-none text-[16px] font-medium text-lightTextColor dark:text-darkTextColor focus:shadow-none placeholder:text-placeholderColor font-[baseFont]"
                      type="password"
                      placeholder="Password"
                      required
                      name="password"
                      onChange={(e) => setPassword(e.target.value)} />
                    <LockOutlined className="text-[20px] pl-[10px] pr-[20px]" />
                  </div>
                </form>
              }
              <button
                className="w-full h-[48px] bg-primaryColor dark:text-darkTextColor text-darkTextColor rounded-[8px] shadow-[0 0 10px rgba(0, 0, 0, 0.1)] border-none cursor-pointer text-[16px] font-semibold"
                type="button"
                onClick={(e) => handleLogin(e)}>
                Login
              </button>
              <p className="text-[14.5px] my-[10px] mx-[0px]">or register with social platforms</p>
              <div className="flex justify-center">
                <a className="inline-flex p-[10px] text-[24px] text-lightTextColor dark:text-darkTextColor no-underline mx-[8px]" href="#"><GoogleOutlined /></a>
                <a className="inline-flex p-[10px] text-[24px] text-lightTextColor dark:text-darkTextColor no-underline mx-[8px]" href="#"><FacebookOutlined /></a>
                <a className="inline-flex p-[10px] text-[24px] text-lightTextColor dark:text-darkTextColor no-underline mx-[8px]" href="#"><GithubOutlined /></a>
                <a className="inline-flex p-[10px] text-[24px] text-lightTextColor dark:text-darkTextColor no-underline mx-[8px]" href="#"><LinkedinOutlined /></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;