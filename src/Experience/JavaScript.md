## 监听 `DOM` 元素的宽高变化

普通 `DOM` 元素没有 `onresize` 事件，只有在 `window` 对象下有此事件。

**`ResizeObserver`** 接口监视 `Element`内容盒或边框盒或者 `SVGElement`边界尺寸的变化。`ResizeObserver` 避免了通过回调函数调整大小时，通常创建的无限回调循环和循环依赖项。它只能通过在后续的帧中处理 DOM 中更深层次的元素来做到这一点。如果它的实现遵循规范，则应在绘制前和布局后调用 resize 事件。

- `ResizeObserver()`：创建并返回一个新的 `ResizeObserver` 对象。

  ```js
  const resizeObserver = new ResizeObserver(entries => {
      //回调
      this.$chart.resize();
  });
  ```

- `ResizeObserver.observe()`：开始对指定`Element`的监听。

  ```js
  //监听对应的dom
  resizeObserver.observe(this.$refs.chart);
  ```

- `ResizeObserver.unobserve()`：结束对指定`Element`的监听。

  ```js
  resizeObserver.unobserve(this.$refs.chart);
  ```




## 设置DIV元素的内容

| 属性/方法     | 功能描述                     | 是否解析 HTML 标签 | 是否会替换元素的所有内容 | 性能 | 适用场景               |
| :------------ | :--------------------------- | :----------------- | :----------------------- | :--- | :--------------------- |
| `innerHTML`   | 获取或设置元素的 HTML 内容   | 是                 | 是                       | 一般 | 需要插入带标签的内容   |
| `innerText`   | 获取或设置元素的可见文本内容 | 否                 | 是                       | 较差 | 需要获取或设置可见文本 |
| `textContent` | 获取或设置元素的所有文本内容 | 否                 | 是                       | 较好 | 需要获取或设置所有文本 |
| `appendChild` | 在元素末尾添加一个子节点     | 否                 | 否                       | 较好 | 需要动态添加节点       |

归属区别：

- textContent 是 Node 对象的属性；
- innerHTML 是 Element 对象的属性；
- innerText 是 HTMLElement 对象的属性；
- appendChild 是 Node 对象的方法；



使用场景：

1. **`innerHTML`**：
   - 需要插入带 HTML 标签的内容时。
   - 示例：动态加载一段富文本内容。
2. **`innerText`**：
   - 需要获取或设置用户可见的文本时。
   - 示例：显示用户输入的纯文本。
3. **`textContent`**：
   - 需要获取或设置所有文本内容时（包括隐藏内容）。
   - 示例：处理文本数据，不关心样式。
4. **`appendChild`**：
   - 需要动态添加 DOM 节点时。
   - 示例：在列表中追加一个新项。



注意事项：

1. **安全性**：
   - 使用 `innerHTML` 时，避免直接插入用户输入的内容，以防止 XSS 攻击。
   - 推荐使用 `textContent` 或 `innerText` 处理纯文本。
2. **性能**：
   - `innerText` 会触发重排，性能较差，尽量避免频繁使用。
   - `textContent` 和 `appendChild` 性能较好，适合动态操作 DOM。
   - 在执行速度的比较上，使用 appendChild 比 innerHTML 要快，特别是内容包括 html 标记时，appendChild 明显要快于  innerHTML，这可能是因为 innerHTML 在铺到页面之前还要对内容进行解析才能铺到页面上，当包含 html 标记过多时， innerHTML速度会明显变慢。



## 单位px，em和rem的区别

[【基础】EM 还是 REM？这是一个问题！ - 知乎](https://zhuanlan.zhihu.com/p/37956549)



# Tailwind CSS

## 如何使用Tailwind在项目中管理样式

- 在项目中，我主要通过 Tailwind CSS 的实用类（Utility Classes）来管理样式。Tailwind 提供了丰富的原子化类名，可以直接在 HTML 或 JSX 中通过组合这些类名来实现样式定义。
- 对于复杂的组件，我会使用 `@apply` 指令将常用的实用类提取到自定义的 CSS 类中，以减少重复代码。
- 对于全局样式（如重置样式或字体定义），我会在 `index.css` 或 `global.css` 中定义，并通过 `@layer` 指令将其注入到 Tailwind 的基础层（Base Layer）中。

## 如何解决样式冲突的问题

在 Tailwind 中，样式冲突较少，因为它的类名是原子化的，且优先级明确。但在与第三方组件库（如 AntDesign 或 Element UI）结合时，可能会出现样式冲突。下面是解决方式：

- 使用 `@layer` 指令将自定义样式注入到 Tailwind 的组件层（Components Layer）或工具层（Utilities Layer），以确保优先级正确。
- 使用 `!important` 强制覆盖第三方库的样式（不推荐，尽量避免）。
- 通过配置 `tailwind.config.js` 中的 `prefix` 选项，为 Tailwind 的类名添加前缀，避免与第三方库的类名冲突。



# Less.js

## 如何在项目中使用Less

- 在项目中，我通常会将 Less 文件与组件或模块一一对应，例如为每个 React 组件或 Vue 组件创建一个同名的 `.less` 文件。
- 通过 Webpack 或 Vite 的 Less 插件（如 `less-loader`）将 Less 文件编译为 CSS，并在组件中引入编译后的 CSS。

## Less的优势有哪些