Skip to content
Navigation Menu
TonyJiangWJ
AutoScriptBase

Type / to search
Code
Issues
1
Pull requests
Actions
Projects
Wiki
Security
Insights
Files
Go to file
t
code-snippets
core
MainExecutor.js
extends
lib
modules
resources
test
unit
update
utils
vue_configs
定时任务备份与恢复
控件可视化
独立工具
.gitignore
LICENSE
README.md
config.js
config_ex.js
main.js
project.json
sync_libs.sh
sync_libs_to_device.sh
version.json
可视化配置.js
查看日志.js
AutoScriptBase/core
/MainExecutor.js
 

Code

Blame
49 lines (44 loc) · 1.41 KB
function mainLoop () {
  for (let left = 5; left > 0; left--) {
    FloatyInstance.setFloatyInfo({ x: 100, y: config.device_height / 2 }, 'Hello, this will dismiss in ' + left + ' second', { textSize: 20 - left })
    FloatyInstance.setFloatyTextColor(colors.toString(Math.random() * 0xFFFFFF & 0xFFFFFF))
    sleep(1000)
  }
  FloatyInstance.setFloatyInfo({ x: config.device_width / 2, y: config.device_height / 2 }, 'GoodBye')
  FloatyInstance.setFloatyTextColor(colors.toString(Math.random() * 0xFFFFFF & 0xFFFFFF))
  sleep(3000)
}

function testLogs () {
  let length = 1000
  let start = new Date().getTime()
  let thread1 = threads.start(function () {
    let count = 0
    while(count++ < length) {
      logInfo('this is thread 1, count: '+ count)
    }
  })

  let thread2 = threads.start(function () {
    let count = 0
    while(count++ < length) {
      logInfo('this is thread 2, count: '+ count)
    }
  })

  thread1.join()
  thread2.join()
  infoLog(['all threads done! cost: {}ms', new Date().getTime() -  start])

  debugForDev('this is a develop log')
  debugInfo('this is a debug log')
  logInfo('this is a log log')
  infoLog('this is a info log')
  warnInfo('this is a warn log')
  errorInfo('this is a error log')
}
function MainExecutor() {

  this.exec = function () {
    // 执行主要业务逻辑
    // 演示功能，主流程自行封装
    testLogs()
    mainLoop()
  }
}
module.exports = new MainExecutor()
Symbols
Find definitions and references for functions and other symbols in this file by clicking a symbol below or in the code.
Filter symbols
r
func
mainLoop
func
testLogs
func
MainExecutor
func
exec
Footer
© 2025 GitHub, Inc.
Footer navigation
Terms
Privacy
Security
Status
Docs
Contact
Manage cookies
Do not share my personal information
