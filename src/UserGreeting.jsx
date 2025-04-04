// 用户欢迎界面
import React from 'react';
import PropTypes from 'prop-types';

function UserGreeting({ isLoggedIn = false, username = "Guest" }) {
  return (
    isLoggedIn ? <div className="welcome-message">Welcome back! {username}</div> :
      <div className="login-prompt">Please sign up.</div>
  );
}

// 这个类型验证的功能可以使用TS
UserGreeting.propTypes = {
  isLoggedIn: PropTypes.bool,
  username: PropTypes.string,
};
// 函数式组件从react 18.3.0开始弃用了该属性，建议使用 JS 默认参数的形式，来声明默认属性
// UserGreeting.defaultProps = {
//   isLoggedIn: true,
//   username: "Guest", 
// }

export default UserGreeting;