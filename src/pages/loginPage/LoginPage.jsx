import "./LoginPage.less";
import StartButton from "../../components/StartButton/StartButton";
import { MailOutlined, LockOutlined, UserOutlined, GoogleOutlined, FacebookOutlined, GithubOutlined, LinkedinOutlined } from "@ant-design/icons";
import { Input, Button } from 'antd';
import React, { useState } from 'react';

function Login() {

  const [isActive, setIsActive] = useState(false);
  const [time, setTime] = useState(60);
  const [isShowCode, setIsShowCode] = useState(false);

  const [loginEmail, setLoginEmail] = useState(''); // 登录邮箱
  const [loginPassword, setLoginPassword] = useState(''); // 登录密码

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

  // 发送邮箱验证码
  const handleSendEmailCode = async () => {
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


    // 模拟获取到的邮箱
    userEmail = "123@qq.com";
    // 将邮箱作为参数传入
    const res = await sendEmailCode(userEmail);
    if (res.responseCode === '000000') {
      notification.success({
        message: '发送成功,请填写收到的验证码',
      });
    }
  };

  const handleRegisterClick = () => {
    setIsActive(true);
  };

  const handleLoginClick = () => {
    setIsActive(false);
  };

  console.log(loginEmail,loginPassword);
  console.log(registerUsername,registerEmail,registerPassword,registerCode);

  return (
    <div className="auth-wrapper">
      <div className={`container ${isActive ? 'active' : ''}`}>
        <div className="form-box login">
          <form action="">
            <h1>Login</h1>
            <div className="input-box">
              {/* <input type="text" placeholder="Email" required /> */}
              <Input className="input-input" placeholder="Email" required value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} />
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
        </div>

        <div className="form-box register">
          <form action="">
            <h1>Registration</h1>
            <div className="reg-input-box">
              {/* <input type="text" placeholder="Username" required /> */}
              <Input className="input-input" placeholder="Username" required onChange={(e)=>setRegisterUsername(e.target.value)}/>
              <UserOutlined className="input-icon" />
            </div>
            <div className="reg-input-box">
              <Input className="input-input" placeholder="Email" required onChange={(e)=>setRegisterEmail(e.target.value)}/>
              <MailOutlined className="input-icon" />
            </div>
            <div className="reg-input-box">
              <Input className="code-input-input" placeholder="Verification code" required maxLength={6} onChange={(e)=>setRegisterCode(e.target.value)}/>
              {/* 如果handleSendEmailCode不加括号，则点击时才会触发该函数；
                  如果加了括号，则进入页面就会触发该函数，如果不想则要将其包装在一个函数中:()=>handleSendEmailCode() 
                  当回调函数有参数要传递时，必须要将其包装在函数中。*/}
              <div className="send-code">
                {isShowCode ? (<Button type="primary" disabled>{`Resend ${time}s`}</Button>) : (<Button type="primary" onClick={handleSendEmailCode}>{`Send Code`}</Button>)}
                {/* {isShowCode ? `Resend ${time}s` : 'Send Code'} */}
              </div>
            </div>
            <div className="reg-input-box">
              <Input.Password className="input-input" placeholder="Password" required onChange={(e)=>setRegisterPassword(e.target.value)}/>
              <LockOutlined className="input-icon" />
            </div>
            <button type="submit" className="btn">Register</button>
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
            <button className="btn register-btn" onClick={handleRegisterClick}>Register</button>
          </div>

          <div className="toggle-panel toggle-right">
            <h1>Hello, Welcome!</h1>
            <p>Already have an account?</p>
            <button className="btn login-btn" onClick={handleLoginClick}>Login</button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Login;