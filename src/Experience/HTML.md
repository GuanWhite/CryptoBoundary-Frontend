
# HTML5的新特性

总结：
1. 新增语义化标签：nav、header、footer、aside、section、article
2. 音频、视频标签：audio、video
3. 数据存储：localStorage、sessionStorage
4. canvas（画布）、Geolocation（地理定位）、websocket（通信协议）
5. input标签新增属性：placeholder、autocomplete、autofocus、required
6. history API：go、forward、back、pushstate

移除的元素有：
- 纯表现的元素：basefont，big，center，font, s，strike，tt，u;
- 对可用性产生负面影响的元素：frame，frameset，noframes；

# HTML5的离线储存的用法及原理

离线存储指的是：在用户没有与因特网连接时，可以正常访问站点或应用，在用户与因特网连接时，更新用户机器上的缓存文件。

原理：HTML5的离线存储是基于一个新建的 `.appcache` 文件的缓存机制(不是存储技术)，通过这个文件上的解析清单离线存储资源，这些资源就会像cookie一样被存储了下来。之后当网络在处于离线状态下时，浏览器会通过被离线存储的数据进行页面展示

使用方法：

1. 创建一个和 `html` 同名的 `manifest` 文件，然后在页面头部加入 `manifest` 属性：
    ```html
    <html lang="en" manifest="index.manifest">
    ```
2. 在 `cache.manifest` 文件中编写需要离线存储的资源：
    ```html
    CACHE MANIFEST
    #v0.11
    CACHE:
    js/app.js
    css/style.css
    NETWORK:
    resourse/logo.png
    FALLBACK:
    / /offline.html
    ```
   > - CACHE: 表示需要离线存储的资源列表，由于包含 manifest 文件的页面将被自动离线存储，所以不需要把页面自身也列出来。
   > - NETWORK: 表示在它下面列出来的资源只有在在线的情况下才能访问，他们不会被离线存储，所以在离线情况下无法使用这些资源。不过，如果在 CACHE 和 NETWORK 中有一个相同的资源，那么这个资源还是会被离线存储，也就是说 CACHE 的优先级更高。
   > - FALLBACK: 表示如果访问第一个资源失败，那么就使用第二个资源来替换他，比如上面这个文件表示的就是如果访问根目录下任何一个资源失败了，那么就去访问 offline.html 。
3. 在离线状态时，操作 `window.applicationCache` 进行离线缓存的操作。

# 浏览器是如何对 HTML5 的离线储存资源进行管理和加载？

- 在线的情况下，浏览器发现 html 头部有 manifest 属性，它会请求 manifest 文件，如果是第一次访问页面 ，那么浏览器就会根据 manifest 文件的内容下载相应的资源并且进行离线存储。如果已经访问过页面并且资源已经进行离线存储了，那么浏览器就会使用离线的资源加载页面，然后浏览器会对比新的 manifest 文件与旧的 manifest 文件，如果文件没有发生改变，就不做任何操作，如果文件改变了，就会重新下载文件中的资源并进行离线存储。
- 离线的情况下，浏览器会直接使用离线存储的资源。

# HTML5的drag API 

- dragstart：事件主体是被拖放元素，在开始拖放被拖放元素时触发。 
- darg：事件主体是被拖放元素，在正在拖放被拖放元素时触发。 
- dragenter：事件主体是目标元素，在被拖放元素进入某元素时触发。 
- dragover：事件主体是目标元素，在被拖放在某元素内移动时触发。 
- dragleave：事件主体是目标元素，在被拖放元素移出目标元素是触发。 
- drop：事件主体是目标元素，在目标元素完全接受被拖放元素时触发。 
- dragend：事件主体是被拖放元素，在整个拖放操作结束时触发。

# src和herf的区别

`src` 用于替换当前元素，`href` 用于在当前文档和引用资源之间确立联系。 

## src

`src` 是 source 的缩写，指向外部资源的位置，指向的内容将会嵌入到文档中当前标签所在位置；在请求 `src` 资源时会将其指向的资源下载并应用到文档内，例如 `js` 脚本，`img` 图片和 `frame` 等元素。

```html
<script src =”js.js”></script>
```

当浏览器解析到该元素时，会暂停其他资源的下载和处理，直到将该资源加载、编译、执行完毕，图片和框架等元素也如此，类似于将所指向资源嵌入当前标签内。这也是为什么将 `js` 脚本放在底部而不是头部。

注意：`img/iframe`标签加载资源是异步的，不会阻止浏览器解析HTML，但是在加载时元素尺寸未知会延迟渲染，直到确认尺寸；在 `<img>` 和 `<iframe>` 标签中指定 `width` 和 `height` 属性，可以避免浏览器因等待资源加载而延迟渲染。

## herf

`href` 是 Hypertext Reference 的缩写，指向网络资源所在位置，建立和当前元素（锚点）或当前文档（链接）之间的链接，如果在文档中添加`<link href="common.css" rel="stylesheet"/>`那么浏览器会识别该文档为 `css` 文件，就会并行下载资源并且不会停止对当前文档的处理，即异步加载。

> `link` 标签的 `rel` 属性代表了外部资源与本HTML文档的关系，下面是几个常用的值：
> - `rel="stylesheet"`：连接外部的样式表
> - `rel="icon"`：链接一个外部的icon用于浏览器的栏目图标和收藏夹图标，该图片格式必须是`.ico`的
> - `rel="author license"`：规定一些作者和版权相关的信息

这也是为什么建议使用 `link` 方式来加载 `css`，而不是使用 `@import` 方式。因为 `link` 会异步加载css，而 `@import` 会在页面加载完成后才开始加载，会出现页面初始无样式也就是白屏问题。



# 对HTML语义化的理解

语义化是指根据内容的结构化（内容语义化），选择合适的标签（代码语义化）。通俗来讲就是用正确的标签做正确的事情。

语义化的优点如下：

- 对机器友好，带有语义的文字表现力丰富，更适合搜索引擎的爬虫爬取有效信息，有利于SEO。除此之外，语义类还支持读屏软件，根据文章可以自动生成目录；
- 对开发者友好，使用语义类标签增强了可读性，结构更加清晰，开发者能清晰的看出网页的结构，便于团队的开发与维护。

常见的语义化标签：

```html
<header></header>  头部
<nav></nav>  导航栏
<section></section>  区块（有语义化的div）
<main></main>  主要区域
<article></article>  主要内容
<aside></aside>  侧边栏
<footer></footer>  底部
```

# ⽂档类型(DOCTYPE)的作⽤

DOCTYPE是HTML5中一种标准通用标记语言的文档类型声明，它的目的是告诉浏览器（解析器）应该以什么样（html或xhtml）的文档类型定义来解析文档，不同的渲染模式会影响浏览器对 CSS 代码甚⾄ JavaScript 脚本的解析。它必须声明在HTML⽂档的第⼀⾏。

浏览器渲染页面的两种模式（可通过 `document.compatMode` 获取，比如，语雀官网的文档类型是 `CSS1Compat` ）：

- `CSS1Compat`：标准模式（Strict mode），默认模式，浏览器使用W3C的标准解析渲染页面。在标准模式中，浏览器以其支持的最高标准呈现页面。
- `BackCompat`：怪异模式/混杂模式（Quirk mode），浏览器使用自己的怪异模式解析渲染页面。在怪异模式中，页面以一种比较宽松的向后兼容的方式显示。

# script标签中defer和async的区别

如果没有 `defer` 或 `async` 属性，浏览器会立即加载并执行相应的脚本。它不会等待后续加载的文档元素，读取到就会开始加载和执行，这样就阻塞了后续文档的加载。

`defer` 和 `async` 属性都是去异步加载外部的JS脚本文件，它们都不会阻塞页面的解析，其区别如下：

- 执行顺序
  - 多个带async属性的标签，不能保证加载的顺序；
  - 多个带defer属性的标签，按照加载顺序执行；
- 脚本是否并行执行
  - async属性，表示后续文档的加载和执行与js脚本的加载和执行是并行进行的，即异步执行；
  - defer属性，加载后续文档的过程和js脚本的加载(此时仅加载不执行)是并行进行的(异步)，js脚本需要等到文档所有元素解析完成之后才执行，即 `DOMContentLoaded` 事件触发执行之前。

# 常⽤的meta标签有哪些

`meta` 标签由 `name` 和 `content` 属性定义，用来描述网页文档的属性，比如网页的作者，网页描述，关键词等，除了HTTP标准固定了一些name作为大家使用的共识，开发者还可以自定义name。

下面是一些常用的meta标签：
```html
<meta charset="UTF-8" > charset用来描述HTML文档的编码类型
<meta name="keywords" content="关键词" /> keywords页面关键词
<meta name="description" content="页面描述内容" /> description页面描述
<meta http-equiv="refresh" content="0;url=" /> refresh页面重定向和刷新
```

# 行内元素，块级元素和空元素

HTML标签一般分为块标签和行内标签两种类型。

转换关系：

- 块转行内：display: inline;
- 行内转块：display: block;
- 块、行内元素转换行内块：display: inline-block;


## 行内元素

```html
<a>,<strong>,<b>,<em>,<i>,<del>,<s>,<ins>,<u>,<span>等，其中<span>标签最典型的行内元素，有的地方也成为内联元素
```

行内元素的特点：

1. 相邻行内元素在一行上，一行可以显示多个。
2. 高、宽直接设置是无效的。
3. 默认宽度就是它本身内容的宽度。
4. 行内元素只能容纳文本或者其他行内元素。

注意：链接里面不能再放链接。特殊情况a里面可以放块级元素，但是给a转换一下块级模式最安全。

## 块级元素

```html
<h1>~<h6> ,<p>,<div>,<ul>,<ol>,<li>等，其中<div>标签是最典型的块元素
```
块级元素的特点：

1. 自己独占一行
2. 高度，宽度，外边距以及内边距都可以控制
3. 宽度默认是容器的100%
4. 是一个容器及盒子、里面可以放行内或者块级元素。

注意：只有文字才能组成段落，因此p里面不能放块级元素，特别是p不能放div。同理还有标签h1,h2,h3,h4,h5,h6,dt，都是文字类块级标签，里面不能放其他块级元素

## 空元素

空元素，即没有内容的HTML元素。空元素是在开始标签中关闭的，也就是空元素没有闭合标签。

- 常见的有：
  ```html
  <br>、<hr>、<img>、<input>、<link>、<meta>
  ```

- 鲜见的有：
  ```html
  <area>、<base>、<col>、<colgroup>、<command>、<embed>、<keygen>、<param>、<source>、<track>、<wbr>
  ```

# title与h1的区别、b与strong的区别、i与em的区别？
- `strong`标签有语义，是起到加重语气的效果，而`b`标签是没有的，`b`标签只是一个简单加粗标签。`b`标签之间的字符都设为粗体，`strong`标签加强字符的语气都是通过粗体来实现的，而搜索引擎更侧重`strong`标签。
- `title`属性没有明确意义只表示是个标题，`H1`则表示层次明确的标题，对页面信息的抓取有很大的影响。`title`是网页的标题，`h1`是网页内容中某部分的标题。
- `i`内容展示为斜体，`em`表示强调的文本。

# label标签的作用是什么？如何使用？

`label`标签用来定义表单控件的关系：当用户选择label标签时，浏览器会自动将焦点转到和label标签相关的表单控件上。如：
```html
<label for="mobile">Number:</label>
<input type="text" id="mobile"/>
或
<label>Date:<input type="text"/></label>
```
