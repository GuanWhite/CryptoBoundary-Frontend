

Tailwind CSS home page
v3.4.17
Introducing Catalyst
A modern application UI kit for React
中文文档
博客
网站实例
组件库(shadcn/ui)
Theme
Tailwind CSS on GitHub
Quick search...
Ctrl K
中文文档
组件库
Templates
Screencasts
在线练习场
有用的资源
社区
入门
安装
编辑器设置
Using with Preprocessors
Optimizing for Production
Browser Support
Upgrade Guide
核心概念
Utility-First Fundamentals
Hover, Focus, and Other States
Responsive Design
Dark Mode
Reusing Styles
Adding Custom Styles
Functions & Directives
定制
Configuration
Content
Theme
Screens
Colors
Spacing
Plugins
Presets
Base Styles
Preflight
布局
Aspect Ratio
Container
Columns
Break After
Break Before
Break Inside
Box Decoration Break
Box Sizing
Display
Floats
Clear
Isolation
Object Fit
Object Position
Overflow
Overscroll Behavior
Position
Top / Right / Bottom / Left
Visibility
Z-Index
Flexbox & Grid
Flex Basis
Flex Direction
Flex Wrap
Flex
Flex Grow
Flex Shrink
Order
Grid Template Columns
Grid Column Start / End
Grid Template Rows
Grid Row Start / End
Grid Auto Flow
Grid Auto Columns
Grid Auto Rows
Gap
Justify Content
Justify Items
Justify Self
Align Content
Align Items
Align Self
Place Content
Place Items
Place Self
间隔
Padding
Margin
Space Between
尺寸
Width
Min-Width
Max-Width
Height
Min-Height
Max-Height
Size
排版
Font Family
Font Size
Font Smoothing
Font Style
Font Weight
Font Variant Numeric
Letter Spacing
Line Clamp
Line Height
List Style Image
List Style Position
List Style Type
Text Align
Text Color
Text Decoration
Text Decoration Color
Text Decoration Style
Text Decoration Thickness
Text Underline Offset
Text Transform
Text Overflow
Text Wrap
Text Indent
Vertical Align
Whitespace
Word Break
Hyphens
Content
背景
Background Attachment
Background Clip
Background Color
Background Origin
Background Position
Background Repeat
Background Size
Background Image
Gradient Color Stops
边框
Border Radius
Border Width
Border Color
Border Style
Divide Width
Divide Color
Divide Style
Outline Width
Outline Color
Outline Style
Outline Offset
Ring Width
Ring Color
Ring Offset Width
Ring Offset Color
Effects
Box Shadow
Box Shadow Color
Opacity
Mix Blend Mode
Background Blend Mode
Filters
Blur
Brightness
Contrast
Drop Shadow
Grayscale
Hue Rotate
Invert
Saturate
Sepia
Backdrop Blur
Backdrop Brightness
Backdrop Contrast
Backdrop Grayscale
Backdrop Hue Rotate
Backdrop Invert
Backdrop Opacity
Backdrop Saturate
Backdrop Sepia
表格(Tables)
Border Collapse
Border Spacing
Table Layout
Caption Side
Transitions & Animation
Transition Property
Transition Duration
Transition Timing Function
Transition Delay
Animation
Transforms
Scale
Rotate
Translate
Skew
Transform Origin
Interactivity
Accent Color
Appearance
Cursor
Caret Color
Pointer Events
Resize
Scroll Behavior
Scroll Margin
Scroll Padding
Scroll Snap Align
Scroll Snap Stop
Scroll Snap Type
Touch Action
User Select
Will Change
SVG
Fill
Stroke
Stroke Width
Accessibility
Screen Readers
Forced Color Adjust
官方插件
Typography
Forms
Aspect Ratio
Container Queries
v4.0 Beta Documentation →

Preview the next Tailwind CSS.

Prerelease Documentation

Tailwind CSS v4.0 Beta
Preview what's coming in the next version of Tailwind CSS.

After a long alpha period, we’re pumped to finally promote Tailwind CSS v4.0 to beta!

There are definitely some rough edges and things we want to improve, but we’re confident that we’re not going to make any more breaking changes between now and the stable release.

This documentation is a work-in-progress and we’ll continue to improve it over the course of the beta period, but it should be enough to get you up and running.

If you run into any snags, let us know on GitHub so we can bullet-proof this thing for the stable release a couple months down the road.

​
Getting started
​
Installing with Vite
If you’re using Vite or a Vite-powered framework like SvelteKit or Remix, install Tailwind along with our new dedicated Vite plugin:

Terminal
$ npm install tailwindcss@next @tailwindcss/vite@next
Next, add our Vite plugin to your vite.config.ts file:

vite.config.ts
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    tailwindcss()
  ],
});
Finally, import Tailwind into your main CSS file:

src/index.css
@import "tailwindcss";
​
Installing with PostCSS
If your project uses PostCSS or you’re using a framework like Next.js that supports PostCSS plugins, install Tailwind along with our new dedicated PostCSS plugin:

Terminal
$ npm install tailwindcss@next @tailwindcss/postcss@next
Next, add our PostCSS plugin to your postcss.config.mjs file:

postcss.config.mjs
export default {
  plugins: {
    '@tailwindcss/postcss': {},
  },
};
Finally, import Tailwind into your main CSS file:

app.css
@import "tailwindcss";
​
Installing the CLI
If you want to use our dedicated CLI tool, install Tailwind along with our new dedicated CLI package:

Terminal
$ npm install tailwindcss@next @tailwindcss/cli@next
Next, import Tailwind into your main CSS file:

app.css
@import "tailwindcss";
Then compile your CSS using the CLI tool:

Terminal
$ npx @tailwindcss/cli -i input.css -o output.css
You can also download standalone builds of the new CLI tool from GitHub for projects that don’t otherwise depend on the Node.js ecosystem.

​
Upgrading from v3
If you’d like to try upgrading a project from v3 to the v4 beta releases, you can use our upgrade tool to do the vast majority of the heavy lifting for you:

Terminal
$ npx @tailwindcss/upgrade@next
For most projects, the upgrade tool will automate the entire migration process including updating your dependencies, migrating your configuration file to CSS, and handling any changes to your template files.

The upgrade tool requires Node.js 20 or higher, so ensure your environment is updated before running it.

We recommend running the upgrade tool in a new branch, then carefully reviewing the diff and testing your project in the browser to make sure all of the changes look correct. You may need to tweak a few things by hand in complex projects, but the tool will save you a ton of time either way.

It’s also a good idea to go over all of the breaking changes in v4.0 and get a good understanding of what’s changed, in case there are other things you need to update in your project that the upgrade tool doesn’t catch.

​
What’s new in v4.0
​
New high-performance engine
Tailwind CSS v4.0 is a ground-up rewrite of the framework, taking everything we’ve learned about the architecture over the years and optimizing it to be as fast as possible.

When benchmarking it on our own projects, we’ve found full rebuilds to be over 3.5x faster, and incremental builds to be over 8x faster.

Here are the median build times we saw when we benchmarked Tailwind CSS v4.0 against Catalyst:

v3.4	v4.0 Beta	Improvement
Full build	378ms	100ms	3.78x
Incremental rebuild with new CSS	44ms	5ms	8.8x
Incremental rebuild with no new CSS	35ms	192µs	182x
The most impressive improvement is on incremental builds that don’t actually need to compile any new CSS — these builds are over 100x faster and complete in microseconds. And the longer you work on a project, the more of these builds you run into because you’re just using classes you’ve already used before, like flex, col-span-2, or font-bold.

​
CSS-first configuration
One of the biggest changes in Tailwind CSS v4.0 is the shift from configuring your project in JavaScript to configuring it in CSS.

Instead of a tailwind.config.js file, you can configure all of your customizations directly in the CSS file where you import Tailwind, giving you one less file to worry about in your project:

app.css
@import "tailwindcss";

@theme {
  --font-display: "Satoshi", "sans-serif";

  --breakpoint-3xl: 1920px;

  --color-avocado-100: oklch(0.99 0 0);
  --color-avocado-200: oklch(0.98 0.04 113.22);
  --color-avocado-300: oklch(0.94 0.11 115.03);
  --color-avocado-400: oklch(0.92 0.19 114.08);
  --color-avocado-500: oklch(0.84 0.18 117.33);
  --color-avocado-600: oklch(0.53 0.12 118.34);

  --ease-fluid: cubic-bezier(0.3, 0, 0, 1);
  --ease-snappy: cubic-bezier(0.2, 0, 0, 1);

  /* ... */
}
The new CSS-first configuration lets you do just about everything you could do in your tailwind.config.js file, including configuring your design tokens, setting up content sources, defining custom utilities and variants, installing plugins, and more.

To learn more about how it all works, read the CSS configuration in-depth documentation.

​
CSS theme variables
Tailwind CSS v4.0 takes all of your design tokens and makes them available as CSS variables by default, so you can reference any value you need at run-time using just CSS.

Using the example @theme from earlier, all of these values will be added to your CSS to as regular custom properties:

dist.css
:root {
  --font-display: "Satoshi", "sans-serif";

  --breakpoint-3xl: 1920px;

  --color-avocado-100: oklch(0.99 0 0);
  --color-avocado-200: oklch(0.98 0.04 113.22);
  --color-avocado-300: oklch(0.94 0.11 115.03);
  --color-avocado-400: oklch(0.92 0.19 114.08);
  --color-avocado-500: oklch(0.84 0.18 117.33);
  --color-avocado-600: oklch(0.53 0.12 118.34);

  --ease-fluid: cubic-bezier(0.3, 0, 0, 1);
  --ease-snappy: cubic-bezier(0.2, 0, 0, 1);

  /* ... */
}
This makes it easy to reuse these values as inline styles or pass them to libraries like Motion to animate them.

​
Native CSS cascade layers
We’re using real CSS cascade layers in v4.0, which make it easier than ever to control the precedence of styles and how they interact with each other.

Here’s what the output looks like when you build your CSS with v4.0:

dist.css
@layer theme, base, components, utilities;

@layer theme {
  :root {
    --font-sans: ui-sans-serif, system-ui, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji',
    'Segoe UI Symbol', 'Noto Color Emoji';
    --font-serif: ui-serif, Georgia, Cambria, 'Times New Roman', Times, serif;
    --font-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono',
      'Courier New', monospace;

    /* ... */
  }
}

@layer base {
  *,
  ::after,
  ::before,
  ::backdrop,
  ::file-selector-button {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    border: 0 solid;
  }

  /* ... */
}

@layer utilities {
  .pointer-events-none {
    pointer-events: none;
  }
  .visibility-hidden {
    visibility: hidden;
  }

  /* ... */

  .focus\:outline:focus {
    outline-width: 1px;
  }

  @media (width >= 40rem) {
    @media (hover: hover) {
      .sm\:hover\:opacity-100:hover {
        opacity: 100%;
      }
    }
  }
}
We’ve had layers as a concept in Tailwind for years, but native cascade layers can do things that we couldn’t easily replicate at build-time, like isolating styles within a layer even if they have a higher specificity than styles in another layer. Less code for us to maintain too!

​
Automatic source detection
You know how you always had to configure that annoying content array in Tailwind CSS v3? In v4.0, we came up with a bunch of heuristics for detecting all of that stuff automatically so you don’t have to configure it at all.

For example, we automatically ignore anything in your .gitignore file to avoid scanning dependencies or generated files that aren’t under version control:

.gitignore
# dependencies
/node_modules

# testing
/coverage

# caches
/.next/

# production
/build
We also automatically ignore all binary extensions like images, videos, .zip files, and more.

And if you ever need to explicitly add a source that’s excluded by default, you can always add it with the @source directive, right in your CSS file:

app.css
@import "tailwindcss";
@source "../node_modules/@my-company/ui-lib";
The @source directive uses the same heuristics under the hood, so it will exclude binary file types for example as well, without you having to specify all of the extensions to scan explicitly.

​
Built-in import support
Before v4.0, if you wanted to inline other CSS files using @import you’d have to configure another plugin like postcss-import to handle it for you.

Now we handle this out of the box, so you don’t need any other tools:

postcss.config.mjs
export default {
  plugins: {
    'postcss-import': {},
    '@tailwindcss/postcss': {},
  },
};
Our import system is purpose-built for Tailwind CSS, so we’ve also been able to make it even faster by tightly integrating it with our engine.

​
Built-in CSS transpilation
When building for production, Tailwind CSS v4.0 runs your CSS through Lightning CSS automatically, which handles things like vendor prefixes, modern feature transpilation, minification, and more.

This means you can remove tools like autoprefixer and postcss-preset-env from your project as well:

postcss.config.mjs
export default {
  plugins: {
    '@tailwindcss/postcss': {},
    'postcss-preset-env': {},
    'autoprefixer': {},
  },
};
In v4.0, Tailwind CSS is the only thing you need to set up to handle your entire CSS pipeline — no other tooling required.

​
Simplified theme configuration
In v4.0, we’ve really slimmed down the amount of theme configuration you need to do, especially for things that aren’t really design tokens.

Utilities like grid-cols-12, z-40, and opacity-70 are no longer based on your theme — they just work. Whether you need a 5 column grid or a 73 column grid, you don’t need to configure anything to make it happen.

<div class="grid grid-cols-73">
  <div>1</div>
  <!-- ... -->
  <div>73</div>
</div>
We’ve applied the same simplifications to variants like data-* as well — you don’t need to configure these at all anymore or use arbitrary values for simple boolean attributes:

<div class="opacity-50 data-[selected]:opacity-100" data-selected>
<div class="opacity-50 data-selected:opacity-100" data-selected>
  <!-- ... -->
</div>
These changes mean you touch your theme configuration way less frequently, and it stays focused on the design tokens that matter, like your typography, color palette, and breakpoints.

​
Dynamic spacing scale
We’ve simplified the way spacing utilities like px-*, mt-*, w-*, h-*, and more work by deriving them all from a single spacing scale value, defined as 0.25rem in the default theme:

@theme {
  --spacing: 0.25rem;
}
When you define your spacing scale this way, every multiple of 0.25rem is available in your spacing scale. This means utilities like mt-21 will work with no extra configuration, unlike in v3 where you had to choose between mt-20 and mt-24 or drop down to using an arbitrary value.

And if you want more constraints, you can always disable the --spacing variable and provide your own explicit scale:

@theme {
  --spacing: initial
  --spacing-1: 0.25rem
  --spacing-2: 0.5rem
  --spacing-4: 1rem
  --spacing-8: 2rem
  --spacing-12: 3rem
}
​
Modernized P3 color palette
We’ve upgraded the entire default color palette from rgb to oklch, taking advantage of the wider gamut to make the colors more vivid in places where we were previously limited by the sRGB color space.

We’ve tried to keep the balance between all the colors the same as it was in v3, so even though we’ve refreshed things across the board, it shouldn’t feel like a breaking change when upgrading your existing projects.

​
Simplified variable colors
If you were using CSS variables in your color palette in v3, you might remember having to do weird things like define your colors as just a list of numbers without including the rgb(…) function, or having to use the <alpha-value> placeholder so that opacity modifiers would work.

Thanks to the new CSS color-mix(…) function, none of that is necessary in v4.0 — you just define your colors as variables and all of the opacity modifier features work automatically:

app.css
@import "tailwindcss";

@theme {
  --color-primary: var(--color-blue-500);
  --color-error: var(--color-red-500);

  /* ... */
}
Now when you go to use a utility like bg-primary/50, it just works — no cryptic workarounds necessary:

<div class="bg-primary/50">
  <!-- ... -->
</div>
​
Container query support
We’ve brought container query support into core for v4.0, so you don’t need the @tailwindcss/container-queries plugin anymore:

HTML
<div class="@container">
  <div class="grid grid-cols-1 @sm:grid-cols-3 @lg:grid-cols-4">
    <!-- ... -->
  </div>
</div>
We’ve also added support for max-width container queries using the new @max-* variant:

<div class="@container">
  <div class="grid grid-cols-3 @max-md:grid-cols-1">
    <!-- ... -->
  </div>
</div>
Like our regular breakpoint variants, you can also stack @min-* and @max-* variants to define container query ranges:

<div class="@container">
  <div class="flex @min-md:@max-xl:hidden">
    <!-- ... -->
  </div>
</div>
Browser support for container queries is really great now, and I’m excited to make it even easier to start using them in your projects in v4.0.

​
3D transforms
We’ve finally added APIs for doing 3D transforms, like rotate-x-*, rotate-y-*, scale-z-*, translate-z-*, and tons more.


Mar 16, 2020
Michael Foster
Boost your conversion rate
<div class="perspective-distant">
  <article class="... transform-3d rotate-x-51 rotate-z-43 shadow-xl transition-all duration-500 hover:-translate-y-4 hover:rotate-x-49 hover:rotate-z-38 hover:shadow-2xl">
    <!-- ... -->
  </article>
</div>
Use the transform-3d utility to enable 3D transforms by setting the right transform-style

​
Rotate
Use the rotate-x-*, rotate-y-*, and rotate-z-* utilities to rotate elements in 3D space.

All of these utilities support any numeric value automatically out of the box, but here are a few examples for reference:

Class
Properties
rotate-x-0	transform: rotateX(0deg) var(--tw-rotate-y) var(--tw-rotate-z);
rotate-x-3	transform: rotateX(3deg)  var(--tw-rotate-y) var(--tw-rotate-z);
rotate-x-45	transform: rotateX(45deg) var(--tw-rotate-y) var(--tw-rotate-z);
rotate-x-180	transform: rotateX(180deg) var(--tw-rotate-y) var(--tw-rotate-z);
rotate-y-0	transform: var(--tw-rotate-x) rotateY(0deg) var(--tw-rotate-z);
rotate-y-3	transform: var(--tw-rotate-x) rotateY(3deg) var(--tw-rotate-z);
rotate-y-45	transform: var(--tw-rotate-x) rotateY(45deg) var(--tw-rotate-z);
rotate-y-180	transform: var(--tw-rotate-x) rotateY(180deg) var(--tw-rotate-z);
rotate-z-0	transform: var(--tw-rotate-x) var(--tw-rotate-y) rotateZ(0deg);
rotate-z-3	transform: var(--tw-rotate-x) var(--tw-rotate-y) rotateZ(3deg);
rotate-z-45	transform: var(--tw-rotate-x) var(--tw-rotate-y) rotateZ(45deg);
rotate-z-180	transform: var(--tw-rotate-x) var(--tw-rotate-y) rotateZ(180deg);
​
Scale
Use the new scale-z-* utilities to scale elements on the z-axis.

You can use any numeric value you want automatically out of the box, but here are a few examples for reference:

Class
Properties
scale-z-0	scale: var(--tw-scale-x) var(--tw-scale-y) 0%;
scale-z-50	scale: var(--tw-scale-x) var(--tw-scale-y) 50%;
scale-z-75	scale: var(--tw-scale-x) var(--tw-scale-y) 75%;
scale-z-100	scale: var(--tw-scale-x) var(--tw-scale-y) 100%;
scale-z-125	scale: var(--tw-scale-x) var(--tw-scale-y) 125%;
scale-z-150	scale: var(--tw-scale-x) var(--tw-scale-y) 150%;
scale-z-200	scale: var(--tw-scale-x) var(--tw-scale-y) 200%;
​
Translate
Use the new translate-z-* utilities to move elements closer or further away:

This utility uses your spacing scale by default and supports all of those values out of the box, but here are a few examples for reference:

Class
Properties
translate-z-0	translate: var(--tw-translate-x) var(--tw-translate-y) calc(var(--spacing) * 0;
translate-z-0.5	translate: var(--tw-translate-x) var(--tw-translate-y) calc(var(--spacing) * 0.5;
translate-z-1	translate: var(--tw-translate-x) var(--tw-translate-y) calc(var(--spacing) * 1;
translate-z-2	translate: var(--tw-translate-x) var(--tw-translate-y) calc(var(--spacing) * 2;
translate-z-4	translate: var(--tw-translate-x) var(--tw-translate-y) calc(var(--spacing) * 4;
translate-z-px	translate: var(--tw-translate-x) var(--tw-translate-y) 1px;
​
Perspective
Use utilities like perspective-near, perspective-normal, and perspective-distant along with the new perspective-origin-* utilities to control the perspective used for 3D transforms:

Class
Properties
perspective-dramatic	perspective: 100px;
perspective-near	perspective: 300px;
perspective-normal	perspective: 500px;
perspective-midrange	perspective: 800px;
perspective-distant	perspective: 1200px;
perspective-[760px]	perspective: 760px;
perspective-origin-bottom	perspective-origin: bottom;
perspective-origin-bottom-left	perspective-origin: bottom-left;
perspective-origin-bottom-right	perspective-origin: bottom-right;
perspective-origin-center	perspective-origin: center;
perspective-origin-left	perspective-origin: left;
perspective-origin-right	perspective-origin: right;
perspective-origin-top	perspective-origin: top;
perspective-origin-top-right	perspective-origin: top-right;
perspective-origin-top-left	perspective-origin: top-left;
The perspective-* utilities can all be customized using the --perspective-* namespace in your theme.

​
Backface visibility
Use the new backface-visible and backface-hidden utilities to control whether the back of an element is visible when transformed in 3D space.

Class
Properties
backface-visible	backface-visibility: visible;
backface-hidden	backface-visibility: hidden;
​
Linear gradient angles
Linear gradients now support angles as values, so you can use utilities like bg-linear-45 to create a gradient on a 45 degree angle:

<div class="bg-linear-45 from-indigo-500 via-purple-500 to-pink-500"></div>
You may notice we’ve renamed bg-gradient-* to bg-linear-* too — you’ll see why shortly!

​
Gradient interpolation modifiers
We’ve added the ability to control the color interpolation mode for gradients using a modifier, so a class like bg-linear-to-r/srgb interpolates using sRGB, and bg-linear-to-r/oklch interpolates using OKLCH:

  <div class="bg-linear-to-r/srgb from-indigo-500 to-teal-400"></div>
  <div class="bg-linear-to-r/oklch from-indigo-500 to-teal-400"></div>
Using polar color spaces like OKLCH or HSL can lead to much more vivid gradients when the from-* and to-* colors are far apart on the color wheel. We’re using OKLAB by default in v4.0 but you can always interpolate using a different color space by adding one of these modifiers.

​
Conic and radial gradients
We’ve added new bg-conic-* and bg-radial-* utilities for creating conic and radial gradients:

<div class="bg-conic/[in_hsl_longer_hue] from-red-600 to-red-600 size-24 rounded-full"></div>
<div class="bg-radial-[at_25%_25%] from-white to-zinc-900 to-75% size-24 rounded-full"></div>
These new utilities work alongside the existing from-*, via-*, and to-* utilities to let you create conic and radial gradients the same way you create linear gradients, and include modifiers for setting the color interpolation method and arbitrary value support for controlling details like the gradient position.

​
Inset shadows and rings
We’ve added dedicated inset-shadow-* and inset-ring-* utilities in v4.0 that can be composed with the existing shadow-* and ring-* utilities, giving you four layers of shadows you can stack to create the effects you need for your projects.

Send

Send

<button class="shadow-md inset-shadow-sm inset-shadow-white/20 ring ring-blue-600 inset-ring inset-ring-white/15 ...">
  <!-- ... -->
</button>
The inset-ring-* utilities support any width value just like the ring-* utilities, and the inset-shadow-* utilities ship with 2xs, xs, and sm sizes out of the box. We may add more down the road but those ones feel the most useful right now.

@theme {
  --inset-shadow-2xs: inset 0 1px rgb(0 0 0 / 0.05);
  --inset-shadow-xs: inset 0 1px 1px rgb(0 0 0 / 0.05);
  --inset-shadow-sm: inset 0 2px 4px rgb(0 0 0 / 0.05);
}
Just like the regular shadow-* and ring-* utilities, these both support colors as well using classes like inset-shadow-black/25 and inset-ring-white/50.

​
`field-sizing` utilities
We’ve added utilities for the new field-sizing property that lets you create auto-resizing textareas with just CSS:

Type in the textarea to see the effect

Add your comment
Write something...
<label class="block">
  <span class="block text-sm/6 font-medium text-gray-900 dark:text-white">Add your comment</span>
  <textarea class="field-sizing-content ..."></textarea>
</label>
Use field-sizing-content to make the control resize to fit its contents, or field-sizing-fixed to give the control a fixed size.

​
`color-scheme` utilities
Ever been annoyed that your app was showing light scrollbars in dark mode? You want these new color-scheme utilities.

Scroll the content to see the scrollbar themes

Light mode

It's a Mammal
Right now there are six-hundred Titleists that I got from the driving range in the trunk of my car. Why don't we drive out to Rock-a-Way… and hit `em into the ocean! Now picture this. we find a nice sweet spot between the dunes, we take out our drivers, we tee up and, that ball goes sailing up into the sky holds there for a moment and then.. gulp!

Dark mode

It's a Mammal
Right now there are six-hundred Titleists that I got from the driving range in the trunk of my car. Why don't we drive out to Rock-a-Way… and hit `em into the ocean! Now picture this. we find a nice sweet spot between the dunes, we take out our drivers, we tee up and, that ball goes sailing up into the sky holds there for a moment and then.. gulp!

<div class="grid grid-cols-2">
  <div class="bg-white overflow-y-scroll scheme-light">
     ...
  </div>
  <div class="bg-slate-800 overflow-y-scroll scheme-dark">
     ...
  </div>
</div>
Here’s a full list of all the new APIs:

Class
Properties
scheme-normal	color-scheme: normal;
scheme-dark	color-scheme: dark;
scheme-light	color-scheme: light;
scheme-light-dark	color-scheme: light dark;
scheme-only-dark	color-scheme: only dark;
scheme-only-light	color-scheme: only light;
Throw scheme-light dark:scheme-dark on your html or body element and your scrollbars will always look good, no matter which dark mode strategy you use.

​
`font-stretch` utilities
We’ve added utilities for the new-ish font-stretch property, which helps you style variable fonts that support different widths:

font-stretch-extra-condensed
The quick brown fox jumps over the lazy dog.

font-stretch-condensed
The quick brown fox jumps over the lazy dog.

font-stretch-normal
The quick brown fox jumps over the lazy dog.

font-stretch-expanded
The quick brown fox jumps over the lazy dog.

font-stretch-extra-expanded
The quick brown fox jumps over the lazy dog.

Looks like the name of this is changing to font-width at some point but no browsers actually support it yet, looking forward to dealing with that.

Class
Properties
font-stretch-normal	font-stretch: normal;
font-stretch-ultra-condensed	font-stretch: ultra-condensed;
font-stretch-extra-condensed	font-stretch: extra-condensed;
font-stretch-condensed	font-stretch: condensed;
font-stretch-semi-condensed	font-stretch: semi-condensed;
font-stretch-semi-expanded	font-stretch: semi-expanded;
font-stretch-expanded	font-stretch: expanded;
font-stretch-extra-expanded	font-stretch: extra-expanded;
font-stretch-ultra-expanded	font-stretch: ultra-expanded;
font-stretch-0%	font-stretch: 0%;
font-stretch-50%	font-stretch: 50%;
font-stretch-75%	font-stretch: 75%;
font-stretch-90%	font-stretch: 90%;
font-stretch-95%	font-stretch: 95%;
font-stretch-100%	font-stretch: 100%;
font-stretch-105%	font-stretch: 105%;
font-stretch-110%	font-stretch: 110%;
font-stretch-125%	font-stretch: 125%;
font-stretch-150%	font-stretch: 150%;
font-stretch-200%	font-stretch: 200%;
​
Composable variants
In the new v4.0 engine, certain variants can be chained with other variants, letting you use simple named APIs for things that needed complex arbitrary variants in v3:

<div class="group">
  <div class="group-has-[&[data-potato]]:opacity-100">
  <div class="group-has-data-potato:opacity-100">
    <!-- ... -->
  </div>
  <div data-potato>
    <!-- ... -->
  </div>
</div>
This works with any variant where it makes sense, including group-*, peer-*, has-*, and the new not-* and in-* variants. You can chain as many of them as you want, so even totally useless classes like group-not-has-peer-not-data-active:underline will generate real CSS.

​
`@starting-style` variant
The new starting variant adds support for the new CSS @starting-style feature, making it possible to transition element properties when an element is first displayed:

Click the button to see the popover animate in


<div>
  <button popovertarget="my-popover">Check for updates</button>
  <div popover id="my-popover" class="opacity-0 transition-all duration-500 transition-discrete open:opacity-100 starting:open:opacity-0">
    <!-- ... -->
  </div>
</div>
​
`not-*` variant
The new not-* variant adds support for the :not(…) pseudo-class, letting you style things when certain conditions are not true.

For example, only adding hover styles to a button when the button is not focused:

<button class="bg-indigo-600 hover:not-focus:bg-indigo-700">
  <!-- ... -->
</button>
You can also combine the not-* variant with media query variants like forced-colors to only style an element when forced colors mode is not active:

<input type="radio" class="not-forced-colors:appearance-none" />
It works with supports-* variants too, so you can style an element based on the lack of browser support for a specific CSS feature:

<div class="not-supports-[display:grid]:flex">
  <!-- ... -->
</div>
​
`inert` variant
The new inert variant lets you style elements marked with the inert attribute:

<main inert class="inert:opacity-50 inert:blur">
  <!-- ... -->
</main>
This is useful for adding visual cues that make it clear that an element isn’t interactive.

​
`nth-*` variants
We’ve added four new variants for the :nth-child(…), :nth-last-child(…), :nth-of-type(…), and :nth-last-of-type(…) pseudo-classes:

<div class="nth-3:underline">…</div>
<div class="nth-last-5:underline">…</div>
<div class="nth-of-type-4:underline">…</div>
<div class="nth-last-of-type-6:underline">…</div>
You can pass any number you want to these by default, and use arbitrary values for more complex expressions like nth-[2n+1_of_li].

​
`in-*` variant
You know our group-* variants like group-focus? The new in-* variant is just like that except you don’t need to add group to the parent element:

<div tabindex="0" class="group">
  <div class="opacity-50 group-focus:opacity-100">
<div tabindex="0">
  <div class="opacity-50 in-focus:opacity-100">
    <!-- ... -->
  </div>
</div>
You’ll still want the group-* stuff a lot of the time when you need fine control, but this will save you some characters the rest of the time.

​
`:popover-open` support
We’ve updated our existing open variant to target the :popover-open pseudo-class as well as the [open] attribute:

<div>
  <button popovertarget="my-popover">Open Popover</button>
  <div popover id="my-popover" class="opacity-0 open:opacity-100 ...">
    <!-- ... -->
  </div>
</div>
I’m sure I’m eventually going to regret not making it a separate popover-open variant but I thought really hard about it and couldn’t think of any situations where an element would use both [open] and :popover-open and have different styles for each condition. Someone is going to update the spec and screw me on this one down the road though for sure.

​
Descendant variant
You know the * variant we shipped a while ago for targeting direct children?

<ul class="*:p-4">
  <li>One</li>
  <li>Two</li>
  <li>Three</li>
</ul>
In v4.0 we’ve added a new ** variant for targeting all descendants — most useful in my opinion if you combine it with another variant for narrowing the thing you’re selecting:

<div class="**:data-avatar:rounded-full">
  <div>
    <img src="…" data-avatar /> <!-- This element will be round -->
  </div>
  <p>…</p>
</div>
Fun fact — the syntax is inspired by globs, for better or for worse.

​
CSS configuration in-depth
​
Customizing your theme
To customize your theme in Tailwind CSS v4.0, use the new @theme directive directly in your CSS:

@import "tailwindcss";

@theme {
  --font-display: "Satoshi", "sans-serif";

  --breakpoint-3xl: 1920px;

  --color-avocado-100: oklch(0.99 0 0);
  --color-avocado-200: oklch(0.98 0.04 113.22);
  --color-avocado-300: oklch(0.94 0.11 115.03);
  --color-avocado-400: oklch(0.92 0.19 114.08);
  --color-avocado-500: oklch(0.84 0.18 117.33);
  --color-avocado-600: oklch(0.53 0.12 118.34);

  --ease-fluid: cubic-bezier(0.3, 0, 0, 1);
  --ease-snappy: cubic-bezier(0.2, 0, 0, 1);

  /* ... */
}
Each CSS variable you define here tells Tailwind to make new utilities and variants available based on those values, letting you use classes like font-display, 3xl:max-w-xl, text-avocado-400, and hover:ease-fluid in your markup:

<div class="max-w-lg 3xl:max-w-xl">
  <h1 class="font-display text-4xl">
    Data to <span class="text-avocado-400">enrich</span> your online business
  </h1>
</div>
Each set of variables is part of a namespace that links them to the corresponding utilities, for example the font size utilities reference the --font-* namespace, all of the color utilities reference the --color-* namespace, and the transition-timing-function utilities reference the --ease-* namespace.

For a full list, see the theme namespace reference.

​
Overriding the default theme
By default, adding new CSS variables behaves like extend in Tailwind CSS v3:

@import "tailwindcss";

@theme {
  /* These values are added in addition to the defaults */
  --font-display: "Satoshi", "sans-serif";
  --breakpoint-3xl: 1920px;
}
To override an entire namespace, unset the namespace using syntax like --font-*: initial:

@import "tailwindcss";

@theme {
  --font-*: initial;
  --font-display: "Satoshi", "sans-serif";
}
Now the default font-sans, font-serif, and font-mono utilities won’t exist in your project and font-display will be the only available font family utility.

You can also unset the entire default theme using --*: initial if you want to start completely from scratch:

@import "tailwindcss";

@theme {
  --*: initial;
}
This will remove all of the default design tokens, including all of the default fonts, the typography scale, the color palette, and more.

​
Configuring default line heights for font-size utilities
To set the default line height, font weight, or letter spacing for a custom font size, add a supporting variable using double-dashes like --text-big--line-height:

@theme {
  --text-big: 16rem;
  --text-big--line-height: 18rem;
  --text-big--font-weight: 550;
  --text-big--letter-spacing: -0.025em;
}
​
Configuring animations and keyframes
By default, Tailwind CSS v4.0 preserves any custom @keyframes rules you add to your CSS, even if you don’t use the corresponding animation utilities in your project.

To make sure unused @keyframes rules are removed, configure them under @theme instead of at the root of your CSS:

@theme {
  --animate-marquee: marquee 3s linear infinite;

  @keyframes marquee {
    to {
      transform: translateY(-50%);
    }
  }
}
​
Namespace reference
Since we’ve dramatically simplified theme configuration in Tailwind CSS v4.0, you’ll only generally work with these namespaces:

Namespace	Utilities
--color-*	Color utilities like bg-white, text-black, or fill-blue-500
--font-*	Font family utilities like font-sans
--text-*	Font size utilities like text-sm
--font-weight-*	Font weight utilities like font-bold
--tracking-*	Letter spacing utilities like tracking-tight
--leading-*	Line height utilities like leading-relaxed
--spacing-*	Spacing and sizing utilities like pt-5, mr-2, and h-8
--breakpoint-*	Breakpoint variants like md:*  and lg:*
--container-*	Container query variants like @md:* and width utilities like w-sm and max-w-lg
--radius-*	Border radius utilities like rounded-md
--shadow-*	Box shadow utilities like shadow-lg
--inset-shadow-*	Inset box shadow utilities like inset-shadow-sm
--drop-shadow-*	Drop shadow utilities like drop-shadow-xl
--ease-*	Transition timing function utilities like ease-out
--animate-*	Animation utilities like animate-spin
If you need more fine-grained control, most utilities can also be configured under a namespace that matches the CSS property name. For example custom background-image utilities like bg-grid-pattern can be configured using --background-image-grid-pattern: url(…).

​
Configuring dark mode
By default, the dark variant in Tailwind CSS v4.0 uses the prefers-color-scheme media query.

If you want to use a selector-based strategy in your project for dark mode, override the dark variant with the selector you want to use:

@import "tailwindcss";
@variant dark (&:where(.dark, .dark *));
​
Configuring source detection
If the automatic source detection in Tailwind CSS v4.0 is too broad and including files you don’t want it to include (maybe you’re working in a large monorepo for example), you can use the source(…) function when importing Tailwind to specify the base path for automatic source detection:

@import "tailwindcss" source("../src");
This path should be relative to the CSS file where it’s used.

​
Adding content sources
If you need to add additional content sources that aren’t being picked up by default (like something that is in your .gitignore file), add it using @source:

@import "tailwindcss";
@source "../node_modules/@my-company/ui-lib/src/components";
For situations like this, it can also be helpful to export a CSS file from your library and move the @source directive there instead so you can just import the CSS file:

/node_modules/@my-company/ui-lib/index.css
@source "./src/components";
app.css
@import "tailwindcss";
@import "@my-company/ui-lib";
The @source directive can also be useful when you’re using the Vite plugin but need to include content sources that aren’t naturally part of the module graph, like PHP templates in a Laravel project:

@import "tailwindcss";
@source "../../resources/views";
@source "../../app";
​
Disabling source detection
If you need disable automatic source detection for any reason, use source(none) when importing Tailwind:

@import "tailwindcss" source(none);
With source detection disabled, you can then just use @source to configure all of your content sources explicitly.

​
Disabling Preflight
If you need to disable Tailwind’s base styles, you can import the pieces of Tailwind that you need separately:

@layer theme, base, components, utilities;
@import "tailwindcss/theme" layer(theme);
@import "tailwindcss/utilities" layer(utilities);
​
Using a prefix
To prefix your utilities and theme variables to avoid conflicts with existing CSS, use the prefix(…) function when importing Tailwind:

@import "tailwindcss" prefix(tw);
Prefixes work a little differently than in v3 — now they look like variants and are always at the beginning of the class name:

<div class="tw:flex tw:bg-red-500 tw:hover:bg-red-600">
  <!-- ... -->
</div>
When using a prefix, you should still configure your theme variables as if you aren’t using a prefix:

app.css
@import "tailwindcss" prefix(tw);

@theme {
  --font-display: "Satoshi", "sans-serif";

  --breakpoint-3xl: 1920px;

  --color-avocado-100: oklch(0.99 0 0);
  --color-avocado-200: oklch(0.98 0.04 113.22);
  --color-avocado-300: oklch(0.94 0.11 115.03);

  /* ... */
}
The generated CSS variables will include a prefix though to avoid conflicts with any existing variables in your project:

dist.css
:root {
  --tw-font-display: "Satoshi", "sans-serif";

  --tw-breakpoint-3xl: 1920px;

  --tw-color-avocado-100: oklch(0.99 0 0);
  --tw-color-avocado-200: oklch(0.98 0.04 113.22);
  --tw-color-avocado-300: oklch(0.94 0.11 115.03);

  /* ... */
}
​
Adding custom utilities
To add a custom utility in v4.0, use the new @utility directive:

@import "tailwindcss";

@utility tab-4 {
  tab-size: 4;
}
Custom utilities are automatically inserted into the utilities layer along with all of the built-in utilities in the framework.

​
Adding custom variants
To add a custom variant in v4.0, use the new @variant directive:

@import "tailwindcss";

@variant pointer-coarse (@media (pointer: coarse));
@variant theme-midnight (&:where([data-theme="midnight"] *));
This lets you write utilities like pointer-coarse:size-48 and theme-midnight:bg-slate-900.

​
Using plugins
To load a plugin in v4.0, use the the new @plugin directive:

@import "tailwindcss";

@plugin "@tailwindcss/typography";
The @plugin directive takes either a package name or a local path.

​
Using legacy configuration files
To use an existing JS configuration file in v4.0, load it with the @config directive:

@import "tailwindcss";

@config "../../tailwind.config.js";
Note that not every feature of the JS config is supported in v4.0. Options like corePlugins, important, and separator will likely not be supported at all in the stable v4.0 release, and options like safelist may return but with differences in behavior.

​
Using `@apply` in Vue/Svelte
If you want to use @apply in the <style> block of a Vue or Svelte component, you will need to import your theme configuration to make those values available in that context.

To do this without duplicating the CSS variables in your CSS output, use theme(reference) when importing your theme:

<template>
  <h1>Hello world!</h1>
</template>

<style>
  @import "../../my-theme.css" theme(reference);

  h1 {
    @apply font-bold text-2xl text-red-500;
  }
</style>
If you’re just using the default theme, you can import "tailwindcss/theme" directly:

<template>
  <h1>Hello world!</h1>
</template>

<style>
  @import "tailwindcss/theme" theme(reference);

  h1 {
    @apply font-bold text-2xl text-red-500;
  }
</style>
​
Changes from v3
Tailwind CSS v4.0 is a new major version of the framework, and while we strive to preserve backward compatibility as much as possible, there are several breaking changes we’ve had to make to make the improvements we wanted for the new release.

To make the upgrade as painless as possible, we’ve built a really awesome migration tool that will automate basically all of these changes for you.

To upgrade your project automatically, run the upgrade tool from your project root on the command-line:

Terminal
$ npx @tailwindcss/upgrade@next
Once it’s done, review all of the changes and test your project to make sure everything is working as expected, and with any luck you’ll be off to the races.

But here’s a list of all of the changes in detail in case you run into issues using the migration tool.

​
Dependency changes
​
Using PostCSS
In Tailwind CSS v3, the tailwindcss package was a PostCSS plugin, but in v4.0 the PostCSS plugin lives in a dedicated @tailwindcss/postcss package.

Tailwind CSS v4.0 also handles CSS imports and vendor prefixing for you, so you can remove postcss-import and autoprefixer if they are in your project:

postcss.config.mjs
export default {
  plugins: {
    'postcss-import': {},
    'tailwindcss': {},
    'autoprefixer': {},
    '@tailwindcss/postcss': {},
  },
};
​
Using Vite
If you’re using Vite, we recommend migrating from the PostCSS plugin to our new dedicated Vite plugin:

vite.config.ts
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    tailwindcss()
  ],
});
​
Using Tailwind CLI
In v4.0, Tailwind CLI lives in a dedicated @tailwindcss/cli package. Update any of your build commands to use the new package instead:

npx tailwindcss -i input.css -o output.css
npx @tailwindcss/cli -i input.css -o output.css
​
Removed `@tailwind` directives
In Tailwind CSS v4.0, you import Tailwind using a regular CSS @import statement, not using the @tailwind directives you used in v3:

@tailwind base;
@tailwind components;
@tailwind utilities;
@import "tailwindcss";
​
Removed deprecated utilities
We’ve removed any utilities that were deprecated in v3 and have been undocumented for several years. Here’s a list of what’s been removed along with the modern alternative:

Deprecated	Replacement
bg-opacity-*	Use opacity modifiers like bg-black/50
text-opacity-*	Use opacity modifiers like text-black/50
border-opacity-*	Use opacity modifiers like border-black/50
divide-opacity-*	Use opacity modifiers like divide-black/50
ring-opacity-*	Use opacity modifiers like ring-black/50
placeholder-opacity-*	Use opacity modifiers like placeholder-black/50
flex-shrink-*	shrink-*
flex-grow-*	grow-*
overflow-ellipsis	text-ellipsis
decoration-slice	box-decoration-slice
decoration-clone	box-decoration-clone
​
Configuring the `container` utility
In v3, the container utility had several configuration options like center and padding that no longer exist in v4.0. To customize the container utility in v4.0, extend it with @utility:

@import "tailwindcss";

@utility container {
  margin-inline: auto;
  padding-inline: 2rem;
}
​
Default shadow scale changes
We’ve shifted things around a bit in the default shadow scales to make sure every shadow utility has a named value.

To do this, we’ve renamed shadow to shadow-sm, shadow-sm to shadow-xs, drop-shadow to drop-shadow-sm, and drop-shadow-sm to drop-shadow-xs:

v3	v4
shadow-sm	shadow-xs
shadow	shadow-sm
drop-shadow-sm	drop-shadow-xs
drop-shadow	drop-shadow-sm
The shadow and drop-shadow utilities will still work for backward compatibility, but shadow-sm and drop-shadow-sm will look different in your project if you don’t replace each instance with shadow-xs and drop-shadow-xs instead.

​
Default blur scale changes
We’ve shifted things around a bit in the default blur scale to make sure every blur utility has a named value.

To do this, we’ve renamed blur to blur-sm, and blur-sm to blur-xs:

v3	v4
blur-sm	blur-xs
blur	blur-sm
The blur utility will still work for backward compatibility, but blur-sm will look different in your project if you don’t replace each instance with blur-xs instead.

​
Default radius scale changes
We’ve shifted things around a bit in the default border radius scale to make sure every border radius utility has a named value.

To do this, we’ve renamed rounded to rounded-sm, and rounded-sm to rounded-xs:

v3	v4
rounded-sm	rounded-xs
rounded	rounded-sm
The rounded utility will still work for backward compatibility, but rounded-sm will look different in your project if you don’t replace each instance with rounded-xs instead.

​
Default border color change
In v3, borders used your configured gray-200 color by default. We’ve updated this in v4 to be just currentColor, which matches the default behavior of all browsers.

To update your project for this change, make sure anywhere you’re using a border color utility anywhere you’re using the border utility, or add these lines of CSS to your project to preserve the v3 behavior:

@import "tailwindcss";

@layer base {
  *,
  ::after,
  ::before,
  ::backdrop,
  ::file-selector-button {
    border-color: var(--color-gray-200, currentColor);
  }
}
​
Default ring width change
In v3, the ring utility added a 3px ring. We’ve changed this in v4 to be 1px to make it consistent with borders and outlines.

To update your project for this change, replace any usage of ring with ring-3:

<div class="ring ring-blue-500">
<div class="ring-3 ring-blue-500">
  <!-- ... -->
</div>
​
Default placeholder change
In v3, placeholder text used your configured gray-400 color by default. We’ve simplified this in v4 to just use the current text color at 50% opacity.

You probably won’t even notice this change (it might even make your project look better), but if you want to preserve the v3 behavior, add this CSS to your project:

@import "tailwindcss";

@layer base {
  input::placeholder,
  textarea::placeholder {
    color: theme(--color-gray-400);
  }
}
​
`outline-none` to `outline-hidden`
In v3, the outline-none utility was actually a complex class that didn’t just set outline-style: none:

/* v3 */
.outline-none {
  outline: 2px solid transparent;
  outline-offset: 2px;
}
What it really did was add an invisible 2px outline that would still show up in forced colors mode for accessibility reasons.

We’ve simplified this in v4.0 and now outline-none just sets outline-style: none like you’d expect:

/* v4 */
.outline-none {
  outline-style: none;
}
We’ve added a new outline-hidden utility that does what outline-none did in v3, since it’s still a very useful feature.

To update your project for this change, replace any use of outline-none with outline-hidden, unless you really do want outline-style: none:

<input class="focus:outline-none">
<input class="focus:outline-hidden">
​
Adding custom utilities
In v3, any custom classes you defined within @layer utilities would get picked up by Tailwind as a true utility class and would automatically work with variants like hover, focus, or lg.

In v4.0 we are using native cascade layers and no longer hijacking the @layer at-rule, so we’ve introduced the @utility API as a replacement:

@layer utilities {
  .tab-4 {
    tab-size: 4;
  }
}
@utility tab-4 {
  tab-size: 4;
}
Custom utilities must be a single class name in v4.0 and not a complex selector. If your custom utility is more complex than a single class name, use nesting to define the utility:

@utility scrollbar-hidden {
  &::-webkit-scrollbar {
    display: none;
  }
}
​
Stacking order-sensitive variants
In v3, stacked variants were applied from right to left, but in v4 we’ve updated them to apply left to right to look more like CSS syntax.

To update your project for this change, reverse the order of any order-sensitive stacked variants in your project:

<ul class="py-4 first:*:pt-0 last:*:pb-0">
<ul class="py-4 *:first:pt-0 *:last:pb-0">
  <li>One</li>
  <li>Two</li>
  <li>Three</li>
</ul>
You likely have very few of these if any — the direct child variant (*) and any typography plugin variants (prose-headings) are the most likely ones you might be using, and even then it’s only if you’ve stacked them with other variants.

​
CSS variables in arbitrary values
In v3 you were able to use CSS variables as arbitrary values without var(…), but recent updates to CSS mean that this can often be ambiguous, so we’ve changed the syntax for this in v4.0 to use parentheses instead of square brackets.

To update your project for this change, replace usage of the old variable shorthand syntax with the new variable shorthand syntax:

<div class="bg-[--brand-color]">
<div class="bg-(--brand-color)">
  <!-- ... -->
</div>
​
Referencing theme values in JS
In v3 we exported a resolveConfig function that you could use to turn your JS config into a flat object that you could use in your other JavaScript.

We’ve removed this in v4 in hopes that people can use the CSS variables we generate directly instead, which is much simpler and will significantly reduce your bundle size.

​
Hover styles ignored on mobile
In v4.0 we’ve updated the hover variant to only apply when the primary input device supports hover:

@media (hover: hover) {
  .hover\:underline:hover {
    text-decoration: underline;
  }
}
This can create problems if you’ve built your site in a way that depends on touch devices triggering hover on tap. If this is an issue for you, you can override the hover variant with your own variant that uses the old implementation:

@import "tailwindcss";

@variant hover (&:hover);
Generally though I’d recommend treating hover functionality as an enhancement, and not depending on it for your site to work since touch devices don’t truly have the ability to hover.

​
Core plugins cannot be disabled
In v3 there was a corePlugins option you could use to completely disable certain utilities in the framework. This is no longer supported in v4.0, but we’re planning to explore different ideas for solving the same type of problems that feature was often used to solve in later beta releases.

​
Using the `theme()` function
Since Tailwind CSS v4.0 includes CSS variables for all of your theme values, we recommend using those variables instead of the theme() function whenever possible:

@import "tailwindcss";

.my-class {
  background-color: theme(colors.red.500);
  background-color: var(--color-red-500);
}
For cases where you still need to use the theme() function (like in media queries where CSS variables aren’t supported), you should use the CSS variable name instead of the old dot notation:

@import "tailwindcss";

@media (width >= theme(screens.xl)) {
@media (width >= theme(--breakpoint-xl)) {
  /* ... */
}
​
Using a JavaScript config file
JavaScript config files are still supported for backward compatibility, but they are no longer detected automatically in v4.0.

If you still need to use a JavaScript config file, make sure to load it explicitly using @config:

@import "tailwindcss";
@config "../../tailwind.config.js";
Copyright © 2025 Tailwind Labs Inc.

Trademark Policy

Edit this page on GitHub
On this page
Getting started
Installing with Vite
Installing with PostCSS
Installing the CLI
Upgrading from v3
What's new in v4.0
New high-performance engine
CSS-first configuration
CSS theme variables
Native CSS cascade layers
Automatic source detection
Built-in import support
Built-in CSS transpilation
Simplified theme configuration
Dynamic spacing scale
Modernized P3 color palette
Simplified variable colors
Container query support
3D transforms
Linear gradient angles
Gradient interpolation modifiers
Conic and radial gradients
Inset shadows and rings
`field-sizing` utilities
`color-scheme` utilities
`font-stretch` utilities
Composable variants
`@starting-style` variant
`not-*` variant
`inert` variant
`nth-*` variants
`in-*` variant
`:popover-open` support
Descendant variant
CSS configuration in-depth
Customizing your theme
Configuring dark mode
Configuring source detection
Adding content sources
Disabling source detection
Disabling Preflight
Using a prefix
Adding custom utilities
Adding custom variants
Using plugins
Using legacy configuration files
Using `@apply` in Vue/Svelte
Changes from v3
Dependency changes
Removed `@tailwind` directives
Removed deprecated utilities
Configuring the `container` utility
Default shadow scale changes
Default blur scale changes
Default radius scale changes
Default border color change
Default ring width change
Default placeholder change
`outline-none` to `outline-hidden`
Adding custom utilities
Stacking order-sensitive variants
CSS variables in arbitrary values
Referencing theme values in JS
Hover styles ignored on mobile
Core plugins cannot be disabled
Using the `theme()` function
Using a JavaScript config file
Refactoring UI by Adam Wathan and Steve Schoger
From the creators of Tailwind CSS

Make your ideas look awesome, without relying on a designer.

“This is the survival kit I wish I had when I started building apps.”
Derrick Reimer, SavvyCal


Tailwind CSS home page
v3.4.17
Introducing Catalyst
A modern application UI kit for React
中文文档
博客
网站实例
组件库(shadcn/ui)
Theme
Tailwind CSS on GitHub
Quick search...
Ctrl K
中文文档
组件库
Templates
Screencasts
在线练习场
有用的资源
社区
入门
安装
编辑器设置
Using with Preprocessors
Optimizing for Production
Browser Support
Upgrade Guide
核心概念
Utility-First Fundamentals
Hover, Focus, and Other States
Responsive Design
Dark Mode
Reusing Styles
Adding Custom Styles
Functions & Directives
定制
Configuration
Content
Theme
Screens
Colors
Spacing
Plugins
Presets
Base Styles
Preflight
布局
Aspect Ratio
Container
Columns
Break After
Break Before
Break Inside
Box Decoration Break
Box Sizing
Display
Floats
Clear
Isolation
Object Fit
Object Position
Overflow
Overscroll Behavior
Position
Top / Right / Bottom / Left
Visibility
Z-Index
Flexbox & Grid
Flex Basis
Flex Direction
Flex Wrap
Flex
Flex Grow
Flex Shrink
Order
Grid Template Columns
Grid Column Start / End
Grid Template Rows
Grid Row Start / End
Grid Auto Flow
Grid Auto Columns
Grid Auto Rows
Gap
Justify Content
Justify Items
Justify Self
Align Content
Align Items
Align Self
Place Content
Place Items
Place Self
间隔
Padding
Margin
Space Between
尺寸
Width
Min-Width
Max-Width
Height
Min-Height
Max-Height
Size
排版
Font Family
Font Size
Font Smoothing
Font Style
Font Weight
Font Variant Numeric
Letter Spacing
Line Clamp
Line Height
List Style Image
List Style Position
List Style Type
Text Align
Text Color
Text Decoration
Text Decoration Color
Text Decoration Style
Text Decoration Thickness
Text Underline Offset
Text Transform
Text Overflow
Text Wrap
Text Indent
Vertical Align
Whitespace
Word Break
Hyphens
Content
背景
Background Attachment
Background Clip
Background Color
Background Origin
Background Position
Background Repeat
Background Size
Background Image
Gradient Color Stops
边框
Border Radius
Border Width
Border Color
Border Style
Divide Width
Divide Color
Divide Style
Outline Width
Outline Color
Outline Style
Outline Offset
Ring Width
Ring Color
Ring Offset Width
Ring Offset Color
Effects
Box Shadow
Box Shadow Color
Opacity
Mix Blend Mode
Background Blend Mode
Filters
Blur
Brightness
Contrast
Drop Shadow
Grayscale
Hue Rotate
Invert
Saturate
Sepia
Backdrop Blur
Backdrop Brightness
Backdrop Contrast
Backdrop Grayscale
Backdrop Hue Rotate
Backdrop Invert
Backdrop Opacity
Backdrop Saturate
Backdrop Sepia
表格(Tables)
Border Collapse
Border Spacing
Table Layout
Caption Side
Transitions & Animation
Transition Property
Transition Duration
Transition Timing Function
Transition Delay
Animation
Transforms
Scale
Rotate
Translate
Skew
Transform Origin
Interactivity
Accent Color
Appearance
Cursor
Caret Color
Pointer Events
Resize
Scroll Behavior
Scroll Margin
Scroll Padding
Scroll Snap Align
Scroll Snap Stop
Scroll Snap Type
Touch Action
User Select
Will Change
SVG
Fill
Stroke
Stroke Width
Accessibility
Screen Readers
Forced Color Adjust
官方插件
Typography
Forms
Aspect Ratio
Container Queries
v4.0 Beta Documentation →

Preview the next Tailwind CSS.

尺寸

Width
Utilities for setting the width of an element.

​
Quick reference
Class
Properties
w-0	width: 0px;
w-px	width: 1px;
w-0.5	width: 0.125rem; /* 2px */
w-1	width: 0.25rem; /* 4px */
w-1.5	width: 0.375rem; /* 6px */
w-2	width: 0.5rem; /* 8px */
w-2.5	width: 0.625rem; /* 10px */
w-3	width: 0.75rem; /* 12px */
w-3.5	width: 0.875rem; /* 14px */
w-4	width: 1rem; /* 16px */
w-5	width: 1.25rem; /* 20px */
w-6	width: 1.5rem; /* 24px */
w-7	width: 1.75rem; /* 28px */
w-8	width: 2rem; /* 32px */
w-9	width: 2.25rem; /* 36px */
w-10	width: 2.5rem; /* 40px */
w-11	width: 2.75rem; /* 44px */
w-12	width: 3rem; /* 48px */
w-14	width: 3.5rem; /* 56px */
w-16	width: 4rem; /* 64px */
w-20	width: 5rem; /* 80px */
w-24	width: 6rem; /* 96px */
w-28	width: 7rem; /* 112px */
w-32	width: 8rem; /* 128px */
w-36	width: 9rem; /* 144px */
w-40	width: 10rem; /* 160px */
w-44	width: 11rem; /* 176px */
w-48	width: 12rem; /* 192px */
w-52	width: 13rem; /* 208px */
w-56	width: 14rem; /* 224px */
w-60	width: 15rem; /* 240px */
w-64	width: 16rem; /* 256px */
w-72	width: 18rem; /* 288px */
w-80	width: 20rem; /* 320px */
w-96	width: 24rem; /* 384px */
w-auto	width: auto;
w-1/2	width: 50%;
w-1/3	width: 33.333333%;
w-2/3	width: 66.666667%;
w-1/4	width: 25%;
w-2/4	width: 50%;
w-3/4	width: 75%;
w-1/5	width: 20%;
w-2/5	width: 40%;
w-3/5	width: 60%;
w-4/5	width: 80%;
w-1/6	width: 16.666667%;
w-2/6	width: 33.333333%;
w-3/6	width: 50%;
w-4/6	width: 66.666667%;
w-5/6	width: 83.333333%;
w-1/12	width: 8.333333%;
w-2/12	width: 16.666667%;
w-3/12	width: 25%;
w-4/12	width: 33.333333%;
w-5/12	width: 41.666667%;
w-6/12	width: 50%;
w-7/12	width: 58.333333%;
w-8/12	width: 66.666667%;
w-9/12	width: 75%;
w-10/12	width: 83.333333%;
w-11/12	width: 91.666667%;
w-full	width: 100%;
w-screen	width: 100vw;
w-svw	width: 100svw;
w-lvw	width: 100lvw;
w-dvw	width: 100dvw;
w-min	width: min-content;
w-max	width: max-content;
w-fit	width: fit-content;
​
Basic usage
​
Fixed widths
Use utilities like w-px, w-1, and w-64 to set an element to a fixed width.

w-96
w-80
w-64
w-48
w-40
w-32
w-24
<div class="w-96 ...">w-96</div>
<div class="w-80 ...">w-80</div>
<div class="w-64 ...">w-64</div>
<div class="w-48 ...">w-48</div>
<div class="w-40 ...">w-40</div>
<div class="w-32 ...">w-32</div>
<div class="w-24 ...">w-24</div>
​
Percentage widths
Use utilities like w-full, w-1/2, and w-2/5 to set an element to a percentage based width.

w-1/2
w-1/2
w-2/5
w-3/5
w-1/3
w-2/3
w-1/4
w-3/4
w-1/5
w-4/5
w-1/6
w-5/6
w-full
<div class="flex ...">
  <div class="w-1/2 ... ">w-1/2</div>
  <div class="w-1/2 ... ">w-1/2</div>
</div>
<div class="flex ...">
  <div class="w-2/5 ...">w-2/5</div>
  <div class="w-3/5 ...">w-3/5</div>
</div>
<div class="flex ...">
  <div class="w-1/3 ...">w-1/3</div>
  <div class="w-2/3 ...">w-2/3</div>
</div>
<div class="flex ...">
  <div class="w-1/4 ...">w-1/4</div>
  <div class="w-3/4 ...">w-3/4</div>
</div>
<div class="flex ...">
  <div class="w-1/5 ...">w-1/5</div>
  <div class="w-4/5 ...">w-4/5</div>
</div>
<div class="flex ...">
  <div class="w-1/6 ...">w-1/6</div>
  <div class="w-5/6 ...">w-5/6</div>
</div>
<div class="w-full ...">w-full</div>
​
Viewport width
Use w-screen to make an element span the entire width of the viewport.

<div class="w-screen">
  <!-- ... -->
</div>
​
Resetting the width
The w-auto utility can be useful if you need to remove an element’s assigned width under a specific condition, like at a particular breakpoint:

<div class="w-full md:w-auto">
  <!-- ... -->
</div>
​
Applying conditionally
​
Hover, focus, and other states
Tailwind lets you conditionally apply utility classes in different states using variant modifiers. For example, use hover:w-full to only apply the w-full utility on hover.

<div class="w-1/2 hover:w-full">
  <!-- ... -->
</div>
For a complete list of all available state modifiers, check out the Hover, Focus, & Other States documentation.

​
Breakpoints and media queries
You can also use variant modifiers to target media queries like responsive breakpoints, dark mode, prefers-reduced-motion, and more. For example, use md:w-full to apply the w-full utility at only medium screen sizes and above.

<div class="w-1/2 md:w-full">
  <!-- ... -->
</div>
To learn more, check out the documentation on Responsive Design, Dark Mode and other media query modifiers.

​
Using custom values
​
Customizing your theme
By default, Tailwind’s width scale is a combination of the default spacing scale as well as some additional values specific to widths.

You can customize your spacing scale by editing theme.spacing or theme.extend.spacing in your tailwind.config.js file.

tailwind.config.js
module.exports = {
  theme: {
    extend: {
      spacing: {
        '128': '32rem',
      }
    }
  }
}
To customize width separately, use the theme.width section of your tailwind.config.js file.

tailwind.config.js
module.exports = {
  theme: {
    extend: {
      width: {
        '128': '32rem',
      }
    }
  }
}
Learn more about customizing the default theme in the theme customization documentation.

​
Arbitrary values
If you need to use a one-off width value that doesn’t make sense to include in your theme, use square brackets to generate a property on the fly using any arbitrary value.

<div class="w-[32rem]">
  <!-- ... -->
</div>
Learn more about arbitrary value support in the arbitrary values documentation.

Space Between
Min-Width
Copyright © 2025 Tailwind Labs Inc.

Trademark Policy

Edit this page on GitHub
On this page
Quick reference
Basic usage
Fixed widths
Percentage widths
Viewport width
Resetting the width
Applying conditionally
Hover, focus, and other states
Breakpoints and media queries
Using custom values
Customizing your theme
Arbitrary values
Refactoring UI by Adam Wathan and Steve Schoger
From the creators of Tailwind CSS

Make your ideas look awesome, without relying on a designer.

“This is the survival kit I wish I had when I started building apps.”
Derrick Reimer, SavvyCal
Width - TailwindCSS中文文档 | TailwindCSS中文网


Tailwind CSS home page
v3.4.17
Introducing Catalyst
A modern application UI kit for React
中文文档
博客
网站实例
组件库(shadcn/ui)
Theme
Tailwind CSS on GitHub
Quick search...
Ctrl K
中文文档
组件库
Templates
Screencasts
在线练习场
有用的资源
社区
入门
安装
编辑器设置
Using with Preprocessors
Optimizing for Production
Browser Support
Upgrade Guide
核心概念
Utility-First Fundamentals
Hover, Focus, and Other States
Responsive Design
Dark Mode
Reusing Styles
Adding Custom Styles
Functions & Directives
定制
Configuration
Content
Theme
Screens
Colors
Spacing
Plugins
Presets
Base Styles
Preflight
布局
Aspect Ratio
Container
Columns
Break After
Break Before
Break Inside
Box Decoration Break
Box Sizing
Display
Floats
Clear
Isolation
Object Fit
Object Position
Overflow
Overscroll Behavior
Position
Top / Right / Bottom / Left
Visibility
Z-Index
Flexbox & Grid
Flex Basis
Flex Direction
Flex Wrap
Flex
Flex Grow
Flex Shrink
Order
Grid Template Columns
Grid Column Start / End
Grid Template Rows
Grid Row Start / End
Grid Auto Flow
Grid Auto Columns
Grid Auto Rows
Gap
Justify Content
Justify Items
Justify Self
Align Content
Align Items
Align Self
Place Content
Place Items
Place Self
间隔
Padding
Margin
Space Between
尺寸
Width
Min-Width
Max-Width
Height
Min-Height
Max-Height
Size
排版
Font Family
Font Size
Font Smoothing
Font Style
Font Weight
Font Variant Numeric
Letter Spacing
Line Clamp
Line Height
List Style Image
List Style Position
List Style Type
Text Align
Text Color
Text Decoration
Text Decoration Color
Text Decoration Style
Text Decoration Thickness
Text Underline Offset
Text Transform
Text Overflow
Text Wrap
Text Indent
Vertical Align
Whitespace
Word Break
Hyphens
Content
背景
Background Attachment
Background Clip
Background Color
Background Origin
Background Position
Background Repeat
Background Size
Background Image
Gradient Color Stops
边框
Border Radius
Border Width
Border Color
Border Style
Divide Width
Divide Color
Divide Style
Outline Width
Outline Color
Outline Style
Outline Offset
Ring Width
Ring Color
Ring Offset Width
Ring Offset Color
Effects
Box Shadow
Box Shadow Color
Opacity
Mix Blend Mode
Background Blend Mode
Filters
Blur
Brightness
Contrast
Drop Shadow
Grayscale
Hue Rotate
Invert
Saturate
Sepia
Backdrop Blur
Backdrop Brightness
Backdrop Contrast
Backdrop Grayscale
Backdrop Hue Rotate
Backdrop Invert
Backdrop Opacity
Backdrop Saturate
Backdrop Sepia
表格(Tables)
Border Collapse
Border Spacing
Table Layout
Caption Side
Transitions & Animation
Transition Property
Transition Duration
Transition Timing Function
Transition Delay
Animation
Transforms
Scale
Rotate
Translate
Skew
Transform Origin
Interactivity
Accent Color
Appearance
Cursor
Caret Color
Pointer Events
Resize
Scroll Behavior
Scroll Margin
Scroll Padding
Scroll Snap Align
Scroll Snap Stop
Scroll Snap Type
Touch Action
User Select
Will Change
SVG
Fill
Stroke
Stroke Width
Accessibility
Screen Readers
Forced Color Adjust
官方插件
Typography
Forms
Aspect Ratio
Container Queries
v4.0 Beta Documentation →

Preview the next Tailwind CSS.

尺寸

Max-Width
Utilities for setting the maximum width of an element.

​
Quick reference
Class
Properties
max-w-0	max-width: 0px;
max-w-px	max-width: 1px;
max-w-0.5	max-width: 0.125rem; /* 2px */
max-w-1	max-width: 0.25rem; /* 4px */
max-w-1.5	max-width: 0.375rem; /* 6px */
max-w-2	max-width: 0.5rem; /* 8px */
max-w-2.5	max-width: 0.625rem; /* 10px */
max-w-3	max-width: 0.75rem; /* 12px */
max-w-3.5	max-width: 0.875rem; /* 14px */
max-w-4	max-width: 1rem; /* 16px */
max-w-5	max-width: 1.25rem; /* 20px */
max-w-6	max-width: 1.5rem; /* 24px */
max-w-7	max-width: 1.75rem; /* 28px */
max-w-8	max-width: 2rem; /* 32px */
max-w-9	max-width: 2.25rem; /* 36px */
max-w-10	max-width: 2.5rem; /* 40px */
max-w-11	max-width: 2.75rem; /* 44px */
max-w-12	max-width: 3rem; /* 48px */
max-w-14	max-width: 3.5rem; /* 56px */
max-w-16	max-width: 4rem; /* 64px */
max-w-20	max-width: 5rem; /* 80px */
max-w-24	max-width: 6rem; /* 96px */
max-w-28	max-width: 7rem; /* 112px */
max-w-32	max-width: 8rem; /* 128px */
max-w-36	max-width: 9rem; /* 144px */
max-w-40	max-width: 10rem; /* 160px */
max-w-44	max-width: 11rem; /* 176px */
max-w-48	max-width: 12rem; /* 192px */
max-w-52	max-width: 13rem; /* 208px */
max-w-56	max-width: 14rem; /* 224px */
max-w-60	max-width: 15rem; /* 240px */
max-w-64	max-width: 16rem; /* 256px */
max-w-72	max-width: 18rem; /* 288px */
max-w-80	max-width: 20rem; /* 320px */
max-w-96	max-width: 24rem; /* 384px */
max-w-none	max-width: none;
max-w-xs	max-width: 20rem; /* 320px */
max-w-sm	max-width: 24rem; /* 384px */
max-w-md	max-width: 28rem; /* 448px */
max-w-lg	max-width: 32rem; /* 512px */
max-w-xl	max-width: 36rem; /* 576px */
max-w-2xl	max-width: 42rem; /* 672px */
max-w-3xl	max-width: 48rem; /* 768px */
max-w-4xl	max-width: 56rem; /* 896px */
max-w-5xl	max-width: 64rem; /* 1024px */
max-w-6xl	max-width: 72rem; /* 1152px */
max-w-7xl	max-width: 80rem; /* 1280px */
max-w-full	max-width: 100%;
max-w-min	max-width: min-content;
max-w-max	max-width: max-content;
max-w-fit	max-width: fit-content;
max-w-prose	max-width: 65ch;
max-w-screen-sm	max-width: 640px;
max-w-screen-md	max-width: 768px;
max-w-screen-lg	max-width: 1024px;
max-w-screen-xl	max-width: 1280px;
max-w-screen-2xl	max-width: 1536px;
​
Basic usage
​
Setting the maximum width
Set the maximum width of an element using the max-w-* utilities.

max-w-96
max-w-80
max-w-64
max-w-48
max-w-40
max-w-32
max-w-24
<div>
  <div class="w-full max-w-96 ...">max-w-96</div>
  <div class="w-full max-w-80 ...">max-w-80</div>
  <div class="w-full max-w-64 ...">max-w-64</div>
  <div class="w-full max-w-48 ...">max-w-48</div>
  <div class="w-full max-w-40 ...">max-w-40</div>
  <div class="w-full max-w-32 ...">max-w-32</div>
  <div class="w-full max-w-24 ...">max-w-24</div>
</div>
​
Sizing large elements
Above 24rem, the max-w-* utilities use a named scale instead of a numeric scale to make the values easier to guess.


Andrew Alfred
Assistant to the Traveling Secretary
<div class="max-w-md ...">
  <!-- ... -->
</div>
​
Reading width
The max-w-prose utility gives an element a max-width optimized for readability and adapts based on the font size.

text-sm
Oh yeah. It's the best part. It's crunchy, it's explosive, it's where the muffin breaks free of the pan and sort of does it's own thing. I'll tell you. That's a million dollar idea right there. Just sell the tops.

text-base
Oh yeah. It's the best part. It's crunchy, it's explosive, it's where the muffin breaks free of the pan and sort of does it's own thing. I'll tell you. That's a million dollar idea right there. Just sell the tops.

text-xl
Oh yeah. It's the best part. It's crunchy, it's explosive, it's where the muffin breaks free of the pan and sort of does it's own thing. I'll tell you. That's a million dollar idea right there. Just sell the tops.

<div class="text-sm max-w-prose ...">
  <p>Oh yeah. It's the best part. It's crunchy, it's explosive, it's where the muffin breaks free of the pan and sort of does it's own thing. I'll tell you. That's a million dollar idea right there. Just sell the tops.</p>
</div>

<div class="text-base max-w-prose ...">
  <p>Oh yeah. It's the best part. It's crunchy, it's explosive, it's where the muffin breaks free of the pan and sort of does it's own thing. I'll tell you. That's a million dollar idea right there. Just sell the tops.</p>
</div>

<div class="text-xl max-w-prose ...">
  <p>Oh yeah. It's the best part. It's crunchy, it's explosive, it's where the muffin breaks free of the pan and sort of does it's own thing. I'll tell you. That's a million dollar idea right there. Just sell the tops.</p>
</div>
​
Constraining to your breakpoints
The max-w-screen-* classes can be used to give an element a max-width matching a specific breakpoint. These values are automatically derived from the theme.screens section of your tailwind.config.js file.

<div class="max-w-screen-2xl">
  <!-- ... -->
</div>
​
Applying conditionally
​
Hover, focus, and other states
Tailwind lets you conditionally apply utility classes in different states using variant modifiers. For example, use hover:max-w-lg to only apply the max-w-lg utility on hover.

<div class="max-w-sm hover:max-w-lg">
  <!-- ... -->
</div>
For a complete list of all available state modifiers, check out the Hover, Focus, & Other States documentation.

​
Breakpoints and media queries
You can also use variant modifiers to target media queries like responsive breakpoints, dark mode, prefers-reduced-motion, and more. For example, use md:max-w-lg to apply the max-w-lg utility at only medium screen sizes and above.

<div class="max-w-sm md:max-w-lg">
  <!-- ... -->
</div>
To learn more, check out the documentation on Responsive Design, Dark Mode and other media query modifiers.

​
Using custom values
​
Customizing your theme
By default, Tailwind’s maximum width scale is a combination of the default spacing scale as well as an additional set of named sizes for large elements exclusive to the max-w-* utilities.

You can customize values in the global spacing scale by editing theme.spacing or theme.extend.spacing in your tailwind.config.js file.

tailwind.config.js
module.exports = {
  theme: {
    extend: {
      spacing: {
        '128': '32rem',
      }
    }
  }
}
To customize values for just the max-w-* utilities, use the theme.maxWidth section of your tailwind.config.js file.

tailwind.config.js
module.exports = {
  theme: {
    extend: {
      maxWidth: {
        '8xl': '96rem',
      }
    }
  }
}
Note that values defined in theme.maxWidth take precedence over values defined in theme.spacing, so adding a custom value to theme.spacing that matches one of the default named sizes (like lg or xl) will not affect the corresponding max-w-* utility.

Don’t override named sizes under theme.spacing

tailwind.config.js
module.exports = {
  theme: {
    extend: {
      spacing: {
        'lg': '30rem',
      }
    }
  }
}
Use theme.maxWidth to override named sizes

tailwind.config.js
module.exports = {
  theme: {
    extend: {
      maxWidth: {
        'lg': '30rem',
      }
    }
  }
}
​
Arbitrary values
If you need to use a one-off max-width value that doesn’t make sense to include in your theme, use square brackets to generate a property on the fly using any arbitrary value.

<div class="max-w-[220px]">
  <!-- ... -->
</div>
Learn more about arbitrary value support in the arbitrary values documentation.

Min-Width
Height
Copyright © 2025 Tailwind Labs Inc.

Trademark Policy

Edit this page on GitHub
On this page
Quick reference
Basic usage
Setting the maximum width
Sizing large elements
Reading width
Constraining to your breakpoints
Applying conditionally
Hover, focus, and other states
Breakpoints and media queries
Using custom values
Customizing your theme
Arbitrary values
Refactoring UI by Adam Wathan and Steve Schoger
From the creators of Tailwind CSS

Make your ideas look awesome, without relying on a designer.

“This is the survival kit I wish I had when I started building apps.”
Derrick Reimer, SavvyCal
Max-Width - TailwindCSS中文文档 | TailwindCSS中文网


Tailwind CSS home page
v3.4.17
Introducing Catalyst
A modern application UI kit for React
中文文档
博客
网站实例
组件库(shadcn/ui)
Theme
Tailwind CSS on GitHub
Quick search...
Ctrl K
中文文档
组件库
Templates
Screencasts
在线练习场
有用的资源
社区
入门
安装
编辑器设置
Using with Preprocessors
Optimizing for Production
Browser Support
Upgrade Guide
核心概念
Utility-First Fundamentals
Hover, Focus, and Other States
Responsive Design
Dark Mode
Reusing Styles
Adding Custom Styles
Functions & Directives
定制
Configuration
Content
Theme
Screens
Colors
Spacing
Plugins
Presets
Base Styles
Preflight
布局
Aspect Ratio
Container
Columns
Break After
Break Before
Break Inside
Box Decoration Break
Box Sizing
Display
Floats
Clear
Isolation
Object Fit
Object Position
Overflow
Overscroll Behavior
Position
Top / Right / Bottom / Left
Visibility
Z-Index
Flexbox & Grid
Flex Basis
Flex Direction
Flex Wrap
Flex
Flex Grow
Flex Shrink
Order
Grid Template Columns
Grid Column Start / End
Grid Template Rows
Grid Row Start / End
Grid Auto Flow
Grid Auto Columns
Grid Auto Rows
Gap
Justify Content
Justify Items
Justify Self
Align Content
Align Items
Align Self
Place Content
Place Items
Place Self
间隔
Padding
Margin
Space Between
尺寸
Width
Min-Width
Max-Width
Height
Min-Height
Max-Height
Size
排版
Font Family
Font Size
Font Smoothing
Font Style
Font Weight
Font Variant Numeric
Letter Spacing
Line Clamp
Line Height
List Style Image
List Style Position
List Style Type
Text Align
Text Color
Text Decoration
Text Decoration Color
Text Decoration Style
Text Decoration Thickness
Text Underline Offset
Text Transform
Text Overflow
Text Wrap
Text Indent
Vertical Align
Whitespace
Word Break
Hyphens
Content
背景
Background Attachment
Background Clip
Background Color
Background Origin
Background Position
Background Repeat
Background Size
Background Image
Gradient Color Stops
边框
Border Radius
Border Width
Border Color
Border Style
Divide Width
Divide Color
Divide Style
Outline Width
Outline Color
Outline Style
Outline Offset
Ring Width
Ring Color
Ring Offset Width
Ring Offset Color
Effects
Box Shadow
Box Shadow Color
Opacity
Mix Blend Mode
Background Blend Mode
Filters
Blur
Brightness
Contrast
Drop Shadow
Grayscale
Hue Rotate
Invert
Saturate
Sepia
Backdrop Blur
Backdrop Brightness
Backdrop Contrast
Backdrop Grayscale
Backdrop Hue Rotate
Backdrop Invert
Backdrop Opacity
Backdrop Saturate
Backdrop Sepia
表格(Tables)
Border Collapse
Border Spacing
Table Layout
Caption Side
Transitions & Animation
Transition Property
Transition Duration
Transition Timing Function
Transition Delay
Animation
Transforms
Scale
Rotate
Translate
Skew
Transform Origin
Interactivity
Accent Color
Appearance
Cursor
Caret Color
Pointer Events
Resize
Scroll Behavior
Scroll Margin
Scroll Padding
Scroll Snap Align
Scroll Snap Stop
Scroll Snap Type
Touch Action
User Select
Will Change
SVG
Fill
Stroke
Stroke Width
Accessibility
Screen Readers
Forced Color Adjust
官方插件
Typography
Forms
Aspect Ratio
Container Queries
v4.0 Beta Documentation →

Preview the next Tailwind CSS.

排版

Font Size
Utilities for controlling the font size of an element.

​
Quick reference
Class
Properties
text-xs	font-size: 0.75rem; /* 12px */
line-height: 1rem; /* 16px */
text-sm	font-size: 0.875rem; /* 14px */
line-height: 1.25rem; /* 20px */
text-base	font-size: 1rem; /* 16px */
line-height: 1.5rem; /* 24px */
text-lg	font-size: 1.125rem; /* 18px */
line-height: 1.75rem; /* 28px */
text-xl	font-size: 1.25rem; /* 20px */
line-height: 1.75rem; /* 28px */
text-2xl	font-size: 1.5rem; /* 24px */
line-height: 2rem; /* 32px */
text-3xl	font-size: 1.875rem; /* 30px */
line-height: 2.25rem; /* 36px */
text-4xl	font-size: 2.25rem; /* 36px */
line-height: 2.5rem; /* 40px */
text-5xl	font-size: 3rem; /* 48px */
line-height: 1;
text-6xl	font-size: 3.75rem; /* 60px */
line-height: 1;
text-7xl	font-size: 4.5rem; /* 72px */
line-height: 1;
text-8xl	font-size: 6rem; /* 96px */
line-height: 1;
text-9xl	font-size: 8rem; /* 128px */
line-height: 1;
​
Basic usage
​
Setting the font size
Use the text-* utilities to control the font size of an element.

text-sm
The quick brown fox jumps over the lazy dog.

text-base
The quick brown fox jumps over the lazy dog.

text-lg
The quick brown fox jumps over the lazy dog.

text-xl
The quick brown fox jumps over the lazy dog.

text-2xl
The quick brown fox jumps over the lazy dog.

<p class="text-sm ...">The quick brown fox ...</p>
<p class="text-base ...">The quick brown fox ...</p>
<p class="text-lg ...">The quick brown fox ...</p>
<p class="text-xl ...">The quick brown fox ...</p>
<p class="text-2xl ...">The quick brown fox ...</p>
​
Setting the line-height
Set an element’s line-height at the same time you set the font size by adding a line-height modifier to any font size utility. For example, use text-xl/8 to set a font size of 1.25rem with a line-height of 2rem.

text-base/6
So I started to walk into the water. I won't lie to you boys, I was terrified. But I pressed on, and as I made my way past the breakers a strange calm came over me. I don't know if it was divine intervention or the kinship of all living things but I tell you Jerry at that moment, I was a marine biologist.

text-base/7
So I started to walk into the water. I won't lie to you boys, I was terrified. But I pressed on, and as I made my way past the breakers a strange calm came over me. I don't know if it was divine intervention or the kinship of all living things but I tell you Jerry at that moment, I was a marine biologist.

text-base/loose
So I started to walk into the water. I won't lie to you boys, I was terrified. But I pressed on, and as I made my way past the breakers a strange calm came over me. I don't know if it was divine intervention or the kinship of all living things but I tell you Jerry at that moment, I was a marine biologist.

<p class="text-base/6 ...">So I started to walk into the water...</p>
<p class="text-base/7 ...">So I started to walk into the water...</p>
<p class="text-base/loose ...">So I started to walk into the water...</p>
You can use any value defined in your line-height scale, or use arbitrary values if you need to deviate from your design tokens.

<p class="text-sm/[17px] ..."></p>
​
Applying conditionally
​
Hover, focus, and other states
Tailwind lets you conditionally apply utility classes in different states using variant modifiers. For example, use hover:text-base to only apply the text-base utility on hover.

<p class="text-sm hover:text-base">
  <!-- ... -->
</p>
For a complete list of all available state modifiers, check out the Hover, Focus, & Other States documentation.

​
Breakpoints and media queries
You can also use variant modifiers to target media queries like responsive breakpoints, dark mode, prefers-reduced-motion, and more. For example, use md:text-base to apply the text-base utility at only medium screen sizes and above.

<p class="text-sm md:text-base">
  <!-- ... -->
</p>
To learn more, check out the documentation on Responsive Design, Dark Mode and other media query modifiers.

​
Using custom values
​
Customizing your theme
You can configure your own custom set of font size utilities using the theme.fontSize section of your tailwind.config.js file.

tailwind.config.js
module.exports = {
  theme: {
    fontSize: {
      sm: '0.8rem',
      base: '1rem',
      xl: '1.25rem',
      '2xl': '1.563rem',
      '3xl': '1.953rem',
      '4xl': '2.441rem',
      '5xl': '3.052rem',
    }
  }
}
Learn more about customizing the default theme in the theme customization documentation.

​
Providing a default line-height
Tailwind’s default theme configures a sensible default line-height for each font-size utility. You can configure your own default line heights when using custom font sizes by defining each size using a tuple of the form [fontSize, lineHeight] in your tailwind.config.js file.

tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    fontSize: {
      sm: ['14px', '20px'],
      base: ['16px', '24px'],
      lg: ['20px', '28px'],
      xl: ['24px', '32px'],
    }
  }
}
You can also specify a default line height using the object syntax, which allows you to also provide default letter-spacing and font-weight values. You can do this using a tuple of the form [fontSize, { lineHeight?, letterSpacing?, fontWeight? }].

tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    fontSize: {
      '2xl': ['1.5rem', {
        lineHeight: '2rem',
        letterSpacing: '-0.01em',
        fontWeight: '500',
      }],
      '3xl': ['1.875rem', {
        lineHeight: '2.25rem',
        letterSpacing: '-0.02em',
        fontWeight: '700',
      }],
    }
  }
}
​
Arbitrary values
If you need to use a one-off font-size value that doesn’t make sense to include in your theme, use square brackets to generate a property on the fly using any arbitrary value.

<p class="text-[14px]">
  <!-- ... -->
</p>
Learn more about arbitrary value support in the arbitrary values documentation.

Font Family
Font Smoothing
Copyright © 2025 Tailwind Labs Inc.

Trademark Policy

Edit this page on GitHub
On this page
Quick reference
Basic usage
Setting the font size
Setting the line-height
Applying conditionally
Hover, focus, and other states
Breakpoints and media queries
Using custom values
Customizing your theme
Arbitrary values
Refactoring UI by Adam Wathan and Steve Schoger
From the creators of Tailwind CSS

Make your ideas look awesome, without relying on a designer.

“This is the survival kit I wish I had when I started building apps.”
Derrick Reimer, SavvyCal
Font Size - TailwindCSS中文文档 | TailwindCSS中文网

