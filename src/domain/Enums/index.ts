import {ipcRenderer} from "electron";

export enum StatusCode {
    /**
     * 资源不存在
     */
    ERROR = 404,
    /**
     * 取消关注
     */
    UNSUBSCRIBE = 101,
    /**
     * 请求成功
     */
    SUCCESS = 200,
}

// -1 检查更新失败 0 正在检查更新 1 检测到新版本，准备下载 2 未检测到新版本 3 下载中 4 下载完成
export enum UpdateStatusCode {

    CHECKING_FOR_UPDATE = 0,

    NEW_VERSION_DETECTED = 1,

    NO_NEW_VERSION_DETECTED = 2,

    DOWNLOADING = 3,
    
    DOWNLOAD_COMPLETED = 4,
}

export enum DownLoadStatus {
    //下载中断
    INTERRUPTED = "INTERRUPTED",
    //正在下载
    DOWNLOADING = "DOWNLOADING",
    //暂停
    PAUSED = "PAUSED",
    //下载完成
    COMPLETED = "COMPLETED",
    //取消下载
    CANCELLED = "CANCELLED",
    //准备下载
    READY="READY"

}
//主进程和渲染进程通信消息名称
export enum ChannelMessage {
    //打开播放器窗口
    TO_MAIN_OPEN_VIDEO_WINDOWS = "TO_MAIN_OPEN_VIDEO_WINDOWS",
    TO_RENDERER_OPEN_VIDEO_WINDOWS = "TO_RENDERER_OPEN_VIDEO_WINDOWS",
    //影视数据
    TO_MAIN_VIDEO_DATA = "TO_MAIN_VIDEO_DATA",
    TO_RENDERER_VIDEO_DATA = "TO_RENDERER_VIDEO_DATA",
    //销毁播放器实例
    TO_RENDERER_DESTROY_PLAYER = "TO_RENDERER_DESTROY_PLAYER",
    //播放窗口销毁
    TO_RENDERER_DESTROY_PLAYER_WINDOW = "TO_RENDERER_DESTROY_PLAYER_WINDOW",

    TO_MAIN_DESTROY_PLAYER_WINDOW = "TO_RENDERER_DESTROY_PLAYER_WINDOW",
}