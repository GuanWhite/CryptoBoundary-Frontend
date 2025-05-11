import React from 'react';
import { Bubble } from '@ant-design/x';
import "./MessageBubbleBox.less";

export default function MessageBubbleBox({ contentText, avatarImage, isMe }) {
  const place = isMe ? 'end' : 'start';
  // BUG: tailwind语句非dark修饰时不生效
  // const meStyle = isMe ? 'bg-primaryColor text-darkTextColor' : 'dark:bg-[#71717a] dark:text-darkTextColor';

  return (
    <Bubble
      id="bubbleBox"
      classNames={{
        content: "dark:bg-[#71717a] dark:text-darkTextColor",
      }}
      content={contentText}
      avatar={{ icon: avatarImage, }}
      placement={place}
    />
  );
}
