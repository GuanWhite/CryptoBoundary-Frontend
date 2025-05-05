import "./LoginPage.less";
import StartButton from "../../components/StartButton/StartButton";
import { registerRoute, loginRoute } from "../../utils/APIRoutes";
import { MobileOutlined, MailOutlined, LockOutlined, UserOutlined, GoogleOutlined, FacebookOutlined, GithubOutlined, LinkedinOutlined } from "@ant-design/icons";
import { Input, Button, notification } from 'antd';
import React, { useState, useEffect } from 'react';
import axios from "axios";

function Login() {

  const [isActive, setIsActive] = useState(false);
  const [isPhoneLogin, setIsPhoneLogin] = useState(false); // 是否手机登录
  const [isShowSwitch, setIsShowSwitch] = useState(true); // 是否显示切换登录方式按钮
  const [time, setTime] = useState(60);
  const [isShowCode, setIsShowCode] = useState(false);

  const [loginEmail, setLoginEmail] = useState(''); // 登录邮箱
  const [loginPassword, setLoginPassword] = useState(''); // 登录密码

  const [loginPhone, setLoginPhone] = useState(''); // 登录手机号
  const [loginCode, setLoginCode] = useState(''); // 登录验证码

  const [registerUsername, setRegisterUsername] = useState(''); // 注册用户名
  const [registerEmail, setRegisterEmail] = useState(''); // 注册邮箱
  const [registerPassword, setRegisterPassword] = useState(''); // 注册密码
  const [registerCode, setRegisterCode] = useState(''); // 注册验证码

  const [api, contextHolder] = notification.useNotification();

  const openNotificationWithIcon = (type, msg, des) => {
    api[type]({
      message: msg,
      description: des,
    });
  };

  useEffect(() => {
    // 判断是否存储了登录状态
    // if (localStorage.getItem()) {
    //   // 导航到home页面
    // }
  }, []);

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

  // 发送手机验证码
  const sendPhoneCode = async (params) => {
    if (isShowCode) { // 倒计时未结束,不能重复点击
      return;
    }
    setIsShowCode(true);
    let state = {};

    // 调发送短信接口
    axios.get('/admin/send', {
      params: {
        phone: dataForm.phone,
      }
    }).then(res => {
      console.success(res.data);
      state = res.data;
    }).catch(error => {
      console.error(error);
      state = res.data;
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

    return state;
  };

  // 发送邮箱或手机验证码
  const handleSendCode = async () => {
    // 判断要发送手机验证码还是邮箱验证码
    if (registerEmail) {
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
    } else if (loginPhone) {
      // 发送手机验证码
      const res = await sendPhoneCode(loginPhone);
      if (res.responseCode === '000000') {
        notification.success({
          message: '发送成功,请填写收到的验证码',
        });
      } else {
        // 失败逻辑
      }
    }
  };

  const handleLogin = () => {
    // 1.与数据库对比，验证邮箱和密码是否正确
    // 2.正确则跳转至home页面
    // 3.错误则提示“邮箱或密码错误，请重新输入”
  };

  const handleValidation = () => {
    const { password, confirmPassword, username, email } = values;
    if (password !== confirmPassword) {
      toast.error(
        "Password and confirm password should be same.",
        toastOptions
      );
      return false;
    } else if (username.length < 3) {
      toast.error(
        "Username should be greater than 3 characters.",
        toastOptions
      );
      return false;
    } else if (password.length < 8) {
      toast.error(
        "Password should be equal or greater than 8 characters.",
        toastOptions
      );
      return false;
    } else if (email === "") {
      toast.error("Email is required.", toastOptions);
      return false;
    }

    return true;
  };

  const handleRegister = async (event) => {
    // event.preventDefault();
    // 1.验证邮箱验证码是否正确，正确才可以注册
    if (registerCode === '123456') {
      // const { data } = await axios.post(registerRoute, {
      //   "username": registerUsername,
      //   "email": registerEmail,
      //   "password": registerPassword,
      // });
      data = {
        status: true,
      }

      if (data.status === false) {
        openNotificationWithIcon('error', 'Registration Failure', 'The server seems to have malfunctioned, please try again later!');
      }
      if (data.status === true) {
        // event.preventDefault();
        // 设置本地存储 + 向服务器发送cookie
        // localStorage.setItem(
        //   process.env.REACT_APP_LOCALHOST_KEY,
        //   JSON.stringify(data.user)
        // );
        // 2.清空注册表单
        setRegisterUsername('');
        setRegisterEmail('');
        setRegisterPassword('');
        setRegisterCode('');
        // 3.提示“注册成功，现在去登陆吧”
        openNotificationWithIcon('success', 'Registered Successfully', 'Let\'s go log in now!');
      }
    } else {
      openNotificationWithIcon('error', 'Registration Failure', 'Verification code filled in incorrectly!');
    }
  };

  // 切换注册和登录页面的动画
  const switchAnimation = () => {
    setIsActive((prev) => !prev);
    setIsShowSwitch((prev) => !prev);
  };

  const switchIsPhoneLogin = () => {
    setIsPhoneLogin((prev) => !prev);
  };

  return (
    <div className="auth-wrapper">
      {contextHolder}
      <div className={`container ${isActive ? 'active' : ''}`}>
        {/* <Button onClick={() => openNotificationWithIcon('success', 'Registered Successfully', 'Let\'s go log in now!')}>Success</Button> */}
        {isShowSwitch ?
          <div
            className="top-0 right-0 absolute cursor-pointer bg-[#7494ec] hover:bg-[#4c6ecb] w-20 h-20 text-4xl text-center rounded-tr-[30px] rounded-bl-[30px] z-10"
            onClick={switchIsPhoneLogin}>
            {isPhoneLogin ? <MailOutlined className="h-full text-white" /> : <MobileOutlined className="h-full text-white" />}
          </div> :
          null
        }
        <div className="form-box login">
          {isPhoneLogin ?
            <form action="">
              <h1>Login with Phone</h1>
              <div className="input-box">
                {/* <input type="text" placeholder="Email" required /> */}
                <Input className="input-input" type="text" placeholder="Phone Number" required value={loginPhone} onChange={(e) => setLoginPhone(e.target.value)} />
                <MobileOutlined className="input-icon" />
              </div>
              <div className="input-box">
                {/* <input type="password" placeholder="Password" required /> */}
                <Input className="input-input" placeholder="Verification code" required maxLength={6} value={loginCode} onChange={(e) => setLoginCode(e.target.value)} />
                <div className="send-code">
                  {isShowCode ? (<Button type="primary" disabled>{`Resend ${time}s`}</Button>) : (<Button type="primary" onClick={handleSendCode}>{`Send Code`}</Button>)}
                </div>
              </div>
              <div className="forgot-link">
                <a href="#">Forgot Password?</a>
              </div>
              <button type="submit" className="btn">Login</button>
              <p>or login with social platforms</p>
              <div className="social-icons">
                <a href="#"><GoogleOutlined /></a>
                <a href="#"><FacebookOutlined /></a>
                <a href="#"><GithubOutlined /></a>
                <a href="#"><LinkedinOutlined /></a>
              </div>
            </form> :
            <form action="">
              <h1>Login</h1>
              <div className="input-box">
                {/* <input type="text" placeholder="Email" required /> */}
                <Input className="input-input" type="email" placeholder="Email" required value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} />
                <MailOutlined className="input-icon" />
              </div>
              <div className="input-box">
                {/* <input type="password" placeholder="Password" required /> */}
                <Input.Password className="input-input" placeholder="Password" required value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} />
                <LockOutlined className="input-icon" />
              </div>
              <div className="forgot-link">
                <a href="#">Forgot Password?</a>
              </div>
              <button type="submit" className="btn">Login</button>
              <p>or login with social platforms</p>
              <div className="social-icons">
                <a href="#"><GoogleOutlined /></a>
                <a href="#"><FacebookOutlined /></a>
                <a href="#"><GithubOutlined /></a>
                <a href="#"><LinkedinOutlined /></a>
              </div>
            </form>
          }
        </div>

        <div className="form-box register">
          <form action="">
            <h1>Registration</h1>
            <div className="reg-input-box">
              {/* <input type="text" placeholder="Username" required /> */}
              <Input className="input-input" placeholder="Username" required value={registerUsername} onChange={(e) => setRegisterUsername(e.target.value)} />
              <UserOutlined className="input-icon" />
            </div>
            <div className="reg-input-box">
              <Input className="input-input" type="email" placeholder="Email" required value={registerEmail} onChange={(e) => setRegisterEmail(e.target.value)} />
              <MailOutlined className="input-icon" />
            </div>
            <div className="reg-input-box">
              <Input className="code-input-input" placeholder="Verification code" required value={registerCode} maxLength={6} onChange={(e) => setRegisterCode(e.target.value)} />
              {/* 如果handleSendEmailCode不加括号，则点击时才会触发该函数；
                  如果加了括号，则进入页面就会触发该函数，如果不想则要将其包装在一个函数中:()=>handleSendEmailCode() 
                  当回调函数有参数要传递时，必须要将其包装在函数中。*/}
              <div className="send-code">
                {isShowCode ? (<Button type="primary" disabled>{`Resend ${time}s`}</Button>) : (<Button type="primary" onClick={handleSendCode}>{`Send Code`}</Button>)}
                {/* {isShowCode ? `Resend ${time}s` : 'Send Code'} */}
              </div>
            </div>
            <div className="reg-input-box">
              <Input.Password className="input-input" placeholder="Password" required value={registerPassword} onChange={(e) => setRegisterPassword(e.target.value)} />
              <LockOutlined className="input-icon" />
            </div>
            <button className="btn" onClick={(e) => handleRegister(e)}>Register</button>
            <p>or register with social platforms</p>
            <div className="social-icons">
              <a href="#"><GoogleOutlined /></a>
              <a href="#"><FacebookOutlined /></a>
              <a href="#"><GithubOutlined /></a>
              <a href="#"><LinkedinOutlined /></a>
            </div>
          </form>
        </div>

        <div className="toggle-box">
          <div className="toggle-panel toggle-left">
            <h1>Welcome Back!</h1>
            <p>Don't have an account?</p>
            <button className="btn register-btn" onClick={switchAnimation}>Register</button>
          </div>

          <div className="toggle-panel toggle-right">
            <h1>Hello, Welcome!</h1>
            <p>Already have an account?</p>
            <button className="btn login-btn" onClick={switchAnimation}>Login</button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Login;