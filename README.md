# tab 滚动效果

滚动 tab 切换效果，tab 点击与滚动距离计算 tab 切换

## [demo](https://jinge1.github.io/scroll-tabs/#/index)

## step

1. `npm install vue-cli-service -g`
2. `npm install`
3. `npm start`

## html 结构说明

- 滚动元素分为 tab 元素与 content 元素
- tab 元素为包含 tab 标签的直接父节点元素，content 元素为包含内容元素的直接父节点元素

## css 设置说明

- tab 元素可设为不需滚动，横向滚动与纵向滚动 3 种
- 如果需要 tab 元素随滚动自动切换位置，需设置其 position 值为非 static 值同时需要其子节点的宽度或者高度达到可滚动效果
- content 元素若为设置其 position 值为非 static 值，且高度达到可滚动条件，则默认随 body 滚动

## 使用说明

1. 倒入核心 js 文件
   `import ScrollTab from '../utils/ScrollTab'`

2. 实例化对象说明

```javascript
new ScrollTab({
  tabEle: '#tab', // tab元素
  contentEle: '#content', // tab元素
  tabDirection: 'y', // tab方向，x水平，y垂直
  initIndex: 0, // 初始index值
  changeTab: index => {
    // 切换tab的操作，通常为更新本地tab的index值
  }
})
```

## 其他

- 本案例为使用vue实现，实际不依赖其他框架，直接使用ScrollTab库即可
- 兼容问题未仔细测试，可能存在部分浏览器兼容问题
