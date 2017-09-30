# crontab

界面是用VUE去建设的，但是在运算逻辑还是以Javascript为主。尤其解析crontab相应时间结果，稍显复杂。

线上访问地址：[https://jingjingke.github.io/crontab/dist/](https://jingjingke.github.io/crontab/dist/)


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

## 效果截图 ##

![效果截图](https://jingjingke.github.io/crontab/src/assets/effect.png)