import './StartButton.less';
import { useNavigate } from "react-router";

const StartButton = ({buttonName='Start', navProps='/'}) => {
  // 使用编程式导航
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(navProps);
  };
  return (
    <button className='start-button' onClick={handleClick}>{buttonName}</button>
  );
};

export default StartButton;