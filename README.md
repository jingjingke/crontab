# vue-crontab-ui

该分支目前是为了发布npm包所创建，包名：vue-crontab-ui 。


## 使用 ##

（1）安装
```bash
npm install vue-crontab-ui 
```
（2）vue 项目中的 main.js 中引入并使用

```js
import crontab from "vue-crontab-ui";

Vue.use(crontab);
```
(3) vue 项目页面中使用该组件（组件名字即：crontab）
```vue
<template>
  <div id="app">
    <crontab v-model="crontabEx" :render="isLazy" />
  </div>
</template>
<script>
export default {
  name: "App",
  data() {
    return {
      crontabEx: "",  // 获取到的表达式值
      isLazy: false,  // 是否在需要时才渲染节点
    };
  },
  watch: {
    crontabEx: (value) => {
      // 监听到表达式中值的变化
      console.log(value);
    },
  },
};
</script>

```
(4) 组件参数 render

除了 v-model可以绑定表达式的值外， render 用于判断是否在需要时才渲染节点。
例如该组件放置在弹窗中，可以将该值与组件是否显示与隐藏使用同一变量，当它为false时，是不会渲染内部组件，只有当它第一次为真的，会渲染。

## 效果截图 ##
npm 包中去掉了弹窗效果，实际使用时可以通过自已的 UI 弹窗框架来作为容器。

![效果截图](https://jingjingke.github.io/crontab/src/assets/effect.png)
