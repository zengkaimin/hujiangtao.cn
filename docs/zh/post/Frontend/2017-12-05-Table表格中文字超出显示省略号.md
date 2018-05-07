---
title: Table表格中文字超出显示省略号
date: 2017-12-05
description: Table表格中文字超出显示省略号
---

# Table表格中文字超出显示省略号

## 目录

[[toc]]

## css

``` css
table{
　　table-layout: fixed;  ==>固定布局的算法。在这种算法中，表格和列的宽度取决于col对象的宽度总和，假如没有指定，则会取决于第一行每个单元格的宽度。
　　　　　　　　　　　　　　　　　 假如表格没有指定宽度( width )属性，则表格被呈递的默认宽度为 100% （注意：此样式是关键）。必须，表格宽度不随文字增多而变长。
td{
　　white-space: nowrap;      ==>设置内容抵达容器边界会不会转到下一行
　　overflow: hidden;         ==>不显示超过对象尺寸的内容（这个绝对不能少）,也就是说设置td里面的数据无论有多少，都不会换行
　　text-overflow: ellipsis;  ==>将被隐藏的那部分用省略号代替。
}
```

## html

``` html
<body>
  <table>
    <thead>
      <th>第一列</th>
      <th>第二列</th>
    </thead>
    <tbody>
      <tr>
        <td>
          <span>超长内容超长内容超长内容超长内容超长内容超长内容超长内容超长内容超长内容超长内容超长内容超长内容超长内容超长内容超长内容超长内容</span>
          <span>超长内容超长内容超长内容超长内容超长内容超长内容超长内容超长内容超长内容超长内容超长内容超长内容超长内容超长内容超长内容</span>
        </td>
        <td> 超长内容超长内容超长内容超长内容超长内容超长内容超长内容超长内容超长内容超长内容超长内容超长内容超长内容超长内容超长内容超长内容 </td>
      </tr>
    </tbody>
  </table>
</body>
```

## 原理

- `table-layout`：fixed 由于table-layout的默认值是auto，即table的宽高将取决于其内容的多寡，
                如果内容的体积无法估测，那么最终表格的呈现形式也无法保证了，fixed一下就好了。（注意：此样式是关键）
- `white-space`：nowrap 是为了保证无论单元格（TD）中文本内容有多少，都不会自动换行，此时多余的内容会在水平方向撑破单元格。
- `overflow`：hidden 隐藏超出单元格的部分。
- `text-overflow`：ellipsis 将被隐藏的那部分用省略号代替。

## Renference

- [table表格中文字超出显示省略号 - 慕课网](http://www.imooc.com/article/16215?block_id=tuijian_wz)
