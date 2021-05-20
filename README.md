# crontab

界面是用VUE去建设的，但是在运算逻辑还是以Javascript为主。尤其解析crontab相应时间结果，稍显复杂。

线上访问地址：[https://jingjingke.github.io/crontab/dist/](https://jingjingke.github.io/crontab/dist/)

## npm发布 ##
该项目npm包名：vue-crontab-ui，具体内容指路npmjs分支。

目前master分支的内容已经合并到npmjs中，若后期有bug需要维护，可以在master分支中拉出新的分支，再将代码合到master与npmjs中。这样能够保最大程度保持代码一致性。

## 目录结构 ##

其它都是套路，主要说一下src目录中的文件主要是做什么的。

```pre

├── App.vue                      // 开始界面
├── main.js                      // 入口文件
├── assets                       // 静态资源:样式/图片等
├── components                   // crontab组件们
│   ├── Crontab.vue              // crontab组件主界面
│   ├── crontab.js               // crontab组件主界面使用的js代码
│   ├── Crontab-Year.vue         // “年”组件
│   ├── crontab-year.js          // “年”组件使用的js代码
│   ├── Crontab-Mouth.vue        // “月”组件
│   ├── crontab-mouth.js         // “月”组件使用的js代码
│   ├── Crontab-Day.vue          // “日”组件
│   ├── crontab-day.js           // “日”组件使用的js代码
│   ├── Crontab-Hour.vue         // “时”组件
│   ├── crontab-hour.js          // “时”组件使用的js代码
│   ├── Crontab-Min.vue          // “分”组件
│   ├── crontab-min.js           // “分”组件使用的js代码
│   ├── Crontab-Second.vue       // “秒”组件
│   ├── crontab-second.js        // “秒”组件使用的js代码
│   ├── Crontab-Result.vue       // “结果”组件（解析最近5次运行时间）
│   └── crontab-result.js        // “结果”组件使用的js代码


```

## 解析逻辑  ##

逻辑、表达式如果有我理解不正确的地方，欢迎提意见。虽然是依托VUE去做的项目，但是解析的代码用原生JS也是可以实现的。

具体可以参考：src/components/Crontab-result.js中的expressionChange()方法，这是解析的主要方法。它首先会将表达式用空格分隔成几块，再对每一个小规则进行操作。

其中用的比较多的就是各种数组，例如我会将符合规则的秒数放在一个数组中;另一个就是利用continue label跳出指定循环（例如向上跳两层for循环）。

文件中也有相应的注释，读起来应该不会太费力~~



## 效果截图 ##

![效果截图](https://jingjingke.github.io/crontab/src/assets/effect.png)
