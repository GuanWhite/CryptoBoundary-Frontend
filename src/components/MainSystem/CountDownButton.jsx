import React, { useState, useEffect } from "react";
import { Button } from "antd";

export default function CountDownButton() {
  const duration = 10; // 验证码倒计时的初始值

  const [time, setTime] = useState(duration);
  const [timeId, setTimeId] = useState(null);

  useEffect(() => {
    if (time < 1) {
      clearTimeout(timeId);
      setTime(duration);
    }
  }, [time]);

  const countDown = () => {
    setTime(time => time - 1);
    setTimeId(setTimeout(() => countDown(), 1000));
  };
  return (
    <div>
      <Button onClick={countDown} disabled={time < duration && time > 0}>
        {time === duration || time === 0 ? "获取验证码" : `${time}秒后获取`}
      </Button>
    </div>
  );
}
