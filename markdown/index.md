# 基础用法
## 标题

要创建标题，请在标题文本前添加一至六个`# `符号。 你使用的`# `数量将决定层次结构级别和标题的大小。

```text
### A first-level heading

#### A second-level heading

##### A third-level heading
```

### A first-level heading

#### A second-level heading

##### A third-level heading

## 分割线

可以用连续的三个表示`*`分割线 

```
分割线上
***
分割线下
```

分割线上
***
分割线下

## 文本样式

可以在文件中以粗体、斜体、删除线、下标或上标文本表示强调。

| Style   | 语法                | 示例                                       | 输出                                     |
|---------|-------------------|------------------------------------------|----------------------------------------|
| 加粗      | `** **` 或 `__ __` | `**This is bold text**`                  | **This is bold text**                  |
| 斜体      | `* *` 或 `_ _`     | `_This text is italicized_`              | _This text is italicized_              |
| 删除线     | `~~ ~~`           | `~~This was mistaken text~~`             | ~~This was mistaken text~~             |
| 粗体和嵌入斜体 | 	`** **` 和 `_ _`  | `**This text is _extremely_ important**` | **This text is _extremely_ important** |
| 全部粗体和斜体 | `*** ***`         | `***All this text is important***`       | ***All this text is important***       |
| 下标      | `<sub> </sub>`    | `This is a <sub>subscript</sub> text`    | This is a <sub>subscript</sub> text    |
| 上标      | `<sup> </sup>`    | `This is a <sup>superscript</sup> text`  | This is a <sup>superscript</sup> text  |

## 引用文本

可以使用 `>` 来引用文本。

```text
Text that is not a quote

> Text that is a quote
```

Text that is not a quote

> Text that is a quote

## 引用代码

使用单反引号`` ` ``可标注句子中的代码或命令。反引号中的文本不会被格式化。

```text
Use `git status` to list all new or modified files that haven't yet been committed.
```

Use `git status` to list all new or modified files that haven't yet been committed.

要引用代码块，使用三反引号，可在反引号后面加上名称实现语法高亮。

````text
下面是个Java代码：
```java
class Demo {
   public static void main(String[] args){
      System.out.println("Hello World!");
   }
}
```
````

下面是个Java代码：

```java
class Demo {
    public static void main(String[] args) {
        System.out.println("Hello World!");
    }
}
```

> 要在引用中使用反引号自身需要再加一个反引号，以此类推

`````text
````
这是代码块外
```
这是代码块中
```
````
````` 

````
这是代码块外
```
这是代码块中
```
````

## 链接

通过将链接文本用方括号 `[ ]` 括起来，然后将 URL 用括号 `( )` 括起来，可创建内联链接。

```text
This site was built using [GitHub Pages](https://pages.github.com/).
```

This site was built using [GitHub Pages](https://pages.github.com/).

## 图像

通过添加 `!` 并 将 `alt` 文本用 `[ ]` 括起来，可显示图像。 替换文字是等效于图像中信息的短文本。 然后将图像的链接用括号 `()`
括起来。

```text
![this is a demo image](https://myoctocat.com/assets/images/base-octocat.svg)
```

![this is a demo image](https://myoctocat.com/assets/images/base-octocat.svg)

## 列表

可通过在一行或多行文本前面加上 `-`、`*` 或 `+` 来创建一个无序列表。

```text
- 抽烟
* 喝酒
+ 烫头
```

- 抽烟

* 喝酒

+ 烫头

要对列表排序，请在每行前面添加一个编号。

```text
1. 吃饭
2. 睡觉
3. 打豆豆
```

1. 吃饭
2. 睡觉
3. 打豆豆

## 嵌套列表

通过在一个列表项下面缩进一个或多个其他列表项，可创建嵌套列表。

```text
1. First list item
   - First nested list item
     - Second nested list item
```

1. First list item
    - First nested list item
        - Second nested list item

> 要创建嵌套列表，可以查看嵌套列表正上方的列表项，并计算该条目内容前面的字符数量。 然后在嵌套列表项的前面键入该数量的空格字符

## 任务列表

若要创建任务列表，请在列表项前加连字符和空格，后接`[ ]`。 要将任务标记为完成，请使用 `[x]`。

```text
- [x] 抽烟
- [ ] 喝酒
- [ ] 烫头
```

- [x] 抽烟
- [ ] 喝酒
- [ ] 烫头

## 段落

通过在文本行之间留一个空白行，可创建新段落。

```text
这是第一个段落

这是第二个段落
```

这是第一个段落

这是第二个段落

## 注释

您可以通过添加`<!--  -->`隐藏渲染的 Markdown 中的内容。

```text
下面有注释
<!-- This content will not appear in the rendered Markdown -->
上面有注释
```

下面有注释
<!-- This content will not appear in the rendered Markdown -->
上面有注释

## 忽略Markdown格式

通过在 Markdown 字符前面输入 ` \ `，可忽略 Markdown 格式（或对其进行转义）。

```text
Let's rename \*our-new-project\* to \*our-old-project\*.
```

Let's rename \* our-new-project \* to \*our-old-project\*.

## 表格

可以使用如下语法创建表格，依次是，表头，分割行，数据。
> 1. 最外侧的列分割符`|`可以不写
> 2. 分割行中的`-`数量可以任意多个
> 3. 可以使用`:-`、`:-:`、`-:`表示对其方式

```txt
|标题1|标题2|标题3
----|:-:|-:|
|1|2|3|
4|5|6
```

| 标题1 | 标题2 | 标题3 |
|-----|:---:|----:|
| 1   |  2  |   3 |
| 4   |  5  |   6 |

## 使用html

markdown 本身是兼容html的可以直接使用html语法

```txt
<p style="background-color: red; color: white;">这是红色背景的文本</p>
```

<p style="background-color: red; color: white;">这是红色背景的文本</p>