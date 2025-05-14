import React, { useState } from 'react';
import { Input, notification, Modal } from 'antd';
import { MailOutlined, LockOutlined, UserOutlined, GoogleOutlined, FacebookOutlined, GithubOutlined, LinkedinOutlined } from "@ant-design/icons";
import { registerRoute } from "../../utils/APIRoutes";
import axios from "axios";
import StartButton from '../../components/StartButton/StartButton';
import HelloWithColor from '../../components/Hello/HelloWithColor';
import Hello from '../../components/Hello/Hello';
import Header from '../../components/Header/Header';

const RegisterPage = () => {
  const [time, setTime] = useState(60);
  const [isShowCode, setIsShowCode] = useState(false); // 验证码倒计时

  const [registerData, setRegisterData] = useState({
    username: '',
    password: '',
    email: '',
  });
  const [registerCode, setRegisterCode] = useState(''); // 验证码

  const handleChange = (event) => {
    setRegisterData({ ...registerData, [event.target.name]: event.target.value });
  };

  // 将参数传给后端发送验证码或前端调用其他发送验证码的api
  const sendEmailCode = async (params) => {
    if (isShowCode) { // 倒计时未结束,不能重复点击
      return;
    }
    setIsShowCode(true);

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

  const emailReg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const usernameReg = /^[a-zA-Z0-9_]{4,16}$/;
  const registerCodeReg = /^[0-9]{6}$/;

  const [api, notificationContextHolder] = notification.useNotification();
  const handleSendCode = async () => {
    // const { email } = registerData;
    const email = "123@qq.com"; // 模拟获取到的邮箱
    // 验证邮箱的有效性
    if (!emailReg.test(email)) {
      api.error({
        message: 'Invalid email address',
        description: 'Please enter a valid email address!',
        placement: 'top',
      });
      return;
    } else {
      // 将邮箱作为参数传入
      // 解构返回的对象，拿出对象中的成功或失败状态，并进行验证
      const res = await sendEmailCode(email);
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

  const handleRegisterValidation = () => {
    const { username, password, email } = registerData;
    if (!usernameReg.test(username)) {
      api.error({
        message: 'Registration failure',
        description: 'The username can only contain letters, numbers, and underscores, with a length of 4 to 16 characters!',
        placement: 'top',
      });
      return false;
    } else if (!emailReg.test(email)) {
      api.error({
        message: 'Registration failure',
        description: 'Please enter a valid email address!',
        placement: 'top',
      });
      return false;
    } else if (password.length < 6) {
      api.error({
        message: 'Registration failure',
        description: 'Password should be equal or greater than 6 characters!',
        placement: 'top',
      });
      return false;
    } else if (!registerCodeReg.test(registerCode)) {
      api.error({
        message: 'Verification code format error',
        description: 'Please enter the correct email verification code!',
        placement: 'top',
      });
      return;
    }
    return true;
  };

  const [modal, modalContextHolder] = Modal.useModal();
  const handleRegister = async (event) => {
    // event.preventDefault();

    // 1.验证username, email和password是否合法，以及验证码格式是否正确
    if (!handleRegisterValidation()) {
      return;
    } else {
      // 3.请求后端验证邮箱验证码的正确性
      // const { data } = await axios.post(registerRoute, {
      //   email,
      //   registerCode,
      // });
      const data = { status: true, }; // 模拟成功返回

      // 后端检查发现验证码输入错误或邮箱和验证码不匹配，让用户输入正确的验证码
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
        // 后端检查发现验证码输入正确，允许注册
        // 4.向后端post注册表单，并根据返回的状态提示用户是否注册成功
        const { email, username, password } = registerData;
        // const { data } = await axios.post(registerRoute, {
        //   username,
        //   email,
        //   password,
        // });

        // 模拟成功返回
        const registerRespondData = {
          status: true,
        };
        if (registerRespondData.status === false) {
          // 服务器开小差了，导致注册失败，提醒用户稍后重试
          api.error({
            message: 'Server error',
            description: 'The server seems to have malfunctioned, please try again later!',
            placement: 'top',
          });
          return;
        } else if (registerRespondData.status === true) {
          // 本地存储 + 向服务器发送的cookie 在登录成功后设置，这里不应该设置

          // 注册成功，使用modal提示用户注册成功，用户点击确认后，清空注册表单，并停留在注册页面，等待用户点击登录跳转。
          modal.success({
            title: 'Registered Successfully',
            content: `Let\'s go login now!`,
            onOk: () => {
              // 清空注册表单
              // BUG:不知道为什么这里不会执行清空？如何阻塞进程等用户操作完成后再进行执行？
              // Fixed：在组件上绑定value={registerData.username}，使其成为可控组件
              setRegisterData({
                username: '',
                password: '',
                email: '',
              });
              setRegisterCode('');
            },
          });
        }
      }
    }
  };

  return (
    <div className='flex flex-col min-h-screen bg-lightBackgroundColor dark:bg-darkBackgroundColor'>
      <Header />
      <div className='flex-1 flex justify-center items-center bg-lightBackgroundColor dark:bg-darkBackgroundColor p-[20px]'>
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
                  value={registerData.username}
                  onChange={(e) => handleChange(e)} />
                <UserOutlined className="text-[20px] pl-[10px] pr-[20px]" />
              </div>
              <div className="flex justify-center items-center my-[15px] mx-0 font-medium border-solid border-2 border-lightBorderColor dark:border-darkBorderColor rounded-lg hover:border-primaryColor">
                <Input
                  className="w-full py-[13px] pl-[20px] pr-[10px] bg-transparent hover:bg-transparent focus:bg-transparent border-none text-[16px] font-medium text-lightTextColor dark:text-darkTextColor focus:shadow-none placeholder:text-placeholderColor font-[baseFont]"
                  type="email"
                  placeholder="Email Address"
                  required
                  name="email"
                  value={registerData.email}
                  onChange={(e) => handleChange(e)} />
                <MailOutlined className="text-[20px] pl-[10px] pr-[20px]" />
              </div>
              <div className="flex justify-center items-center my-[15px] mx-0 font-medium">
                <div className="w-3/5 border-solid border-2 border-lightBorderColor dark:border-darkBorderColor rounded-lg hover:border-primaryColor">
                  <Input
                    className="w-full py-[13px] px-[20px] bg-transparent hover:bg-transparent focus:bg-transparent border-none text-[16px] font-medium text-lightTextColor dark:text-darkTextColor focus:shadow-none placeholder:text-placeholderColor font-[baseFont]"
                    placeholder="Verification code"
                    required
                    maxLength={6}
                    value={registerCode}
                    onChange={(e) => setRegisterCode(e.target.value)} />
                </div>
                <div className="w-2/5 ml-[20px] text-[16px]">
                  {isShowCode ?
                    (<div className="w-full h-full py-[13px] border-solid border-2 border-lightBorderColor dark:border-darkBorderColor rounded-lg cursor-not-allowed">{`Resend ${time}s`}</div>) :
                    (<div className="w-full h-full py-[13px] border-solid border-2 border-lightBorderColor dark:border-darkBorderColor rounded-lg hover:border-primaryColor cursor-pointer" onClick={handleSendCode}>{`Send Code`}</div>)
                  }
                </div>
              </div>
              <div className="flex justify-center items-center my-[15px] mx-0 font-medium border-solid border-2 border-lightBorderColor dark:border-darkBorderColor rounded-lg hover:border-primaryColor">
                <Input
                  className="w-full py-[13px] pl-[20px] pr-[0px] bg-transparent hover:bg-transparent focus:bg-transparent border-none text-[16px] font-medium text-lightTextColor dark:text-darkTextColor focus:shadow-none placeholder:text-placeholderColor font-[baseFont]"
                  type="password"
                  placeholder="Password"
                  required
                  name="password"
                  value={registerData.password}
                  onChange={(e) => handleChange(e)} />
                <LockOutlined className="text-[20px] pl-[10px] pr-[20px]" />
              </div>
              <button
                className="w-full h-[48px] bg-primaryColor dark:text-darkTextColor text-darkTextColor rounded-[8px] shadow-[0 0 10px rgba(0, 0, 0, 0.1)] border-none cursor-pointer text-[16px] font-semibold"
                type="button"
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
              <div className='w-[360px] mb-[15px]'>
                <HelloWithColor className="bg-lightBackgroundColor dark:bg-darkBackgroundColor" />
                {/* <Hello className="bg-lightBackgroundColor dark:bg-darkBackgroundColor" /> */}
              </div>
              <h1 className="text-[36px] my-[-10px] mx-[0px]">Welcome My Friend!</h1>
              <p className='pt-[8px] pb-[16px]'>Already have an account?</p>
              <StartButton buttonName="Login" navProps="/login" />
            </div>
          </div>
        </div>
        {modalContextHolder}
        {notificationContextHolder}
      </div>
    </div>
  );
};

export default RegisterPage;