import Dexie, {IndexableType, Table} from 'dexie';
import {IUser} from "@/domain";

const dbDexie: Dexie = new Dexie('local');


dbDexie.version(1).stores({
    user: `id,uid`
});
dbDexie.open();


export class UserDaoImpl {
    private userTable: Table<any, IndexableType>;

    constructor() {

        this.userTable = dbDexie.table(`user`);

    }


    public getUserTable(){

        return this.userTable;
    }

    public async getFirstUser():Promise<any>{
        if( await this.userTable.count()>1){
            console.log('数据异常');
            return ;
        }

        return  new Promise<any>( async (resolve)=>{
            let result=await this.userTable.where("id").equals('1001').first()

            // result===undefined?resolve(undefined):resolve(result.uid)

            resolve(result);
        })
    }
    public add(item:any){
        this.userTable.add(item);
    }

    public update(item:any){
        this.userTable.put(item);
    }
}

export default dbDexie;