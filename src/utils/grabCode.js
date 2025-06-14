Gitee - 基于 Git 的代码托管和研发协作平台Gitee - 基于 Git 的代码托管和研发协作平台  
 
 
接口下线通知："Star 一个仓库" 接口将于6月14日0点正式下线
开源项目 > 前沿技术 > Web 3.0
  
 iconLake/IconLake
文件
blockchain
center
desktop
docker
documents/resources
extension
mcp
service
www
.vscode
public
src
apis
components
hooks
router.ts
i18n
router
styles
utils
views
analyse
home
Index.vue
icons
project
theme
user
App.vue
main.ts
.eslintrc
.gitignore
README.md
env.d.ts
index.html
package.json
pnpm-lock.yaml
tsconfig.config.json
tsconfig.json
vite.config.ts
LICENSE
README.en.md
README.md
IconLake/ www / src / views / home / Index.vue 
IconLake
/
www
/
src
/
views
/
home
/
Index.vue
Index.vue
3.84 KB
幻想 提交于 17天前 . feat: build theme
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
29
30
31
32
33
34
35
36
37
38
39
40
41
42
43
44
45
46
47
48
49
50
51
52
53
54
55
56
57
58
59
60
61
62
63
64
65
66
67
68
69
70
71
72
73
74
75
76
77
78
79
80
81
82
83
84
85
86
87
88
89
90
91
92
93
94
95
96
97
98
99
100
101
102
103
104
105
106
107
108
109
110
111
112
113
114
115
116
117
118
119
120
121
122
123
124
125
126
127
128
129
130
131
132
133
134
135
136
137
138
139
140
141
142
143
144
145
146
147
148
149
150
151
152
153
154
155
156
157
158
159
160
161
162
163
164
165
166
167
168
169
170
171
172
173
174
175
176
177
178
179
180
181
182
183
184
185
186
187
<script setup lang="ts">
import { onMounted, reactive } from 'vue'
import { useI18n } from 'vue-i18n'
import { projectApis, type Project } from '../../apis/project'
import IconVue from '../../components/Icon.vue'
import UserVue from '../../components/User.vue'
import { usePageLoading } from '@/hooks/router'

const { t } = useI18n()
const pageLoading = usePageLoading()

const data = reactive({
  projects: [] as Project[],
  isLoading: true
})

onMounted(() => {
  projectApis.list().onUpdate(async function (res) {
    data.projects = res.list
  }).finally(() => {
    data.isLoading = false
    pageLoading.end()
  })
})
</script>

<template>
  <UserVue />
  <div
    v-if="!data.isLoading && data.projects.length === 0"
    class="empty flex center column"
  >
    <div class="title">
      {{ t('welcomeAndGuide') }}
    </div>
    <div>
      <router-link
        to="/project/create"
        class="btn"
      >
        <span class="btn-text">{{ t('newProject') }}</span>
        <span class="btn-icon iconfont icon-plus" />
      </router-link>
    </div>
    <img :src="'/imgs/project-empty.png'">
  </div>
  <div
    v-if="!data.isLoading && data.projects.length > 0"
    class="container flex stretch"
  >
    <a
      href="/"
      class="banner flex center"
    >
      <img
        class="bg-c-t"
        :src="'/imgs/project-bg-circle-t.png'"
      >
      <img
        class="bg-c-b"
        :src="'/imgs/project-bg-circle-b.png'"
      >
      <div class="title">iconLake</div>
      <div class="slogan">You Create, You Own!</div>
    </a>
    <div class="flex column start grow">
      <div class="operate">
        <router-link
          to="/project/create"
          class="btn"
        >
          <span class="btn-text">{{ t('newProject') }}</span>
          <span class="btn-icon iconfont icon-plus" />
        </router-link>
      </div>
      <div class="list flex wrap start">
        <router-link
          v-for="item in data.projects"
          :key="item._id"
          class="item"
          :to="`/icons/${item._id}`"
        >
          <div class="item-title">
            {{ item.name }}
          </div>
          <div class="icons flex wrap center">
            <div
              v-for="icon in item.icons"
              :key="icon._id"
              class="icon-item flex center"
            >
              <IconVue
                :info="icon"
                :compress="{ maxWidth: 60, maxHeight: 60 }"
                :lazy="true"
              />
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.empty {
  min-height: 90vh;
  padding: 10rem 0;
  box-sizing: border-box;
  .title {
    font-size: 1.373rem;
    padding: 0 0 2.25rem;
  }
  img {
    height: 34.5rem;
    margin-top: 3rem;
  }
}
.container {
  padding: 1.875rem;
}
.banner {
  position: relative;
  width: 13.813rem;
  min-height: calc(100vh - 3.75rem);
  min-width: 13.813rem;
  background-color: #5f55cb;
	border-radius: 0.625rem;
  overflow: hidden;
  .bg-c {
    &-t,
    &-b {
      position: absolute;
      left: 0;
      right: 0;
    }
    &-t {
      top: 0;
    }
    &-b {
      bottom: 0;
    }
  }
  .title {
    transform: rotate(90deg);
    color: #5349bb;
    font-size: 6.921rem;
    position: relative;
    left: -4rem;
  }
  .slogan {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 2rem;
    color: #fff;
    font-size: 1.2rem;
    text-align: center;
  }
}
.operate {
  margin-left: 3.125rem;
}
.item {
  margin: 3.125rem 0 0 3.125rem;
  padding: 1.875rem;
  width: 21.938rem;
	height: 19.125rem;
	background-color: #ffffff;
	border-radius: 0.625rem;
  box-sizing: border-box;
  &-title {
    font-size: 1.2rem;
	  font-weight: bold;
    margin-bottom: 1.875rem;
  }
}
.icon-item {
  width: 20%;
  padding: 1rem 0;
  text-align: center;
  svg {
    width: 1.8rem;
    height: 1.8rem;
  }
}
</style>
Gitee - 基于 Git 的代码托管和研发协作平台
北京奥思研工智能科技有限公司版权所有
Git 大全
Git 命令学习
CopyCat 代码克隆检测
APP与插件下载
 
Gitee 封面人物
GVP 项目
Gitee 博客
Gitee 公益计划
Gitee 持续集成
 
OpenAPI
MCP Server
帮助文档
在线自助服务
更新日志
 
关于我们
加入我们
使用条款
意见建议
合作伙伴
 
技术交流QQ群
技术交流QQ群

 
微信服务号
微信服务号

 client@oschina.cn
 企业版在线使用：400-606-0201
专业版私有部署：
13670252304
13352947997
开放原子开源基金会
开放原子开源基金会
合作代码托管平台
违法和不良信息举报中心
违法和不良信息举报中心
京ICP备2025119063号
 简 体 / 繁 體 / English
 Gitee - 基于 Git 的代码托管和研发协作平台Gitee - 基于 Git 的代码托管和研发协作平台  
 
 
 接口下线通知："Star 一个仓库" 接口将于6月14日0点正式下线
 开源项目 > 前沿技术 > Web 3.0
   
  iconLake/IconLake
 文件
 blockchain
 center
 desktop
 docker
 documents/resources
 extension
 mcp
 service
 www
 .vscode
 public
 src
 apis
 components
 hooks
 router.ts
 i18n
 router
 styles
 utils
 views
 analyse
 home
 Index.vue
 icons
 project
 theme
 user
 App.vue
 main.ts
 .eslintrc
 .gitignore
 README.md
 env.d.ts
 index.html
 package.json
 pnpm-lock.yaml
 tsconfig.config.json
 tsconfig.json
 vite.config.ts
 LICENSE
 README.en.md
 README.md
 IconLake/ www / src / views / home / Index.vue 
 IconLake
 /
 www
 /
 src
 /
 views
 /
 home
 /
 Index.vue
 Index.vue
 3.84 KB
 幻想 提交于 17天前 . feat: build theme
 1
 2
 3
 4
 5
 6
 7
 8
 9
 10
 11
 12
 13
 14
 15
 16
 17
 18
 19
 20
 21
 22
 23
 24
 25
 26
 27
 28
 29
 30
 31
 32
 33
 34
 35
 36
 37
 38
 39
 40
 41
 42
 43
 44
 45
 46
 47
 48
 49
 50
 51
 52
 53
 54
 55
 56
 57
 58
 59
 60
 61
 62
 63
 64
 65
 66
 67
 68
 69
 70
 71
 72
 73
 74
 75
 76
 77
 78
 79
 80
 81
 82
 83
 84
 85
 86
 87
 88
 89
 90
 91
 92
 93
 94
 95
 96
 97
 98
 99
 100
 101
 102
 103
 104
 105
 106
 107
 108
 109
 110
 111
 112
 113
 114
 115
 116
 117
 118
 119
 120
 121
 122
 123
 124
 125
 126
 127
 128
 129
 130
 131
 132
 133
 134
 135
 136
 137
 138
 139
 140
 141
 142
 143
 144
 145
 146
 147
 148
 149
 150
 151
 152
 153
 154
 155
 156
 157
 158
 159
 160
 161
 162
 163
 164
 165
 166
 167
 168
 169
 170
 171
 172
 173
 174
 175
 176
 177
 178
 179
 180
 181
 182
 183
 184
 185
 186
 187
 <script setup lang="ts">
 import { onMounted, reactive } from 'vue'
 import { useI18n } from 'vue-i18n'
 import { projectApis, type Project } from '../../apis/project'
 import IconVue from '../../components/Icon.vue'
 import UserVue from '../../components/User.vue'
 import { usePageLoading } from '@/hooks/router'
 
 const { t } = useI18n()
 const pageLoading = usePageLoading()
 
 const data = reactive({
   projects: [] as Project[],
   isLoading: true
 })
 
 onMounted(() => {
   projectApis.list().onUpdate(async function (res) {
     data.projects = res.list
   }).finally(() => {
     data.isLoading = false
     pageLoading.end()
   })
 })
 </script>
 
 <template>
   <UserVue />
   <div
     v-if="!data.isLoading && data.projects.length === 0"
     class="empty flex center column"
   >
     <div class="title">
       {{ t('welcomeAndGuide') }}
     </div>
     <div>
       <router-link
         to="/project/create"
         class="btn"
       >
         <span class="btn-text">{{ t('newProject') }}</span>
         <span class="btn-icon iconfont icon-plus" />
       </router-link>
     </div>
     <img :src="'/imgs/project-empty.png'">
   </div>
   <div
     v-if="!data.isLoading && data.projects.length > 0"
     class="container flex stretch"
   >
     <a
       href="/"
       class="banner flex center"
     >
       <img
         class="bg-c-t"
         :src="'/imgs/project-bg-circle-t.png'"
       >
       <img
         class="bg-c-b"
         :src="'/imgs/project-bg-circle-b.png'"
       >
       <div class="title">iconLake</div>
       <div class="slogan">You Create, You Own!</div>
     </a>
     <div class="flex column start grow">
       <div class="operate">
         <router-link
           to="/project/create"
           class="btn"
         >
           <span class="btn-text">{{ t('newProject') }}</span>
           <span class="btn-icon iconfont icon-plus" />
         </router-link>
       </div>
       <div class="list flex wrap start">
         <router-link
           v-for="item in data.projects"
           :key="item._id"
           class="item"
           :to="`/icons/${item._id}`"
         >
           <div class="item-title">
             {{ item.name }}
           </div>
           <div class="icons flex wrap center">
             <div
               v-for="icon in item.icons"
               :key="icon._id"
               class="icon-item flex center"
             >
               <IconVue
                 :info="icon"
                 :compress="{ maxWidth: 60, maxHeight: 60 }"
                 :lazy="true"
               />
             </div>
           </div>
         </router-link>
       </div>
     </div>
   </div>
 </template>
 
 <style lang="scss" scoped>
 .empty {
   min-height: 90vh;
   padding: 10rem 0;
   box-sizing: border-box;
   .title {
     font-size: 1.373rem;
     padding: 0 0 2.25rem;
   }
   img {
     height: 34.5rem;
     margin-top: 3rem;
   }
 }
 .container {
   padding: 1.875rem;
 }
 .banner {
   position: relative;
   width: 13.813rem;
   min-height: calc(100vh - 3.75rem);
   min-width: 13.813rem;
   background-color: #5f55cb;
   border-radius: 0.625rem;
   overflow: hidden;
   .bg-c {
     &-t,
     &-b {
       position: absolute;
       left: 0;
       right: 0;
     }
     &-t {
       top: 0;
     }
     &-b {
       bottom: 0;
     }
   }
   .title {
     transform: rotate(90deg);
     color: #5349bb;
     font-size: 6.921rem;
     position: relative;
     left: -4rem;
   }
   .slogan {
     position: absolute;
     left: 0;
     right: 0;
     bottom: 2rem;
     color: #fff;
     font-size: 1.2rem;
     text-align: center;
   }
 }
 .operate {
   margin-left: 3.125rem;
 }
 .item {
   margin: 3.125rem 0 0 3.125rem;
   padding: 1.875rem;
   width: 21.938rem;
   height: 19.125rem;
   background-color: #ffffff;
   border-radius: 0.625rem;
   box-sizing: border-box;
   &-title {
     font-size: 1.2rem;
     font-weight: bold;
     margin-bottom: 1.875rem;
   }
 }
 .icon-item {
   width: 20%;
   padding: 1rem 0;
   text-align: center;
   svg {
     width: 1.8rem;
     height: 1.8rem;
   }
 }
 </style>
 Gitee - 基于 Git 的代码托管和研发协作平台
 北京奥思研工智能科技有限公司版权所有
 Git 大全
 Git 命令学习
 CopyCat 代码克隆检测
 APP与插件下载
  
 Gitee 封面人物
 GVP 项目
 Gitee 博客
 Gitee 公益计划
 Gitee 持续集成
  
 OpenAPI
 MCP Server
 帮助文档
 在线自助服务
 更新日志
  
 关于我们
 加入我们
 使用条款
 意见建议
 合作伙伴
  
 技术交流QQ群
 技术交流QQ群
 
  
 微信服务号
 微信服务号
 
  client@oschina.cn
  企业版在线使用：400-606-0201
 专业版私有部署：
 13670252304
 13352947997
 开放原子开源基金会
 开放原子开源基金会
 合作代码托管平台
 违法和不良信息举报中心
 违法和不良信息举报中心
 京ICP备2025119063号
  简 体 / 繁 體 / English
  Gitee - 基于 Git 的代码托管和研发协作平台Gitee - 基于 Git 的代码托管和研发协作平台  
 
 
 接口下线通知："Star 一个仓库" 接口将于6月14日0点正式下线
 开源项目 > 前沿技术 > Web 3.0
   
  iconLake/IconLake
 文件
 blockchain
 center
 desktop
 docker
 documents/resources
 extension
 mcp
 service
 www
 .vscode
 public
 src
 apis
 components
 hooks
 router.ts
 i18n
 router
 styles
 utils
 views
 analyse
 home
 Index.vue
 icons
 project
 theme
 user
 App.vue
 main.ts
 .eslintrc
 .gitignore
 README.md
 env.d.ts
 index.html
 package.json
 pnpm-lock.yaml
 tsconfig.config.json
 tsconfig.json
 vite.config.ts
 LICENSE
 README.en.md
 README.md
 IconLake/ www / src / views / home / Index.vue 
 IconLake
 /
 www
 /
 src
 /
 views
 /
 home
 /
 Index.vue
 Index.vue
 3.84 KB
 幻想 提交于 17天前 . feat: build theme
 1
 2
 3
 4
 5
 6
 7
 8
 9
 10
 11
 12
 13
 14
 15
 16
 17
 18
 19
 20
 21
 22
 23
 24
 25
 26
 27
 28
 29
 30
 31
 32
 33
 34
 35
 36
 37
 38
 39
 40
 41
 42
 43
 44
 45
 46
 47
 48
 49
 50
 51
 52
 53
 54
 55
 56
 57
 58
 59
 60
 61
 62
 63
 64
 65
 66
 67
 68
 69
 70
 71
 72
 73
 74
 75
 76
 77
 78
 79
 80
 81
 82
 83
 84
 85
 86
 87
 88
 89
 90
 91
 92
 93
 94
 95
 96
 97
 98
 99
 100
 101
 102
 103
 104
 105
 106
 107
 108
 109
 110
 111
 112
 113
 114
 115
 116
 117
 118
 119
 120
 121
 122
 123
 124
 125
 126
 127
 128
 129
 130
 131
 132
 133
 134
 135
 136
 137
 138
 139
 140
 141
 142
 143
 144
 145
 146
 147
 148
 149
 150
 151
 152
 153
 154
 155
 156
 157
 158
 159
 160
 161
 162
 163
 164
 165
 166
 167
 168
 169
 170
 171
 172
 173
 174
 175
 176
 177
 178
 179
 180
 181
 182
 183
 184
 185
 186
 187
 <script setup lang="ts">
 import { onMounted, reactive } from 'vue'
 import { useI18n } from 'vue-i18n'
 import { projectApis, type Project } from '../../apis/project'
 import IconVue from '../../components/Icon.vue'
 import UserVue from '../../components/User.vue'
 import { usePageLoading } from '@/hooks/router'
 
 const { t } = useI18n()
 const pageLoading = usePageLoading()
 
 const data = reactive({
   projects: [] as Project[],
   isLoading: true
 })
 
 onMounted(() => {
   projectApis.list().onUpdate(async function (res) {
     data.projects = res.list
   }).finally(() => {
     data.isLoading = false
     pageLoading.end()
   })
 })
 </script>
 
 <template>
   <UserVue />
   <div
     v-if="!data.isLoading && data.projects.length === 0"
     class="empty flex center column"
   >
     <div class="title">
       {{ t('welcomeAndGuide') }}
     </div>
     <div>
       <router-link
         to="/project/create"
         class="btn"
       >
         <span class="btn-text">{{ t('newProject') }}</span>
         <span class="btn-icon iconfont icon-plus" />
       </router-link>
     </div>
     <img :src="'/imgs/project-empty.png'">
   </div>
   <div
     v-if="!data.isLoading && data.projects.length > 0"
     class="container flex stretch"
   >
     <a
       href="/"
       class="banner flex center"
     >
       <img
         class="bg-c-t"
         :src="'/imgs/project-bg-circle-t.png'"
       >
       <img
         class="bg-c-b"
         :src="'/imgs/project-bg-circle-b.png'"
       >
       <div class="title">iconLake</div>
       <div class="slogan">You Create, You Own!</div>
     </a>
     <div class="flex column start grow">
       <div class="operate">
         <router-link
           to="/project/create"
           class="btn"
         >
           <span class="btn-text">{{ t('newProject') }}</span>
           <span class="btn-icon iconfont icon-plus" />
         </router-link>
       </div>
       <div class="list flex wrap start">
         <router-link
           v-for="item in data.projects"
           :key="item._id"
           class="item"
           :to="`/icons/${item._id}`"
         >
           <div class="item-title">
             {{ item.name }}
           </div>
           <div class="icons flex wrap center">
             <div
               v-for="icon in item.icons"
               :key="icon._id"
               class="icon-item flex center"
             >
               <IconVue
                 :info="icon"
                 :compress="{ maxWidth: 60, maxHeight: 60 }"
                 :lazy="true"
               />
             </div>
           </div>
         </router-link>
       </div>
     </div>
   </div>
 </template>
 
 <style lang="scss" scoped>
 .empty {
   min-height: 90vh;
   padding: 10rem 0;
   box-sizing: border-box;
   .title {
     font-size: 1.373rem;
     padding: 0 0 2.25rem;
   }
   img {
     height: 34.5rem;
     margin-top: 3rem;
   }
 }
 .container {
   padding: 1.875rem;
 }
 .banner {
   position: relative;
   width: 13.813rem;
   min-height: calc(100vh - 3.75rem);
   min-width: 13.813rem;
   background-color: #5f55cb;
   border-radius: 0.625rem;
   overflow: hidden;
   .bg-c {
     &-t,
     &-b {
       position: absolute;
       left: 0;
       right: 0;
     }
     &-t {
       top: 0;
     }
     &-b {
       bottom: 0;
     }
   }
   .title {
     transform: rotate(90deg);
     color: #5349bb;
     font-size: 6.921rem;
     position: relative;
     left: -4rem;
   }
   .slogan {
     position: absolute;
     left: 0;
     right: 0;
     bottom: 2rem;
     color: #fff;
     font-size: 1.2rem;
     text-align: center;
   }
 }
 .operate {
   margin-left: 3.125rem;
 }
 .item {
   margin: 3.125rem 0 0 3.125rem;
   padding: 1.875rem;
   width: 21.938rem;
   height: 19.125rem;
   background-color: #ffffff;
   border-radius: 0.625rem;
   box-sizing: border-box;
   &-title {
     font-size: 1.2rem;
     font-weight: bold;
     margin-bottom: 1.875rem;
   }
 }
 .icon-item {
   width: 20%;
   padding: 1rem 0;
   text-align: center;
   svg {
     width: 1.8rem;
     height: 1.8rem;
   }
 }
 </style>
 Gitee - 基于 Git 的代码托管和研发协作平台
 北京奥思研工智能科技有限公司版权所有
 Git 大全
 Git 命令学习
 CopyCat 代码克隆检测
 APP与插件下载
  
 Gitee 封面人物
 GVP 项目
 Gitee 博客
 Gitee 公益计划
 Gitee 持续集成
  
 OpenAPI
 MCP Server
 帮助文档
 在线自助服务
 更新日志
  
 关于我们
 加入我们
 使用条款
 意见建议
 合作伙伴
  
 技术交流QQ群
 技术交流QQ群
 
  
 微信服务号
 微信服务号
 
  client@oschina.cn
  企业版在线使用：400-606-0201
 专业版私有部署：
 13670252304
 13352947997
 开放原子开源基金会
 开放原子开源基金会
 合作代码托管平台
 违法和不良信息举报中心
 违法和不良信息举报中心
 京ICP备2025119063号
  简 体 / 繁 體 / English
  Gitee - 基于 Git 的代码托管和研发协作平台Gitee - 基于 Git 的代码托管和研发协作平台  
 
 
 接口下线通知："Star 一个仓库" 接口将于6月14日0点正式下线
 开源项目 > 前沿技术 > Web 3.0
   
  iconLake/IconLake
 文件
 blockchain
 center
 desktop
 docker
 documents/resources
 extension
 mcp
 service
 www
 .vscode
 public
 src
 apis
 components
 hooks
 router.ts
 i18n
 router
 styles
 utils
 views
 analyse
 home
 Index.vue
 icons
 project
 theme
 user
 App.vue
 main.ts
 .eslintrc
 .gitignore
 README.md
 env.d.ts
 index.html
 package.json
 pnpm-lock.yaml
 tsconfig.config.json
 tsconfig.json
 vite.config.ts
 LICENSE
 README.en.md
 README.md
 IconLake/ www / src / views / home / Index.vue 
 IconLake
 /
 www
 /
 src
 /
 views
 /
 home
 /
 Index.vue
 Index.vue
 3.84 KB
 幻想 提交于 17天前 . feat: build theme
 1
 2
 3
 4
 5
 6
 7
 8
 9
 10
 11
 12
 13
 14
 15
 16
 17
 18
 19
 20
 21
 22
 23
 24
 25
 26
 27
 28
 29
 30
 31
 32
 33
 34
 35
 36
 37
 38
 39
 40
 41
 42
 43
 44
 45
 46
 47
 48
 49
 50
 51
 52
 53
 54
 55
 56
 57
 58
 59
 60
 61
 62
 63
 64
 65
 66
 67
 68
 69
 70
 71
 72
 73
 74
 75
 76
 77
 78
 79
 80
 81
 82
 83
 84
 85
 86
 87
 88
 89
 90
 91
 92
 93
 94
 95
 96
 97
 98
 99
 100
 101
 102
 103
 104
 105
 106
 107
 108
 109
 110
 111
 112
 113
 114
 115
 116
 117
 118
 119
 120
 121
 122
 123
 124
 125
 126
 127
 128
 129
 130
 131
 132
 133
 134
 135
 136
 137
 138
 139
 140
 141
 142
 143
 144
 145
 146
 147
 148
 149
 150
 151
 152
 153
 154
 155
 156
 157
 158
 159
 160
 161
 162
 163
 164
 165
 166
 167
 168
 169
 170
 171
 172
 173
 174
 175
 176
 177
 178
 179
 180
 181
 182
 183
 184
 185
 186
 187
 <script setup lang="ts">
 import { onMounted, reactive } from 'vue'
 import { useI18n } from 'vue-i18n'
 import { projectApis, type Project } from '../../apis/project'
 import IconVue from '../../components/Icon.vue'
 import UserVue from '../../components/User.vue'
 import { usePageLoading } from '@/hooks/router'
 
 const { t } = useI18n()
 const pageLoading = usePageLoading()
 
 const data = reactive({
   projects: [] as Project[],
   isLoading: true
 })
 
 onMounted(() => {
   projectApis.list().onUpdate(async function (res) {
     data.projects = res.list
   }).finally(() => {
     data.isLoading = false
     pageLoading.end()
   })
 })
 </script>
 
 <template>
   <UserVue />
   <div
     v-if="!data.isLoading && data.projects.length === 0"
     class="empty flex center column"
   >
     <div class="title">
       {{ t('welcomeAndGuide') }}
     </div>
     <div>
       <router-link
         to="/project/create"
         class="btn"
       >
         <span class="btn-text">{{ t('newProject') }}</span>
         <span class="btn-icon iconfont icon-plus" />
       </router-link>
     </div>
     <img :src="'/imgs/project-empty.png'">
   </div>
   <div
     v-if="!data.isLoading && data.projects.length > 0"
     class="container flex stretch"
   >
     <a
       href="/"
       class="banner flex center"
     >
       <img
         class="bg-c-t"
         :src="'/imgs/project-bg-circle-t.png'"
       >
       <img
         class="bg-c-b"
         :src="'/imgs/project-bg-circle-b.png'"
       >
       <div class="title">iconLake</div>
       <div class="slogan">You Create, You Own!</div>
     </a>
     <div class="flex column start grow">
       <div class="operate">
         <router-link
           to="/project/create"
           class="btn"
         >
           <span class="btn-text">{{ t('newProject') }}</span>
           <span class="btn-icon iconfont icon-plus" />
         </router-link>
       </div>
       <div class="list flex wrap start">
         <router-link
           v-for="item in data.projects"
           :key="item._id"
           class="item"
           :to="`/icons/${item._id}`"
         >
           <div class="item-title">
             {{ item.name }}
           </div>
           <div class="icons flex wrap center">
             <div
               v-for="icon in item.icons"
               :key="icon._id"
               class="icon-item flex center"
             >
               <IconVue
                 :info="icon"
                 :compress="{ maxWidth: 60, maxHeight: 60 }"
                 :lazy="true"
               />
             </div>
           </div>
         </router-link>
       </div>
     </div>
   </div>
 </template>
 
 <style lang="scss" scoped>
 .empty {
   min-height: 90vh;
   padding: 10rem 0;
   box-sizing: border-box;
   .title {
     font-size: 1.373rem;
     padding: 0 0 2.25rem;
   }
   img {
     height: 34.5rem;
     margin-top: 3rem;
   }
 }
 .container {
   padding: 1.875rem;
 }
 .banner {
   position: relative;
   width: 13.813rem;
   min-height: calc(100vh - 3.75rem);
   min-width: 13.813rem;
   background-color: #5f55cb;
   border-radius: 0.625rem;
   overflow: hidden;
   .bg-c {
     &-t,
     &-b {
       position: absolute;
       left: 0;
       right: 0;
     }
     &-t {
       top: 0;
     }
     &-b {
       bottom: 0;
     }
   }
   .title {
     transform: rotate(90deg);
     color: #5349bb;
     font-size: 6.921rem;
     position: relative;
     left: -4rem;
   }
   .slogan {
     position: absolute;
     left: 0;
     right: 0;
     bottom: 2rem;
     color: #fff;
     font-size: 1.2rem;
     text-align: center;
   }
 }
 .operate {
   margin-left: 3.125rem;
 }
 .item {
   margin: 3.125rem 0 0 3.125rem;
   padding: 1.875rem;
   width: 21.938rem;
   height: 19.125rem;
   background-color: #ffffff;
   border-radius: 0.625rem;
   box-sizing: border-box;
   &-title {
     font-size: 1.2rem;
     font-weight: bold;
     margin-bottom: 1.875rem;
   }
 }
 .icon-item {
   width: 20%;
   padding: 1rem 0;
   text-align: center;
   svg {
     width: 1.8rem;
     height: 1.8rem;
   }
 }
 </style>
 Gitee - 基于 Git 的代码托管和研发协作平台
 北京奥思研工智能科技有限公司版权所有
 Git 大全
 Git 命令学习
 CopyCat 代码克隆检测
 APP与插件下载
  
 Gitee 封面人物
 GVP 项目
 Gitee 博客
 Gitee 公益计划
 Gitee 持续集成
  
 OpenAPI
 MCP Server
 帮助文档
 在线自助服务
 更新日志
  
 关于我们
 加入我们
 使用条款
 意见建议
 合作伙伴
  
 技术交流QQ群
 技术交流QQ群
 
  
 微信服务号
 微信服务号
 
  client@oschina.cn
  企业版在线使用：400-606-0201
 专业版私有部署：
 13670252304
 13352947997
 开放原子开源基金会
 开放原子开源基金会
 合作代码托管平台
 违法和不良信息举报中心
 违法和不良信息举报中心
 京ICP备2025119063号
  简 体 / 繁 體 / English
  Gitee - 基于 Git 的代码托管和研发协作平台Gitee - 基于 Git 的代码托管和研发协作平台  
 
 
 接口下线通知："Star 一个仓库" 接口将于6月14日0点正式下线
 开源项目 > 前沿技术 > Web 3.0
   
  iconLake/IconLake
 文件
 blockchain
 center
 desktop
 docker
 documents/resources
 extension
 mcp
 service
 www
 .vscode
 public
 src
 apis
 components
 hooks
 router.ts
 i18n
 messages
 index.ts
 router
 styles
 utils
 views
 analyse
 home
 Index.vue
 icons
 project
 theme
 user
 App.vue
 main.ts
 .eslintrc
 .gitignore
 README.md
 env.d.ts
 index.html
 package.json
 pnpm-lock.yaml
 tsconfig.config.json
 tsconfig.json
 vite.config.ts
 LICENSE
 README.en.md
 README.md
 IconLake/ www / src / views / home / Index.vue 
 IconLake
 /
 www
 /
 src
 /
 views
 /
 home
 /
 Index.vue
 Index.vue
 3.84 KB
 幻想 提交于 17天前 . feat: build theme
 1
 2
 3
 4
 5
 6
 7
 8
 9
 10
 11
 12
 13
 14
 15
 16
 17
 18
 19
 20
 21
 22
 23
 24
 25
 26
 27
 28
 29
 30
 31
 32
 33
 34
 35
 36
 37
 38
 39
 40
 41
 42
 43
 44
 45
 46
 47
 48
 49
 50
 51
 52
 53
 54
 55
 56
 57
 58
 59
 60
 61
 62
 63
 64
 65
 66
 67
 68
 69
 70
 71
 72
 73
 74
 75
 76
 77
 78
 79
 80
 81
 82
 83
 84
 85
 86
 87
 88
 89
 90
 91
 92
 93
 94
 95
 96
 97
 98
 99
 100
 101
 102
 103
 104
 105
 106
 107
 108
 109
 110
 111
 112
 113
 114
 115
 116
 117
 118
 119
 120
 121
 122
 123
 124
 125
 126
 127
 128
 129
 130
 131
 132
 133
 134
 135
 136
 137
 138
 139
 140
 141
 142
 143
 144
 145
 146
 147
 148
 149
 150
 151
 152
 153
 154
 155
 156
 157
 158
 159
 160
 161
 162
 163
 164
 165
 166
 167
 168
 169
 170
 171
 172
 173
 174
 175
 176
 177
 178
 179
 180
 181
 182
 183
 184
 185
 186
 187
 <script setup lang="ts">
 import { onMounted, reactive } from 'vue'
 import { useI18n } from 'vue-i18n'
 import { projectApis, type Project } from '../../apis/project'
 import IconVue from '../../components/Icon.vue'
 import UserVue from '../../components/User.vue'
 import { usePageLoading } from '@/hooks/router'
 
 const { t } = useI18n()
 const pageLoading = usePageLoading()
 
 const data = reactive({
   projects: [] as Project[],
   isLoading: true
 })
 
 onMounted(() => {
   projectApis.list().onUpdate(async function (res) {
     data.projects = res.list
   }).finally(() => {
     data.isLoading = false
     pageLoading.end()
   })
 })
 </script>
 
 <template>
   <UserVue />
   <div
     v-if="!data.isLoading && data.projects.length === 0"
     class="empty flex center column"
   >
     <div class="title">
       {{ t('welcomeAndGuide') }}
     </div>
     <div>
       <router-link
         to="/project/create"
         class="btn"
       >
         <span class="btn-text">{{ t('newProject') }}</span>
         <span class="btn-icon iconfont icon-plus" />
       </router-link>
     </div>
     <img :src="'/imgs/project-empty.png'">
   </div>
   <div
     v-if="!data.isLoading && data.projects.length > 0"
     class="container flex stretch"
   >
     <a
       href="/"
       class="banner flex center"
     >
       <img
         class="bg-c-t"
         :src="'/imgs/project-bg-circle-t.png'"
       >
       <img
         class="bg-c-b"
         :src="'/imgs/project-bg-circle-b.png'"
       >
       <div class="title">iconLake</div>
       <div class="slogan">You Create, You Own!</div>
     </a>
     <div class="flex column start grow">
       <div class="operate">
         <router-link
           to="/project/create"
           class="btn"
         >
           <span class="btn-text">{{ t('newProject') }}</span>
           <span class="btn-icon iconfont icon-plus" />
         </router-link>
       </div>
       <div class="list flex wrap start">
         <router-link
           v-for="item in data.projects"
           :key="item._id"
           class="item"
           :to="`/icons/${item._id}`"
         >
           <div class="item-title">
             {{ item.name }}
           </div>
           <div class="icons flex wrap center">
             <div
               v-for="icon in item.icons"
               :key="icon._id"
               class="icon-item flex center"
             >
               <IconVue
                 :info="icon"
                 :compress="{ maxWidth: 60, maxHeight: 60 }"
                 :lazy="true"
               />
             </div>
           </div>
         </router-link>
       </div>
     </div>
   </div>
 </template>
 
 <style lang="scss" scoped>
 .empty {
   min-height: 90vh;
   padding: 10rem 0;
   box-sizing: border-box;
   .title {
     font-size: 1.373rem;
     padding: 0 0 2.25rem;
   }
   img {
     height: 34.5rem;
     margin-top: 3rem;
   }
 }
 .container {
   padding: 1.875rem;
 }
 .banner {
   position: relative;
   width: 13.813rem;
   min-height: calc(100vh - 3.75rem);
   min-width: 13.813rem;
   background-color: #5f55cb;
   border-radius: 0.625rem;
   overflow: hidden;
   .bg-c {
     &-t,
     &-b {
       position: absolute;
       left: 0;
       right: 0;
     }
     &-t {
       top: 0;
     }
     &-b {
       bottom: 0;
     }
   }
   .title {
     transform: rotate(90deg);
     color: #5349bb;
     font-size: 6.921rem;
     position: relative;
     left: -4rem;
   }
   .slogan {
     position: absolute;
     left: 0;
     right: 0;
     bottom: 2rem;
     color: #fff;
     font-size: 1.2rem;
     text-align: center;
   }
 }
 .operate {
   margin-left: 3.125rem;
 }
 .item {
   margin: 3.125rem 0 0 3.125rem;
   padding: 1.875rem;
   width: 21.938rem;
   height: 19.125rem;
   background-color: #ffffff;
   border-radius: 0.625rem;
   box-sizing: border-box;
   &-title {
     font-size: 1.2rem;
     font-weight: bold;
     margin-bottom: 1.875rem;
   }
 }
 .icon-item {
   width: 20%;
   padding: 1rem 0;
   text-align: center;
   svg {
     width: 1.8rem;
     height: 1.8rem;
   }
 }
 </style>
 Gitee - 基于 Git 的代码托管和研发协作平台
 北京奥思研工智能科技有限公司版权所有
 Git 大全
 Git 命令学习
 CopyCat 代码克隆检测
 APP与插件下载
  
 Gitee 封面人物
 GVP 项目
 Gitee 博客
 Gitee 公益计划
 Gitee 持续集成
  
 OpenAPI
 MCP Server
 帮助文档
 在线自助服务
 更新日志
  
 关于我们
 加入我们
 使用条款
 意见建议
 合作伙伴
  
 技术交流QQ群
 技术交流QQ群
 
  
 微信服务号
 微信服务号
 
  client@oschina.cn
  企业版在线使用：400-606-0201
 专业版私有部署：
 13670252304
 13352947997
 开放原子开源基金会
 开放原子开源基金会
 合作代码托管平台
 违法和不良信息举报中心
 违法和不良信息举报中心
 京ICP备2025119063号
  简 体 / 繁 體 / English
  Gitee - 基于 Git 的代码托管和研发协作平台Gitee - 基于 Git 的代码托管和研发协作平台  
 
 
 接口下线通知："Star 一个仓库" 接口将于6月14日0点正式下线
 开源项目 > 前沿技术 > Web 3.0
   
  iconLake/IconLake
 文件
 blockchain
 center
 desktop
 docker
 documents/resources
 extension
 mcp
 service
 www
 .vscode
 public
 src
 apis
 components
 Header.vue
 Icon.vue
 Loading.vue
 Select.vue
 User.vue
 hooks
 router.ts
 i18n
 messages
 index.ts
 router
 styles
 utils
 views
 analyse
 home
 Index.vue
 icons
 project
 theme
 user
 App.vue
 main.ts
 .eslintrc
 .gitignore
 README.md
 env.d.ts
 index.html
 package.json
 pnpm-lock.yaml
 tsconfig.config.json
 tsconfig.json
 vite.config.ts
 LICENSE
 README.en.md
 README.md
 IconLake/ www / src / components / Header.vue 
 IconLake
 /
 www
 /
 src
 /
 components
 /
 Header.vue
 Header.vue
 1.32 KB
 幻想 提交于 2年前 . ui of init DROP
 1
 2
 3
 4
 5
 6
 7
 8
 9
 10
 11
 12
 13
 14
 15
 16
 17
 18
 19
 20
 21
 22
 23
 24
 25
 26
 27
 28
 29
 30
 31
 32
 33
 34
 35
 36
 37
 38
 39
 40
 41
 42
 43
 44
 45
 46
 47
 48
 49
 50
 51
 52
 53
 54
 55
 56
 57
 58
 59
 60
 61
 62
 63
 64
 65
 66
 67
 68
 69
 <script lang="ts" setup>
 import { computed } from 'vue'
 import { useRoute } from 'vue-router'
 import { useI18n } from 'vue-i18n'
 const { t } = useI18n()
 
 const $props = defineProps<{
   back?: string | boolean
   white?: boolean
 }>()
 
 const $route = useRoute()
 
 const backUrl = computed(() => {
   const referer = $route.meta.referer as string || '/'
   return typeof $props.back === 'boolean' && $props.back ? referer : $props.back as string
 })
 </script>
 
 <template>
   <div :class="`header flex ${white ? 'white' : ''}`">
     <router-link
       v-if="back"
       :to="backUrl"
       class="iconfont icon-back back flex center"
       :title="t('back')"
     />
     <a
       href="/"
       class="logo"
       title="iconLake - You Create, You Own!"
     >
       <img
         :src="`/imgs/logo${white ? '-white' : ''}.svg`"
         alt="logo"
       >
     </a>
     <slot />
   </div>
 </template>
 
 <style lang="scss" scoped>
 .header {
   height: 6rem;
   justify-content: flex-start;
   position: relative;
   z-index: 99;
   &.white {
     color: #fff;
   }
   .back {
     height: 6rem;
     width: 6rem;
     transition: var(--transition);
     border-bottom-right-radius: 1rem;
     &:hover {
       color: var(--color-main);
       background: #fff;
     }
   }
   .logo {
     align-self: flex-start;
     img {
       width: 5rem;
       height: 5rem;
     }
   }
 }
 </style>
 Gitee - 基于 Git 的代码托管和研发协作平台
 北京奥思研工智能科技有限公司版权所有
 Git 大全
 Git 命令学习
 CopyCat 代码克隆检测
 APP与插件下载
  
 Gitee 封面人物
 GVP 项目
 Gitee 博客
 Gitee 公益计划
 Gitee 持续集成
  
 OpenAPI
 MCP Server
 帮助文档
 在线自助服务
 更新日志
  
 关于我们
 加入我们
 使用条款
 意见建议
 合作伙伴
  
 技术交流QQ群
 技术交流QQ群
 
  
 微信服务号
 微信服务号
 
  client@oschina.cn
  企业版在线使用：400-606-0201
 专业版私有部署：
 13670252304
 13352947997
 开放原子开源基金会
 开放原子开源基金会
 合作代码托管平台
 违法和不良信息举报中心
 违法和不良信息举报中心
 京ICP备2025119063号
  简 体 / 繁 體 / English
     