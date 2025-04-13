# CSS基础

## CSS3中有哪些新特性

- 新增各种CSS选择器 （`:not(.input)`：所有 class 不是“input”的节点）
- 圆角 （`border-radius:8px`）
- 多列布局 （`multi-column layout`）
- 阴影和反射 （`Shadoweflect`）
- 文字特效 （text-shadow）
- 文字渲染 （Text-decoration）
- 线性渐变 （gradient）
- 旋转 （transform）
- 增加了旋转,缩放,定位,倾斜,动画,多背景

## 伪类和伪元素的区别和作用？

### 伪元素

伪元素是指在内容元素的前后插入额外的元素或样式，但是这些元素实际上并不在文档中生成。它们只在外部显示可见，但不会在文档的源代码中找到它们，因此，称为“伪”元素。它们以双冒号 `::` 开头。例如：

- **`::before`**：在元素内容之前插入内容。

  ```css
  p::before {
    content: "Note: ";
    color: gray;
  }
  ```

- **`::after`**：在元素内容之后插入内容。

  ```css
  p::after {
    content: " (end)";
    color: gray;
  }
  ```

- **`::first-letter`**：为元素的第一个字母设置样式。

  ```css
  p::first-letter {
    font-size: 24px;
    font-weight: bold;
  }
  ```

- **`::first-line`**：为元素的第一行设置样式。

  ```css
  p::first-line {
    color: red;
  }
  ```

- **`::selection`**：为用户选中的文本设置样式。

  ```css
  p::selection {
    background: yellow;
    color: black;
  }
  ```

- **`::placeholder`**：为输入框的占位符文本设置样式。

  ```css
  input::placeholder {
    color: gray;
  }
  ```

### 伪类

  将特殊的效果添加到特定选择器上。它是在已有元素上添加类别的，不会产生新的元素。例如：

- **`:hover`**：当鼠标悬停在元素上时的样式。

  ```css
  a:hover {
    color: red;
  }
  ```

- **`:active`**：当元素被激活（如点击时）的样式。

  ```css
  button:active {
    background-color: black;
  }
  ```

- **`:focus`**：当元素获得焦点时的样式（如输入框被选中）。

  ```css
  input:focus {
    border: 2px solid blue;
  }
  ```

- **`:checked`**：当复选框或单选按钮被选中时的样式。

  ```css
  input[type="checkbox"]:checked {
    background-color: green;
  }
  ```

- **`:first-child`**：当元素是其父元素的第一个子元素时的样式。

  ```css
  li:first-child {
    font-weight: bold;
  }
  ```

- **`:last-child`**：当元素是其父元素的最后一个子元素时的样式。

  ```css
  li:last-child {
    font-style: italic;
  }
  ```

- **`:nth-child(n)`**：当元素是其父元素的第 `n` 个子元素时的样式。

  ```css
  li:nth-child(2) {
    color: red;
  }
  ```

- **`:nth-of-type(n)`**：当元素是其父元素的第 `n` 个特定类型的子元素时的样式。

  ```css
  p:nth-of-type(3) {
    font-size: 20px;
  }
  ```

- **`:not(selector)`**：当元素不匹配指定选择器时的样式。

  ```css
  p:not(.intro) {
    color: gray;
  }
  ```

- **`:link` 和 `:visited`**：分别用于未访问和已访问的链接。

  ```css
  a:link {
    color: blue;
  }
  a:visited {
    color: purple;
  }
  ```

**总结：**伪类是通过在元素选择器上加⼊伪类改变元素状态，⽽伪元素通过对元素的操作进⾏对元素的改变。



### 伪类和伪元素的区别

- **伪类**：
  - 用于定义元素的特定状态或位置。
  - 不会创建新的虚拟元素。
  - 以单冒号 `:` 开头。
- **伪元素**：
  - 用于为元素的特定部分添加样式。
  - 会创建一个虚拟的子元素。
  - 以双冒号 `::` 开头（但在CSS2中也可以用单冒号 `:`，但不推荐）。

### 使用场景

- **伪类**：
  - 用于交互效果（如按钮的悬停、点击状态）。
  - 用于选择特定的子元素（如第一个子元素、偶数子元素）。
  - 用于表单元素的状态（如输入框获得焦点）。
- **伪元素**：
  - 用于插入额外的内容（如图标、提示文字）。
  - 用于装饰性效果（如首字母大写、第一行样式）。
  - 用于实现一些布局技巧（如清除浮动、添加边框）。



## CSS选择器及其优先级

| **选择器**     | **格式**      | **优先级权重** |
| -------------- | ------------- | -------------- |
| id选择器       | #id           | 100            |
| 类选择器       | .classname    | 10             |
| 属性选择器     | a[ref=“eee”]  | 10             |
| 伪类选择器     | li:last-child | 10             |
| 标签选择器     | div           | 1              |
| 伪元素选择器   | li::after     | 1              |
| 相邻兄弟选择器 | h1+p          | 0              |
| 子选择器       | ul>li         | 0              |
| 后代选择器     | li a          | 0              |
| 通配符选择器   | *             | 0              |



对于选择器的**优先级**：

- 标签选择器、伪元素选择器：1；
- 类选择器、伪类选择器、属性选择器：10；
- id 选择器：100；
- 内联样式：1000；
- `!important`声明的样式的优先级最高；
- 如果优先级相同，则最后出现的样式生效；
- 继承得到的样式的优先级最低；
- 内联样式 > 内部样式 > 外部样式 > 浏览器用户自定义样式 > 浏览器默认样式。
- !important>内联>id>类、伪类、属性>元素、伪元素



![image-20250410134140377](CSS.assets/image-20250410134140377.png)



## CSS中可继承与不可继承属性有哪些

**一、无继承性的属性**

1. **display**：规定元素应该生成的框的类型
2. **文本属性**：
   - vertical-align：垂直文本对齐
   - text-decoration：规定添加到文本的装饰
   - text-shadow：文本阴影效果
   - white-space：空白符的处理
   - unicode-bidi：设置文本的方向
3. **盒子模型的属性**：width、height、margin、border、padding
4. **背景属性**：background、background-color、background-image、background-repeat、background-position、background-attachment
5. **定位属性**：float、clear、position、top、right、bottom、left、min-width、min-height、max-width、max-height、overflow、clip、z-index
6. **生成内容属性**：content、counter-reset、counter-increment
7. **轮廓样式属性**：outline-style、outline-width、outline-color、outline
8. **页面样式属性**：size、page-break-before、page-break-after
9. **声音样式属性**：pause-before、pause-after、pause、cue-before、cue-after、cue、play-during



**二、有继承性的属性**

1. **字体系列属性**
	- font-family：字体系列
	- font-weight：字体的粗细
	- font-size：字体的大小
	- font-style：字体的风格
2. **文本系列属性**
	- text-indent：文本缩进
	- text-align：文本水平对齐
	- line-height：行高
	- word-spacing：单词之间的间距
	- letter-spacing：中文或者字母之间的间距
	- text-transform：控制文本大小写（就是uppercase、lowercase、capitalize这三个）
	- color：文本颜色
3. **元素可见性**
	- visibility：控制元素显示隐藏
4. **列表布局属性**
	- list-style：列表风格，包括list-style-type、list-style-image等
5. **光标属性**
	- cursor：光标显示为何种形态



##  display的属性值及其作用

`display`是一个用于定义元素在文档流中的显示方式的属性。

| **属性值**   | **作用**                                                     |
| ------------ | ------------------------------------------------------------ |
| none         | 元素不显示且不占用空间（完全从渲染树移除）                   |
| block        | 块类型。元素独占一行，默认宽度为父元素宽度，可设置宽高，换行显示。 |
| inline       | 行内元素类型。默认宽度为内容宽度，不可设置宽高，同行显示。   |
| inline-block | 默认宽度为内容宽度，可以设置宽高和边距，同行显示。           |
| list-item    | 像块类型元素`<li>`一样显示，并添加样式列表标记。             |
| table        | 此元素会作为块级表格来显示。                                 |
| inherit      | 规定应该从父元素继承display属性的值。                        |
| flex         | 容器启用弹性布局，子项成为弹性项目                           |
| grid         | 容器启用网格布局                                             |



对于行内元素和块级元素，其特点如下：

**（1）行内元素**

- 设置宽高无效；
- 可以设置水平方向的margin和padding属性，不能设置垂直方向的padding和margin；
- 不会自动换行；

**（2）块级元素**

- 可以设置宽高；
- 设置margin和padding都有效；
- 可以自动换行；
- 多个块状，默认排列从上到下。



## 隐藏元素的方法有哪些

- **display: none**：渲染树不会包含该渲染对象，因此该元素不会在页面中占据位置，也不会响应绑定的监听事件。

  > 为了性能优化，应避免频繁切换 `display: none`（触发重排），可用 `visibility: hidden` 替代

- **visibility: hidden**：元素在页面中仍占据空间，但是不会响应绑定的监听事件。

- **opacity: 0**：将元素的透明度设置为 0，以此来实现元素的隐藏。元素在页面中仍然占据空间，并且能够响应元素绑定的监听事件。

- **position: absolute**：通过使用绝对定位将元素移除可视区域内，以此来实现元素的隐藏。

- **z-index: 负值**：来使其他元素遮盖住该元素，以此来实现隐藏。

- **clip/clip-path** ：使用元素裁剪的方法来实现元素的隐藏，这种方法下，元素仍在页面中占据位置，但是不会响应绑定的监听事件。

- **transform: scale(0,0)**：将元素缩放为 0，来实现元素的隐藏。这种方法下，元素仍在页面中占据位置，但是不会响应绑定的监听事件。



## display:none与visibility:hidden的区别

这两个属性都是让元素隐藏，不可见。**两者****区别如下：**

（1）**在渲染树中**

- `display:none`会让元素完全从渲染树中消失，渲染时不会占据任何空间；
- `visibility:hidden`不会让元素从渲染树中消失，渲染的元素还会占据相应的空间，只是内容不可见。

（2）**是否是****继承属性**

- `display:none`是非继承属性，子孙节点会随着父节点从渲染树消失，通过修改子孙节点的属性也无法显示；
- `visibility:hidden`是继承属性，子孙节点消失是由于继承了`hidden`，通过设置`visibility:visible`可以让子孙节点显示；

（3）修改常规文档流中元素的 `display` 通常会造成文档的重排，但是修改`visibility`属性只会造成本元素的重绘；

（4）如果使用读屏器，设置为`display:none`的内容不会被读取，设置为`visibility:hidden`的内容会被读取。



## link和@import的区别

```
<link href="style.css" type="text/css" />

<style type="text/css">@import url("style.css");</style>
```

两者都是外部引用CSS的方式，它们的区别如下：

- 从属关系区别
  - @import 是 CSS 提供的语法规则，只有导入样式表的作用; 
  - link 是HTML提供的标签，不仅可以加载 CSS 文件，还可以定义 RSS、rel 连接属性等。
- 加载顺序区别
  - 加载页面时，link 标签引入的 CSS 被同时加载; 
  - @import 引入的 CSS 将在页面加载完毕后被加载。
- 兼容性区别
  - @import 是 CSS2.1 才有的语法，故只可在 IE5+ 才能识别; 
  - link 标签作为 HTML 元素，不存在兼容性问题。
- DOM可控性区别
  - 可以通过 JS 操作 DOM ，插入 link 标签来改变样式;
  - 由于 DOM 方法是基于文档的，无法使用 @import 的方式插入样式。
- 权重区别
  - link 引入的样式权重大于 @import 引入的样式。严谨表述为：在`link`标签引入的 CSS 文件中使用`@import`时，相同样式将被该 CSS 文件本身的样式层叠。



## transition和animation的区别

- **transition是过渡属性**，强调过度，它的实现需要触发一个事件（比如鼠标移动上去，焦点，点击等）才执行动画。它类似于flash的补间动画，设置一个开始关键帧，一个结束关键帧。
- **animation是动画属性**，它的实现不需要触发事件，设定好时间之后可以自己执行，且可以循环一个动画。它也类似于flash的补间动画，但是它可以设置多个关键帧（用@keyframe定义）完成动画。



## CSS3中的盒子模型

CSS3中的盒模型有以下两种：标准盒子模型、IE盒子模型，这两种盒模型都是由四个部分组成的，分别是margin、border、padding和content。

标准盒模型和IE盒模型的区别在于设置width和height时，所对应的范围不同：

- 标准盒模型的width和height属性的范围只包含了content，
- IE盒模型的width和height属性的范围包含了border、padding和content。

可以通过修改元素的box-sizing属性来改变元素的盒模型：

- `box-sizing: content-box`表示标准盒模型（默认值）
- `box-sizing: border-box`表示IE盒模型（怪异盒模型）



## 为什么有时候⽤**translate**来改变位置⽽不是定位？ 

translate 是 transform 属性的⼀个值。改变transform或opacity不会触发浏览器重新布局（reflow）或重绘（repaint），只会触发复合（compositions）。⽽改变绝对定位会触发重新布局，进⽽触发重绘和复合。transform使浏览器为元素创建⼀个 GPU 图层，但改变绝对定位会使⽤到 CPU。 因此translate()更⾼效，可以缩短平滑动画的绘制时间。 ⽽translate改变位置时，元素依然会占据其原始空间，绝对定位就不会发⽣这种情况。



## 常见的图片格式及使用场景

（1）**BMP**，是无损的、既支持索引色也支持直接色的点阵图。这种图片格式几乎没有对数据进行压缩，所以BMP格式的图片通常是较大的文件。

（2）**GIF**是无损的、采用索引色的点阵图。采用LZW压缩算法进行编码。文件小，是GIF格式的优点，同时，GIF格式还具有支持动画以及透明的优点。但是GIF格式仅支持8bit的索引色，所以GIF格式适用于对色彩要求不高同时需要文件体积较小的场景。

（3）**JPEG**是有损的、采用直接色的点阵图。JPEG的图片的优点是采用了直接色，得益于更丰富的色彩，JPEG非常适合用来存储照片，与GIF相比，JPEG不适合用来存储企业Logo、线框类的图。因为有损压缩会导致图片模糊，而直接色的选用，又会导致图片文件较GIF更大。

（4）**PNG-8**是无损的、使用索引色的点阵图。PNG是一种比较新的图片格式，PNG-8是非常好的GIF格式替代者，在可能的情况下，应该尽可能的使用PNG-8而不是GIF，因为在相同的图片效果下，PNG-8具有更小的文件体积。除此之外，PNG-8还支持透明度的调节，而GIF并不支持。除非需要动画的支持，否则没有理由使用GIF而不是PNG-8。

（5）**PNG-24**是无损的、使用直接色的点阵图。PNG-24的优点在于它压缩了图片的数据，使得同样效果的图片，PNG-24格式的文件大小要比BMP小得多。当然，PNG24的图片还是要比JPEG、GIF、PNG-8大得多。

（6）**SVG**是无损的矢量图。SVG是矢量图意味着SVG图片由直线和曲线以及绘制它们的方法组成。当放大SVG图片时，看到的还是线和曲线，而不会出现像素点。SVG图片在放大时，不会失真，所以它适合用来绘制Logo、Icon等。

（7）**WebP**是谷歌开发的一种新图片格式，WebP是同时支持有损和无损压缩的、使用直接色的点阵图。从名字就可以看出来它是为Web而生的，什么叫为Web而生呢？就是说相同质量的图片，WebP具有更小的文件体积。现在网站上充满了大量的图片，如果能够降低每一个图片的文件大小，那么将大大减少浏览器和服务器之间的数据传输量，进而降低访问延迟，提升访问体验。目前只有Chrome、safari、firefox和Opera浏览器支持WebP格式，兼容性不太好。

- 在无损压缩的情况下，相同质量的WebP图片，文件大小要比PNG小26%；
- 在有损压缩的情况下，具有相同图片精度的WebP图片，文件大小要比JPEG小25%~34%；
- WebP图片格式支持图片透明度，一个无损压缩的WebP图片，如果要支持透明度只需要22%的格外文件大小。



## 对 CSS Sprites 的理解

CSS Sprites（精灵图），将一个页面涉及到的所有图片都包含到一张大图中去，然后利用CSS的 background-image，background-repeat，background-position属性的组合进行背景定位。

**优点：**

- 利用`CSS Sprites`能很好地减少网页的http请求，从而大大提高了页面的性能，这是`CSS Sprites`最大的优点；
- `CSS Sprites`能减少图片的字节，把3张图片合并成1张图片的字节总是小于这3张图片的字节总和。

**缺点：**

- 在图片合并时，要把多张图片有序的、合理的合并成一张图片，还要留好足够的空间，防止板块内出现不必要的背景。在宽屏及高分辨率下的自适应页面，如果背景不够宽，很容易出现背景断裂；
- `CSS Sprites`在开发的时候相对来说有点麻烦，需要借助`photoshop`或其他工具来对每个背景单元测量其准确的位置。
- 维护方面：`CSS Sprites`在维护的时候比较麻烦，页面背景有少许改动时，就要改这张合并的图片，无需改的地方尽量不要动，这样避免改动更多的`CSS`，如果在原来的地方放不下，又只能（最好）往下加图片，这样图片的字节就增加了，还要改动`CSS`。



## 响应式设计

响应式网站设计`（Responsive Web design`）是一个网站能够兼容多个终端，而不是为每一个终端做一个特定的版本。

关于原理： 基本原理是通过媒体查询`（@media）`查询检测不同的设备屏幕尺寸做处理。

关于兼容： 页面头部必须有mate声明的`viewport`。

```html
<meta name="’viewport’" content="”width=device-width," initial-scale="1." maximum-scale="1,user-scalable=no”"/>
```



## 媒体查询

媒体查询（Media Queries）是CSS3中新增的一种机制（CSS2中已经可以使用），它利用浏览器的媒体类型和特性，对目标媒体（通常为桌面、平板等的显示器、移动设备等）的种类、尺寸、分辨率和支持的颜色深度等特性进行查询，从而根据这些特性设置相应的样式，进而决定其渲染的具体效果。这是实现响应式网页设计的关键技术，确保网站或应用能够在多种设备上，包括桌面、平板、手机等，提供良好的用户体验。

### 基础语法

有三种方式来定义和使用媒体查询：

- 使用`@media`在**样式表**中指定媒体类型和媒体特性；

  ```css
      // css文件中或style内容中
      // 媒体类型为屏幕且为彩色设备。
      @media screen and (color) {
          ...
      }
  ```

- 使用`@import`在**样式表**中指定媒体类型和媒体特性；

  ```css
      // css文件中或style内容中
      // 样式表example.css仅用于彩色屏幕。
      @import url(example.css) screen and (color);
  ```

- 使用`media属性`在`<style>、<link>、<source>`或其他元素中指定媒体类型和媒体特性。

  ```html
      // html文件中 <link>标签
      // 彩色屏幕时，引入并应用样式表example.css。
      <link rel="stylesheet" media="screen and (color)" href="example.css" />
      
      // html文件中  <link>标签
      // 通过mdeia属性指定媒体类型及条件来区别引入css文件 
      <link rel="stylesheet" media="screen and (min-width:500px)" href="example.css" />
      
      // <style> 标签中
      // 通过mdeia指定媒体类型及条件来实现区别当前style是否生效
      <style media="screen and (max-width: 500px)">
          body{
              ...
          }
      </style>
  ```

  注意：在`<link>`标签中使用媒体查询会浪费页面http的请求次数，加重页面负担，不推荐使用。原因是**无论是否匹配媒体查询**，浏览器都会**立即发起请求**下载 `<link>` 标签指定的资源，但会根据媒体查询条件决定是否应用该资源，对于那些因媒体查询不匹配的资源，浏览器不会应用它。



媒体查询的基本结构如下：

```css
@media media-type and (media-feature: value) {
    /* CSS 样式规则 */
}
```

- `@media`：声明这是一个媒体查询语句。
- `media-type`：定义媒体类型，如 screen（用于电脑屏幕、手机屏幕等）、print（用于打印）、speech（用于屏幕阅读器）。默认值为 all，意味着规则适用于所有类型的媒体。
- `media-feature`：媒体特性，用来检查设备的特定条件，比如视口宽度(width)、高度(height)、设备像素比(device-pixel-ratio)、颜色(color)等，这些特性允许你根据不同的设备条件和环境来定制样式。
- `value`：媒体特性所对应的值或范围。
- `and`：逻辑操作符，用于结合多个媒体类型或特性，实现更复杂的查询条件。可用的逻辑操作符有`not`、`and`、`only` 、`,`和 `or`。



#### 媒体类型

- **all**：匹配所有设备，默认。
- **print**：匹配打印机和用于再现打印显示的设备，例如在“打印预览”中显示文档的 Web 浏览器。
- **screen**：匹配所有与打印不匹配的设备。

#### 媒体特性

CSS媒体查询支持多种媒体特，以下是一些常用的媒体特性的详细说明：

**宽度和高度特性：**

- width: 目标输出设备的视口宽度。
- min-width: 视口宽度的最小值。
- max-width: 视口宽度的最大值。
- height: 目标输出设备的视口高度。
- min-height: 视口高度的最小值。
- max-height: 视口高度的最大值。

**分辨率和像素比：**

- device-width 和 device-height: 设备的屏幕物理宽度和高度。
- min-device-width 和 max-device-width: 设备屏幕物理宽度的最小值和最大值。
- min-device-height 和 max-device-height: 设备屏幕物理高度的最小值和最大值。
- resolution: 设备的分辨率，可以是dpi（每英寸点数）, dpcm（每厘米点数）或 dppx（每像素点数）。
- min-resolution 和 max-resolution: 分辨率的最小值和最大值。

**方向和比例：**

- orientation: 设备的方向，取值为portrait（竖屏）或landscape（横屏）。
- aspect-ratio: 输出设备的宽高比，格式为x/y。
- device-aspect-ratio: 设备的屏幕宽高比。

**颜色和颜色索引：**

- color: 设备的颜色位数。
- min-color 和 max-color: 设备颜色位数的最小值和最大值。
- color-index: 设备的颜色索引数。
- min-color-index 和 max-color-index: 设备颜色索引数的最小值和最大值。

**环境和设备特性：**

- monochrome: 单色设备的颜色位数。
- grid: 是否为网格设备，如终端。
- scan: 显示设备的扫描方式，如progressive（逐行扫描）或interlace（隔行扫描）。
- update-frequency: 显示更新频率，如slow或fast。

**其他特性：**

- any-hover: 检测是否有任何指针设备能悬停。
- any-pointer: 指针精度，如fine、coarse或none。
- hover: 指针是否能悬停。
- pointer: 主要输入设备的精度。
- inverted-colors: 用户是否启用了颜色反转。
- prefers-color-scheme: 用户偏好颜色方案，如light、dark或no-preference。
- prefers-reduced-motion: 用户是否偏好减少动画或运动。
- prefers-contrast: 用户的对比度偏好，如no-preference、high或low。



#### 逻辑操作符

媒体查询时可用的逻辑操作符有`not`、`and`、`only` 、`,`和 `or`。

- **and**  用于将多个媒体查询规则组合成单条媒体查询，当每个查询规则都为真时则该条媒体查询为 true，它还用于将媒体功能与媒体类型结合在一起。

  ```css
  css 代码解读复制代码// 满足横屏（未区分媒体类型，默认all）以及最小宽度为500px
  @media (min-width: 500px) and (orientation: landscape) { 
      ...
  }
  ```

- **not** 用于否定媒体查询，如果不满足这个条件则返回 true，否则返回 false。如果出现在以逗号分隔的查询列表中，它将仅否定应用了该查询的特定查询。如果使用 `not` 运算符，则还必须指定媒体类型。

  ```
   代码解读
  复制代码备注：  在 Media Queries Level 3 中，not 关键字不能用于否定单个媒体特性表达式，而只能用于否定整个媒体查询，这个在实际开发中使用不多，更多细节和使用方式可查看MDN中相关规范。
  ```

- **only** 仅在整个查询匹配时才用于应用样式，并且对于防止较早的浏览器应用所选样式很有用。当不使用only时，旧版本的浏览器会将 `screen and (max-width: 500px)` 简单地解释为 `screen`，忽略查询的其余部分，并将其样式应用于所有screen。如果使用only运算符，则还必须指定媒体类型。通过它让选中的样式在老式浏览器中不被应用。

  ```css
  css 代码解读复制代码// 在老式浏览器中被解析为@media only，因为没有一个叫only的设备，所以实际上老式浏览器不会应用样式。
  @media only screen and (max-width:500px) {
      ...
  }
  
  // 在老式浏览器中被解析为@media screen，样式应用于所有screen。
  @media screen and (max-width:500px) {
      ...
  }
  
  // only关键字可防止不支持带有媒体功能的媒体查询的旧版浏览器应用给定的样式。它对现代浏览器没有影响。
  
  // 所以，在使用中最好不要忽略only,虽然无论是否带上only在老式浏览器中都会有错误（带上会使样式不使用，不带会使样式应用于所有的screen），但是带上only可以避免较早的浏览器应用样式引起更大的页面错误。
  ```

- **,（逗号）** 逗号用于将多个媒体查询合并为一个规则。逗号分隔列表中的每个查询都与其他查询分开处理。因此，如果列表中的任何查询为true，则整个媒体查询语句返回true。换句话说，列表的行为类似于逻辑或（`or`）运算符。

- **or** 等价于 `,` 运算符。在 Media Queries Level 4 中被添加。

  ```css
  css 代码解读复制代码// 满足最小宽度为500像素或是横屏设备应用样式表
  media (min-width: 500px) or (orientation: landscape) { 
      ...
  }
  // 等同于
  media (min-width: 500px), (orientation: landscape) { 
      ...
  }
  ```



### 切换导航栏布局

当屏幕宽度足够大时，显示水平导航栏；当屏幕较窄时，将其转换为垂直折叠式导航。

```css
/* 默认样式，可能适用于移动端 */
.navbar {
    display: flex;
    flex-direction: column;
}

/* 当屏幕宽度至少为768px时，变为水平布局 */
@media (min-width: 768px) {
    .navbar {
        flex-direction: row;
    }
}
```



### 调整字体大小

在屏幕宽度小于600px时减小文本的字体大小，以提高阅读体验。

```css
@media (max-width: 600px) {
    body {
        font-size: 14px;
    }
}
```



### 调整列布局

在不同屏幕尺寸下自动调整网格布局，比如从单列到两列再到多列布局。

```css
.container {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
}

@media (min-width: 768px) {
    .container {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (min-width: 1024px) {
    .container {
        grid-template-columns: repeat(3, 1fr);
    }
}
```



### 针对不同分辨率和方向优化视频尺寸

在宽屏设备上保持视频的宽高比，并在窄屏设备上全屏显示视频。

```css
@media (min-aspect-ratio: 16/9) {
    video {
        width: 100%;
        height: auto;
    }
}

@media (max-aspect-ratio: 16/9) {
    video {
        width: auto;
        height: 100%;
    }
}
```



### 三端适配

#### 常见的设备屏幕尺寸分界

| 设备     | 尺寸         |                         |
| -------- | ------------ | ----------------------- |
| 超小屏幕 | 手机         | < 768px                 |
| 小屏幕   | 平板及个别PC | 768px >= size < 992px   |
| 中等屏幕 | PC           | 992px >= size < 1200px  |
| 大屏幕   | PC           | 1200px >= size < 1680px |
| 超大屏幕 | PC           | >= 1680px               |

#### 常见响应式设计实现方案

**方案一：** 一套代码，针对不同屏幕对css进行调整，控制样式和布局，达到在不同设备、不同分辨率的屏幕上呈现合理布局的效果（一般官网开发常用）。

**方案二：** 多套代码，根据设备类型不同，加载不同的页面资源（各端区别较大、大型中后台管理系统常用）。

#### 方案一实施示例

**项目实施注意事项：**

- 浏览器兼容性，`避免使用较新的技术`，比如CSS中的flex（IE10以下的浏览器不支持）；

- 代码的可维护性，相对于一般不需要适配多端的管理系统，官网往往使用媒体查询，这增加了代码的复杂程度，同时也给后来的维护带来了较大的困难和挑战，所以在开发之初，要针对项目`定义一些通用的样式`，尽量降低代码维护的难度。

**实现思路：**主要使用浮动 + 定位 + 百分比布局（vw, padding、margin、min-height等）+ table标签（替代flex）实现。

> table标签中的`<tr>、 <td>` 更易控制元素垂直居中，而且是html的原生标签，这些标签及其属性能够兼容大部分浏览器，所以用来替代CSS中的flex，缺点就是原来用flex一两行代码就能实现的效果，使用`<teble>`可能要嵌套多层才行，但是为了兼容大部分浏览器，也只有这一个合适的方案
>
> 在实际开发中，在PC端屏幕较大的时候可能需要设置页面内容区域的宽度，一般有两种设计方案： 
>
> - 方案一（常用）：页面达到`1360px`的时候，设置内容宽度为1280px，左右padding各40px （content-box）; 
> - 方案二：页面达到`1280px`的时候，设置内容宽度为1200px，左右padding各40px （content-box）。

**实现代码：**

```css
    // CSS文件中
    
    ...通用样式书写...
    
    // 移动端
    @media only screen and (max-width: 767px) {
        ...移动端样式...
    }
    
    // pad端（平板）
    @media only screen and (min-width: 768px) {
        ...pad端样式...
    } 
    
    // PC端 、一般屏幕
    @media only screen and (min-width: 992px) {
        ...PC端 、一般屏幕样式...
    }
    
    // PC端 、大屏幕
    @media only screen and (min-width: 1200px) {
        ...PC端 、大屏幕样式...
    }
    
    // PC端、超大屏幕
    @media only screen and (min-width: 1680px) {
        ...超大屏幕样式...
    }
```






## 物理像素和逻辑像素

物理像素：是设备屏幕（或图像）实际具有的像素数目，设备一出厂就确定的，固定的，是屏幕的最小物理单位。

逻辑像素：是css中设置的像素。

像素密度：每英寸显示像素的数量是像素密度

默认情况下1物理像素 = 1逻辑像素，在高像素密度的设备上1逻辑像素 = 多个物理像素。若在单边上一个逻辑像素=3个物理像素，就说这个屏幕的像素密度为 3，也就是常说的 3 倍屏。

对于图片来说，为了保证其不失真，1 个图片像素至少要对应一个物理像素，假如原始图片是 500300 像素，那么在 3 倍屏上就要放一个 1500900 像素的图片才能保证 1 个物理像素至少对应一个图片像素，才能不失真。当然，也可以针对所有屏幕，都只提供最高清图片。虽然低密度屏幕用不到那么多图片像素，而且会因为下载多余的像素造成带宽浪费和下载延迟，但从结果上说能保证图片在所有屏幕上都不会失真。

还可以使用 CSS 媒体查询来判断不同的像素密度，从而选择不同的图片：

```css
my-image { background: (low.png); }
@media only screen and (min-device-pixel-ratio: 1.5) {
  #my-image { background: (high.png); }
}
```



## margin 和 padding 的使用场景

- 需要在border外侧添加空白，且空白处不需要背景（色）时，使用 margin；
- 需要在border内测添加空白，且空白处需要背景（色）时，使用 padding。



## 对line-height 的理解及其赋值方式

**（1）line-height的概念：**

- `line-height` 是指文本行高，定义了文本行框的高度，包括文字和行间的垂直间距。
- 如果一个标签没有定义 height 属性，那么其最终表现的高度由 line-height 决定；
- 一个容器没有设置高度，那么撑开容器高度的是 line-height，而不是容器内的文本内容；
- 把 line-height 值设置为 height 一样大小的值可以实现单行文字的垂直居中；
- line-height 和 height 都能撑开一个高度；

**（2）line-height 的赋值方式：**

- 带单位：px 是固定值，而 em 会参考父元素 font-size 值计算自身的行高

- 纯数字：表示行高和字体大小的倍数关系，也可以看作是数字百分比，比如值为1.5和150%一样，表示行高是自身的font-size大小的1.5倍，若自身没有font-size属性则会相对于其父元素的font-size。

  ```css
  p {
    line-height: 1.5; /* 行高为字体大小的 1.5 倍 */
  }
  ```

- 百分比：同上，将计算后的值传递给后代



## CSS 优化和提高性能的方法有哪些？

**加载性能：**

（1）css压缩：将写好的css进行打包压缩，可以减小文件体积。

（2）css单一样式：当需要下边距和左边距的时候，很多时候会选择使用 margin:top 0 bottom 0；但margin-bottom:bottom;margin-left:left;执行效率会更高。

（3）减少使用@import，建议使用link，因为后者在页面加载时一起加载，前者是等待页面加载完成之后再进行加载。



**选择器性能：**

（1）关键选择器（key selector）。选择器的最后面的部分为关键选择器（即用来匹配目标元素的部分）。CSS选择符是从右到左进行匹配的。当使用后代选择器的时候，浏览器会遍历所有子元素来确定是否是指定的元素等等；

（2）如果规则拥有ID选择器作为其关键选择器，则不要为规则增加标签。过滤掉无关的规则（这样样式系统就不会浪费时间去匹配它们了）。

（3）避免使用通配规则，如*{}计算次数惊人，只对需要用到的元素进行选择。

（4）尽量少的去对标签进行选择，而是用class。

（5）尽量少的去使用后代选择器，降低选择器的权重值。后代选择器的开销是最高的，尽量将选择器的深度降到最低，最高不要超过三层，更多的使用类来关联每一个标签元素。

（6）了解哪些属性是可以通过继承而来的，然后避免对这些属性重复指定规则。



**渲染性能：**

（1）慎重使用高性能属性：浮动、定位。

（2）尽量减少页面重排、重绘。

（3）去除空规则：｛｝。空规则的产生原因一般来说是为了预留样式。去除这些空规则无疑能减少css文档体积。

（4）属性值为0时，不加单位。

（5）属性值为浮动小数0.**，可以省略小数点之前的0。

（6）标准化各种浏览器前缀：带浏览器前缀的在前。标准属性在后。

（7）不使用@import前缀，它会影响css的加载速度。

（8）选择器优化嵌套，尽量避免层级过深。

（9）css精灵图，同一页面相近部分的小图标，方便使用，减少页面的请求次数，但是同时图片本身会变大，使用时，优劣考虑清楚，再使用。

（10）正确使用display的属性，由于display的作用，某些样式组合会无效，徒增样式体积的同时也影响解析性能。

（11）不滥用web字体。对于中文网站来说WebFonts可能很陌生，国外却很流行。web fonts通常体积庞大，而且一些浏览器在下载web fonts时会阻塞页面渲染损伤性能。



**可维护性、健壮性：**

（1）将具有相同属性的样式抽离出来，整合并通过class在页面中进行使用，提高css的可维护性。

（2）样式与内容分离：将css代码定义到外部css中。



# 页面布局

## CSS布局单位

常用的布局单位包括像素（`px`），百分比（`%`），`em`，`rem`，`vw/vh`。

**（1）像素**（`px`）是页面布局的基础，一个像素表示终端（电脑、手机、平板等）屏幕所能显示的最小的区域，像素分为两种类型：CSS像素和物理像素：

- **CSS像素**：为web开发者提供，在CSS中使用的一个抽象单位；
- **物理像素**：只与设备的硬件密度有关，任何设备的物理像素都是固定的。

**（2）百分比**（`%`），当浏览器的宽度或者高度发生变化时，通过百分比单位可以使得浏览器中的组件的宽和高随着浏览器的变化而变化，从而实现响应式的效果。一般认为子元素的百分比相对于直接父元素。

**（3）em和rem**相对于px更具灵活性，它们都是相对长度单位，它们之间的区别：**em相对于父元素，rem相对于根元素。**

- **em：** 文本相对长度单位。相对于当前对象内文本的字体尺寸。如果当前行内文本的字体尺寸未被人为设置，则相对于浏览器的默认字体尺寸(默认16px)。(相对父元素的字体大小倍数)。
- **rem：** rem是CSS3新增的一个相对单位，相对于根元素（html元素）的font-size的倍数。**作用**：利用rem可以实现简单的响应式布局，可以利用html元素中字体的大小与屏幕间的比值来设置font-size的值，以此实现当屏幕分辨率变化时让元素也随之变化。

**（4）vw/vh**是与视图窗口有关的单位，vw表示相对于视图窗口的宽度，vh表示相对于视图窗口高度，除了vw和vh外，还有vmin和vmax两个相关的单位。

- vw：相对于视窗的宽度，视窗宽度是100vw；
- vh：相对于视窗的高度，视窗高度是100vh；
- vmin：vw和vh中的较小值；
- vmax：vw和vh中的较大值；



**vw/vh** 和百分比很类似，两者的区别：

- 百分比（`%`）：大部分相对于祖先元素，也有相对于自身的情况比如（border-radius、translate等)
- vw/vm：相对于视窗的尺寸

**三者的区别：**

- px是固定的像素，一旦设置了就无法因为适应页面大小而改变。
- em是相对于其自身的font-size的px值来参考的，若自身没有设置font-size的px值，则根据其父元素的font-size的px值来设置大小，并且该值是可继承的，若父元素也没有设置则会一直向上溯源。
- rem是相对于根元素，这样就意味着，只需要在根元素确定一个参考值。



**使用场景：**

- 对于只需要适配少部分移动设备，且分辨率对页面影响不大的，使用px即可 。
- 对于需要适配各种移动设备，使用rem，例如需要适配iPhone和iPad等分辨率差别比较挺大的设备。



## Flex 布局

Flex是FlexibleBox的缩写，意为"弹性布局"，用来为盒状模型提供最大的灵活性。任何一个容器都可以指定为Flex布局。行内元素也可以使用Flex布局。注意，设为Flex布局以后，**子元素的float、clear和vertical-align属性将失效**。

采用Flex布局的元素，称为Flex容器（flex container），简称"容器"。它的所有子元素（仅子元素，不是全部后代元素）自动成为容器成员，称为Flex项目（flex item），简称"项目"。

![image-20250412212023103](CSS.assets/image-20250412212023103.png)

容器默认存在两根轴：水平的主轴（main axis）和垂直的交叉轴（cross axis），主轴的开始位置（与边框的交叉点）叫做`main start`，结束位置叫做`main end`；交叉轴的开始位置叫做`cross start`，结束位置叫做`cross end`。

项目默认沿主轴排列。单个项目占据的主轴空间叫做`main size`，占据的交叉轴空间叫做`cross size`。



### 容器属性

#### flex-direction

flex-direction 属性决定主轴的方向（即项目的排列方向）。

```css
.box {
  flex-direction: row | row-reverse | column | column-reverse;
}
```
可选的属性值及其含义：

| 属性值         | 含义                                                         |
| -------------- | ------------------------------------------------------------ |
| row            | 默认值，主轴为水平方向（水平布局），起点在左端，从左向右排列 |
| row-reverse    | 主轴为水平方向（水平布局），起点在右端，从右向左排列         |
| column         | 主轴为垂直方向（垂直布局），起点在上沿，从上往下排列         |
| column-reverse | 主轴为垂直方向（垂直布局），起点在下沿，从下往上排列         |



#### flex-wrap

默认情况下，项目都排在一条线（又称"轴线"）上。`flex-wrap`属性定义，如果一条轴线排不下，如何换行。

```css
.box{
  flex-wrap: nowrap | wrap | wrap-reverse;
}
```

可选的属性值及其含义：

| 属性值       | 含义                                                         |
| ------------ | ------------------------------------------------------------ |
| nowrap       | 默认值，不换行。当主轴的长度是固定并且空间不足时，项目尺寸会随之进行调整，而不会换行。 |
| wrap         | 换行，第一行在上面。                                         |
| wrap-reverse | 换行，第一行在下面。                                         |

#### flex-flow

`flex-flow`属性是`flex-direction`属性和`flex-wrap`属性的简写形式，默认值为`row nowrap`。

```css
.box {
  flex-flow: <flex-direction> || <flex-wrap>;
  /* initial表示设置为默认值；inherit表示采用其父元素flex-flow的属性值 */
}
```

#### justify-content

`justify-content`属性定义了项目在主轴上的对齐方式。

```css
.box {
  justify-content: flex-start | flex-end | center | space-between | space-around;
}
```

可选的属性值及其含义：

| 属性值        | 含义                                                         |
| ------------- | ------------------------------------------------------------ |
| flex-start    | 默认值，左对齐                                               |
| flex-end      | 右对齐                                                       |
| center        | 居中                                                         |
| space-between | 两端对齐，项目之间的间隔都相等                               |
| space-around  | 每个项目两侧的间隔相等。所以，项目之间的间隔比项目与边框的间隔大一倍 |

![image-20250412213534532](CSS.assets/image-20250412213534532.png)

#### align-items

`align-items`属性定义项目在交叉轴上如何对齐。

```css
.box {
  align-items: flex-start | flex-end | center | baseline | stretch;
}
```

可选的属性值及其含义：

| 属性值     | 含义                                                         |
| ---------- | ------------------------------------------------------------ |
| flex-start | 交叉轴的起点对齐                                             |
| flex-end   | 交叉轴的终点对齐                                             |
| center     | 交叉轴的中点对齐                                             |
| baseline   | 项目的第一行文字的基线对齐                                   |
| stretch    | （默认值） 如果项目未设置高度或设为auto，将占满整个容器的高度 |

（1）`flex-start`: 交叉轴的起点对齐（上面或左边）。设置容器高度为 100px，项目高度分别为 20px、40px、60px、80px、100px，效果如图所示：

![image-20250412213839654](CSS.assets/image-20250412213839654.png)

（2）`flex-end`: 交叉轴的终点对齐（下面或右边）。设置容器高度为 100px，项目高度分别为 20px、40px、60px、80px、100px，效果如图所示：

![image-20250412213912440](CSS.assets/image-20250412213912440.png)

（3）`center`: 交叉轴的中点对齐。设置容器高度为 100px，项目高度分别为 20px、40px、60px、80px、100px，效果如图所示：

![image-20250412213932575](CSS.assets/image-20250412213932575.png)

（4）`baseline`:以元素的第一行文字的基线对齐

![image-20250412214004752](CSS.assets/image-20250412214004752.png)

（5）`stretch`: 默认值。如果项目未设置高度或设为auto，将占满整个容器的高度。假设容器高度设置为 100px，而项目没有设置高度，则项目的高度也为 100px，如图：

![image-20250412214023902](CSS.assets/image-20250412214023902.png)

#### align-content

`align-content`属性定义了换行后多条项目元素主轴线的对齐方式。如果项目只有一根主轴线（项目都在一行上），该属性不起作用。该属性类似 `justify-content` 但对齐交叉轴。

```css
.box {
  align-content: flex-start | flex-end | center | space-between | space-around | stretch;
}
```

可选的属性值及其含义：

| 属性值        | 含义                                                         |
| ------------- | ------------------------------------------------------------ |
| flex-start    | 与交叉轴的起点对齐，所有行紧贴容器起点                       |
| flex-end      | 与交叉轴的终点对齐，所有行紧贴容器终点                       |
| center        | 与交叉轴的中点对齐，所有行整体居中                           |
| space-between | 与交叉轴两端对齐，轴线之间的间隔平均分布，首尾行贴边，中间均匀分布 |
| space-around  | 每根轴线（每行）两侧的间隔都相等。所以，轴线之间的间隔比轴线与边框的间隔大一倍。 |
| stretch       | 默认值，轴线占满整个交叉轴，行项目元素拉伸填满容器           |

`align-items` 和 `align-content` 的区别：

| 属性                | 作用对象               | 生效条件              | 典型应用场景             |
| :------------------ | :--------------------- | :-------------------- | :----------------------- |
| **`align-items`**   | **单行/单列** 内的项目 | 始终生效              | 控制项目在交叉轴上的对齐 |
| **`align-content`** | **多行/多列** 的整体   | 仅在有多行/多列时生效 | 控制行/列在容器内的分布  |



### 项目属性

#### order

`order`属性用来定义项目的排列顺序。数值越小，排列越靠前，默认为 0 。使用形式如下：

```css
.item {
    order: <integer>;
}
```

![image-20250412225412599](CSS.assets/image-20250412225412599.png)

#### flex-grow

`flex-grow`属性定义项目的放大比例，默认为 0 ，即如果存在剩余空间，也不放大。

```css
.item {
  flex-grow: <number>; /* default 0 */
}
```

如果所有项目的`flex-grow`属性都为 1，则它们将等分剩余空间（如果有的话）。

![image-20250412225520491](CSS.assets/image-20250412225520491.png)

如果一个项目的`flex-grow`属性为2，其他项目都为1，则前者占据的剩余空间将比其他项多一倍。

![image-20250412225535232](CSS.assets/image-20250412225535232.png)



#### flex-shrink

`flex-shrink`属性定义了项目的缩小比例，默认为 1 ，即如果空间不足，该项目将缩小。

```css
.item {
  flex-shrink: <number>; /* default 1 */
}
```

如果所有项目的`flex-shrink`属性都为 1，当空间不足时，都将等比例缩小。

![image-20250412225623533](CSS.assets/image-20250412225623533.png)

如果一个项目的`flex-shrink`属性为 0，其他项目都为 1，则空间不足时，前者不缩小。

![image-20250412225640886](CSS.assets/image-20250412225640886.png)

负值对该属性无效。

#### flex-basis

`flex-basis`属性定义了在分配多余空间之前，项目占据的主轴空间（main size）。浏览器根据这个属性，计算主轴是否有多余空间。它的默认值为`auto`，即项目的本来大小。

```css
.item {
  flex-basis: <length> | auto; /* default auto */
}
```

它可以设为跟`width`或`height`属性一样的值（比如350px），则项目将占据固定空间。

当主轴设置为水平时，当设置了`flex-basis`，设置的项目宽度值会失效，`flex-basis`需要跟`flex-grow`和`flex-shrink`配合使用才能生效。有两种特殊的值:

- 当 flex-basis 值为 0 % 时，项目尺寸会被认为是0，因此无论项目尺寸设置多少都没用；
- 当 flex-basis 值为 auto 时，则跟根据尺寸的设定值来设置大小。



#### flex

`flex`属性是`flex-grow`, `flex-shrink` 和 `flex-basis`的简写，默认值为`0 1 auto`。后两个属性可选。

```css
.item {
  flex: auto | none | [ <'flex-grow'> <'flex-shrink'>? || <'flex-basis'> ]
}
```

该属性有两个快捷值`auto (1 1 auto)` 和 `none (0 0 auto)`。

（1）默认值：`flex:0 1 auto`，即在有剩余空间时，只放大不缩小。

```css
.item {
  flex:0 1 auto;
  /* 等价于
  flex-grow: 0;
  flex-shrink: 1;
  flex-basis: auto;
  */
}
```

（2）`flex: auto`，即元素尺寸可以弹性增大，也可以弹性变小，具有十足的弹性，但在尺寸不足时会优先最大化内容尺寸。

```css
.item {
  flex:1 1 auto;
  /* 等价于
  flex-grow: 1;
  flex-shrink: 1;
  flex-basis: auto;
  */
}
```

（3）`flex: none`，即有剩余空间时，不放大也不缩小，最终尺寸通常表现为最大内容宽度。

```css
.item {
  flex:0 0 auto;
  /* 等价于
  flex-grow: 0;
  flex-shrink: 0;
  flex-basis: auto;
  */
}
```

（4）`flex: 0`，即当有剩余空间时，项目宽度为其内容的宽度，最终尺寸表现为最小内容宽度。

```css
.item {
  flex:0 1 0%;
  /* 等价于
  flex-grow: 0;
  flex-shrink: 1;
  flex-basis: 0%;
  */
}
```

（5）`flex: 1`，即元素尺寸可以弹性增大，也可以弹性变小，具有十足的弹性，但是在尺寸不足时会优先最小化内容尺寸。

```css
.item {
  flex:1 1 0%;
  /* 等价于
  flex-grow: 1;
  flex-shrink: 1;
  flex-basis: 0%;
  */
}
```



辨析：

- `flex:1` 和 `flex:auto` 的主要区别：
  - 在充分分配父元素宽度的情况下，子元素是优先扩展（auto）自己的尺寸还是优先减小（1）自己的尺寸
- `flex:0` 和 `flex: none` 的主要区别：
  - 不考考虑父元素宽度的情况下，最大化内容宽度（none）还是最小化内容宽度（0）

#### align-self

`align-self`属性允许单个项目有与其他项目不一样的对齐方式，可覆盖`align-items`属性。默认值为`auto`，表示继承父元素的`align-items`属性，如果没有父元素，则等同于`stretch`。

```css
.item {
  align-self: auto | flex-start | flex-end | center | baseline | stretch;
}
```



## Grid 布局

**gird(网格)** 布局与 **Flex** 弹性布局有相似之处理，都是由父容器包含多个项目元素的使用。

### 容器属性

#### dispaly

我们通过在元素上声明 `display：grid` 或 `display：inline-grid` 来创建一个网格容器。声明 `display：grid` 则该容器是一个块级元素，设置成 `display: inline-grid` 则容器元素为行内元素。

#### grid-template-columns

`grid-template-columns` 属性设置列数和列宽，有几个值代表有几列，列与列之间用空格隔开。

使用方法：

```css
.wrapper {
  display: grid;
  
  grid-template-columns: num | % | fr | auto | repeat(repeatNum, repeatVal) | minmax(min, max);
  /* 
     如下面的代码声明了三列，宽度分别为 200px 100px 200px 
     grid-template-columns: 200px 100px 200px;
  */
  
  /*  声明了两行，行高分别为 50px 50px  */
  grid-template-rows: 50px 50px;
}
```

可选的属性值及其含义：

| 属性值                       | 含义                                                         | 示例                                                 |
| ---------------------------- | ------------------------------------------------------------ | ---------------------------------------------------- |
| num                          | 固定宽度。可以选`px,em,rem`。数字个数为列的个数，数字大小为列的宽度。 | `grid-template-columns: 200px 100px 200px;`          |
| %                            | 百分比自动适应容器。可以选`25%,25vw`。数字个数为列的个数，数字大小为列的宽度占容器的百分比。 | `grid-template-columns: 25% 25% 25%;`                |
| fr                           | 比例划分。使用 `fr` 单位设置元素在剩余空间中所占的比例，下面按`1份-2份` 分成两组共四列。 | `grid-template-columns: 1fr 2fr;`                    |
| auto                         | 自动填充。让该列自动获取所有剩余空间。其优先级比fr低，会在fr分掉空间后再填充，导致获得的宽度等于自身内容的宽度。建议和固定值搭配使用。 | `grid-template-columns: 100px auto 200px;`           |
| repeat(repeatNum, repeatVal) | 使用 `repeat` 统一设置值，第一个参数为重复次数，第二个参数是重复的值 |                                                      |
| 参数repeatNum                | 这个参数可以是数字，表示重复的次数；也可以是`auto-fill`或`auto-fit`关键字，表示自动填充，让一行中尽可能的容纳更多的单元格。 | `grid-template-columns: repeat(auto-fit, 100px);`    |
| 参数repeatVal                | 这个参数可以是前四行的任意一种，表示该列设置的宽度。并且可以多个值组合，之间用空格隔开。如示例中就是`2*(100px 1fr 2fr)=6`列。 | `grid-template-columns: repeat(2, 100px 1fr 2fr);`   |
| minmax(min, max)             | 函数产生一个长度范围，表示长度在这个范围内的都可以应用到网格项目中。它有两个参数，分别为最小值和最大值。示例的意思是，第三个列宽最小是300px，最大不大于第一第二列宽的两倍。 | `grid-template-columns: 1fr 1fr minmax(300px, 2fr);` |

**`auto-fill`和`auto-fit`的区别**：

- `auto-fill`：**单元格宽度固定，容器宽度不固定。**尽可能多地创建列，即使没有内容，也会保留空轨道

- `auto-fit`：**单元格宽度不固定，容器宽度固定。**会将空轨道折叠，让现有列尽量填充空间

  | **特性**     | `auto-fill`                                      | `auto-fit`                                 |
  | :----------- | :----------------------------------------------- | :----------------------------------------- |
  | **行为差异** | 始终创建尽可能多的轨道（即使空轨道也会占据空间） | 合并空轨道，拉伸有效内容轨道以填充剩余空间 |
  | **空间分配** | 保留空白轨道                                     | 折叠空白轨道，重新分配空间给有效内容       |
  | **适用场景** | 需要严格保持轨道数量（如日历布局）               | 希望内容自适应填满容器（如响应式卡片）     |

#### grid-template-rows

`grid-template-rows` 属性设置行数和行高。具体值同上。

#### grid-template-areas

`grid-template-areas` 属性用于**声明区域**，一个区域由一个或者多个单元格组成。一对引号代表一个区域，其内部的项目当作行内元素，显示在一行中，对于一个两行三列的grid，若`grid-template-areas: "header sidebar content content";`表示前四个项目划分为一个区域，分别命名为`header`，`sidebar`，`content`和`content`，这四个单元格会显示在同一行中，由于只设置了3列的宽度，则多出来的第四列宽度为`auto`铺满余下的空间。

一般这个属性跟网格元素的 `grid-area` 一起使用，`grid-area`在子项样式里使用`grid-template-areas`所声明的区域名称，注意不要加引号，否则不生效。

HTML代码：

```html
<div className="wrapper">
  <div className="item">1</div>
  <div className="item">2</div>
  <div className="item">3</div>
  <div className="item">4</div>
  <div className="item">5</div>
  <div className="item">6</div>
</div>
```

CSS代码：

```css
.wrapper {
  display: grid;
  grid-gap: 10px;
  grid-template-columns: 120px  120px  120px;
  grid-template-rows: 50px 50px;
  grid-template-areas:
    ". header  header"
    "sidebar content content";
  background: pink;
  color: #444;
}

.item:nth-child(1){
  background: red;
  grid-area: header;
}

.item:nth-child(2){
  background: blue;
  grid-area: sidebar;
}

.item:nth-child(3){
  background: green;
  grid-area: content;
}
```

其中：`:nth-child(1)`它表示要选择父元素中索引为该数值的子元素（此时的索引值从1开始）

```
参数是奇数偶数
:nth-child(odd) odd表示选择奇数项的子元素
:nth-child(even) even表示选择偶数项的子元素

参数是倍数
:nth-child(3n) 表示选择3，6，9
:nth-child(2n) 表示选择2，4，6
:nth-child(n+3) 表示选择4，8，12
```

上面的样式效果如下图所示，明显出现了布局错乱的问题：

![image-20250413170614381](CSS.assets/image-20250413170614381.png)

原因是：

通过 `grid-template-areas` 定义的命名区域（`header`、`sidebar`、`content`）会**强制重排网格**，忽略原始的 `grid-template-columns/rows` 划分的 3 列 2 行结构。重排后实际生效的网格变为：仅剩 2x2 的有效区域（共 4 个格子），但只显式分配了 3 个命名区域。

```
[空白]  header   header
sidebar content  content
```

后 3 个 `.item`（4、5、6）**未被分配 `grid-area`**，会按默认流排列：

- 先填充未命名的网格单元格，即 `.` 符号代表空的单元格（未使用的单元格）。

- 然后将其余的`item`挤到**隐式网格**（即网格定义之外），堆叠在容器左下方。

修复建议：

- 让html中的项目元素与定义的区域中的单元格一一对应。
- 减少实际html中的项目元素，使用区域来实现单元格的视觉效果。

#### grid-template

该属性是 `grid-template-columns` 和 `grid-template-rows` 和 `grid-template-areas` 的简写形式。引号里面定义区域，后面空格隔开定义该行的行高，在最后一行用 `/` 隔开依次定义各个列的列宽。

语法格式为：

```css
 grid-template:
      '栅格名称 栅格名称 栅格名称 栅格名称' 1行高
      '栅格名称 栅格名称 栅格名称 栅格名称' 2行高
      '栅格名称 栅格名称 栅格名称 栅格名称' 3行高 / 1列宽 2列宽 3列宽;
```

常见网页布局HTML代码示例：

```jsx
{/* 由于header，leftSideBar，content，rightSideBar，footer只有五部分，所以只需要五个项目元素即可。*/}
<div className="wrapper">
   <div className="item">1</div>
   <div className="item">2</div>
   <div className="item">3</div>
   <div className="item">4</div>
   <div className="item">5</div>
</div>
```

CSS代码：

```less
.wrapper {
  display: grid;
  height: 800px;
  grid-gap: 10px;
  background: pink;
  color: #444;
 
  // 简写形式
  grid-template:
    "header header header" 100px
    "leftSideBar content rightSideBar" auto
    "footer footer  footer" 50px / 100px auto 50px;
  
  // 等效下面的代码：
  // grid-template-columns: 100px auto 50px;
  // grid-template-rows: 100px auto 50px;
  // grid-template-areas:
  //   "header header header"
  //   "leftSideBar content rightSideBar"
  //   "footer footer  footer";
}

.item:nth-child(1) {
  background: red;
  grid-area: header;
}

.item:nth-child(2) {
  background: blue;
  grid-area: leftSideBar;
}

.item:nth-child(3) {
  background: green;
  grid-area: content;
}

.item:nth-child(4) {
  background: darkblue;
  grid-area: rightSideBar;
}

.item:nth-child(5) {
  background: darkgreen;
  grid-area: footer;
}
```

#### grid-auto-columns

当网格项目数量超出显式定义的网格行数时，浏览器会自动创建新的行，而 `grid-auto-columns` 决定了这些隐式行的列宽度。

```css
.wrapper {
  /* 属性值写法和 grid-template-columns 的相同 */
  grid-auto-columns: 50px;
}
```

#### grid-auto-rows

当网格项目数量超出显式定义的网格行数时，浏览器会自动创建新的行，而 `grid-auto-rows`决定了这些隐式行的行高度。

```css
.wrapper {
  /* 属性值写法和 grid-template-columns 的相同 */
  grid-auto-rows: 50px;
}
```

#### grid

`grid` 是 `grid-template-rows`、`grid-template-columns`、`grid-template-areas`、 `grid-auto-rows`、`grid-auto-columns`、`grid-auto-flow` 这六个属性的简写。

```css
.container {
  grid: 
    /* 必须，grid-template-rows 和 grid-template-columns 用 / 分隔 */
    [grid-template-rows] / [grid-template-columns] 
    /* 可选，需紧跟在尺寸定义后 */
    [grid-template-areas] 
    /* 可选，顺序自由 */
    [grid-auto-flow]
    [grid-auto-rows] [grid-auto-columns];
}
```

#### column-gap

使用 `column-gap` 设置列间距。注意：`grid-column-gap`这种写法已被弃用。

```
.wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr 2fr;
  column-gap: 30px;
}
```

#### row-gap

使用 `row-gap` 设置行间距。注意：`grid-row-gap`这种写法已被弃用。

```css
.wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr 2fr;
  row-gap: 30px;
}
```

#### gap

` grid-gap` 属性是 `row-gap` 和 `cloumn-gap` 的简写形式。可以一次定义行、列间距，如果间距一样可以只设置一个值。

```css
.wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr 2fr;
  gap: 10px 30px; /* 行间距为10px，列间距为30px */
}
```

#### grid-auto-flow

`grid-auto-flow` 属性控制着在网格中被自动布局的元素怎样排列。默认的放置顺序是"先行后列"，即先填满第一行，再开始放入第二行。

```
.wrapper {
  grid-auto-flow: row | column | row dense | column dense;
}
```

可选的属性值及其含义：

| 属性值       | 含义                                                         |
| ------------ | ------------------------------------------------------------ |
| row          | 默认值，按行填充，从左到右排列项目。                         |
| row dense    | 按行排列的紧凑模式，若当前行的最后一格不够容纳下一个项目，则使用后面较小的项目补充，使得尽可能填满表格 |
| column       | 按列填充，从上到下排列项目。                                 |
| column dense | 按列排列的紧凑模式，若当前列的最后一格不够容纳下一个项目，则使用后面较小的项目补充，使得尽可能填满表格 |

#### justify-items

控制项目在单元格内的水平对齐方式。

```css
.wrapper {
	justify-items: stretch | start | end | center;
}
```

- `stretch`：默认值，拉伸至占满单元格的整个宽度（项目大小未指定）
- `start`：对齐单元格的起始边缘
- `end`：对齐单元格的结束边缘
- `center`：单元格内部居中



Flexbox 没有 `justify-items` 属性，是因为：

1. **一维布局特性**：主轴项目默认拉伸填满，无需单独控制。
2. **设计简化**：`justify-content` 已满足主轴对齐需求。
3. **替代方案**：通过 `margin` 或 `order` 实现个别项目的位置调整。

#### align-items

控制项目在单元格内的垂直对齐方式。

```css
.wrapper {
	align-items: stretch | start | end | center;
}
```

#### place-items

`place-items`是组合写法：`place-items:垂直 水平;`。

```css
.wrapper {
	place-items: <align-items> <justify-items>;
}
```

#### justify-content

控制整个内容区域在容器内的水平对齐方式。

```css
.wrapper {
	justify-content: stretch | start | end | center | space-around | space-between | space-evenly;
}
```

- `stretch`：默认值，拉伸至占满整个网格容器（需配合 grid-template-columns: auto 或未设置固定列宽）
- `start`：对齐容器的起始边缘
- `end`：对齐容器的结束边缘
- `center`：容器内部居中
- `space-between`：两端对齐，项目之间间距相等，首尾项目与容器边缘没有间距
- `space-around`：项目两侧的间距相等，首尾项目与容器边缘的间距是项目之间间距的一半
- `space-evenly`：项目之间间距相等，首尾项目与容器边缘的间距也等于项目之间间距

#### align-content

控制整个内容区域在容器内的垂直对齐方式

```css
.wrapper {
	align-content: stretch | start | end | center | space-around | space-between | space-evenly;
}
```

#### place-content

`place-content`是组合写法，`place-content: 垂直 水平;`。

```css
.wrapper {
	place-items: <align-content> <justify-content>;
}
```



### 项目属性

#### grid-column-start & grid-column-end

```css
.item {
  /* 通过网格线编号定位 */
  grid-column-start: 2;  /* 项目左边框是第二根垂直网格线 */
  grid-column-end: 3 ;  /* 项目右边框是第三根垂直网格线 */
}
```

- 除了指定为第几根网格线，还可以指定为网格线的名字，**例如** `grid-column-start: header-start`。

#### grid-row-start & grid-row-end

```css
.item {
  /* 通过网格线编号定位 */
  grid-row-start: 2 ;  /* 项目上边框是第二根水平网格线 */
  grid-row-end: 4 ;  /* 项目下边框是第四根水平网格线 */
}
```



#### grid-column & grid-row

是上面两个的简写形式。

```css
.item {
  /* 简写 */
  grid-column: <start-line> / <end-line>;
  grid-row: <start-line> / <end-line>;
  
  grid-column: 1 / span 2;  /* 等同于 grid-column: 1 / 3; */
  grid-row: 1 / span 2;
  /* 可以只写一个编号，默认跨越一个网格 */
  grid-column: 2;
}
```

- `span`：表示跨越多少个网格。

#### grid-area

将项目分配到命名区域，或通过行、列起止线自定义位置。

```css
.container {
  display: grid;
  grid-template-columns: 100px 100px 100px;
  grid-template-rows: 100px 100px 100px;
  grid-template-areas:
    "header header header"
    "sidebar main main"
    "footer footer footer";
}
.item {
  /* 等同于：grid-row: 1 / 2; grid-column: 1 / 4; */
  grid-area: header;  /* 分配到 header 区域 */
  /* 也可以简写为 grid-area: <row-start> / <column-start> / <row-end> / <column-end>; */
  grid-area: 1 / 1 / 2 / 4;
}
```



#### justify-self & align-self & place-self

单个项目在单元格内的对齐方式，与容器的 `justify-items` / `align-items` 属性的用法完全一致，但只作用于单个项目。

```css
.container {
  /* 控制项目在单元格内的水平对齐方式 */
  justify-self: stretch | start | end | center; 
  /* 控制项目在单元格内的垂直对齐方式 */
  align-self: stretch | start | end | center; 
  /* 简写 */
  place-self: <align-self> <justify-self>;
}
```



## 两栏布局的实现

一般两栏布局指的是**左边一栏宽度固定，右边一栏宽度自适应**。下面是常用的实现方法总结

| 方法         | 兼容性 | 等高布局 | 响应式 | 代码简洁度 | 适用场景      |
| :----------- | :----- | :------- | :----- | :--------- | :------------ |
| Flexbox      | IE10+  | ✅        | ✅      | ⭐⭐⭐⭐       | 通用布局      |
| Grid         | IE11+  | ✅        | ✅      | ⭐⭐⭐⭐⭐      | 现代项目      |
| Float        | IE6+   | ❌        | ⚠️      | ⭐⭐         | 传统项目      |
| Columns      | IE10+  | ❌        | ✅      | ⭐⭐⭐        | 新闻/杂志排版 |
| Position     | IE6+   | ❌        | ❌      | ⭐⭐⭐        | 固定位置元素  |
| Inline-Block | IE8+   | ❌        | ⚠️      | ⭐⭐         | 文本对齐需求  |

### 方法一：Flexbox 弹性布局（推荐）

**原理**：利用 Flex 容器的主轴排列特性，简单高效。

```css
.container {
  display: flex;
  gap: 20px; /* 间距 */
}
.left {
  flex: 0 0 200px; /* 固定左侧宽度 */
}
.right {
  flex: 1; /* 右侧自适应 */
}
```

**特点**：

- 天然等高布局
- 无需清除浮动
- 支持响应式调整（通过 `flex-direction`）

### 方法二：Grid 网格布局（现代方案）

**原理**：通过网格划分实现精准控制。

```css
.container {
  display: grid;
  grid-template-columns: 200px 1fr; /* 两列定义 */
  gap: 20px;
}
```

**特点**：

- 代码最简洁
- 支持复杂嵌套布局
- 可配合 `minmax()` 实现弹性约束

### 方法三：Float + Margin（传统方案）

**原理**：浮动脱离文档流，需手动处理清除。

将左边元素宽度设置为200px，并且设置向左浮动。将右边元素的margin-left设置为200px，宽度设置为auto（默认为auto，撑满整个父元素）。

```css
.outer {
  height: 100px;
}
.left {
  float: left;
  width: 200px;
  background: red;
}
.right {
  margin-left: 220px; /* 200px + 20px间距 */
  width: auto;
  background: gold;
}
```

**特点**：

- 兼容性好（IE8+）
- 需要额外处理浮动清除

### 方法四：CSS Columns 多列布局

**原理**：将容器分为多列（适合文字内容）。

```css
.container {
  column-count: 2;
  column-gap: 20px;
}
.left, .right {
  break-inside: avoid; /* 防止内容断裂 */
}
```

**特点**：

- 内容自动平衡填充
- 不适合复杂结构

### 方法五：Position 绝对定位

**原理**：通过绝对定位脱离文档流。父元素相对定位，子元素绝对定位，

```css
.container {
  position: relative;
}
.left {
  position: absolute;
  left: 0;   /* 将 .left 紧贴父容器（.container）的左侧边缘。类似于 float: left 的定位效果，但更精确。 */
  width: 200px;  /* 绝对定位元素的宽度默认由内容撑开，需显式设置宽度。 */
}
.right {
  position: absolute;
  left: 220px; /* 将 .right 的左侧边缘定位在距父容器左侧 220px 处, 200px + 20px间距 ,也可用 margin-left: 220px; 实现类似效果。*/
  right: 0; /* 将 .right 的右侧边缘紧贴父容器右侧边缘。与 left: 220px 共同作用，实现右侧栏的自适应宽度（自动填充剩余空间）。 */
}
```

**特点**：

- 需已知高度
- 可能影响其他元素布局



## 三栏布局的实现

### 方法一：Flexbox 弹性布局

利用flex布局，左右两栏设置固定大小，中间一栏设置为flex:1，自适应宽度。

```css
.container {
  display: flex;
  height: 100px;
}

.left {
  width: 100px;
  background: tomato;
}

.right {
  width: 100px;
  background: gold;
}

.center {
  flex: 1; /* 中间自适应 */
  background: lightgreen;
}
```

**特点**：

- 天然等高布局
- 支持动态调整顺序（通过 `order` 属性）
- 响应式适配只需修改 `flex-direction`

### 方法二：Grid 网格布局（现代方案）

通过网格模板精确控制三栏的尺寸和位置。

```css
.container {
  display: grid;
  grid-template-columns: 200px 1fr 200px; /* 三列定义 */
  height: 100vh;
}
.left { background: #f0f0f0; }
.right { background: #f0f0f0; }
.center { background: #e0e0e0; }
```

**特点**：

- 代码最简洁
- 支持复杂嵌套布局
- 可配合 `minmax()` 实现弹性约束（如 `minmax(200px, 300px)`）



### 方法三：Float + Margin（传统方案）

利用浮动，左右两栏设置固定大小，并设置对应方向的浮动。中间一栏设置左右两个方向的margin值避开浮动元素。

```css
.left {
  float: left;
  width: 200px;
  background: #f0f0f0;
}
.right {
  float: right;
  width: 200px;
  background: #f0f0f0;
}
/* CSS 样式的书写顺序（无论是将 .center 的样式写在前面还是后面）对布局结果无影响，因为浏览器会先解析 HTML 结构，再应用 CSS 样式。 */
.center {
  margin-left: 100px;
  margin-right: 200px; /* 避开左右浮动元素 */
  background: #e0e0e0;
}

/* 清除浮动 */
.container::after {
  content: '';
  display: table;
  clear: both;
}
```

注意：这种方式，HTML 中中间栏的 DOM 元素必须写在左右栏之后。原因是，当元素设置 `float` 时，会**脱离普通文档流**，后续的**非浮动元素**会尝试填充浮动元素留下的空间。只有按照left、right、center的顺序，让中间栏最后渲染，才能正确计算左右浮动元素占据的空间。

如果在HTML中按照center、left、right的顺序写DOM元素，渲染时，浏览器会先看到 `center`，此时左右栏尚未浮动，`center` 会占据整行宽度。接着渲染左右栏时，它们会浮动到两侧，但**无法将已经渲染的 `center` 挤到中间**，导致布局错乱。

如果在HTML中按照正常的left、center、right的顺序写DOM元素，会导致右边的浮动盒子在右下方。

正确的书写顺序是left、right、center，即：

```html
<div class="left">左栏（float: left）</div>
<div class="right">右栏（float: right）</div>
<div class="center">中间栏（最后渲染）</div>
```

**特点**：

- 兼容性好（IE8+）
- 需要手动清除浮动
- 中间栏必须最后渲染（HTML 中顺序为左→右→中）

### 方法四：Position 绝对定位

利用**绝对定位**，左右两栏设置为绝对定位，中间设置对应方向大小的margin的值。

```css
.container {
  position: relative;
  height: 100vh;
}
.left, .right {
  position: absolute;
  top: 0;
  width: 200px;
  background: #f0f0f0;
}
.left { left: 0; }
.right { right: 0; }
.center {
  margin: 0 200px;
  height: 100%;
  background: #e0e0e0;
}
```

**特点**：

- 脱离文档流，需手动处理高度
- 适合固定宽度侧边栏场景

### 方法五：圣杯布局

[双飞翼布局、圣杯布局 - xiaoxustudy - 博客园](https://www.cnblogs.com/xiaoxuStudy/p/13412057.html)

利用浮动和负边距来实现。使三个区域都处于左浮动方式，并使 `center` 的宽度成为父容器的 100%，实现三栏布局的左右固定，中间自适应。然后为主容器`container`设置左右 padding 值，使其为以后的侧边栏定位空出位置，padding 的值为侧边栏的宽。为两侧侧边栏添加负 margin，用以调整位置，其中摆在左边的 left 的 `margin-left` 为 -100%，而右边 right 的 `margin-left` 则为负的自身宽度。（利用了浮动元素的 margin 负到一定值后会使自身往上一行移动的原理）。接下来对 left 和 right 添加 `position:relative`，然后对它们进行定位，移动到两侧，圣杯布局就完成了。

html代码：

```html
<body>
  <div className='container'>
    <div className='center'>中间栏</div>
    <div className='left'>左边栏</div>
    <div className='right'>右边栏</div>
  </div>
</body>
```

CSS代码：

```css
.container{
  min-width:400px;
  height:200px;
  background:green;
  padding:0 200px;
}

.left{
  float:left;
  width:200px;
  height:200px;
  background:red;
  
  margin-left:100%;
  position:relative;
  left:-200px
}

.right{
  float:left;
  width:200px;
  height:200px;
  background:red;
  
  margin-left:-200px;
  position:relative;
  right:-200px
}

.center{
  float:left;
  width:100%;
  height:200px;
  background:blue;
}
```



### 方法六：双飞翼布局

跟圣杯布局实现方式相似，不同的是通过在`center`内部插入一个div `center-content`后，设置`center-content`的左右 margin 值为左右侧边栏的宽度来为左、右边栏留出位置的，而不是通过父容器元素的padding值。但其本质上来说，也是通过浮动和外边距负值来实现的。

html代码：

```html
<body>
  <div className='container'>
    <div className='center'>中间栏</div>
    <div className='left'>左边栏</div>
    <div className='right'>右边栏</div>
  </div>
</body>
```

css代码：

```css
.container{
  min-width:400px;
  height:200px;
  background:green;
}

.left{
  float:left;
  width:200px;
  height:200px;
  background:red;
  
  margin-left:-100%;
}

.right{
  float:left;
  width:200px;
  height:200px;
  background:red;
  
  margin-left:-200px;
}

.center{
  float:left;
  width:100%;
  height:200px;
  background:blue;
}

/* 不同点 */
.center-content{
  margin: 0 200px;
}
```



## 水平垂直居中

### 方法一：Flexbox 弹性布局

给待居中的块状元素的父元素添加属性 `display: flex;` ，`justify-content: center;` 和 `align-items: center;` 即可。

```html
<style>
    #father {
        width: 500px;
        height: 300px;
        background-color: skyblue;
        display: flex;
        justify-content: center;
        align-items: center;
		}
 
    #son {
        background-color: green;
		}
</style>
 
<div id="father">
    <div id="son">我是块级元素</div>
</div>
```

**优点：**

1. **简单直观**
   - 只需几行代码即可实现居中，无需计算偏移量。
   - 适用于大多数现代布局场景。
2. **响应式友好**
   - Flexbox 自动适应容器大小，适合不同屏幕尺寸。
   - 调整 `flex-direction` 可轻松切换水平/垂直布局。
3. **子元素自动对齐**
   - 子元素默认按主轴（`justify-content`）和交叉轴（`align-items`）对齐，无需额外调整。
4. **无依赖父元素尺寸**
   - 即使父元素没有固定宽高，Flexbox 仍然有效。

**缺点：**

1. **兼容性稍旧**
   - IE 11 部分支持（需 `-ms-` 前缀），但对现代浏览器完全兼容。
2. **不适合绝对定位场景**
   - 如果子元素需要脱离文档流（如 `position: absolute`），Flexbox 的对齐方式可能失效。



### 方法二：Grid 网格布局

这个方法不同于flex，在父元素上添加`display: grid;`，然后在子元素上添加`align-self: center;`和`justify-self: center;`即可。

```html
<style>
    #father {
      width: 500px;
      height: 300px;
      background-color: skyblue;
      
      display: grid;
		}
 
    #son {
      background-color: green;
      align-self: center;
    	justify-self: center;
		}
</style>
 
<div id="father">
    <div id="son">我是块级元素</div>
</div>
```

注意：

- 该方法但兼容性不如flex，不推荐使用。



### 方法三：Position 绝对定位 + translate

设置父元素为相对定位，给子元素设置绝对定位，然后在要居中的元素身上设置 `left: 50%; top: 50%;` 让其左上角定位到页面的中心，然后再设置 ` transform: translateX(-50%) translateY(-50%);` 或 `transform: translate(-50%,-50%);` 来将元素的中心点调整到页面的中心。

```css
.parent {
    position: relative;
}
 
.child {
    position: absolute;
    left: 50%;
    top: 50%;
		transform: translate(-50%, -50%);
    /* 也可以这样写 transform: translateX(-50%) translateY(-50%); */
}
```

**优点:**

- 精准控制
  - 适用于需要精确计算位置的场景（如模态框、悬浮菜单）。
  - 不受 Flexbox 布局限制，可单独调整。
- 脱离文档流
  - position: absolute 让子元素不受父元素流式布局影响，适合叠加元素（如弹窗）。
- 兼容性极佳
  - 支持所有浏览器，包括旧版 IE。

**缺点:**

- 依赖父元素定位
  - 必须设置 position: relative | absolute | fixed，否则可能相对于视口定位。
- 需要手动计算偏移
  - 必须用 transform: translate(-50%, -50%) 修正元素自身宽高，否则无法真正居中。
- 不适用于流式布局
  - 如果父元素尺寸变化（如响应式设计），可能需要额外 JS 计算。
- 该方法需要考虑浏览器兼容问题。
  - ie9及以上可以支持使用。



### 方法四：Position 绝对定位 + margin auto

利用绝对定位，设置四个方向的值都为0，并将margin设置为auto，由于宽高固定，因此对应方向实现平分，可以实现水平和垂直方向上的居中。

```css
.parent {
    position: relative;
}
 
.child {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
}
```

注意：

- 该方法适用于**盒子有宽高**的情况。
- 对于绝对定位元素来说：
  - 定位参照对象的宽度= left + right + margin-left + margin-right + 绝对定位元素实际占用的宽度
  - 定位参照对象的高度 = top + bottom + margin-top + margin-bottom +绝对定位元素实际占用的高度



### 方法五：Position 绝对定位 + margin 负的宽高的一半

利用绝对定位，先将元素的左上角通过top:50%和left:50%定位到页面的中心，然后再通过margin负值来调整元素的中心点到页面的中心。

```css
.parent {
    position: relative;
}
 
.child {
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -50px;     /* 自身 height 的一半 */
    margin-left: -50px;    /* 自身 width 的一半 */
}
```

注意：

- 该方法适用于**子元素盒子宽高已知**的情况。



### 方法六：Position 绝对定位 + calc

这种方式也要求居中元素的宽高必须固定，所以我们为box增加size类

```css
.parent {
    position: relative;
}
 
.child {
    position: absolute;
    top: calc(50% - 50px); 	 /* 50px是自身 height 的一半 */
    left: calc(50% - 50px);  /* 50px是自身 width 的一半 */
}
```



## 品字布局的实现

基本的思路为：

- 用 `margin: 0 auto;` 将第一个盒子水平居中。
- 将另外两个盒子放到第二层。
- 将第二个盒子定位到右下角，将第三个盒子定位到第二个盒子左边。

HTML 代码如下：

```html
<div class="div1">div1</div>
<div class="div2">div2</div>
<div class="div3">div3</div>
```

### 方法一：float + margin

- 用 `margin: 0 auto;` 将第一个盒子水平居中。
- 将第二个和第三个盒子设置向左浮动，使其浮动到下一行。
- 设置 `margin-left` 将下面两个盒子移动到对应位置。

```css
div {
  width: 100px;
  height: 100px;
}
.div1 {
  background-color: red;
  margin: 0 auto;
}
.div2 {
  background-color: green;
  float: left;
  margin-left: 50%;
}
.div3 {
  background-color: blue;
  float: left;
  margin-left: -200px;
}
```



### 方法二：float + relative

- 与上面的方法相似，最大的不同是使用相对定位使第三个盒子移动到第二个盒子的左边。

```css
div {
  width: 100px;
  height: 100px;
}
.div1 {
  background-color: red;
  margin: 0 auto;
}
.div2 {
  background-color: green;
  float: left;
  margin-left: 50%;
}
.div3 {
  background-color: blue;
  float: left;
  position: relative;
  left: -200px;
}
```

### 方法三：float + transform

- 与上面的方法相似，最大的不同是使用 `transform` 使第三个盒子移动到第二个盒子的左边。

```css
div {
  width: 100px;
  height: 100px;
}
.div1 {
  background-color: red;
  margin: 0 auto;
}
.div2 {
  background-color: green;
  float: left;
  margin-left: 50%;
}
.div3 {
  background-color: blue;
  float: left;
  transform: translate(-200%);
}
```



### 方法四：inline-block

- 与 `float + margin` 的方法很相似，最大的不同是将第二个和第三个盒子设置 `display: inline-block;`，使其换行并处于同一行，这里的效果与使用 `float: left;` 一样。
- 设置 `margin-left` 将下面两个盒子移动到对应位置。
- 其实对于第三个盒子的定位同样可以换用相对定位和 `transform` 。

```
div {
  width: 100px;
  height: 100px;
}
.div1 {
  background-color: red;
  margin: 0 auto;
}
.div2 {
  background-color: green;
  display: inline-block;
  margin-left: 50%;
}
.div3 {
  background-color: blue;
  display: inline-block;
  margin-left: -200px;
}
```



## 九宫格布局的实现

首先，定义好通用的HTML结构：

```HTML
<div class="box">
  <ul>
    <li>1</li>
    <li>2</li>
    <li>3</li>
    <li>4</li>
    <li>5</li>
    <li>6</li>
    <li>7</li>
    <li>8</li>
    <li>9</li>
  </ul>
</div>
```

公共样式：

```css
ul {
	padding: 0;
}

li { 
  list-style: none;
  text-align: center;
  border-radius: 5px;
  background: skyblue;
}
```



### 方法一：Flexbox

- 使用`flex-wrap: wrap;`允许多行显示，使元素自动换行。

- 由于我们给每个元素设置了下边距和右边距，所以最后同一列（3、6、9）的右边距和最后一行（7、8、9）的下边距撑大了`ul`，所以这里需要使用 `:nth-of-type()` 伪类对边距进行单独设置，以便消除他们的影响。

  > `:nth-child()` 是相对这个 CSS 伪类找到的**所有**当前元素的兄弟元素。 `:nth-of-type()` 是相对这个 CSS 伪类找到的**同种**兄弟元素。

最终的实现代码如下：

```css
ul {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  height: 100%;
}

li {
  width: 30%;
  height: 30%;
  margin-right: 5%;
  margin-bottom: 5%;
}

li:nth-of-type(3n){ 
  margin-right: 0;
}

li:nth-of-type(n+7){ 
  margin-bottom: 0;
}
```



### 方法二：Grid

思路：

- `display: grid;`设置网格布局。
- 用`grid-template-columns`属性来设置每一行中单个元素的宽度；用`grid-template-rows`来设置每一列中单个元素的高度。
- 设置 `grid-gap` 控制九宫格间隙大小。
- 网格大小或者设置 `repeat(3, 1fr)` 也可以实现自适应三等分。

```css
ul {
  display: grid;
  grid-template-columns: 30% 30% 30%; 
  grid-template-rows: 30% 30% 30%; 
  grid-gap: 5%; 
}
```



### 方法三：float

- 首先给每个盒子设置固定的宽高，然后使用float来实现自动换行。由于子元素的浮动，形成了BFC，所以父元素ul使用`overflow:hidden`来消除浮动带来的影响。
- 子元素设置浮动，调整长宽，利用 `margin-right` 和 `margin-bottom` 调成间距。第 3、6、9 个盒子的右边距是不需要的，第 7、8、9 个盒子的下边距是不需要的。利用 `:nth-of-type()` 伪类对边距进行单独设置。

```css
ul {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

li {
  float: left;
  width: 30%;
  height: 30%;
  margin-right: 5%;
  margin-bottom: 5%;
}

li:nth-of-type(3n){ 
  margin-right: 0;
}

li:nth-of-type(n+7){ 
  margin-bottom: 0;
}
```



### 方法四：inline-block

- `inline-block` 的作用与上一方法的浮动类似，都是为了让元素排列在同一行。
- 同样需要利用 `:nth-of-type()` 伪类对边距进行单独设置。
- 设置为`inline-block`的行内元素间常会出现间距，导致元素被挤到下一行。这种间距是由于换行符被转译产生的，可以在父元素`ul`设置 `font-size: 0;` 来消除，但这又会导致子元素继承字体大小，需要重新设置。也可以在父元素设置减小字符间距 `letter-spacing: -5px;`（或 `word-spacing` 为负值）来消除间距，但这又会影响子元素。很难找到有效好用的方法来消除间距。

```css
ul {
  width: 100%;
  height: 100%;
  letter-spacing: -5px;
  /* 或者用font-size: 0;来消除盒子之间的字符间距 */
}

li {
  width: 30%;
  height: 30%;
  display: inline-block;
  margin-right: 5%;
  margin-bottom: 5%;
}

li:nth-of-type(3n){ 
  margin-right: 0;
}

li:nth-of-type(n+7){ 
  margin-bottom: 0;
}
```



### 方法五：table

首先给父元素设置为table布局，然后使用`border-spacing`设置单元格之间的间距，最后将li设置为表格行，将div设置为表格单元格。

HTML结构：

```html
<ul class="table">
  <li>
    <div>1</div>
    <div>2</div>
    <div>3</div>
  </li>
  <li>
    <div>4</div>
    <div>5</div>
    <div>6</div>
  </li>
  <li>
    <div>7</div>
    <div>8</div>
    <div>9</div>
  </li>
</ul>
```

CSS代码：

```css
.table {
  width: 100%;
  height: 100%;
  display: table;
  border-spacing: 10px;
}

li {
  display: table-row; 
}

div {
  width: 30%;
  height: 30%;
  background: skyblue;
  
  display: table-cell;
}
```



# 定位与浮动

## Display

[css中display所有属性简单了解及使用_css display属性的值及用法-CSDN博客](https://blog.csdn.net/weixin_48040732/article/details/137255412)

该属性定义元素的显示类型，常用的值有：`block`、`inline`、`inline-block`、`flex`、`grid`、`none`。

## overflow

控制元素**内容溢出容器**时的处理方式（裁剪、滚动等）。

常用值：

| 值        | 效果                                         |
| :-------- | :------------------------------------------- |
| `visible` | **默认值**，溢出内容可见（可能超出容器边界） |
| `hidden`  | 溢出部分被裁剪，不可见                       |
| `scroll`  | 始终显示滚动条（即使内容未溢出）             |
| `auto`    | 仅在内容溢出时显示滚动条                     |

## 隐藏一个元素

隐藏一个元素不可见，但仍占用空间

## 单行、多行文本溢出隐藏

- 单行文本溢出

```css
overflow: hidden;            // 溢出隐藏
text-overflow: ellipsis;      // 溢出用省略号显示
white-space: nowrap;         // 规定段落中的文本不进行换行
```

- 多行文本溢出

```css
overflow: hidden;            // 溢出隐藏
text-overflow: ellipsis;     // 溢出用省略号显示
display: -webkit-box;         // 作为弹性伸缩盒子模型显示。
-webkit-box-orient:vertical; // 设置伸缩盒子的子元素排列方式：从上到下垂直排列
-webkit-line-clamp:3;        // 显示的行数
```

注意：由于上面的三个属性都是 CSS3 的属性，有些浏览器不兼容，所以要在前面加一个`-webkit-` 来兼容一部分浏览器。

 ## visibility

[【CSS】元素显示与隐藏 ( display 隐藏对象 | visibility 隐藏对象 | overflow 隐藏对象 )_隐藏显示-CSDN博客](https://blog.csdn.net/shulianghan/article/details/130157997)

[前端基础篇之CSS世界这些基本概念有些可能不易理解但却都很重要，如果看完还是很不理解的话需要自己谷歌或百度，网上关于这些 - 掘金](https://juejin.cn/post/6844903894313598989?searchId=2025041321394399C7805A9D9A2E516637#heading-36)

控制元素**视觉上的可见性**，但**保留其布局空间**。

常用值：

| 值         | 效果                                                       |
| :--------- | :--------------------------------------------------------- |
| `visible`  | **默认值**，元素可见                                       |
| `hidden`   | 元素不可见，但仍占据布局空间                               |
| `collapse` | 对表格行/列生效（隐藏且不占空间），对普通元素等同 `hidden` |



## Position 定位

`position` 属性用来指定一个元素在网页上的位置，一共有5种定位方式，即`position` 属性主要有五个值：

- `static`: 默认值，表示正常布局行为，此时设置  `top`, `right`, `bottom`, `left` 和 `z-index ` 属性均无效。
- `relative`： **将元素设置为相对定位元素**，该方式不脱离文档流
- `absolute`：  **将元素设置为绝对定位元素**，使元素相对于最近的非 `static` 定位祖先元素的进行定位。
- `fixed`: **将元素设置为固定定位元素**，使元素相对于视觉窗口进行定位。
- `sticky`: **将元素设置为粘性定位元素**，一开始不脱离文档流在默认位置，当到达某个位置时，相对于视口进行定位。

### static

`static` 是 `position` 属性的默认值。如果省略 `position` 属性，浏览器就认为该元素是 `static` 定位。这时，浏览器会按照源码的顺序，决定每个元素的位置，这称为"正常的页面流"（normal flow）。每个块级元素占据自己的区块（block），元素与元素之间不产生重叠，这个位置就是元素的默认位置。

> 注意，`static` 定位所导致的元素位置，是浏览器自主决定的，所以这时`top`、`bottom`、`left`、`right`和`z-index `这些属性无效。



### relative

**相对定位**是元素在移动位置的时候，是相对于它自己**原来的位置**来说的（自恋型）即定位基点是元素的默认位置。它必须搭配 `top`、`bottom`、`left`、`right` 这四个属性一起使用，用来指定偏移的方向和距离。

> 注意：
>
> - 相对定位**原来**在标准流的**位置**继续占有，后面的盒子仍然以标准流的方式对待它。
> - **相对定位并没有脱标**。它最典型的应用是给绝对定位当爹的。

相对定位的效果图：

![image-20250413205409077](CSS.assets/image-20250413205409077.png)

### absolute

**绝对定位**是元素在移动位置的时候，是相对于它**祖先元素**（一般是父元素）来说的（拼爹型），即定位基点是父元素。它也必须搭配 `top`、`bottom`、`left`、`right` 这四个属性一起使用，用来指定偏移的方向和距离。

> 注意：
>
> - 相对定位**完全脱标**，即完全不占位置。
> - 若**父元素没有定位**，则以**浏览器**为准定位（Document 文档）。

若**父元素没有定位**，则以**浏览器**为准定位时，绝对定位的效果图：

![image-20250413210026187](CSS.assets/image-20250413210026187.png)

若父元素有定位（绝对、固定或相对定位），则元素将依据最近的已经定位的父元素进行定位。其效果图如下：

![image-20250413210302377](CSS.assets/image-20250413210302377.png)



### fixed

**固定定位**是元素**固定于浏览器可视区的位置**。相对于视口（viewport，浏览器窗口）进行偏移，即定位基点是浏览器窗口。这会导致元素的位置不随页面滚动而变化，好像固定在网页上一样。它如果搭配 `top`、`bottom`、`left`、`right` 这四个属性一起使用，表示元素的初始位置是基于视口计算的，否则初始位置就是元素的默认位置。

### sticky

**粘性定位**可以被认为是相对定位和固定定位的混合。`sticky` 跟前面四个属性值都不一样，它会产生动态效果：一些时候是`relative`定位（定位基点是自身默认位置，且**占有原先的位置**），另一些时候自动变成`fixed`定位（定位基点是视口）。

比如，想让每个文章的标题在初始加载时在自己的默认位置（`relative`定位），页面向下滚动时，标题变成固定位置，始终停留在页面头部（`fixed`定位）。等到文章全部脱离视口，标题又回到自己的默认位置（`relative`定位）。

HTML代码：

```html
<div class="container">
            <div>
                <div class="title">内容1</div>
                <img src="../image/img.jpg" />
            </div>
            <div>
                <div class="title">内容2</div>
                <img src="../image/img.jpg" />
            </div>
            <div>
                <div class="title">内容3</div>
                <img src="../image/img.jpg" />
            </div>
            <div>
                <div class="title">内容4</div>
                <img src="../image/img.jpg" />
                <img src="../image/img.jpg" />
            </div>
 </div>
```

CSS代码：

```css
.container {
  background: #eee;
  width: 600px;
  height: 1000px;
  margin: 0 auto;
}
.title {
  /* 适配  safari 浏览器 */
  position: -webkit-sticky;
  
  position: sticky;
  /* 触发的阈值 */
  top: 0px;
  
  height: 60px;
  background: #ff7300;
  font-size: 30px;
  text-align: center;
  color: #fff;
  line-height: 60px;
}
img {
  width: 100%;
  display: block;
}
```

它的具体判定规则是，当我们的页面滚动时，只要视口的顶部与 `.title` 的距离 `>=0`，`.title` 就会自动变为 `fixed` 定位，保持与视口顶部 `0px` 的距离。页面继续向下滚动，父元素彻底离开视口（即整个父元素完全不可见），`.title` 恢复成 `relative` 定位。



**sticky的生效规则：**

- `sticky` 必须指定 `top`、`bottom`、`left`、`right` 这四个属性之一使用才有效，否则等同于 `relative` 定位，不产生"动态固定"的效果。
  - 原因是这四个属性用来定义"偏移距离"，浏览器把它当作 `sticky` 的生效门槛。
  - 并且 `top` 和 `bottom` 同时设置时，`top` 生效的优先级高，`left` 和 `right` 同时设置时，`left` 的优先级高。
- 设定为 `position:sticky` 元素的任意父节点的 `overflow` 属性必须是 `visible`，否则 `position:sticky` 不会生效。
  - 如果 `position:sticky` 元素的任意父节点定位设置为 `overflow:hidden`，则父容器无法进行滚动，所以 `position:sticky` 元素也不会有滚动然后固定的情况。
- 如果 `position:sticky` 元素的任意父节点定位设置为 `position:relative | absolute | fixed`，则元素相对父元素进行定位，而不会相对视觉窗口定位。
- 达到设定的阀值。这个还算好理解，也就是设定了 `position:sticky` 的元素表现为 `relative` 还是 `fixed` 是根据元素是否达到设定了的阈值决定的。



### 定位边偏移

`定位 = 定位方式 + 边偏移`。定位的盒子有了边偏移才有价值。 一般情况下，凡是有定位地方必定有边偏移。

**边偏移**就是定位的盒子移动到最终位置。有 top、bottom、left 和 right 4 个属性。

| 边偏移属性 | 示例           | 描述                                           |
| ---------- | -------------- | ---------------------------------------------- |
| `top`      | `top: 80px`    | 顶端偏移量，定义元素相对于其父元素上边线的距离 |
| `bottom`   | `bottom: 80px` | 底部偏移量，定义元素相对于其父元素下边线的距离 |
| `left`     | `left: 80px`   | 左侧偏移量，定义元素相对于其父元素左边线的距离 |
| `right`    | `right: 80px`  | 右侧偏移量，定义元素相对于其父元素右边线的距离 |

## Float 浮动

设置了float属性的元素会根据设置的属性值向左或者向右浮动，直到它的外边缘碰到包含框或另一个浮动框的边框为止。设置了float属性的元素会从普通文档流中脱离，相当于不占据任何空间，所以文档中普通流中的元素表现的就像浮动元素不存在一样，因此，设置float属性的后会影响我们的页面布局。



float的特性：

- 包裹性：即此时元素`width`会像`height`一样由子元素决定，而不是默认撑满父元素。
- 块状化并格式化上下文（BFS）：块状是指元素的`float`为`非none`时，其`display`的计算值就成了`block`或者`table`。
- 没有任何`margin`合并；
- 脱离文档流：设置了`float`的元素会脱离文档流，失去原来的空间占有，这就导致了父元素的高度坍塌。



## Clear

在CSS中可以使用`clear`来清除`float`属性带来高度塌陷等问题，使用格式如下：

```css
clear: none | left | right | both
```

- none：默认值，允许两边都有浮动对象；
- left：不允许左侧有浮动对象；
- right：不允许右侧有浮动对象；
- both：两侧不允许有浮动对象。

如果单从字面上的意思来理解，`clear:left`应该是”**清除左浮动**“，`clear:right`应该是”**清除右浮动**“，实际上，这种说法是有问题的，**因为浮动一直还在，并没有清除！只能清除浮动带来的影响。**

官方对clear属性的解释是：**“元素盒子的边不能和前面的浮动元素相邻”**。注意这里的”前面的”3个字，也就是clear属性对”后面的”浮动元素是不闻不问的。clear属性只能清除元素的自身，不能影响其他的元素。接着看下面的这个例子：

## BFC

块格式化上下文（Block Formatting Context，BFC）是 CSS 渲染过程中的一个独立布局环境，内部的元素布局不会影响外部元素，同时外部元素也不会影响内部。它是解决浮动、边距重叠等布局问题的核心机制之一。

触发BFC的条件（任意一条）：

- html根元素；
- float的值不为none；
- overflow的值为auto、scroll或者hidden；
- display的值为table-cell、table-caption和inline-block中的任何一个；
- position的值不为relative和static；

### 解决高度塌陷问题

### 阻止边距重叠

### 避免文字环绕浮动元素



## display、float和position之间的关系

| **属性**       | **作用**                                          | **常用值**                                                |
| :------------- | :------------------------------------------------ | :-------------------------------------------------------- |
| **`display`**  | 定义元素的显示类型（如块级、行内、弹性盒等）      | `block`、`inline`、`inline-block`、`flex`、`grid`、`none` |
| **`float`**    | 使元素脱离普通流，向左/右浮动，其他内容环绕其周围 | `left`、`right`、`none`                                   |
| **`position`** | 控制元素的定位方式（静态、相对、绝对、固定等）    | `static`、`relative`、`absolute`、`fixed`、`sticky`       |

### 优先级与覆盖关系

#### **(1) 当 `position` 为非 `static` 时：**

- **`position` 优先级最高**：
  - 若元素设置了 `absolute`、`fixed` 或 `sticky`，`float` 会被强制设为 `none`（无效）。
  - `display` 值可能被浏览器自动调整（如 `inline` → `block`）。

#### **(2) 当 `float` 设为 `left/right` 时：**

- **`float` 触发 BFC**：
  - 元素 `display` 值可能被隐式修改（如 `inline` → `block`）。
  - 但若同时设置 `position: absolute/fixed`，`float` 失效。

#### **(3) `display: none` 时：**

- **完全移除布局**：
  - 无论 `float` 或 `position` 如何设置，元素不参与渲染。



### 规则总结

1. **`position: absolute/fixed` 优先级最高**：
   - 覆盖 `float` 和部分 `display` 行为。
2. **`float` 会强制修改 `display`**：
   - 行内元素浮动后变为块级（`display: block`）。
3. **Flex/Grid 布局中 `float` 无效**：
   - 现代布局模型（Flexbox/Grid）会忽略 `float`。
4. **`display: none` 绝对优先**：
   - 元素不参与任何布局计算。



## overflow、display与visibility的区别

| **属性**             | **是否占据空间** | **是否触发重排** | **是否响应事件** | **典型场景**                    |
| :------------------- | :--------------- | :--------------- | :--------------- | :------------------------------ |
| `overflow`           | ✅ 是             | ❌ 否             | ✅ 是             | 控制内容溢出（滚动/裁剪）       |
| `display: none`      | ❌ 否             | ✅ 是             | ❌ 否             | 彻底移除元素（响应式布局）      |
| `visibility: hidden` | ✅ 是             | ❌ 否             | ❌ 否             | 隐藏元素但保留占位（动画/占位） |



## float、transform和position的区别



# 场景应用







## 如何判断元素是否到达可视区域

### 方法一：`IntersectionObserver`（推荐）

浏览器原生 API，异步监听目标元素与视口（或指定父元素）的交集变化，**性能最优**，无兼容性问题（IE 需 polyfill）。

代码示例：

```js
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      console.log('元素进入视口', entry.target);
      observer.unobserve(entry.target); // 停止监听已触发元素
    }
  });
}, {
  root: null,        // 默认视口，可指定父元素
  threshold: 0.1,    // 10% 可见时触发
  rootMargin: '0px'  // 提前/延迟触发范围
});

document.querySelectorAll('.lazy-item').forEach(el => observer.observe(el));
```



### 方法 2：`getBoundingClientRect()` + 滚动事件

通过计算元素相对于视口的坐标位置，手动判断是否进入可视区域。

代码示例：

```js
function isInViewport(el) {
  const rect = el.getBoundingClientRect();
  return (
    rect.top <= window.innerHeight &&
    rect.bottom >= 0 &&
    rect.left <= window.innerWidth &&
    rect.right >= 0
  );
}

// 滚动事件监听（需节流）
window.addEventListener('scroll', () => {
  document.querySelectorAll('.lazy-item').forEach(el => {
    if (isInViewport(el)) {
      console.log('元素进入视口', el);
    }
  });
});

// 一般搭配节流函数使用
window.addEventListener('scroll', throttle(() => { /* 判断逻辑 */ }, 200));
```



### 方法 3：`offsetTop` + `scrollTop`（传统方式）

通过对比元素距离文档顶部的偏移量和滚动高度判断。

代码示例：

```js
function isInViewport(el) {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const viewportHeight = window.innerHeight;
  const elOffsetTop = el.offsetTop;
  const elHeight = el.offsetHeight;

  return (scrollTop + viewportHeight > elOffsetTop) && (scrollTop < elOffsetTop + elHeight);
}
```

**缺点：**

- 不适用于 **固定定位（position: fixed）** 元素
- 需要手动处理浏览器兼容性



以图片显示为例：

- `window.innerHeight` 是浏览器可视区的高度；
- `document.body.scrollTop || document.documentElement.scrollTop` 是浏览器滚动的过的距离；
- `imgs.offsetTop` 是元素顶部距离文档顶部的高度（包括滚动条的距离）；
- 内容达到显示区域的：`img.offsetTop < window.innerHeight + document.body.scrollTop && img.offsetTop + img.offsetHeight > document.body.scrollTop`



## z-index属性在什么情况下会失效

通常 z-index 的使用是在有两个重叠的标签，在一定的情况下控制其中一个在另一个的上方或者下方出现。z-index值越大就越是在上层。z-index元素的position属性需要是relative，absolute或是fixed。



z-index属性在下列情况下会失效：

- 父元素position为relative时，子元素的z-index失效。解决：父元素position改为absolute或static；
- 元素没有设置position属性为非static属性。解决：设置该元素的position属性为relative，absolute或是fixed中的一种；
- 元素在设置z-index的同时还设置了float浮动。解决：float去除，改为display：inline-block；

# END