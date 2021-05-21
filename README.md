## 父子组件传值

@Prop设置为required: true会导致默认值失效

## 视频资源站

https://kongbuya.com/api.php/provide/vod/?



## 错误集锦

描述

```
MissingAPIError: indexedDB API not found. If using IE10+, make sure to run your code on a server URL (not locally). If using old Safari versions, make sure to include indexedDB polyfill.
```

原因：

- dexie即(indexedDB )无法在nodejs环境下运行，毕竟是个浏览器端的数据库