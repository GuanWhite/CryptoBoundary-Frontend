import React, { useState } from 'react';
import axios from 'axios';
import HelloWithColor from '../../components/Hello/HelloWithColor';
import StartButton from '../../components/StartButton/StartButton';
import Header from '../../components/Header/Header';
import { Input, notification, Modal, Space, Select } from 'antd';
import {
  MailOutlined,
  LockOutlined,
  MobileOutlined,
  GoogleOutlined,
  FacebookOutlined,
  GithubOutlined,
  LinkedinOutlined
} from "@ant-design/icons";
import { useNavigate } from 'react-router';


const LoginPage = () => {
  const [loginMode, setLoginMode] = useState("code"); // "code" or "password"
  const [phone, setPhone] = useState(""); // 手机号
  const [loginCode, setLoginCode] = useState(''); // 验证码
  const [email, setEmail] = useState(''); // 邮箱
  const [password, setPassword] = useState(''); // 密码

  const [countdown, setCountdown] = useState(60);    // 倒计时秒数
  const [available, setAvailable] = useState(false); // 是否可以发送验证码

  const phoneNumberReg = /^1[3-9]\d{9}$/; // 手机号正则表达式
  const verificationCodeReg = /^[0-9]{6}$/; // 验证码正则表达式
  const emailReg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; // 邮箱正则表达式

  const navigate = useNavigate();

  // 将参数传给后端发送验证码或前端调用其他发送验证码的api
  const sendPhoneCode = async (params) => {
    if (available) { // 倒计时未结束,不能重复点击
      return;
    }
    setAvailable(true);

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

    // 调发送验证码接口
    // const res = axios.get('/admin/send', {
    //   params: {
    //     phone: dataForm.phone,
    //   }
    // }).then(res => {
    //   console.success(res.data);
    // }).catch(error => {
    //   console.error(error);
    // });

    return {
      responseCode: '000000', // 模拟成功响应
      responseMsg: "Verification code sent successfully!",
    };
  };

  const [api, notificationContextHolder] = notification.useNotification();
  const handleSendCode = async () => {
    // 验证手机号的有效性
    if (!phoneNumberReg.test(phone)) {
      api.error({
        message: 'Invalid phone number',
        description: 'Please enter a valid phone number!',
        placement: 'top',
      });
      return;
    } else {
      // 将手机号作为参数传入
      // 解构返回的对象，拿出对象中的成功或失败状态，并进行验证
      const res = await sendPhoneCode(phone);
      if (res.responseCode === '000000') {
        api.success({
          message: 'Sent successfully',
          description: 'Please fill in the received verification code!',
          placement: 'top',
        });
      } else {
        // 根据具体的响应码来进行具体的失败提示
        api.error({
          message: 'Sent failure',
          description: 'Please try again later!',
          placement: 'top',
        });
      }
    }
  };

  const handleLoginValidation = () => {
    // 1.区分登录方式
    if (loginMode === "code") {
      // 2.手机号和验证码不能为空
      if (!phone || !loginCode) {
        api.error({
          message: 'Login failed',
          description: 'Phone number and verification code cannot be empty!',
          placement: 'top',
        });
        return false;
      }
      // 3.手机号格式正确
      if (!phoneNumberReg.test(phone)) {
        api.error({
          message: 'Login failed',
          description: 'Please enter a valid phone number!',
          placement: 'top',
        });
        return false;
      }
      // 4.验证码格式正确
      if (!verificationCodeReg.test(loginCode)) {
        api.error({
          message: 'Verification code format error',
          description: 'Please enter the correct verification code!',
          placement: 'top',
        });
        return false;
      }
      return true;
    } else if (loginMode === "password") {
      // 2.邮箱和密码不能为空
      if (!email || !password) {
        api.error({
          message: 'Login failed',
          description: 'Email and password cannot be empty!',
          placement: 'top',
        });
        return false;
      }
      // 3.邮箱格式正确
      if (!emailReg.test(email)) {
        api.error({
          message: 'Login failed',
          description: 'Please enter a valid email address!',
          placement: 'top',
        });
        return false;
      }
      return true;
    } else {
      api.error({
        message: 'Login failed',
        description: 'Encountered an unknown error!',
        placement: 'top',
      });
      return false;
    }
  };

  const [modal, modalContextHolder] = Modal.useModal();
  const handleLogin = async () => {
    if (!handleLoginValidation()) {
      return;
    } else {
      if (loginMode === "code") {
        // 请求后端验证手机验证码的正确性、时效性以及手机和验证码是否匹配（这里已经是登录的逻辑了）
        // const { data } = await axios.post(registerRoute, {
        //   phone,
        //   loginCode,
        // });
        const data = { status: true, }; // 模拟成功返回
        // 后端检查发现验证码输入错误或不匹配，让用户输入正确的验证码
        // 这里的data要返回具体的错误原因，如错误码，以便前端进行判断
        if (data.status === false) {
          api.error({
            message: 'Verification code input error',
            description: 'Please enter the correct verification code!',
            placement: 'top',
          });
          return;
        } else if (data.status === false) {
          // 后端服务不稳定响应失败，提醒用户稍后重试
          api.error({
            message: 'Server error',
            description: 'The server seems to have malfunctioned, please try again later!',
            placement: 'top',
          });
          return;
        } else if (data.status === true) {
          // 后端检查发现验证码输入正确，直接进行登录成功的逻辑
          // 设置本地存储：用户信息 + cookie
          // localStorage.setItem('user', JSON.stringify(data.user));
          // localStorage.setItem('token', data.token);

          // 进行modal弹窗提示：登陆成功。点击确认后跳转到home页面
          modal.success({
            title: 'Login Successfully',
            content: `Let's start exploring!`,
            onOk: () => {
              // 跳转到home页面
              navigate("/");
            },
          });
        }
      } else if (loginMode === "password") {
        // 请求后端验证邮箱和密码的正确性
        // const { data } = await axios.post(loginRoute, {
        //   email,
        //   password,
        // });
        const data = { status: true, }; // 模拟成功返回

        // 若正确则进行登录成功的逻辑
        if (data.status === true) {
          // 设置本地存储：用户信息 + cookie
          // localStorage.setItem('user', JSON.stringify(data.user));
          // localStorage.setItem('token', data.token);

          // 进行modal弹窗提示：登陆成功。点击确认后跳转到home页面
          modal.success({
            title: 'Login Successfully',
            content: `Let's start exploring!`,
            onOk: () => {
              // 跳转到home页面
              navigate("/");
            },
          });
        } else if (data.status === false) { // 若错误，则看具体错误的原因：
          // 若未注册则提示未注册
          api.error({
            message: 'Login failed',
            description: 'This email has not been registered. Please register before logging in!',
            placement: 'top',
          });
        } else if (data.status === false) {
          // 若邮箱和密码输入错误或不匹配，让用户输入正确的邮箱和密码
          api.error({
            message: 'Login failed',
            description: 'Email or password entered incorrectly, please try again!',
            placement: 'top',
          });
        } else {
          // 后端服务不稳定响应失败，提醒用户稍后重试
          api.error({
            message: 'Server error',
            description: 'The server seems to have malfunctioned, please try again later!',
            placement: 'top',
          });
        }
      }
    };
  };

  // const options = [
  //   {
  //     value: 'China',
  //     label: '+86',
  //   },
  //   {
  //     value: 'USA',
  //     label: '+01',
  //   },
  // ];

  return (
    // 加header会导致屏幕超长出现滚动条或主题内容不垂直居中问题（主题内容的父元素无法铺满剩余的高度）
    // 主体内容如何绝对在屏幕中间？用position才行？
    // 【解决：父盒子flex flex-col min-h-screen；子元素flex-1自动填充剩余空间，不需要再写高度和宽度】
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
                  Login with OTP
                </button>
                <button
                  onClick={() => setLoginMode("password")}
                  className={`text-lg ${loginMode === "password" ? "font-semibold text-primaryColor border-b-4 border-primaryColor" : ""}`}
                >
                  Login with Email
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
                    value={phone}
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
                      value={loginCode}
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
                      value={email}
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
                      value={password}
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
        {notificationContextHolder}
        {modalContextHolder}
      </div>
    </div>
  );
};

export default LoginPage;
import React, { useState } from 'react';
import axios from 'axios';
import HelloWithColor from '../../components/Hello/HelloWithColor';
import StartButton from '../../components/StartButton/StartButton';
import Header from '../../components/Header/Header';
import { Input, notification, Modal, Space, Select } from 'antd';
import {
  MailOutlined,
  LockOutlined,
  MobileOutlined,
  GoogleOutlined,
  FacebookOutlined,
  GithubOutlined,
  LinkedinOutlined
} from "@ant-design/icons";
import { useNavigate } from 'react-router';


const LoginPage = () => {
  const [loginMode, setLoginMode] = useState("code"); // "code" or "password"
  const [phone, setPhone] = useState(""); // 手机号
  const [loginCode, setLoginCode] = useState(''); // 验证码
  const [email, setEmail] = useState(''); // 邮箱
  const [password, setPassword] = useState(''); // 密码

  const [countdown, setCountdown] = useState(60);    // 倒计时秒数
  const [available, setAvailable] = useState(false); // 是否可以发送验证码

  const phoneNumberReg = /^1[3-9]\d{9}$/; // 手机号正则表达式
  const verificationCodeReg = /^[0-9]{6}$/; // 验证码正则表达式
  const emailReg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; // 邮箱正则表达式

  const navigate = useNavigate();

  // 将参数传给后端发送验证码或前端调用其他发送验证码的api
  const sendPhoneCode = async (params) => {
    if (available) { // 倒计时未结束,不能重复点击
      return;
    }
    setAvailable(true);

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

    // 调发送验证码接口
    // const res = axios.get('/admin/send', {
    //   params: {
    //     phone: dataForm.phone,
    //   }
    // }).then(res => {
    //   console.success(res.data);
    // }).catch(error => {
    //   console.error(error);
    // });

    return {
      responseCode: '000000', // 模拟成功响应
      responseMsg: "Verification code sent successfully!",
    };
  };

  const [api, notificationContextHolder] = notification.useNotification();
  const handleSendCode = async () => {
    // 验证手机号的有效性
    if (!phoneNumberReg.test(phone)) {
      api.error({
        message: 'Invalid phone number',
        description: 'Please enter a valid phone number!',
        placement: 'top',
      });
      return;
    } else {
      // 将手机号作为参数传入
      // 解构返回的对象，拿出对象中的成功或失败状态，并进行验证
      const res = await sendPhoneCode(phone);
      if (res.responseCode === '000000') {
        api.success({
          message: 'Sent successfully',
          description: 'Please fill in the received verification code!',
          placement: 'top',
        });
      } else {
        // 根据具体的响应码来进行具体的失败提示
        api.error({
          message: 'Sent failure',
          description: 'Please try again later!',
          placement: 'top',
        });
      }
    }
  };

  const handleLoginValidation = () => {
    // 1.区分登录方式
    if (loginMode === "code") {
      // 2.手机号和验证码不能为空
      if (!phone || !loginCode) {
        api.error({
          message: 'Login failed',
          description: 'Phone number and verification code cannot be empty!',
          placement: 'top',
        });
        return false;
      }
      // 3.手机号格式正确
      if (!phoneNumberReg.test(phone)) {
        api.error({
          message: 'Login failed',
          description: 'Please enter a valid phone number!',
          placement: 'top',
        });
        return false;
      }
      // 4.验证码格式正确
      if (!verificationCodeReg.test(loginCode)) {
        api.error({
          message: 'Verification code format error',
          description: 'Please enter the correct verification code!',
          placement: 'top',
        });
        return false;
      }
      return true;
    } else if (loginMode === "password") {
      // 2.邮箱和密码不能为空
      if (!email || !password) {
        api.error({
          message: 'Login failed',
          description: 'Email and password cannot be empty!',
          placement: 'top',
        });
        return false;
      }
      // 3.邮箱格式正确
      if (!emailReg.test(email)) {
        api.error({
          message: 'Login failed',
          description: 'Please enter a valid email address!',
          placement: 'top',
        });
        return false;
      }
      return true;
    } else {
      api.error({
        message: 'Login failed',
        description: 'Encountered an unknown error!',
        placement: 'top',
      });
      return false;
    }
  };

  const [modal, modalContextHolder] = Modal.useModal();
  const handleLogin = async () => {
    if (!handleLoginValidation()) {
      return;
    } else {
      if (loginMode === "code") {
        // 请求后端验证手机验证码的正确性、时效性以及手机和验证码是否匹配（这里已经是登录的逻辑了）
        // const { data } = await axios.post(registerRoute, {
        //   phone,
        //   loginCode,
        // });
        const data = { status: true, }; // 模拟成功返回
        // 后端检查发现验证码输入错误或不匹配，让用户输入正确的验证码
        // 这里的data要返回具体的错误原因，如错误码，以便前端进行判断
        if (data.status === false) {
          api.error({
            message: 'Verification code input error',
            description: 'Please enter the correct verification code!',
            placement: 'top',
          });
          return;
        } else if (data.status === false) {
          // 后端服务不稳定响应失败，提醒用户稍后重试
          api.error({
            message: 'Server error',
            description: 'The server seems to have malfunctioned, please try again later!',
            placement: 'top',
          });
          return;
        } else if (data.status === true) {
          // 后端检查发现验证码输入正确，直接进行登录成功的逻辑
          // 设置本地存储：用户信息 + cookie
          // localStorage.setItem('user', JSON.stringify(data.user));
          // localStorage.setItem('token', data.token);

          // 进行modal弹窗提示：登陆成功。点击确认后跳转到home页面
          modal.success({
            title: 'Login Successfully',
            content: `Let's start exploring!`,
            onOk: () => {
              // 跳转到home页面
              navigate("/");
            },
          });
        }
      } else if (loginMode === "password") {
        // 请求后端验证邮箱和密码的正确性
        // const { data } = await axios.post(loginRoute, {
        //   email,
        //   password,
        // });
        const data = { status: true, }; // 模拟成功返回

        // 若正确则进行登录成功的逻辑
        if (data.status === true) {
          // 设置本地存储：用户信息 + cookie
          // localStorage.setItem('user', JSON.stringify(data.user));
          // localStorage.setItem('token', data.token);

          // 进行modal弹窗提示：登陆成功。点击确认后跳转到home页面
          modal.success({
            title: 'Login Successfully',
            content: `Let's start exploring!`,
            onOk: () => {
              // 跳转到home页面
              navigate("/");
            },
          });
        } else if (data.status === false) { // 若错误，则看具体错误的原因：
          // 若未注册则提示未注册
          api.error({
            message: 'Login failed',
            description: 'This email has not been registered. Please register before logging in!',
            placement: 'top',
          });
        } else if (data.status === false) {
          // 若邮箱和密码输入错误或不匹配，让用户输入正确的邮箱和密码
          api.error({
            message: 'Login failed',
            description: 'Email or password entered incorrectly, please try again!',
            placement: 'top',
          });
        } else {
          // 后端服务不稳定响应失败，提醒用户稍后重试
          api.error({
            message: 'Server error',
            description: 'The server seems to have malfunctioned, please try again later!',
            placement: 'top',
          });
        }
      }
    };
  };

  // const options = [
  //   {
  //     value: 'China',
  //     label: '+86',
  //   },
  //   {
  //     value: 'USA',
  //     label: '+01',
  //   },
  // ];

  return (
    // 加header会导致屏幕超长出现滚动条或主题内容不垂直居中问题（主题内容的父元素无法铺满剩余的高度）
    // 主体内容如何绝对在屏幕中间？用position才行？
    // 【解决：父盒子flex flex-col min-h-screen；子元素flex-1自动填充剩余空间，不需要再写高度和宽度】
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
                  Login with OTP
                </button>
                <button
                  onClick={() => setLoginMode("password")}
                  className={`text-lg ${loginMode === "password" ? "font-semibold text-primaryColor border-b-4 border-primaryColor" : ""}`}
                >
                  Login with Email
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
                    value={phone}
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
                      value={loginCode}
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
                      value={email}
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
                      value={password}
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
        {notificationContextHolder}
        {modalContextHolder}
      </div>
    </div>
  );
};

export default LoginPage;import React, { useState } from 'react';
import axios from 'axios';
import HelloWithColor from '../../components/Hello/HelloWithColor';
import StartButton from '../../components/StartButton/StartButton';
import Header from '../../components/Header/Header';
import { Input, notification, Modal, Space, Select } from 'antd';
import {
  MailOutlined,
  LockOutlined,
  MobileOutlined,
  GoogleOutlined,
  FacebookOutlined,
  GithubOutlined,
  LinkedinOutlined
} from "@ant-design/icons";
import { useNavigate } from 'react-router';


const LoginPage = () => {
  const [loginMode, setLoginMode] = useState("code"); // "code" or "password"
  const [phone, setPhone] = useState(""); // 手机号
  const [loginCode, setLoginCode] = useState(''); // 验证码
  const [email, setEmail] = useState(''); // 邮箱
  const [password, setPassword] = useState(''); // 密码

  const [countdown, setCountdown] = useState(60);    // 倒计时秒数
  const [available, setAvailable] = useState(false); // 是否可以发送验证码

  const phoneNumberReg = /^1[3-9]\d{9}$/; // 手机号正则表达式
  const verificationCodeReg = /^[0-9]{6}$/; // 验证码正则表达式
  const emailReg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; // 邮箱正则表达式

  const navigate = useNavigate();

  // 将参数传给后端发送验证码或前端调用其他发送验证码的api
  const sendPhoneCode = async (params) => {
    if (available) { // 倒计时未结束,不能重复点击
      return;
    }
    setAvailable(true);

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

    // 调发送验证码接口
    // const res = axios.get('/admin/send', {
    //   params: {
    //     phone: dataForm.phone,
    //   }
    // }).then(res => {
    //   console.success(res.data);
    // }).catch(error => {
    //   console.error(error);
    // });

    return {
      responseCode: '000000', // 模拟成功响应
      responseMsg: "Verification code sent successfully!",
    };
  };

  const [api, notificationContextHolder] = notification.useNotification();
  const handleSendCode = async () => {
    // 验证手机号的有效性
    if (!phoneNumberReg.test(phone)) {
      api.error({
        message: 'Invalid phone number',
        description: 'Please enter a valid phone number!',
        placement: 'top',
      });
      return;
    } else {
      // 将手机号作为参数传入
      // 解构返回的对象，拿出对象中的成功或失败状态，并进行验证
      const res = await sendPhoneCode(phone);
      if (res.responseCode === '000000') {
        api.success({
          message: 'Sent successfully',
          description: 'Please fill in the received verification code!',
          placement: 'top',
        });
      } else {
        // 根据具体的响应码来进行具体的失败提示
        api.error({
          message: 'Sent failure',
          description: 'Please try again later!',
          placement: 'top',
        });
      }
    }
  };

  const handleLoginValidation = () => {
    // 1.区分登录方式
    if (loginMode === "code") {
      // 2.手机号和验证码不能为空
      if (!phone || !loginCode) {
        api.error({
          message: 'Login failed',
          description: 'Phone number and verification code cannot be empty!',
          placement: 'top',
        });
        return false;
      }
      // 3.手机号格式正确
      if (!phoneNumberReg.test(phone)) {
        api.error({
          message: 'Login failed',
          description: 'Please enter a valid phone number!',
          placement: 'top',
        });
        return false;
      }
      // 4.验证码格式正确
      if (!verificationCodeReg.test(loginCode)) {
        api.error({
          message: 'Verification code format error',
          description: 'Please enter the correct verification code!',
          placement: 'top',
        });
        return false;
      }
      return true;
    } else if (loginMode === "password") {
      // 2.邮箱和密码不能为空
      if (!email || !password) {
        api.error({
          message: 'Login failed',
          description: 'Email and password cannot be empty!',
          placement: 'top',
        });
        return false;
      }
      // 3.邮箱格式正确
      if (!emailReg.test(email)) {
        api.error({
          message: 'Login failed',
          description: 'Please enter a valid email address!',
          placement: 'top',
        });
        return false;
      }
      return true;
    } else {
      api.error({
        message: 'Login failed',
        description: 'Encountered an unknown error!',
        placement: 'top',
      });
      return false;
    }
  };

  const [modal, modalContextHolder] = Modal.useModal();
  const handleLogin = async () => {
    if (!handleLoginValidation()) {
      return;
    } else {
      if (loginMode === "code") {
        // 请求后端验证手机验证码的正确性、时效性以及手机和验证码是否匹配（这里已经是登录的逻辑了）
        // const { data } = await axios.post(registerRoute, {
        //   phone,
        //   loginCode,
        // });
        const data = { status: true, }; // 模拟成功返回
        // 后端检查发现验证码输入错误或不匹配，让用户输入正确的验证码
        // 这里的data要返回具体的错误原因，如错误码，以便前端进行判断
        if (data.status === false) {
          api.error({
            message: 'Verification code input error',
            description: 'Please enter the correct verification code!',
            placement: 'top',
          });
          return;
        } else if (data.status === false) {
          // 后端服务不稳定响应失败，提醒用户稍后重试
          api.error({
            message: 'Server error',
            description: 'The server seems to have malfunctioned, please try again later!',
            placement: 'top',
          });
          return;
        } else if (data.status === true) {
          // 后端检查发现验证码输入正确，直接进行登录成功的逻辑
          // 设置本地存储：用户信息 + cookie
          // localStorage.setItem('user', JSON.stringify(data.user));
          // localStorage.setItem('token', data.token);

          // 进行modal弹窗提示：登陆成功。点击确认后跳转到home页面
          modal.success({
            title: 'Login Successfully',
            content: `Let's start exploring!`,
            onOk: () => {
              // 跳转到home页面
              navigate("/");
            },
          });
        }
      } else if (loginMode === "password") {
        // 请求后端验证邮箱和密码的正确性
        // const { data } = await axios.post(loginRoute, {
        //   email,
        //   password,
        // });
        const data = { status: true, }; // 模拟成功返回

        // 若正确则进行登录成功的逻辑
        if (data.status === true) {
          // 设置本地存储：用户信息 + cookie
          // localStorage.setItem('user', JSON.stringify(data.user));
          // localStorage.setItem('token', data.token);

          // 进行modal弹窗提示：登陆成功。点击确认后跳转到home页面
          modal.success({
            title: 'Login Successfully',
            content: `Let's start exploring!`,
            onOk: () => {
              // 跳转到home页面
              navigate("/");
            },
          });
        } else if (data.status === false) { // 若错误，则看具体错误的原因：
          // 若未注册则提示未注册
          api.error({
            message: 'Login failed',
            description: 'This email has not been registered. Please register before logging in!',
            placement: 'top',
          });
        } else if (data.status === false) {
          // 若邮箱和密码输入错误或不匹配，让用户输入正确的邮箱和密码
          api.error({
            message: 'Login failed',
            description: 'Email or password entered incorrectly, please try again!',
            placement: 'top',
          });
        } else {
          // 后端服务不稳定响应失败，提醒用户稍后重试
          api.error({
            message: 'Server error',
            description: 'The server seems to have malfunctioned, please try again later!',
            placement: 'top',
          });
        }
      }
    };
  };

  // const options = [
  //   {
  //     value: 'China',
  //     label: '+86',
  //   },
  //   {
  //     value: 'USA',
  //     label: '+01',
  //   },
  // ];

  return (
    // 加header会导致屏幕超长出现滚动条或主题内容不垂直居中问题（主题内容的父元素无法铺满剩余的高度）
    // 主体内容如何绝对在屏幕中间？用position才行？
    // 【解决：父盒子flex flex-col min-h-screen；子元素flex-1自动填充剩余空间，不需要再写高度和宽度】
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
                  Login with OTP
                </button>
                <button
                  onClick={() => setLoginMode("password")}
                  className={`text-lg ${loginMode === "password" ? "font-semibold text-primaryColor border-b-4 border-primaryColor" : ""}`}
                >
                  Login with Email
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
                    value={phone}
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
                      value={loginCode}
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
                      value={email}
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
                      value={password}
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
        {notificationContextHolder}
        {modalContextHolder}
      </div>
    </div>
  );
};

export default LoginPage;import React, { useState } from 'react';
import axios from 'axios';
import HelloWithColor from '../../components/Hello/HelloWithColor';
import StartButton from '../../components/StartButton/StartButton';
import Header from '../../components/Header/Header';
import { Input, notification, Modal, Space, Select } from 'antd';
import {
  MailOutlined,
  LockOutlined,
  MobileOutlined,
  GoogleOutlined,
  FacebookOutlined,
  GithubOutlined,
  LinkedinOutlined
} from "@ant-design/icons";
import { useNavigate } from 'react-router';


const LoginPage = () => {
  const [loginMode, setLoginMode] = useState("code"); // "code" or "password"
  const [phone, setPhone] = useState(""); // 手机号
  const [loginCode, setLoginCode] = useState(''); // 验证码
  const [email, setEmail] = useState(''); // 邮箱
  const [password, setPassword] = useState(''); // 密码

  const [countdown, setCountdown] = useState(60);    // 倒计时秒数
  const [available, setAvailable] = useState(false); // 是否可以发送验证码

  const phoneNumberReg = /^1[3-9]\d{9}$/; // 手机号正则表达式
  const verificationCodeReg = /^[0-9]{6}$/; // 验证码正则表达式
  const emailReg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; // 邮箱正则表达式

  const navigate = useNavigate();

  // 将参数传给后端发送验证码或前端调用其他发送验证码的api
  const sendPhoneCode = async (params) => {
    if (available) { // 倒计时未结束,不能重复点击
      return;
    }
    setAvailable(true);

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

    // 调发送验证码接口
    // const res = axios.get('/admin/send', {
    //   params: {
    //     phone: dataForm.phone,
    //   }
    // }).then(res => {
    //   console.success(res.data);
    // }).catch(error => {
    //   console.error(error);
    // });

    return {
      responseCode: '000000', // 模拟成功响应
      responseMsg: "Verification code sent successfully!",
    };
  };

  const [api, notificationContextHolder] = notification.useNotification();
  const handleSendCode = async () => {
    // 验证手机号的有效性
    if (!phoneNumberReg.test(phone)) {
      api.error({
        message: 'Invalid phone number',
        description: 'Please enter a valid phone number!',
        placement: 'top',
      });
      return;
    } else {
      // 将手机号作为参数传入
      // 解构返回的对象，拿出对象中的成功或失败状态，并进行验证
      const res = await sendPhoneCode(phone);
      if (res.responseCode === '000000') {
        api.success({
          message: 'Sent successfully',
          description: 'Please fill in the received verification code!',
          placement: 'top',
        });
      } else {
        // 根据具体的响应码来进行具体的失败提示
        api.error({
          message: 'Sent failure',
          description: 'Please try again later!',
          placement: 'top',
        });
      }
    }
  };

  const handleLoginValidation = () => {
    // 1.区分登录方式
    if (loginMode === "code") {
      // 2.手机号和验证码不能为空
      if (!phone || !loginCode) {
        api.error({
          message: 'Login failed',
          description: 'Phone number and verification code cannot be empty!',
          placement: 'top',
        });
        return false;
      }
      // 3.手机号格式正确
      if (!phoneNumberReg.test(phone)) {
        api.error({
          message: 'Login failed',
          description: 'Please enter a valid phone number!',
          placement: 'top',
        });
        return false;
      }
      // 4.验证码格式正确
      if (!verificationCodeReg.test(loginCode)) {
        api.error({
          message: 'Verification code format error',
          description: 'Please enter the correct verification code!',
          placement: 'top',
        });
        return false;
      }
      return true;
    } else if (loginMode === "password") {
      // 2.邮箱和密码不能为空
      if (!email || !password) {
        api.error({
          message: 'Login failed',
          description: 'Email and password cannot be empty!',
          placement: 'top',
        });
        return false;
      }
      // 3.邮箱格式正确
      if (!emailReg.test(email)) {
        api.error({
          message: 'Login failed',
          description: 'Please enter a valid email address!',
          placement: 'top',
        });
        return false;
      }
      return true;
    } else {
      api.error({
        message: 'Login failed',
        description: 'Encountered an unknown error!',
        placement: 'top',
      });
      return false;
    }
  };

  const [modal, modalContextHolder] = Modal.useModal();
  const handleLogin = async () => {
    if (!handleLoginValidation()) {
      return;
    } else {
      if (loginMode === "code") {
        // 请求后端验证手机验证码的正确性、时效性以及手机和验证码是否匹配（这里已经是登录的逻辑了）
        // const { data } = await axios.post(registerRoute, {
        //   phone,
        //   loginCode,
        // });
        const data = { status: true, }; // 模拟成功返回
        // 后端检查发现验证码输入错误或不匹配，让用户输入正确的验证码
        // 这里的data要返回具体的错误原因，如错误码，以便前端进行判断
        if (data.status === false) {
          api.error({
            message: 'Verification code input error',
            description: 'Please enter the correct verification code!',
            placement: 'top',
          });
          return;
        } else if (data.status === false) {
          // 后端服务不稳定响应失败，提醒用户稍后重试
          api.error({
            message: 'Server error',
            description: 'The server seems to have malfunctioned, please try again later!',
            placement: 'top',
          });
          return;
        } else if (data.status === true) {
          // 后端检查发现验证码输入正确，直接进行登录成功的逻辑
          // 设置本地存储：用户信息 + cookie
          // localStorage.setItem('user', JSON.stringify(data.user));
          // localStorage.setItem('token', data.token);

          // 进行modal弹窗提示：登陆成功。点击确认后跳转到home页面
          modal.success({
            title: 'Login Successfully',
            content: `Let's start exploring!`,
            onOk: () => {
              // 跳转到home页面
              navigate("/");
            },
          });
        }
      } else if (loginMode === "password") {
        // 请求后端验证邮箱和密码的正确性
        // const { data } = await axios.post(loginRoute, {
        //   email,
        //   password,
        // });
        const data = { status: true, }; // 模拟成功返回

        // 若正确则进行登录成功的逻辑
        if (data.status === true) {
          // 设置本地存储：用户信息 + cookie
          // localStorage.setItem('user', JSON.stringify(data.user));
          // localStorage.setItem('token', data.token);

          // 进行modal弹窗提示：登陆成功。点击确认后跳转到home页面
          modal.success({
            title: 'Login Successfully',
            content: `Let's start exploring!`,
            onOk: () => {
              // 跳转到home页面
              navigate("/");
            },
          });
        } else if (data.status === false) { // 若错误，则看具体错误的原因：
          // 若未注册则提示未注册
          api.error({
            message: 'Login failed',
            description: 'This email has not been registered. Please register before logging in!',
            placement: 'top',
          });
        } else if (data.status === false) {
          // 若邮箱和密码输入错误或不匹配，让用户输入正确的邮箱和密码
          api.error({
            message: 'Login failed',
            description: 'Email or password entered incorrectly, please try again!',
            placement: 'top',
          });
        } else {
          // 后端服务不稳定响应失败，提醒用户稍后重试
          api.error({
            message: 'Server error',
            description: 'The server seems to have malfunctioned, please try again later!',
            placement: 'top',
          });
        }
      }
    };
  };

  // const options = [
  //   {
  //     value: 'China',
  //     label: '+86',
  //   },
  //   {
  //     value: 'USA',
  //     label: '+01',
  //   },
  // ];

  return (
    // 加header会导致屏幕超长出现滚动条或主题内容不垂直居中问题（主题内容的父元素无法铺满剩余的高度）
    // 主体内容如何绝对在屏幕中间？用position才行？
    // 【解决：父盒子flex flex-col min-h-screen；子元素flex-1自动填充剩余空间，不需要再写高度和宽度】
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
                  Login with OTP
                </button>
                <button
                  onClick={() => setLoginMode("password")}
                  className={`text-lg ${loginMode === "password" ? "font-semibold text-primaryColor border-b-4 border-primaryColor" : ""}`}
                >
                  Login with Email
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
                    value={phone}
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
                      value={loginCode}
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
                      value={email}
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
                      value={password}
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
        {notificationContextHolder}
        {modalContextHolder}
      </div>
    </div>
  );
};

export default LoginPage;import React, { useState } from 'react';
import axios from 'axios';
import HelloWithColor from '../../components/Hello/HelloWithColor';
import StartButton from '../../components/StartButton/StartButton';
import Header from '../../components/Header/Header';
import { Input, notification, Modal, Space, Select } from 'antd';
import {
  MailOutlined,
  LockOutlined,
  MobileOutlined,
  GoogleOutlined,
  FacebookOutlined,
  GithubOutlined,
  LinkedinOutlined
} from "@ant-design/icons";
import { useNavigate } from 'react-router';


const LoginPage = () => {
  const [loginMode, setLoginMode] = useState("code"); // "code" or "password"
  const [phone, setPhone] = useState(""); // 手机号
  const [loginCode, setLoginCode] = useState(''); // 验证码
  const [email, setEmail] = useState(''); // 邮箱
  const [password, setPassword] = useState(''); // 密码

  const [countdown, setCountdown] = useState(60);    // 倒计时秒数
  const [available, setAvailable] = useState(false); // 是否可以发送验证码

  const phoneNumberReg = /^1[3-9]\d{9}$/; // 手机号正则表达式
  const verificationCodeReg = /^[0-9]{6}$/; // 验证码正则表达式
  const emailReg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; // 邮箱正则表达式

  const navigate = useNavigate();

  // 将参数传给后端发送验证码或前端调用其他发送验证码的api
  const sendPhoneCode = async (params) => {
    if (available) { // 倒计时未结束,不能重复点击
      return;
    }
    setAvailable(true);

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

    // 调发送验证码接口
    // const res = axios.get('/admin/send', {
    //   params: {
    //     phone: dataForm.phone,
    //   }
    // }).then(res => {
    //   console.success(res.data);
    // }).catch(error => {
    //   console.error(error);
    // });

    return {
      responseCode: '000000', // 模拟成功响应
      responseMsg: "Verification code sent successfully!",
    };
  };

  const [api, notificationContextHolder] = notification.useNotification();
  const handleSendCode = async () => {
    // 验证手机号的有效性
    if (!phoneNumberReg.test(phone)) {
      api.error({
        message: 'Invalid phone number',
        description: 'Please enter a valid phone number!',
        placement: 'top',
      });
      return;
    } else {
      // 将手机号作为参数传入
      // 解构返回的对象，拿出对象中的成功或失败状态，并进行验证
      const res = await sendPhoneCode(phone);
      if (res.responseCode === '000000') {
        api.success({
          message: 'Sent successfully',
          description: 'Please fill in the received verification code!',
          placement: 'top',
        });
      } else {
        // 根据具体的响应码来进行具体的失败提示
        api.error({
          message: 'Sent failure',
          description: 'Please try again later!',
          placement: 'top',
        });
      }
    }
  };

  const handleLoginValidation = () => {
    // 1.区分登录方式
    if (loginMode === "code") {
      // 2.手机号和验证码不能为空
      if (!phone || !loginCode) {
        api.error({
          message: 'Login failed',
          description: 'Phone number and verification code cannot be empty!',
          placement: 'top',
        });
        return false;
      }
      // 3.手机号格式正确
      if (!phoneNumberReg.test(phone)) {
        api.error({
          message: 'Login failed',
          description: 'Please enter a valid phone number!',
          placement: 'top',
        });
        return false;
      }
      // 4.验证码格式正确
      if (!verificationCodeReg.test(loginCode)) {
        api.error({
          message: 'Verification code format error',
          description: 'Please enter the correct verification code!',
          placement: 'top',
        });
        return false;
      }
      return true;
    } else if (loginMode === "password") {
      // 2.邮箱和密码不能为空
      if (!email || !password) {
        api.error({
          message: 'Login failed',
          description: 'Email and password cannot be empty!',
          placement: 'top',
        });
        return false;
      }
      // 3.邮箱格式正确
      if (!emailReg.test(email)) {
        api.error({
          message: 'Login failed',
          description: 'Please enter a valid email address!',
          placement: 'top',
        });
        return false;
      }
      return true;
    } else {
      api.error({
        message: 'Login failed',
        description: 'Encountered an unknown error!',
        placement: 'top',
      });
      return false;
    }
  };

  const [modal, modalContextHolder] = Modal.useModal();
  const handleLogin = async () => {
    if (!handleLoginValidation()) {
      return;
    } else {
      if (loginMode === "code") {
        // 请求后端验证手机验证码的正确性、时效性以及手机和验证码是否匹配（这里已经是登录的逻辑了）
        // const { data } = await axios.post(registerRoute, {
        //   phone,
        //   loginCode,
        // });
        const data = { status: true, }; // 模拟成功返回
        // 后端检查发现验证码输入错误或不匹配，让用户输入正确的验证码
        // 这里的data要返回具体的错误原因，如错误码，以便前端进行判断
        if (data.status === false) {
          api.error({
            message: 'Verification code input error',
            description: 'Please enter the correct verification code!',
            placement: 'top',
          });
          return;
        } else if (data.status === false) {
          // 后端服务不稳定响应失败，提醒用户稍后重试
          api.error({
            message: 'Server error',
            description: 'The server seems to have malfunctioned, please try again later!',
            placement: 'top',
          });
          return;
        } else if (data.status === true) {
          // 后端检查发现验证码输入正确，直接进行登录成功的逻辑
          // 设置本地存储：用户信息 + cookie
          // localStorage.setItem('user', JSON.stringify(data.user));
          // localStorage.setItem('token', data.token);

          // 进行modal弹窗提示：登陆成功。点击确认后跳转到home页面
          modal.success({
            title: 'Login Successfully',
            content: `Let's start exploring!`,
            onOk: () => {
              // 跳转到home页面
              navigate("/");
            },
          });
        }
      } else if (loginMode === "password") {
        // 请求后端验证邮箱和密码的正确性
        // const { data } = await axios.post(loginRoute, {
        //   email,
        //   password,
        // });
        const data = { status: true, }; // 模拟成功返回

        // 若正确则进行登录成功的逻辑
        if (data.status === true) {
          // 设置本地存储：用户信息 + cookie
          // localStorage.setItem('user', JSON.stringify(data.user));
          // localStorage.setItem('token', data.token);

          // 进行modal弹窗提示：登陆成功。点击确认后跳转到home页面
          modal.success({
            title: 'Login Successfully',
            content: `Let's start exploring!`,
            onOk: () => {
              // 跳转到home页面
              navigate("/");
            },
          });
        } else if (data.status === false) { // 若错误，则看具体错误的原因：
          // 若未注册则提示未注册
          api.error({
            message: 'Login failed',
            description: 'This email has not been registered. Please register before logging in!',
            placement: 'top',
          });
        } else if (data.status === false) {
          // 若邮箱和密码输入错误或不匹配，让用户输入正确的邮箱和密码
          api.error({
            message: 'Login failed',
            description: 'Email or password entered incorrectly, please try again!',
            placement: 'top',
          });
        } else {
          // 后端服务不稳定响应失败，提醒用户稍后重试
          api.error({
            message: 'Server error',
            description: 'The server seems to have malfunctioned, please try again later!',
            placement: 'top',
          });
        }
      }
    };
  };

  // const options = [
  //   {
  //     value: 'China',
  //     label: '+86',
  //   },
  //   {
  //     value: 'USA',
  //     label: '+01',
  //   },
  // ];

  return (
    // 加header会导致屏幕超长出现滚动条或主题内容不垂直居中问题（主题内容的父元素无法铺满剩余的高度）
    // 主体内容如何绝对在屏幕中间？用position才行？
    // 【解决：父盒子flex flex-col min-h-screen；子元素flex-1自动填充剩余空间，不需要再写高度和宽度】
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
                  Login with OTP
                </button>
                <button
                  onClick={() => setLoginMode("password")}
                  className={`text-lg ${loginMode === "password" ? "font-semibold text-primaryColor border-b-4 border-primaryColor" : ""}`}
                >
                  Login with Email
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
                    value={phone}
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
                      value={loginCode}
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
                      value={email}
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
                      value={password}
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
        {notificationContextHolder}
        {modalContextHolder}
      </div>
    </div>
  );
};

export default LoginPage;