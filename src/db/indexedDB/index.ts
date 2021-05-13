import Dexie, {IndexableType, Table} from 'dexie';
import {DownloadItem, DownLoadStatus} from "@/domain";

const dbDexie: Dexie = new Dexie('local');

//
dbDexie.version(1).stores(
    {
        user: 'id,openid',
        download: 'id,fileName,totalSize,receivedSize,status,downloadDir'
    }
);
dbDexie.open().catch(function (e) {
    console.error("浏览器不支持 " + e);
});

export class DownDaoImpl {
    private download: any;

    constructor() {
        this.download = dbDexie.table('download');
    }

    async findDownLoadItemByStatus(status: string): Promise<any> {
        let _this = this;
        return new Promise<any>(async (resolve) => {
            let result = await _this.download.where("status").equals(status)

            resolve(result);
        })
    }

    async findDownItemWithDownloading(): Promise<any> {
        let _this = this;
        return new Promise<any>(async (resolve) => {
            let result = await _this.download.where("status").equals(DownLoadStatus.DOWNLOADING)
                .or('status').equals(DownLoadStatus.PAUSED)
                .toArray()

            // console.log(result)
            resolve(result);
        })
    }

    async findDownItemWithDownloadDone(): Promise<any> {
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

    putDownloadItem(item: DownloadItem) {
        this.download.put(item);
    }
}

export class UserDaoImpl {
    userTable: Table<any, IndexableType>;

    constructor() {

        this.userTable = dbDexie.table(`user`);

    }

    public getUserTable() {

        return this.userTable;
    }

    public async getFirstUser(): Promise<any> {
        if (await this.userTable.count() > 1) {
            console.log('数据异常');
            return;
        }

        return new Promise<any>(async (resolve) => {
            let result = await this.userTable.where("id").equals('1001').first()

            // result===undefined?resolve(undefined):resolve(result.uid)

            resolve(result);
        })
    }

    public add(item: any) {
        this.userTable.add(item);
    }

    public update(item: any) {
        this.userTable.put(item);
    }
}

export default dbDexie;