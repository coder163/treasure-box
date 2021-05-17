import {DownLoadStatus} from "@/domain/Enums";

export interface DownloadItem {
    id: string;
    //文件名字
    fileName: string;
    //总大小
    totalSize: number;
    //已经下载的大小
    receivedSize: number;
    //下载状态
    status: DownLoadStatus;
    //文件存放路径
    downloadDir: string;
}

export default class  implements DownloadItem {
    id: string = "";
    downloadDir: string = "";

    fileName: string = "";

    receivedSize: number = 0;

    status: DownLoadStatus=DownLoadStatus.READY;

    totalSize: number = 0;


}