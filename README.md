## 父子组件传值

@Prop设置为required: true会导致默认值失效


## 视频资源站


这些采集到的都是HTML

{
    "name": "恐怖鸭",
    "url":"https://kongbuya.com/api.php/provide/vod/?"
}
{
    "name": "零度资源网",
    "url": "https://zy.kuluni.cn/api.php/provide/vod/json/?"
},
{
    "name": "蘑菇资源网",
    "url": "http://www.moguzyw.com:520/moguzy.php/provide/vod/at/json/?"
}

api.php/provide/vod/at/json/?ac=detail&wd=龙虎山张天师

## VIP解析

https://m3u8.tv.janan.net/json.php?url=https://v.youku.com/v_show/id_XNDc2NDUxNzk4MA==.html

http://api.sgjxc.vip/index/api?uid=100003&token=fffda385582fdd65733681e4db624ea4&ver=V20210501&url=https://v.youku.com/v_show/id_XNDc2NDUxNzk4MA==.html

https://m3u8.apibdzy.com/api.php/provide/vod/?ac=list

- https://660e.com/
  
- https://jx.ap2p.cn/?url=

- https://www.8090g.cn/?url=

- https://api.jiexi.la/?url=

- https://www.playm3u8.cn/jiexi.php?url=            老牌的解析服务商，已经4~5年了

- https://www.ckplayer.vip/jiexi/?url=

- https://www.pangujiexi.cc/jiexi.php?url=

- https://www.h8jx.com/jiexi.php?url=



## 错误集锦

描述

```
MissingAPIError: indexedDB API not found. If using IE10+, make sure to run your code on a server URL (not locally). If using old Safari versions, make sure to include indexedDB polyfill.
```

原因：

- dexie即(indexedDB )无法在nodejs环境下运行，毕竟是个浏览器端的数据库