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

CSSSprites（精灵图），将一个页面涉及到的所有图片都包含到一张大图中去，然后利用CSS的 background-image，background-repeat，background-position属性的组合进行背景定位。

**优点：**

- 利用`CSS Sprites`能很好地减少网页的http请求，从而大大提高了页面的性能，这是`CSS Sprites`最大的优点；
- `CSS Sprites`能减少图片的字节，把3张图片合并成1张图片的字节总是小于这3张图片的字节总和。

**缺点：**

- 在图片合并时，要把多张图片有序的、合理的合并成一张图片，还要留好足够的空间，防止板块内出现不必要的背景。在宽屏及高分辨率下的自适应页面，如果背景不够宽，很容易出现背景断裂；
- `CSSSprites`在开发的时候相对来说有点麻烦，需要借助`photoshop`或其他工具来对每个背景单元测量其准确的位置。
- 维护方面：`CSS Sprites`在维护的时候比较麻烦，页面背景有少许改动时，就要改这张合并的图片，无需改的地方尽量不要动，这样避免改动更多的`CSS`，如果在原来的地方放不下，又只能（最好）往下加图片，这样图片的字节就增加了，还要改动`CSS`。



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





# 场景应用

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