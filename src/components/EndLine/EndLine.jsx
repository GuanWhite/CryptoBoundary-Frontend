import React from 'react';

export default function EndLine() {
  return (
    <div className="flex items-center justify-between mt-[1.5em]">
      <div className="w-2/5 mt-[1.5em] pt-[1.2em] border-t-[0.15em] border-dashed border-[rgba(0,0,0,0.15)]" />
      <div className="text-[rgba(0,0,0,0.15)] font-bold">
        END
      </div>
      <div className="w-2/5 mt-[1.5em] pt-[1.2em] border-t-[0.15em] border-dashed border-[rgba(0,0,0,0.15)]" />
    </div>
    
    // 老版本
    // <div className="w-full mt-[1.5em] pt-[1.2em] border-t-[0.15em] border-dashed border-[rgba(0,0,0,0.15)]" />
  );
}
