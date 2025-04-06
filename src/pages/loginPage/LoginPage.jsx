import "./LoginPage.less";
import StartButton from "../../components/StartButton/StartButton";
import { MailOutlined, LockOutlined, GoogleOutlined, FacebookOutlined, GithubOutlined, LinkedinOutlined } from "@ant-design/icons";
import { Input } from 'antd';
function Login() {
  const container = document.querySelector('.container')
const registerBtn = document.querySelector('.register-btn')
const loginBtn = document.querySelector('.login-btn')

registerBtn.addEventListener('click', () => {
  container.classList.add('active')
})

loginBtn.addEventListener('click', () => {
  container.classList.remove('active')
})
  return (
    <>

      {/* <div className="login-back-box">
        <div className="login-container">
          <div className="form-box login">
            <form className="login-form" action="">
              <h1 className="login-h1">Login</h1>
              <div className="input-box">
                <Input className="input-input" placeholder="Email" />
                <MailOutlined className="input-icon" />
              </div>
              <div className="input-box">
                <Input.Password className="input-input" placeholder="Password" />
                <LockOutlined className="input-icon" />
              </div>
              <div className="forgot-link">
                <a href="#">Forget Password?</a>
              </div>
              <button type="submit" className="login-btn">Login</button>
              <p>or login with social platforms</p>
              <div className="social-icons">
                <a href="#"><GoogleOutlined /></a>
                <a href="#"><FacebookOutlined /></a>
                <a href="#"><GithubOutlined /></a>
                <a href="#"><LinkedinOutlined /></a>
              </div>
            </form>
          </div>
        </div>
      </div> */}

      <div class="container">
        <div class="form-box login">
          <form action="">
            <h1>Login</h1>
            <div class="input-box">
              <input type="text" placeholder="Username" required />
                <i class="bx bxs-user"></i>
            </div>
            <div class="input-box">
              <input type="password" placeholder="Password" required />
                <i class="bx bxs-lock-alt"></i>
            </div>
            <div class="forgot-link">
              <a href="#">Forgot Password?</a>
            </div>
            <button type="submit" class="btn">Login</button>
            <p>or login with social platforms</p>
            <div class="social-icons">
              <a href="#"><i class="bx bxl-google"></i></a>
              <a href="#"><i class="bx bxl-facebook"></i></a>
              <a href="#"><i class="bx bxl-github"></i></a>
              <a href="#"><i class="bx bxl-linkedin"></i></a>
            </div>
          </form>
        </div>

        <div class="form-box register">
          <form action="">
            <h1>Registration</h1>
            <div class="input-box">
              <input type="text" placeholder="Username" required />
                <i class="bx bxs-user"></i>
            </div>
            <div class="input-box">
              <input type="email" placeholder="Email" required />
                <i class="bx bxs-envelope"></i>
            </div>
            <div class="input-box">
              <input type="password" placeholder="Password" required />
                <i class="bx bxs-lock-alt"></i>
            </div>
            <div class="forgot-link">
              <a href="#">Forgot Password?</a>
            </div>
            <button type="submit" class="btn">Register</button>
            <p>or register with social platforms</p>
            <div class="social-icons">
              <a href="#"><i class="bx bxl-google"></i></a>
              <a href="#"><i class="bx bxl-facebook"></i></a>
              <a href="#"><i class="bx bxl-github"></i></a>
              <a href="#"><i class="bx bxl-linkedin"></i></a>
            </div>
          </form>
        </div>

        <div class="toggle-box">
          <div class="toggle-panel toggle-left">
            <h1>Hello, Welcome!</h1>
            <p>Don's have an account?</p>
            <button class="btn register-btn">Register</button>
          </div>

          <div class="toggle-panel toggle-right">
            <h1>Welcome Back!</h1>
            <p>Already have an account?</p>
            <button class="btn login-btn">Login</button>
          </div>
        </div>
      </div>

    </>
  );
}
export default Login;