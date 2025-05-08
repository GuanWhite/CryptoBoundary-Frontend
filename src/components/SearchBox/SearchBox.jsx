import React from 'react';

export default function SearchBox() {
  return (
    <div className="relative w-full bg-gray-200 rounded-xl shadow-lg">
      <input
        placeholder="Search..."
        className="bg-gray-200 px-5 py-3 rounded-xl w-[270px] outline-none"
        // name="search"
        type="search"
      />
      <svg
        className="size-6 absolute top-3 right-3 text-gray-600"
        stroke="currentColor"
        strokeWidth="1.5"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          strokeLinejoin="round"
          strokeLinecap="round"
        ></path>
      </svg>
    </div>
  );
}
