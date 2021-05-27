import Dexie, {Table} from 'dexie';
import {DownLoadStatus} from "@/domain/Enums";
import {DownloadItem} from "@/domain/Download";
import {Vue} from "vue-property-decorator";

export default class {

    private download: Table<DownloadItem, string>= Vue.prototype.$dexie.table('download');

    async findItemByStatus(status: string): Promise<any> {
        let _this = this;
        return new Promise<any>(async (resolve) => {
            let result = await _this.download.where("status").equals(status)

            resolve(result);
        })
    }

    async findItemWithDownloading(): Promise<any> {
        let _this = this;
        return new Promise<any>(async (resolve) => {
            let result = await _this.download.where("status").equals(DownLoadStatus.DOWNLOADING)
                .or('status').equals(DownLoadStatus.PAUSED)
                .toArray()
            resolve(result);
        })
    }

    async findWithDownloadDone(): Promise<any> {
        let _this = this;
        return new Promise<any>(async (resolve) => {
            let result = await _this.download.where("status").notEqual(DownLoadStatus.DOWNLOADING)
                .and((value: any) => {
                    return value.status !== DownLoadStatus.PAUSED;
                })
                .toArray()
            // console.log(result)
            resolve(result);
        })
    }

    putItem(item: DownloadItem) {
        this.download.put(item);
    }

    delById(key:string){
        this.download.delete(key);
    }

}