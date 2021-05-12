import axios from 'axios'
import {UserDaoImpl} from '@/db/indexedDB'
import {IZfile} from "@/domain";

class Zfile implements IZfile {
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
export class ZfileApi {

    static getName(path:string=''){
       const url= `https://disk.coder163.com/api/list/1?path=/${path}`
        let fileList: Array<IZfile> = new Array<IZfile>();

        return new Promise<any>(async (resolve, reject) => {
            await axios.get(url).then(resp => {

                    resp.data.data.files.forEach((item:any)=>{
                        let {name, path, size, time, type, url} = item;
                        let  file:Zfile= new Zfile(name,path,size,time,type,url)
                        fileList.push(file);
                    })
                resolve(fileList)
            }).catch(err => {

                reject(err)
            })
        })
    }

}
export default class {

    public getTicket(): Promise<any> {

        return new Promise<any>(async (resolve, reject) => {
            await axios.get('http://281244ia88.qicp.vip/getTicket').then(resp => {
                console.log(resp.data)
                resolve(resp.data)
            }).catch(err => {

                reject('Ticket获取失败')
            })
        })

    }

    public userinfo(uid: string): Promise<any> {

        return new Promise<any>(async (resolve, reject) => {
            await axios.get(`http://281244ia88.qicp.vip/userinfo?uid=${uid}`).then(resp => {
                resolve(resp.data)
            }).catch(err => {
                reject('userinfo获取失败');
            })
        })
    }
    public getUserByOid(openid: string): Promise<any> {

        return new Promise(async (resolve, reject) => {
            await axios.get(`http://281244ia88.qicp.vip/getUserByOid?oid=${openid}`).then(resp => {
                resolve(resp.data)
            }).catch(err => {
                reject('userinfo获取失败');
            })
        })
    }

}