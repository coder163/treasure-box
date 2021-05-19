/**
 * 剧集
 */
export interface IEpisodes {
    //当前集数
    index: number,
    //播放路径
    src: Array<string>,
    //剧情简介
    desc: string,
    //下载链接
    download: string
    //影视剧名称
    name: string
    //类型
    type: string
    //来源：西瓜视频、资源站和网盘
    source: string
    //语言
    lang:string;
    //时间
    time: string;

}

export default class implements IEpisodes {
    desc: string = "";
    download: string = "";
    index: number = 1;
    name: string = "";
    src: Array<string> = new Array<string>();
    type: string = "";
    source: string = "";
    lang:string="";
    time: string="";


}