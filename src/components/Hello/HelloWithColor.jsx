import React from 'react';
import './HelloWithColor.less';

const HelloWithColor = () => {
  // 启动动画（添加 .fin 类）
  window.onload = () => {
    setTimeout(() => {
      document.getElementById("container").classList.add("fin");
    }, 500);
  };

  return (
    <div id="container">
      <svg
        id="animated-svg"
        width="360"
        viewBox="0 0 1068 352"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id="paint0_linear_1_836" x1="124.798" y1="243.173" x2="-10.7281" y2="338.367" gradientUnits="userSpaceOnUse">
            <stop stop-color="#157B93" />
            <stop offset="1" stop-color="#037A92" />
          </linearGradient>
          <radialGradient id="paint1_angular_1_836" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(166.643 152.333) rotate(97.5204) scale(215.393 194.978)">
            <stop offset="0.0115615" stop-color="#ACD15E" />
            <stop offset="0.735556" stop-color="#29949C" />
            <stop offset="0.881674" stop-color="#23929E" />
            <stop offset="0.955023" stop-color="#1E91A0" />
          </radialGradient>
          <linearGradient id="paint2_linear_1_836" x1="114.226" y1="324.093" x2="339.748" y2="334.682" gradientUnits="userSpaceOnUse">
            <stop stop-color="#D6D90D" />
            <stop offset="0.494792" stop-color="#FAD500" />
            <stop offset="1" stop-color="#FDD35D" />
          </linearGradient>
          <radialGradient id="paint3_angular_1_836" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(362.214 285.393) rotate(125.425) scale(132.225 118.505)">
            <stop offset="0.149479" stop-color="#FF9932" />
            <stop offset="0.735351" stop-color="#FFD570" />
          </radialGradient>
          <linearGradient id="paint4_linear_1_836" x1="513.298" y1="285.392" x2="364.43" y2="310.978" gradientUnits="userSpaceOnUse">
            <stop stop-color="#FF9246" />
            <stop offset="1" stop-color="#FF9F38" />
          </linearGradient>
          <radialGradient id="paint5_angular_1_836" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(574.964 102.003) rotate(108.048) scale(211.844 74.6312)">
            <stop offset="0.0268639" stop-color="#F45343" />
            <stop offset="0.908962" stop-color="#FD9156" />
          </radialGradient>
          <linearGradient id="paint6_linear_1_836" x1="530.476" y1="299.466" x2="709.286" y2="336.519" gradientUnits="userSpaceOnUse">
            <stop stop-color="#F55544" />
            <stop offset="1" stop-color="#EE7271" />
          </linearGradient>
          <radialGradient id="paint7_angular_1_836" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(731.774 141.584) rotate(103.202) scale(171.654 70.328)">
            <stop offset="0.00079382" stop-color="#EF716F" />
            <stop offset="0.0273104" stop-color="#9174B5" />
          </radialGradient>
          <linearGradient id="paint8_linear_1_836" x1="700.577" y1="299.367" x2="848.972" y2="324.765" gradientUnits="userSpaceOnUse">
            <stop stop-color="#9575B3" />
            <stop offset="1" stop-color="#625EAA" />
          </linearGradient>
          <radialGradient id="paint9_angular_1_836" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(917.859 255.087) rotate(90) scale(80.0802 64.9165)">
            <stop offset="0.277174" stop-color="#6C9DE2" />
            <stop offset="0.6442" stop-color="#6163B8" />
          </radialGradient>
          <linearGradient id="paint10_linear_1_836" x1="857.75" y1="223.383" x2="1061.68" y2="191.621" gradientUnits="userSpaceOnUse">
            <stop stop-color="#6C99DF" />
            <stop offset="0.586308" stop-color="#51A5D3" />
            <stop offset="1" stop-color="#7FB6DD" />
          </linearGradient>
        </defs>

        <path className="path path-1" d="M16 318.376C43.3095 302.398 103.302 264.899 124.798 242.734" stroke="url(#paint0_linear_1_836)" />
        <path className="path path-2" d="M161.798 198.755C179.857 179.551 217.455 132.578 225.226 63.3022C231.393 8.32936 175.855 -1.05784 157.833 47.47C143.298 86.6107 136.25 209.897 127.881 268.681" stroke="url(#paint1_angular_1_836)" />
        <path className="path path-3" d="M114.226 334.648C119.365 300.492 133.607 231.739 157.393 203.593C183.532 172.662 234.458 165.092 240.643 216.347C245.048 252.849 220.381 307.382 244.607 325.852C268.833 344.323 329.619 328.491 355.167 311.34" stroke="url(#paint2_linear_1_836)" />
        <path className="path path-4" d="M359.131 307.709C384.238 295.835 419.091 269.755 430.488 229.735C445.188 178.116 388.152 155.667 355.167 193.478C330.059 222.258 325.215 282.148 360.453 308.736" stroke="url(#paint3_angular_1_836)" />
        <path className="path path-5" d="M351.202 299.905C374.548 331.13 453.657 358.572 523.429 285.393" stroke="url(#paint4_linear_1_836)" />
        <path className="path path-6" d="M535.762 272.199C555.437 247.425 597.869 190.136 611.964 139.824C629.583 76.9355 633.107 32.5175 609.321 21.083C582.893 8.3781 550.298 43.7064 535.762 116.27C525.523 167.387 523.429 194.357 523.429 233.058" stroke="url(#paint5_angular_1_836)" />
        <path className="path path-7" d="M523.429 234.818C522.694 267.362 532.238 334.56 588.619 335.968C654.25 337.606 700.353 276.597 720.762 246.252" stroke="url(#paint6_linear_1_836)" />
        <path className="path path-8" d="M722.084 244.053C739.703 216.786 769.796 156.687 782.429 106.401C796.964 48.544 789.217 28.3755 769.214 21.5229C744.107 12.9215 715.917 47.0303 702.262 106.401C689.798 160.595 676.715 232.179 692.572 277.916" stroke="url(#paint7_angular_1_836)" />
        <path className="path path-9" d="M686.845 251.724C689.929 288.665 718.504 334.047 754.238 335.528C801.369 337.481 834.845 301.665 856.429 235.257" stroke="url(#paint8_linear_1_836)" />
        <path className="path path-10" d="M856.869 235.257C845.857 282.314 856.163 337.551 911.486 335.088C966.81 332.625 981.816 277.77 982.403 250.65C984.899 224.703 975.884 175.007 923.379 175.007" stroke="url(#paint9_angular_1_836)" />
        <path className="path path-11" d="M857.75 230.42C863.036 211.949 882.945 175.007 920.298 175.007C966.988 175.007 963.464 197.436 996.94 196.557C1023.72 195.853 1044.81 177.499 1052 168.41" stroke="url(#paint10_linear_1_836)" />
      </svg>
    </div>
  );
};

export default HelloWithColor;