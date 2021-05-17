export interface IZfile {
    name: string;
    time: string;
    size: number;
    type: string;
    path: string;
    url: string;
}

export default class Zfile implements IZfile {
    name: string;
    path: string;
    size: number;
    time: string;
    type: string;
    url: string;

    constructor(name: string,path: string,size: number,time: string,type: string,url: string) {
        this.name = name;
        this.path = path;
        this.size = size;
        this.time = time;
        this.type = type;
        this.url = url;
    }
}