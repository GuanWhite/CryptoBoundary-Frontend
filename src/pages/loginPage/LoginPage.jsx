import "./LoginPage.less";
import StartButton from "../../components/StartButton/StartButton";
import { MailOutlined, LockOutlined, UserOutlined, GoogleOutlined, FacebookOutlined, GithubOutlined, LinkedinOutlined } from "@ant-design/icons";
import { Input } from 'antd';
import React, { useState } from 'react';
function Login() {
  //   const container = document.querySelector('.container')
  // const registerBtn = document.querySelector('.register-btn')
  // const loginBtn = document.querySelector('.login-btn')

  // registerBtn.addEventListener('click', () => {
  //   container.classList.add('active')
  // })

  // loginBtn.addEventListener('click', () => {
  //   container.classList.remove('active')
  // })
  // return (
  //   <>

  //     {/* <div className="login-back-box">
  //       <div className="login-container">
  //         <div className="form-box login">
  //           <form className="login-form" action="">
  //             <h1 className="login-h1">Login</h1>
  //             <div className="input-box">
  //               <Input className="input-input" placeholder="Email" />
  //               <MailOutlined className="input-icon" />
  //             </div>
  //             <div className="input-box">
  //               <Input.Password className="input-input" placeholder="Password" />
  //               <LockOutlined className="input-icon" />
  //             </div>
  //             <div className="forgot-link">
  //               <a href="#">Forget Password?</a>
  //             </div>
  //             <button type="submit" className="login-btn">Login</button>
  //             <p>or login with social platforms</p>
  // <div className="social-icons">
  //   <a href="#"><GoogleOutlined /></a>
  //   <a href="#"><FacebookOutlined /></a>
  //   <a href="#"><GithubOutlined /></a>
  //   <a href="#"><LinkedinOutlined /></a>
  // </div>
  //           </form>
  //         </div>
  //       </div>
  //     </div> */}

  //     {/* <div class="container">
  //       <div class="form-box login">
  //         <form action="">
  //           <h1>Login</h1>
  //           <div class="input-box">
  //             <input type="text" placeholder="Username" required />
  //               <i class="bx bxs-user"></i>
  //           </div>
  //           <div class="input-box">
  //             <input type="password" placeholder="Password" required />
  //               <i class="bx bxs-lock-alt"></i>
  //           </div>
  //           <div class="forgot-link">
  //             <a href="#">Forgot Password?</a>
  //           </div>
  //           <button type="submit" class="btn">Login</button>
  //           <p>or login with social platforms</p>
  //           <div class="social-icons">
  //             <a href="#"><i class="bx bxl-google"></i></a>
  //             <a href="#"><i class="bx bxl-facebook"></i></a>
  //             <a href="#"><i class="bx bxl-github"></i></a>
  //             <a href="#"><i class="bx bxl-linkedin"></i></a>
  //           </div>
  //         </form>
  //       </div>

  //       <div class="form-box register">
  //         <form action="">
  //           <h1>Registration</h1>
  //           <div class="input-box">
  //             <input type="text" placeholder="Username" required />
  //               <i class="bx bxs-user"></i>
  //           </div>
  //           <div class="input-box">
  //             <input type="email" placeholder="Email" required />
  //               <i class="bx bxs-envelope"></i>
  //           </div>
  //           <div class="input-box">
  //             <input type="password" placeholder="Password" required />
  //               <i class="bx bxs-lock-alt"></i>
  //           </div>
  //           <div class="forgot-link">
  //             <a href="#">Forgot Password?</a>
  //           </div>
  //           <button type="submit" class="btn">Register</button>
  //           <p>or register with social platforms</p>
  //           <div class="social-icons">
  //             <a href="#"><i class="bx bxl-google"></i></a>
  //             <a href="#"><i class="bx bxl-facebook"></i></a>
  //             <a href="#"><i class="bx bxl-github"></i></a>
  //             <a href="#"><i class="bx bxl-linkedin"></i></a>
  //           </div>
  //         </form>
  //       </div>

  //       <div class="toggle-box">
  //         <div class="toggle-panel toggle-left">
  //           <h1>Hello, Welcome!</h1>
  //           <p>Don's have an account?</p>
  //           <button class="btn register-btn">Register</button>
  //         </div>

  //         <div class="toggle-panel toggle-right">
  //           <h1>Welcome Back!</h1>
  //           <p>Already have an account?</p>
  //           <button class="btn login-btn">Login</button>
  //         </div>
  //       </div>
  //     </div> */}

  //   </>
  // );

  const [isActive, setIsActive] = useState(false);
  const [time, setTime] = useState(60);
  const [isShowCode, setIsShowCode] = useState(false);

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

  return (
    <div className="auth-wrapper">
      <div className={`container ${isActive ? 'active' : ''}`}>
        <div className="form-box login">
          <form action="">
            <h1>Login</h1>
            <div className="input-box">
              {/* <input type="text" placeholder="Email" required /> */}
              <Input className="input-input" placeholder="Email" required />
              <MailOutlined className="input-icon" />
            </div>
            <div className="input-box">
              {/* <input type="password" placeholder="Password" required /> */}
              <Input.Password className="input-input" placeholder="Password" required />
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
              <Input className="input-input" placeholder="Username" required />
              <UserOutlined className="input-icon" />
            </div>
            <div className="reg-input-box">
              <Input className="input-input" placeholder="Email" required />
              <MailOutlined className="input-icon" />
            </div>
            <div className="reg-input-box">
              <Input className="code-input-input" placeholder="Verification code" required maxLength={6} />
              <a className="send-code" onClick={() => handleSendEmailCode()}>
                {isShowCode ? `Resend in ${time}s` : 'Send Code'}
              </a>
            </div>
            <div className="reg-input-box">
              <Input.Password className="input-input" placeholder="Password" required />
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