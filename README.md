## 父子组件传值

@Prop设置为required: true会导致默认值失效

## 侧边栏

使用vuex保存tree数据，通过修改数组索引变更tree数据

除了全局滚动条外在树形菜单中引入局部滚动条

## 顶部工具栏

使用响应式网格布局


## 待测试功能2021-05-09

- 自动更新

- 扫码登录


## 错误集锦

描述

```
MissingAPIError: indexedDB API not found. If using IE10+, make sure to run your code on a server URL (not locally). If using old Safari versions, make sure to include indexedDB polyfill.
```

原因：

- dexie即(indexedDB )无法在nodejs环境下运行，毕竟是个浏览器端的数据库