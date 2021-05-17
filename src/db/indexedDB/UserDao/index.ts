import Dexie, {Table} from 'dexie';
import {IUser} from "@/domain/User";
import {Vue} from "vue-property-decorator";

export default class {
    private userTable: Table<IUser, string>= Vue.prototype.$dexie.table('user');


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

    public add(item: IUser) {
        this.userTable.add(item);
    }

    public update(item: IUser) {
        this.userTable.put(item);
    }
}