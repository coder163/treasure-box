const os = require('os')

export interface ISetting {

    //独立播放器
    isStandalonePlayer: boolean;
    //自动更新
    isAutoUpdate: boolean;
    //下载目录
    downDir: string;
    //保留网盘路径
    isKeepDiskPath: boolean;
    //第三方下载工具
    isDownTool: boolean;
    //是否跳过片头
    isSkipTitle: boolean;
    //片头时长
    titleDuration: number;
    //片尾时长
    creditDuration: number;

}

export default class implements ISetting {

    //独立播放器
    isStandalonePlayer: boolean;
    //自动更新
    isAutoUpdate: boolean;
    //下载目录
    downDir: string;
    //保留网盘路径
    isKeepDiskPath: boolean;
    //第三方下载工具
    isDownTool: boolean;
    //是否跳过片头
    isSkipTitle: boolean = true;
    //片头时长
    titleDuration: number = 90;
    //片尾时长
    creditDuration: number = 120;

    constructor(downDir: string, isAutoUpdate: boolean, isDownTool: boolean, isKeepDiskPath: boolean, isStandalonePlayer: boolean,
                isSkipTitle: boolean, titleDuration: number, creditDuration: number) {
        this.downDir = downDir;
        this.isAutoUpdate = isAutoUpdate;
        this.isDownTool = isDownTool;
        this.isKeepDiskPath = isKeepDiskPath;
        this.isStandalonePlayer = isStandalonePlayer;
        this.isSkipTitle = isSkipTitle;
        this.titleDuration = titleDuration;
        this.creditDuration = creditDuration;
    }
}



