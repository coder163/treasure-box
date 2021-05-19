// @ts-ignore
import Datastore from 'lowdb'
// @ts-ignore
import FileSync from 'lowdb/adapters/FileSync'
import path from 'path'
import {logger} from "@/config/Log4jsConfig";


logger.info('读取基础设置配置文件', path.join(process.cwd(), '/config/app-config.json'))

//基础设置
const AppConfig = Datastore(new FileSync(path.join(process.cwd(), '/config/app-config.json')))
//第三方视频资源站
const VideoApiConfig = Datastore(new FileSync(path.join(process.cwd(), '/config/video-api-config.json')))

//apiConfig._.mixin(LodashId)
const os = require('os')

//默认设置
if (!AppConfig.has("app").value()) {
    AppConfig.defaults(
        {
            "app":
                {
                    //下载目录
                    downDir: os.homedir() + '\\Downloads',
                    //自动更新
                    isAutoUpdate: false,
                    //第三方下载工具
                    isDownTool: false,
                    //保留网盘路径
                    isKeepDiskPath: false,
                    //独立播放器
                    isStandalonePlayer: true
                }
        }).write()
}
logger.info('读取视频资源站配置文件', path.join(process.cwd(), '/config/video-api-config.json'))
if (!VideoApiConfig.has("resource-site").value()) {
    VideoApiConfig.defaults(
        {
            "resource-site": [
                {
                    "name": "快播资源",
                    "url": "http://www.kuaibozy.com/api.php/provide/vod/at/json/?"
                },
                {
                    "name": "OK资源",
                    "url": "https://api.okzy.tv/api.php/provide/vod/at/json/?"
                },
                {
                    "name": "天空资源",
                    "url": "https://m3u8.tiankongapi.com/api.php/provide/vod/at/json/?"
                }
            ]
        }).write()
}

export {VideoApiConfig,AppConfig}



