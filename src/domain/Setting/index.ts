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

    constructor(downDir: string, isAutoUpdate: boolean, isDownTool: boolean, isKeepDiskPath: boolean, isStandalonePlayer: boolean) {
        this.downDir = downDir;
        this.isAutoUpdate = isAutoUpdate;
        this.isDownTool = isDownTool;
        this.isKeepDiskPath = isKeepDiskPath;
        this.isStandalonePlayer = isStandalonePlayer;
    }
}



