import React from 'react';

export default function AddFriendButton() {
  const handleClick = () => {
    console.log('Add Friend button clicked');
  };
  return (
    <button
      type="button"
      className="w-full active:translate-y-[2px] flex justify-center gap-2 items-center mx-auto shadow-xl text-lg bg-gray-200 backdrop-blur-md lg:font-semibold isolation-auto border-gray-50 before:absolute before:w-full before:transition-all before:duration-300 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-xl before:bg-primaryColor hover:text-white before:-z-10 before:aspect-square before:hover:scale-150 before:hover:duration-300 relative z-10 px-4 py-2 overflow-hidden border-2 rounded-xl group"
      onClick={handleClick}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="50px"
        height="50px"
        viewBox="0 0 24 24"
        className="stroke-black fill-none group-hover:rotate-90 group-hover:fill-none group-hover:stroke-white duration-300"
      >
        <path d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z" strokeWidth="1.5" ></path>
        <path d="M8 12H16" strokeWidth="1.5"></path>
        <path d="M12 16V8" strokeWidth="1.5"></path>
      </svg>
      Add New Friends
    </button>
  );
}
