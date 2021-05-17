
/**
 * 剧集
 */
export interface Episodes {
    //当前集数
    index: number,
    //播放路径
    src: string,
    //剧情简介
    desc: string,

    download: any
}

export default class  implements Episodes{
    desc: string;
    download: any;
    index: number;
    src: string;

    constructor(desc:string,download:any,index:number,src:string) {
        this.desc = desc;
        this.download = download;
        this.index = index;
        this.src = src;
    }
}