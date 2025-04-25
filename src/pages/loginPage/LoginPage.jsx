import "./LoginPage.less";
import StartButton from "../../components/StartButton/StartButton";
import { MobileOutlined, MailOutlined, LockOutlined, UserOutlined, GoogleOutlined, FacebookOutlined, GithubOutlined, LinkedinOutlined } from "@ant-design/icons";
import { Input, Button } from 'antd';
import React, { useState } from 'react';

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

  // 将参数传给后端发送验证码或前端调用其他发送验证码的api
  const sendEmailCode = async (params) => {
    // const res = await request.post('/user/sendEmailCode', params);
    // return res;
    return {
      responseCode: '000000', // 模拟成功响应
      responseMsg: "Verification code sent successfully!",
    };
  };

  // 发送手机验证码
  const sendPhoneCode = async (params) => {
    // const res = await request.post('/user/sendPhoneCode', params);
    // return res;
    return {
      responseCode: '000000', // 模拟成功响应
      responseMsg: "Verification code sent successfully!",
    };
  };

  // 发送邮箱或手机验证码
  const handleSendCode = async () => {
    // const fileds = await form.validateFields(['account', 'email']);

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

    // 判断要发送手机验证码还是邮箱验证码
    if (registerEmail) {
      // 模拟获取到的邮箱
      userEmail = "123@qq.com";
      // 将邮箱作为参数传入
      const res = await sendEmailCode(userEmail);
      if (res.responseCode === '000000') {
        notification.success({
          message: '发送成功,请填写收到的验证码',
        });
      }
    } else if (loginPhone) {
      // 发送手机验证码
      const res = await sendPhoneCode(loginPhone);
      if (res.responseCode === '000000') {
        notification.success({
          message: '发送成功,请填写收到的验证码',
        });
      }
    }

  };

  const handleLogin = () => {
    // 1.与数据库对比，验证邮箱和密码是否正确
    // 2.正确则跳转至home页面
    // 3.错误则提示“邮箱或密码错误，请重新输入”
  };

  const handleRegister = () => {
    // 1.验证邮箱验证码是否正确，正确才可以注册

    // 2.提示“注册成功，现在去登陆吧”
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
      <div className={`container ${isActive ? 'active' : ''}`}>
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
              <Input className="input-input" placeholder="Username" required onChange={(e) => setRegisterUsername(e.target.value)} />
              <UserOutlined className="input-icon" />
            </div>
            <div className="reg-input-box">
              <Input className="input-input" type="email" placeholder="Email" required onChange={(e) => setRegisterEmail(e.target.value)} />
              <MailOutlined className="input-icon" />
            </div>
            <div className="reg-input-box">
              <Input className="code-input-input" placeholder="Verification code" required maxLength={6} onChange={(e) => setRegisterCode(e.target.value)} />
              {/* 如果handleSendEmailCode不加括号，则点击时才会触发该函数；
                  如果加了括号，则进入页面就会触发该函数，如果不想则要将其包装在一个函数中:()=>handleSendEmailCode() 
                  当回调函数有参数要传递时，必须要将其包装在函数中。*/}
              <div className="send-code">
                {isShowCode ? (<Button type="primary" disabled>{`Resend ${time}s`}</Button>) : (<Button type="primary" onClick={handleSendCode}>{`Send Code`}</Button>)}
                {/* {isShowCode ? `Resend ${time}s` : 'Send Code'} */}
              </div>
            </div>
            <div className="reg-input-box">
              <Input.Password className="input-input" placeholder="Password" required onChange={(e) => setRegisterPassword(e.target.value)} />
              <LockOutlined className="input-icon" />
            </div>
            <button type="submit" className="btn" onClick={handleRegister}>Register</button>
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