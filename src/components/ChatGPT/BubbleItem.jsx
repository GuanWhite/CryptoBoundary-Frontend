import React from 'react';

export default function BubbleItem({ role, context }) {
  return (
    <div className={`flex ${role === "user" ? "justify-end" : "justify-start"} w-full`}>
      <div className='py-[10px] px-[20px] text-[16px] min-h-[44px] w-fit max-w-[70%] rounded-3xl bg-[#e9e9e980] dark:bg-[#323232d9] mb-2'>
        {context}
      </div>
    </div>
  );
}
