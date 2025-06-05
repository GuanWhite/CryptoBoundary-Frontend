// import React, { useState, useRef } from "react";
// import { Upload, Button, message } from "antd";
// import { AudioOutlined, PaperClipOutlined, SettingOutlined, UploadOutlined } from "@ant-design/icons";

// export default function StartArea() {
//   const [listening, setListening] = useState(false);
//   const [transcript, setTranscript] = useState("");
//   const recognitionRef = useRef(null);

//   // 语音识别初始化
//   const initSpeechRecognition = () => {
//     const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
//     if (!SpeechRecognition) {
//       message.error("当前浏览器不支持语音识别");
//       return null;
//     }

//     const recognition = new SpeechRecognition();
//     recognition.lang = "zh-CN";
//     recognition.interimResults = false;
//     recognition.maxAlternatives = 1;

//     recognition.onstart = () => {
//       setListening(true);
//       message.info("正在聆听...");
//     };

//     recognition.onresult = (event) => {
//       const result = event.results[0][0].transcript;
//       setTranscript(result);
//       message.success("语音识别完成");
//     };

//     recognition.onerror = () => {
//       message.error("语音识别失败");
//       setListening(false);
//     };

//     recognition.onend = () => {
//       setListening(false);
//     };

//     return recognition;
//   };

//   const handleStartVoice = () => {
//     if (!recognitionRef.current) {
//       recognitionRef.current = initSpeechRecognition();
//     }
//     if (recognitionRef.current) {
//       recognitionRef.current.start();
//     }
//   };

//   const handleFileChange = (info) => {
//     if (info.file.status === "done") {
//       message.success(`${info.file.name} 上传成功`);
//     } else if (info.file.status === "error") {
//       message.error(`${info.file.name} 上传失败`);
//     }
//   };

//   return (
//     <div className="mx-auto px-4 md:px-6 lg:px-16 max-w-4xl">
//       <div className="flex gap-4 md:gap-5 lg:gap-6">
//         <div className="flex justify-center empty:hidden"></div>

//         <div className="relative z-10 flex flex-1 flex-col">
//           <form className="w-full">
//             <div className="flex flex-col items-center justify-center overflow-hidden rounded-[28px] bg-white shadow-sm">
//               {/* 编辑区域 */}
//               <div className="relative flex w-full items-end px-3 py-2.5">
//                 <div className="flex-auto">
//                   <div className="relative mx-2.5 grid grid-cols-[auto_minmax(0,1fr)]">
//                     <div className="flex justify-center">
//                       <div style={{ opacity: 1 }}></div>
//                     </div>
//                     <div className="relative flex-auto bg-transparent pt-1.5" style={{ marginBottom: "-18px", transform: "translateY(-7px)" }}>
//                       <div className="flex flex-col justify-start min-h-0">
//                         <div className="min-h-12 flex items-start">
//                           <div className="w-full">
//                             <div className="text-black max-h-52 overflow-auto px-3 -mx-3 pe-3 min-h-12">
//                               <div
//                                 contentEditable
//                                 className="w-full resize-none border-0 bg-transparent py-2 focus:outline-none"
//                                 placeholder="输入内容"
//                                 suppressContentEditableWarning
//                               >
//                                 <p>{transcript || <br />}</p>
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* 操作栏 */}
//               <div className="relative w-full px-3 pb-2.5 flex items-center justify-between">
//                 <div className="flex gap-2">
//                   {/* 文件上传 */}
//                   <Upload
//                     name="file"
//                     showUploadList={false}
//                     action="/api/upload"
//                     onChange={handleFileChange}
//                   >
//                     <Button icon={<PaperClipOutlined />} />
//                   </Upload>

//                   {/* 工具按钮 */}
//                   <Button icon={<SettingOutlined />} />
//                 </div>

//                 {/* 语音按钮 */}
//                 <Button
//                   type="primary"
//                   shape="circle"
//                   icon={<AudioOutlined />}
//                   loading={listening}
//                   onClick={handleStartVoice}
//                 />
//               </div>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }
import React from "react";
// import { Paperclip, Mic, Settings2, UploadCloud } from "lucide-react";

export default function StartArea() {
  return (
    <div className="mx-auto px-4 md:px-6 lg:px-16 max-w-4xl">
      <div className="flex gap-4 md:gap-5 lg:gap-6">
        {/* 可扩展：头像或左侧按钮区域 */}
        <div className="flex justify-center empty:hidden"></div>

        <div className="relative z-10 flex flex-1 flex-col">
          <form className="w-full">
            <div className="flex flex-col items-center justify-center overflow-hidden rounded-[28px] bg-white shadow-sm dark:bg-[#303030]">
              {/* 编辑区域 */}
              <div className="relative flex w-full items-end px-3 py-2.5">
                <div className="flex-auto">
                  <div className="relative mx-2.5 grid grid-cols-[auto_minmax(0,1fr)]">
                    <div className="flex justify-center">
                      {/* 可插入头像或图标 */}
                      <div style={{ opacity: 1 }}></div>
                    </div>
                    <div
                      className="relative flex-auto bg-transparent pt-1.5"
                      style={{ marginBottom: "-18px", transform: "translateY(-7px)" }}
                    >
                      <div className="flex flex-col justify-start min-h-0">
                        <div className="min-h-12 flex items-start">
                          <div className="w-full">
                            <div className="text-black dark:text-white max-h-52 overflow-auto px-3 -mx-3 pe-3 min-h-12">
                              <div
                                contentEditable
                                className="w-full resize-none border-0 bg-transparent py-2 focus:outline-none"
                                placeholder="询问任何问题"
                                suppressContentEditableWarning
                              >
                                <p><br /></p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 底部按钮栏 */}
              <div className="relative w-full px-3 pb-2.5 flex items-center justify-between">
                <div className="flex gap-2">
                  {/* 上传按钮 */}
                  <button type="button" aria-label="添加文件" className="p-2 text-gray-500 hover:text-black dark:hover:text-white">
                    {/* <UploadCloud size={20} /> */}
                  </button>

                  {/* 工具按钮 */}
                  <button type="button" aria-label="工具" className="p-2 text-gray-500 hover:text-black dark:hover:text-white">
                    {/* <Settings2 size={20} /> */}
                  </button>
                </div>

                {/* 右侧语音按钮 */}
                <div className="flex items-center gap-1.5">
                  <button type="button" aria-label="语音" className="p-2 rounded-full bg-black text-white hover:opacity-70 dark:bg-white dark:text-black">
                    {/* <Mic size={18} /> */}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
