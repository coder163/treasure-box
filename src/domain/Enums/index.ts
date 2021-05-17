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