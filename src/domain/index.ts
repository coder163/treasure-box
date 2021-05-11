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

export interface IUser {

    nickName: string;

    headImgUrl: string;
}

/**
 * 顶部导航菜单
 */
export interface INavMenu {
    id: string,
    bel: string,
    name: string
    docType: string,
    href: string,
    menuList: Array<INavMenu>
}

/**
 * 剧集
 */
export interface Episodes {
    //当前集数
    index: number,
    //播放路径
    src: string,
    //剧情简介
    desc:string,

    download:any
}