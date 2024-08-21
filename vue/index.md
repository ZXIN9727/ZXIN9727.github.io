# 基础

## 介绍

Vue是一套用于构建用户界面的渐进式框架。与其它大型框架不同的是，Vue 被设计为可以自底向上逐层应用。Vue
的核心库只关注视图层，不仅易于上手，还便于与第三方库或既有项目整合。另一方面，当与现代化的工具链以及各种支持类库结合使用时，Vue
也完全能够为复杂的单页应用提供驱动。

[vue2官方指南](https://v2.cn.vuejs.org/)

[vue官方指南](https://cn.vuejs.org/)

CDN:

```html
<!-- Vue2 开发环境版本，包含了有帮助的命令行警告 -->
<script src="https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js"></script>

<!-- Vue2 生产环境版本，优化了尺寸和速度 -->
<script src="https://cdn.jsdelivr.net/npm/vue@2"></script>
```

## Vue 数据

当一个 Vue 实例被创建时，它将 data 对象中的所有的 property 加入到 Vue 的响应式系统中。当这些 property
的值发生改变时，视图将会产生“响应”，即匹配更新为新的值。

```js
var vm = new Vue({
    data() {
        return {
            a: '1'
        }
    },

    method: {
        print() {
            console.log(a)
        }
    }
})
```

## 生命周期

每个 Vue 实例在被创建时都要经过一系列的初始化过程——例如，需要设置数据监听、编译模板、将实例挂载到 DOM 并在数据变化时更新
DOM 等。同时在这个过程中也会运行一些叫做生命周期钩子的函数，这给了用户在不同阶段添加自己的代码的机会。

比如 `created` 钩子可以用来在一个实例被创建之后执行代码：

```js
new Vue({
    data() {
        a: 1
    },

    created: function () {
        // `this` 指向 vm 实例
        console.log('a is: ' + this.a)
    }
})
// => "a is: 1"
```

![img.png](img.png)

> 不要在选项 property 或回调上使用箭头函数，比如 `created: () => console.log(this.a)`
> 或 `vm.$watch('a', newValue => this.myMethod())`。因为箭头函数并没有 `this`，`this`
> 会作为变量一直向上级词法作用域查找，直至找到为止，经常导致 `Uncaught TypeError: Cannot read property of undefined`
> 或 `Uncaught TypeError: this.myMethod is not a function` 之类的错误。

## 插值

### 文本

数据绑定最常见的形式就是使用&lbrace;&lbrace; &rbrace;&rbrace;语法的文本插值：

```vue
<span>Message: {{ msg }}</span>
```

&lbrace;&lbrace; &rbrace;&rbrace;标签将会被替代为对应数据对象上 msg property 的值。无论何时，绑定的数据对象上 msg property
发生了改变，插值处的内容都会更新。

通过使用 `v-once` 指令，也能执行一次性地插值，当数据改变时，插值处的内容不会更新。但请留心这会影响到该节点上的其它数据绑定：

```vue
<span v-once>这个将不会改变: {{ msg }}</span>
```

### 原始HTML

双大括号会将数据解释为普通文本，而非 HTML 代码。为了输出真正的 HTML，需要使用 `v-html` 指令：

```vue
<p>Using mustaches: {{ rawHtml }}</p>
<p>Using v-html directive: <span v-html="rawHtml"></span></p>
```

> 站点上动态渲染的任意 HTML 可能会非常危险，因为它很容易导致 XSS 攻击。请只对可信内容使用 HTML 插值，绝不要对用户提供的内容使用插值。

### 属性

双大括号不能作用在 HTML attribute 上，遇到这种情况应该使用 `v-bind` 指令：

```vue

<div v-bind:id="dynamicId"></div>
<button v-bind:disabled="isButtonDisabled">Button</button>
```

对于布尔 attribute (它们只要存在就意味着值为 true)，v-bind 工作起来略有不同，如果 isButtonDisabled 的值是 null、undefined 或
false，则 disabled attribute 甚至不会被包含在渲染出来的 `<button> `元素中。

### javaScript表达式

对于所有的数据绑定，Vue.js 都提供了完全的 JavaScript 表达式支持。

```vue
{{ number + 1 }}

{{ ok ? 'YES' : 'NO' }}

{{ message.split('').reverse().join('') }}

<div v-bind:id="'list-' + id"></div>
```

这些表达式会在所属 Vue 实例的数据作用域下作为 JavaScript 被解析。有个限制就是，每个绑定都只能包含单个表达式，所以下面的例子都不会生效。

```vue
<!-- 这是语句，不是表达式 -->
{{ var a = 1 }}

<!-- 流控制也不会生效，请使用三元表达式 -->
{{ if (ok) { return message } }}
```

> 模板表达式都被放在沙盒中，只能访问全局变量的一个白名单，如 `Math` 和 `Date` 。不应该在模板表达式中试图访问用户定义的全局变量。

## 指令

指令是带有 v- 前缀的特殊属性。指令属性的值预期是单个 JavaScript 表达式 (v-for 例外)。指令的职责是，当表达式的值改变时，将其产生的连带影响，响应式地作用于
DOM。

```vue
<p v-if="seen">现在你看到我了</p>
```

这里，`v-if` 指令将根据表达式 seen 的值的真假来插入/移除 `<p>` 元素。

### 参数

一些指令能够接收一个“参数”，在指令名称之后以冒号表示。例如，v-bind 指令可以用于响应式地更新 HTML 属性：

```vue
<a v-bind:href="url">...</a>
```

在这里 href 是参数，告知 `v-bind` 指令将该元素的 href 属性 与表达式 url 的值绑定。

```vue
<a v-on:click="doSomething">...</a>
```

`v-on` 指令，它用于监听 DOM 事件,在这里参数是监听的事件名。

### 动态参数

> 2.6新增特性

用方括号括起来的 JavaScript 表达式作为一个指令的参数：

```vue
<a v-bind:[attributeName]="url"> ... </a>
```

这里的 attributeName 会被作为一个 JavaScript 表达式进行动态求值，求得的值将会作为最终的参数来使用。例如，如果 Vue 实例有一个
data property attributeName，其值为 "href"，那么这个绑定将等价于 `v-bind:href`。

```vue
<a v-on:[eventName]="doSomething"> ... </a>
```

当 eventName 的值为 "focus" 时，`v-on:[eventName]` 将等价于 `v-on:focus`

**对动态参数的值的约束**

动态参数预期会求出一个字符串，异常情况下值为 null。这个特殊的 null 值可以被显性地用于移除绑定。任何其它非字符串类型的值都将会触发一个警告。

**对动态参数表达式的约束**

动态参数表达式有一些语法约束，因为某些字符，如空格和引号，放在 HTML attribute 名里是无效的。例如

```vue
<!-- 这会触发一个编译警告 -->
<a v-bind:['foo' + bar]="value"> ... </a>
```

变通的办法是使用没有空格或引号的表达式，或用计算属性替代这种复杂表达式。

在 DOM 中使用模板时 (直接在一个 HTML 文件里撰写模板)，还需要避免使用大写字符来命名键名，因为浏览器会把 attribute
名全部强制转为小写：

```vue
<!--
在 DOM 中使用模板时这段代码会被转换为 `v-bind:[someattr]`。
除非在实例中有一个名为“someattr”的 property，否则代码不会工作。
-->
<a v-bind:[someAttr]="value"> ... </a>
```

### 修饰符

修饰符是以半角句号 `.` 指明的特殊后缀，用于指出一个指令应该以特殊方式绑定。例如，`.prevent` 修饰符告诉 `v-on`
指令对于触发的事件调用 `event.preventDefault()`：

```vue

<form v-on:submit.prevent="onSubmit">...</form>
```

### 缩写

**`v-bind` 缩写**

```vue
<!-- 完整语法 -->
<a v-bind:href="url">...</a>

<!-- 缩写 -->
<a :href="url">...</a>

<!-- 动态参数的缩写 (2.6.0+) -->
<a :[key]="url"> ... </a>
```

**`v-on` 缩写**

```vue
<!-- 完整语法 -->
<a v-on:click="doSomething">...</a>

<!-- 缩写 -->
<a @click="doSomething">...</a>

<!-- 动态参数的缩写 (2.6.0+) -->
<a @[event]="doSomething"> ... </a>
```

它们看起来可能与普通的 HTML 略有不同，但 `:` 与 `@`对于 attribute 名来说都是合法字符，在所有支持 Vue
的浏览器都能被正确地解析。而且，它们不会出现在最终渲染的标记中。

## 计算属性和侦听器

### 计算属性

```html

<div id="example">
    <p>Original message: "{{ message }}"</p>
    <p>Computed reversed message: "{{ reversedMessage }}"</p>
</div>
```

```js
var vm = new Vue({
    el: '#example',
    data: {
        message: 'Hello'
    },
    computed: {
// 计算属性的 getter
        reversedMessage() {
// `this` 指向 vm 实例
            return this.message.split('').reverse().join('')
        }
    }
})
```

上面的例子中，声明了一个计算属性 reversedMessage。提供的函数将用作 property vm.reversedMessage 的 getter 函数，可以像绑定普通
property 一样在模板中绑定计算属性。Vue 知道 vm.reversedMessage 依赖于 vm.message，因此当 vm.message 发生改变时，所有依赖
vm.reversedMessage 的绑定也会更新。

#### 计算属性的setter

```js
// ...
computed: {
    fullName: {
        get() {
            return this.firstName + ' ' + this.lastName
        }
        set(newValue) {
            var names = newValue.split(' ')
            this.firstName = names[0]
            this.lastName = names[names.length - 1]
        }
    }
}
```

现在 vm.fullName 被修改时，setter 会被调用，vm.firstName 和 vm.lastName 也会相应地被更新。

### 侦听器

```js
var vm = new Vue({
    el: '#example',
    data: {
        message: 'Hello',
        reversedMessage: 'olleH'
    },
    watch: {
        // 如果message属性发生变化，这个函数就会运行
        message(newVal, oldVal) {
            this.reversedMessage = newVal.split('').reverse().join('')
        }
    }
})
```

### 计算属性缓存 vs 方法

可以将同一函数定义为一个方法而不是一个计算属性。两种方式的最终结果确实是完全相同的。然而，不同的是计算属性是基于它们的响应式依赖进行缓存的。只在相关响应式依赖发生改变时它们才会重新求值。

### 计算属性 vs 侦听属性

虽然计算属性在大多数情况下更合适，但有时也需要一个自定义的侦听器。这就是为什么 Vue 通过 watch 选项提供了一个更通用的方法，来响应数据的变化。当需要在数据变化时执行异步或开销较大的操作时，这个方式是最有用的。
侦听器能获取变化前的数据

## class 与 style绑定

在将 `v-bind` 用于 class 和 style 时，Vue.js 做了专门的增强。表达式结果的类型除了字符串之外，还可以是对象或数组。

### 绑定HTML class

#### 对象语法
```html
<div class="static" v-bind:class="{ active: isActive, 'text-danger': hasError }"></div>
```
```js
data: {
  isActive: true,
  hasError: false
}
```
 结果为：
```html
<div class="static active"></div>
```

绑定的对象可以不必内联定义在模板里，也可以是计算属性：
```html
<div v-bind:class="classObject"></div>
```
```javascript
data: {
  isActive: true,
  error: null
},
computed: {
  classObject: function () {
    return {
      active: this.isActive && !this.error,
      'text-danger': this.error && this.error.type === 'fatal'
    }
  }
}
```
#### 数组语法
```html
<div v-bind:class="[activeClass, errorClass]"></div>
```
```javascript
data: {
  activeClass: 'active',
  errorClass: 'text-danger'
}
```

渲染的结果为：

```html
<div class="active text-danger"></div>
```

想根据条件切换列表中的 class，可以用三元表达式或在数组语法中也可以使用对象语法
```html
<div v-bind:class="[isActive ? activeClass : '', errorClass]"></div>

<div v-bind:class="[{ active: isActive }, errorClass]"></div>
```

#### 用在组件上
对于下面这个已经申明的组件：
```js
Vue.component('my-component', {
  template: '<p class="foo bar">Hi</p>'
})
```
在使用的时候添加class
```html
<my-component class="baz boo"></my-component>
```

最终渲染的结果是：

```html
<p class="foo bar baz boo">Hi</p>
```

### 绑定内联样式

#### 对象语法
```html
<div v-bind:style="styleObject"></div>
```

```js
data: {
  styleObject: {
    color: 'red',
    fontSize: '13px'
  }
}
```

对象语法可以结合返回对象的计算属性使用

#### 数组语法
`v-bind:style` 的数组语法可以将多个样式对象应用到同一个元素上：
```html
<div v-bind:style="[baseStyles, overridingStyles]"></div>
```

#### 自动添加前缀
当 `v-bind:style` 使用需要添加浏览器引擎前缀的 CSS property 时，如 transform，Vue.js 会自动侦测并添加相应的前缀。

#### 多重值

> 从2.3.0版本开始

为 style 绑定中的 property 提供一个包含多个值的数组，常用于提供多个带前缀的值，例如：
```html
<div :style="{ display: ['-webkit-box', '-ms-flexbox', 'flex'] }"></div>
```
这样写只会渲染数组中最后一个被浏览器支持的值。在本例中，如果浏览器支持不带浏览器前缀的 flexbox，那么就只会渲染 `display: flex`

## 条件渲染
### `v-if`

`v-if`指令用于条件性地渲染一块内容。这块内容只会在指令的表达式返回 truthy 值的时候被渲染,也可以用 `v-else` 添加一个“else 块”：

```html
<h1 v-if="awesome">Vue is awesome!</h1>
<h1 v-else>Oh no 😢</h1>
```

### 在 `<template>` 元素上使用 `v-if` 条件渲染分组
因为 `v-if` 是一个指令，所以必须将它添加到一个元素上如果想切换多个元素此时可以把一个 `<template>` 元素当做不可见的包裹元素，
并在上面使用 `v-if`。最终的渲染结果将不包含 `<template>` 元素。
```html
<template v-if="ok">
  <h1>Title</h1>
  <p>Paragraph 1</p>
  <p>Paragraph 2</p>
</template>
```

### `v-else-if`
> 2.1.0 新增

`v-else-if`，充当 v-if 的“else-if 块”
```html
<div v-if="type === 'A'">
  A
</div>
<div v-else-if="type === 'B'">
  B
</div>
<div v-else-if="type === 'C'">
  C
</div>
<div v-else>
  Not A/B/C
</div>
```

`v-else` 和 `v-else-if` 必须紧跟在带 `v-if` 或者 `v-else-if` 的元素之后

### 用 `key` 管理可复用的元素
Vue 会尽可能高效地渲染元素，通常会复用已有元素而不是从头开始渲染。
```html
<template v-if="loginType === 'username'">
  <label>Username</label>
  <input placeholder="Enter your username">
</template>
<template v-else>
  <label>Email</label>
  <input placeholder="Enter your email address">
</template>
```
那么在上面的代码中切换 loginType 将不会清除用户已经输入的内容。因为两个模板使用了相同的元素，`<input> `不会被替换掉——仅仅是替换了它的 placeholder。

这样也不总是符合实际需求，Vue 提供了一种方式来表达“这两个元素是完全独立的，不要复用”。需添加一个具有唯一值的 key attribute:
```html
<template v-if="loginType === 'username'">
  <label>Username</label>
  <input placeholder="Enter your username" key="username-input">
</template>
<template v-else>
  <label>Email</label>
  <input placeholder="Enter your email address" key="email-input">
</template>
```
现在，每次切换时，输入框都将被重新渲染。`<label>` 元素仍然会被高效地复用，因为它们没有添加 key attribute。

### `v-show`

```html
<h1 v-show="ok">Hello!</h1>
```
带有 `v-show` 的元素始终会被渲染并保留在 DOM 中。`v-show` 只是简单地切换元素的 CSS property display。

> v-show 不支持 `<template>` 元素，也不支持 `v-else`

### `v-if` vs `v-show`

`v-if` 是“真正”的条件渲染，因为它会确保在切换过程中条件块内的事件监听器和子组件适当地被销毁和重建。

`v-if` 也是惰性的：如果在初始渲染时条件为假，则什么也不做——直到条件第一次变为真时，才会开始渲染条件块。

`v-show` 不管初始条件是什么，元素总是会被渲染，并且只是简单地基于 CSS 进行切换。

`v-if` 有更高的切换开销，而 `v-show` 有更高的初始渲染开销。因此，如果需要非常频繁地切换，则使用 `v-show` 较好；如果在运行时条件很少改变，则使用 `v-if` 较好。

## 列表渲染

### 用 `v-for` 把一个数组对应为一组元素

可以用 `v-for` 指令基于一个数组来渲染一个列表。`v-for` 指令需要使用 `item in items` 形式的特殊语法，其中 items 是源数据数组，而 item 则是被迭代的数组元素的别名。
```html
<ul id="example-1">
  <li v-for="item in items" :key="item.message">
    {{ item.message }}
  </li>
</ul>
```

```js
var example1 = new Vue({
  el: '#example-1',
  data: {
    items: [
      { message: 'Foo' },
      { message: 'Bar' }
    ]
  }
})
```

在 `v-for` 块中，我们可以访问所有父作用域的 property。`v-for` 还支持一个可选的第二个参数，即当前项的索引。
```html
<ul id="example-2">
  <li v-for="(item, index) in items">
    {{ parentMessage }} - {{ index }} - {{ item.message }}
  </li>
</ul>
```
```js
var example2 = new Vue({
  el: '#example-2',
  data: {
    parentMessage: 'Parent',
    items: [
      { message: 'Foo' },
      { message: 'Bar' }
    ]
  }
})
```

可以用 `of` 替代 `in` 作为分隔符
```html
<div v-for="item of items"></div>
```

### 在 `v-for` 里使用对象

可以用 `v-for` 来遍历一个对象的 property。
```html
<ul id="v-for-object" class="demo">
  <li v-for="value in object">
    {{ value }}
  </li>
</ul>
```

```js
new Vue({
  el: '#v-for-object',
  data: {
    object: {
      title: 'How to do lists in Vue',
      author: 'Jane Doe',
      publishedAt: '2016-04-10'
    }
  }
})
```

可以提供第二个的参数为 property 名称 (也就是键名), 还可以用第三个参数作为索引：
```html
<div v-for="(value, name, index) in object">
  {{ index }}. {{ name }}: {{ value }}
</div>
```
> 在遍历对象时，会按 `Object.keys()` 的结果遍历，但是不能保证它的结果在不同的 JavaScript 引擎下都一致。

### 维护状态
当 Vue 正在更新使用 `v-for` 渲染的元素列表时，它默认使用“就地更新”的策略。如果数据项的顺序被改变，Vue 将不会移动 DOM 元素来匹配数据项的顺序，而是就地更新每个元素，并且确保它们在每个索引位置正确渲染。
这个默认的模式是高效的，但是只适用于不依赖子组件状态或临时 DOM 状态 (例如：表单输入值) 的列表渲染输出。
为了给 Vue 一个提示，以便它能跟踪每个节点的身份，从而重用和重新排序现有元素，需要为每项提供一个唯一 `key` attribute：
```html
<div v-for="item in items" :key="item.id">
  <!-- 内容 -->
</div>
```
尽可能在使用 `v-for` 时提供 `key` attribute，除非遍历输出的 DOM 内容非常简单，或者是刻意依赖默认行为以获取性能上的提升。

因为它是 Vue 识别节点的一个通用机制，`key` 并不仅与 `v-for` 特别关联。

>不要使用对象或数组之类的非基本类型值作为 `v-for` 的 `key`。请用字符串或数值类型的值。

### 数组更新检测
#### 变更方法
Vue 将被侦听的数组的变更方法进行了包裹，所以它们也将会触发视图更新。这些被包裹过的方法包括：
* `push()`
* `pop()`
* `shift()`
* `unshift()`
* `splice()`
* `sort()`
* `reverse()`

#### 替换数组
变更方法，顾名思义，会变更调用了这些方法的原始数组。相比之下，也有非变更方法，例如 `filter()`、`concat()` 和 `slice()`。它们不会变更原始数组，而总是返回一个新数组。
当使用非变更方法时，可以用新数组替换旧数组：
```js
example1.items = example1.items.filter(function (item) {
  return item.message.match(/Foo/)
})
```
Vue 为了使得 DOM 元素得到最大范围的重用而实现了一些智能的启发式方法，所以用一个含有相同元素的数组去替换原来的数组是非常高效的操作。

#### 注意事项
由于 JavaScript 的限制，Vue 不能检测数组和对象的变化。

### 显示过滤/排序后的结果

有时，想要显示一个数组经过过滤或排序后的版本，而不实际变更或重置原始数据。在这种情况下，可以创建一个计算属性，来返回过滤或排序后的数组。
在计算属性不适用的情况下 (例如，在嵌套 `v-for` 循环中) 你可以使用一个方法：

```html
<ul v-for="set in sets">
  <li v-for="n in even(set)">{{ n }}</li>
</ul>
```

```js
data: {
  sets: [[ 1, 2, 3, 4, 5 ], [6, 7, 8, 9, 10]]
},
methods: {
  even: function (numbers) {
    return numbers.filter(function (number) {
      return number % 2 === 0
    })
  }
}
```

### 在 v-for 里使用范围值
`v-for` 也可以接受整数。在这种情况下，它会把模板重复对应次数。
```html
<div>
  <span v-for="n in 10">{{ n }} </span>
</div>
```

### 在 `<template>` 上使用 `v-for`
类似于 `v-if`，可以利用带有 `v-for` 的 `<template>` 来循环渲染一段包含多个元素的内容。
```html
<ul>
  <template v-for="item in items">
    <li>{{ item.msg }}</li>
    <li class="divider" role="presentation"></li>
  </template>
</ul>
```

### `v-for` 与 `v-if` 一同使用
> 不推荐在同一元素上使用 `v-if` 和 `v-for`。

当它们处于同一节点，`v-for` 的优先级比 `v-if` 更高，这意味着 `v-if` 将分别重复运行于每个 `v-for` 循环中。当你只想为部分项渲染节点时，这种优先级的机制会十分有用，如下：
```html
<li v-for="todo in todos" v-if="!todo.isComplete">
  {{ todo }}
</li>
```
上面的代码将只渲染未完成的 todo

而如果目的是有条件地跳过循环的执行，那么可以将 `v-if` 置于外层元素 (或 `<template>`) 上。
```html
<ul v-if="todos.length">
  <li v-for="todo in todos">
    {{ todo }}
  </li>
</ul>
<p v-else>No todos left!</p>
```

### 在组件上使用 `v-for`
在自定义组件上，你可以像在任何普通元素上一样使用 `v-for`。
```html
<my-component v-for="item in items" :key="item.id"></my-component>
```
> 2.2.0+ 的版本里，当在组件上使用 v-for 时，key 现在是必须的。

任何数据都不会被自动传递到组件里，因为组件有自己独立的作用域。为了把迭代数据传递到组件里，要使用 `prop`.

不自动将 item 注入到组件里的原因是，这会使得组件与 `v-for` 的运作紧密耦合。明确组件数据的来源能够使组件在其他场合重复使用。

下面是一个简单的 todo 列表的完整例子：
```html
<div id="todo-list-example">
  <form v-on:submit.prevent="addNewTodo">
    <label for="new-todo">Add a todo</label>
    <input
      v-model="newTodoText"
      id="new-todo"
      placeholder="E.g. Feed the cat"
    >
    <button>Add</button>
  </form>
  <ul>
    <li
      is="todo-item"
      v-for="(todo, index) in todos"
      v-bind:key="todo.id"
      v-bind:title="todo.title"
      v-on:remove="todos.splice(index, 1)"
    ></li>
  </ul>
</div>
```

```js
Vue.component('todo-item', {
  template: '\
    <li>\
      {{ title }}\
      <button v-on:click="$emit(\'remove\')">Remove</button>\
    </li>\
  ',
  props: ['title']
})

new Vue({
  el: '#todo-list-example',
  data: {
    newTodoText: '',
    todos: [
      {
        id: 1,
        title: 'Do the dishes',
      },
      {
        id: 2,
        title: 'Take out the trash',
      },
      {
        id: 3,
        title: 'Mow the lawn'
      }
    ],
    nextTodoId: 4
  },
  methods: {
    addNewTodo: function () {
      this.todos.push({
        id: this.nextTodoId++,
        title: this.newTodoText
      })
      this.newTodoText = ''
    }
  }
})
```

> 注意这里的 `is="todo-item"` attribute。这种做法在使用 DOM 模板时是十分必要的，因为在 `<ul>` 元素内只有 `<li>` 元素会被看作有效内容。这样做实现的效果与 `<todo-item>` 相同， 但是可以避开一些潜在的浏览器解析错误。

## 事件处理

### 监听事件
可以用 `v-on` 指令监听 DOM 事件，并在触发时运行一些 JavaScript 代码,`v-on` 还可以接收一个需要调用的方法名称。

```html
<div id="example-2">
  <!-- `greet` 是在下面定义的方法名 -->
  <button v-on:click="greet">Greet</button>
</div>
```
```js
var example2 = new Vue({
  el: '#example-2',
  data: {
    name: 'Vue.js'
  },
  // 在 `methods` 对象中定义方法
  methods: {
    greet: function (event) {
      // `this` 在方法里指向当前 Vue 实例
      alert('Hello ' + this.name + '!')
      // `event` 是原生 DOM 事件
      if (event) {
        alert(event.target.tagName)
      }
    }
  }
})
```

### 内联处理其中的方法
除了直接绑定到一个方法，也可以在内联 JavaScript 语句中调用方法，有时需要在内联语句处理器中访问原始的 DOM 事件。可以用特殊变量 `$event` 把它传入方法：
```html
<button v-on:click="warn('Form cannot be submitted yet.', $event)">
  Submit
</button>
```
```js
// ...
methods: {
  warn: function (message, event) {
    // 现在我们可以访问原生事件对象
    if (event) {
      event.preventDefault()
    }
    alert(message)
  }
}
```
### 事件修饰符

Vue.js 为 `v-on` 提供了事件修饰符。修饰符是由点开头的指令后缀来表示的。

* `.stop`
* `.prevent`
* `.capture`
* `.self`
* `.once`
* `.passive`

```html
<!-- 阻止单击事件继续传播 -->
<a v-on:click.stop="doThis"></a>

<!-- 提交事件不再重载页面 -->
<form v-on:submit.prevent="onSubmit"></form>

<!-- 修饰符可以串联 -->
<a v-on:click.stop.prevent="doThat"></a>

<!-- 只有修饰符 -->
<form v-on:submit.prevent></form>

<!-- 添加事件监听器时使用事件捕获模式 -->
<!-- 即内部元素触发的事件先在此处理，然后才交由内部元素进行处理 -->
<div v-on:click.capture="doThis">...</div>

<!-- 只当在 event.target 是当前元素自身时触发处理函数 -->
<!-- 即事件不是从内部元素触发的 -->
<div v-on:click.self="doThat">...</div>
```
> 使用修饰符时，顺序很重要；相应的代码会以同样的顺序产生。因此，用 `v-on:click.prevent.self` 会阻止所有的点击，而 `v-on:click.self.prevent` 只会阻止对元素自身的点击。

>2.1.4 新增
```html
<!-- 点击事件将只会触发一次 -->
<a v-on:click.once="doThis"></a>
```
不像其它只能对原生的 DOM 事件起作用的修饰符，`.once` 修饰符还能被用到自定义的组件事件上。

>2.3新增
Vue 还对应 `addEventListener` 中的 `passive` 选项提供了 `.passive` 修饰符。
```html
<!-- 滚动事件的默认行为 (即滚动行为) 将会立即触发 -->
<!-- 而不会等待 `onScroll` 完成  -->
<!-- 这其中包含 `event.preventDefault()` 的情况 -->
<div v-on:scroll.passive="onScroll">...</div>
```
> 不要把 `.passive` 和 `.prevent` 一起使用，因为 `.prevent` 将会被忽略，同时浏览器可能会向你展示一个警告。`.passive `会告诉浏览器你不想阻止事件的默认行为。

### 按键修饰符

Vue 允许为 `v-on` 在监听键盘事件时添加按键修饰符：
```html
<!-- 只有在 `key` 是 `Enter` 时调用 `vm.submit()` -->
<input v-on:keyup.enter="submit">
```
可以直接将 `KeyboardEvent.key` 暴露的任意有效按键名转换为 `kebab-case` 来作为修饰符。
```html
<input v-on:keyup.page-down="onPageDown">
```
在上述示例中，处理函数只会在 `$event.key` 等于 `PageDown` 时被调用。

### 按键码
> `keyCode` 的事件用法已经被废弃了并可能不会被最新的浏览器支持。

使用 keyCode attribute 也是允许的：
```html
<input v-on:keyup.13="submit">
```

为了在必要的情况下支持旧浏览器，Vue 提供了绝大多数常用的按键码的别名：

* `.enter`
* `.tab`
* `.delete` (捕获“删除”和“退格”键)
* `.esc`
* `.space`
* `.up`
* `.down`
* `.left`
* `.right`

### 系统修饰键
> 2.1.0 新增

可以用如下修饰符来实现仅在按下相应按键时才触发鼠标或键盘事件的监听器。
* `.ctrl`
* `.alt`
* `.shift`
* `.meta`

例如：
```html
<!-- Alt + C -->
<input v-on:keyup.alt.67="clear">

<!-- Ctrl + Click -->
<div v-on:click.ctrl="doSomething">Do something</div>
```
> 请注意修饰键与常规按键不同，在和 keyup 事件一起用时，事件触发时修饰键必须处于按下状态。换句话说，只有在按住 ctrl 的情况下释放其它按键，才能触发 `keyup.ctrl`。而单单释放 ctrl 也不会触发事件。如果你想要这样的行为，请为 ctrl 换用 `keyCode：keyup.17`。

### `exact`修饰符
> 2.5.0 新增

`.exact` 修饰符允许你控制由精确的系统修饰符组合触发的事件。
```html
<!-- 即使 Alt 或 Shift 被一同按下时也会触发 -->
<button v-on:click.ctrl="onClick">A</button>

<!-- 有且只有 Ctrl 被按下的时候才触发 -->
<button v-on:click.ctrl.exact="onCtrlClick">A</button>

<!-- 没有任何系统修饰符被按下的时候才触发 -->
<button v-on:click.exact="onClick">A</button>
```

### 鼠标按钮修饰符
> 2.2.0 新增

* `.left`
* `.right`
* `.middle`

这些修饰符会限制处理函数仅响应特定的鼠标按钮。

### 为什么在HTML中监听事件
所有的 Vue.js 事件处理方法和表达式都严格绑定在当前视图的 ViewModel 上，使用 `v-on` 有几个好处：
1. 扫一眼 HTML 模板便能轻松定位在 JavaScript 代码里对应的方法。
2. 因为你无须在 JavaScript 里手动绑定事件，你的 ViewModel 代码可以是非常纯粹的逻辑，和 DOM 完全解耦，更易于测试。
3. 当一个 ViewModel 被销毁时，所有的事件处理器都会自动被删除。你无须担心如何清理它们。

## 表单输入绑定

### 基础用法
可以用 `v-model` 指令在表单 `<input>`、`<textarea>` 及 `<select>` 元素上创建双向数据绑定。它会根据控件类型自动选取正确的方法来更新元素。 `v-model` 负责监听用户的输入事件以更新数据，并对一些极端场景进行一些特殊处理。

> `v-model` 会忽略所有表单元素的 `value`、`checked`、`selected`、 `attribute` 的初始值而总是将 Vue 实例的数据作为数据来源。应该通过 JavaScript 在组件的 data 选项中声明初始值。

`v-model` 在内部为不同的输入元素使用不同的 property 并抛出不同的事件：

* `text` 和 `textarea` 元素使用 `value` property 和 `input` 事件；
* `checkbox` 和 `radio` 使用 `checked` property 和 `change` 事件；
* `select` 字段将 `value `作为 `prop` 并将 `change` 作为事件。

> 对于需要使用输入法 (如中文、日文、韩文等) 的语言，`v-model` 不会在输入法组合文字过程中得到更新。想处理这个过程，请使用 `input` 事件。

### 文本
```html
<input v-model="message" placeholder="edit me">
<p>Message is: {{ message }}</p>

<span>Multiline message is:</span>
<p style="white-space: pre-line;">{{ message }}</p>
<br>
<textarea v-model="message" placeholder="add multiple lines"></textarea>
```
> 在文本区域插值 `<textarea>{{text}}</textarea>` 并不会生效，应用 `v-model` 来代替

### 复选框
单个复选框，绑定到布尔值：
```html
<input type="checkbox" id="checkbox" v-model="checked">
<label for="checkbox">{{ checked }}</label>
```

多个复选框，绑定到同一个数组：
```html
<input type="checkbox" id="jack" value="Jack" v-model="checkedNames">
<label for="jack">Jack</label>
<input type="checkbox" id="john" value="John" v-model="checkedNames">
<label for="john">John</label>
<input type="checkbox" id="mike" value="Mike" v-model="checkedNames">
<label for="mike">Mike</label>
<br>
<span>Checked names: {{ checkedNames }}</span>
```
```js
new Vue({
  el: '...',
  data: {
    checkedNames: []
  }
})
```

### 选择框
单选时：
```html
<div id="example-5">
  <select v-model="selected">
    <option disabled value="">请选择</option>
    <option>A</option>
    <option>B</option>
    <option>C</option>
  </select>
  <span>Selected: {{ selected }}</span>
</div>
```
```js
new Vue({
  el: '...',
  data: {
    selected: ''
  }
})
```

> 如果 `v-model` 表达式的初始值未能匹配任何选项，`<select>` 元素将被渲染为“未选中”状态。更推荐像上面这样提供一个值为空的禁用选项。

多选时 (绑定到一个数组)：
```html
<div id="example-6">
  <select v-model="selected" multiple style="width: 50px;">
    <option>A</option>
    <option>B</option>
    <option>C</option>
  </select>
  <br>
  <span>Selected: {{ selected }}</span>
</div>
```
```js
new Vue({
  el: '#example-6',
  data: {
    selected: []
  }
})
```
用 `v-for` 渲染的动态选项：
```html
<select v-model="selected">
  <option v-for="option in options" v-bind:value="option.value">
    {{ option.text }}
  </option>
</select>
<span>Selected: {{ selected }}</span>
```
```js
new Vue({
  el: '...',
  data: {
    selected: 'A',
    options: [
      { text: 'One', value: 'A' },
      { text: 'Two', value: 'B' },
      { text: 'Three', value: 'C' }
    ]
  }
})
```

### 值绑定

对于单选按钮，复选框及选择框的选项，`v-model` 绑定的值通常是静态字符串 (对于复选框也可以是布尔值)：
```html
<!-- 当选中时，`picked` 为字符串 "a" -->
<input type="radio" v-model="picked" value="a">

<!-- `toggle` 为 true 或 false -->
<input type="checkbox" v-model="toggle">

<!-- 当选中第一个选项时，`selected` 为字符串 "abc" -->
<select v-model="selected">
  <option value="abc">ABC</option>
</select>
```

把值绑定到 Vue 实例的一个动态 property 上，这时可以用 `v-bind` 实现，并且这个 property 的值可以不是字符串。

#### 复选框
```html
<input
  type="checkbox"
  v-model="toggle"
  true-value="yes"
  false-value="no"
>
```
> 这里的 `true-value` 和 `false-value` attribute 并不会影响输入控件的 value attribute，因为浏览器在提交表单时并不会包含未被选中的复选框。如果要确保表单中这两个值中的一个能够被提交，(即“yes”或“no”)，换用单选按钮

#### 单选按钮
```html
<input type="radio" v-model="pick" v-bind:value="a">
```

#### 选择框的选项
```html
<select v-model="selected">
    <!-- 内联对象字面量 -->
  <option v-bind:value="{ number: 123 }">123</option>
</select>
```
### 修饰符

#### `.lazy`
在默认情况下，`v-model` 在每次 `input` 事件触发后将输入框的值与数据进行同步 (除了输入法组合文字时)。可以添加 `lazy` 修饰符，从而转为在 `change` 事件之后进行同步：
```html
<!-- 在“change”时而非“input”时更新 -->
<input v-model.lazy="msg">
```

#### `.number`

自动将用户的输入值转为数值类型，可以给 `v-model` 添加 `number` 修饰符：
```html
<input v-model.number="age" type="number">
```
即使在 `type="number"` 时，HTML 输入元素的值也总会返回字符串。如果这个值无法被 `parseFloat()` 解析，则会返回原始的值。

#### `.trim`

如果要自动过滤用户输入的首尾空白字符，可以给 `v-model` 添加 `trim` 修饰符：
```html
<input v-model.trim="msg">
```

### 在组件上使用 `v-model`

Vue 的组件系统允许创建具有完全自定义行为且可复用的输入组件。这些输入组件可以和 `v-model` 一起使用

## 组件基础


