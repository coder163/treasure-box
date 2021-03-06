import axios from 'axios'
import Zfile, {IZfile} from "@/domain/Zfile";
import {logger} from "@/config/Log4jsConfig";


export class ZfileApi {

    static getName(path: string = 'treasure-box') {
        const url = `https://disk.coder163.com/api/list/1?path=/${path}&password=000000`
        logger.info(url)
        let fileList: Array<IZfile> = new Array<IZfile>();
        return new Promise<any>(async (resolve, reject) => {
            await axios.get(url).then(resp => {
                resp.data.data.files.forEach((item: any) => {
                    let {name, path, size, time, type, url} = item;
                    let file: Zfile = new Zfile(name, path, size, time, type, url)
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
            await axios.get('https://vip.coder163.com/getTicket').then(resp => {
                console.log(resp.data)
                resolve(resp.data)
            }).catch(err => {

                reject('Ticket获取失败')
            })
        })

    }

    public userinfo(uid: string): Promise<any> {

        return new Promise<any>(async (resolve, reject) => {
            await axios.get(`https://vip.coder163.com/userinfo?uid=${uid}`).then(resp => {
                resolve(resp.data)
            }).catch(err => {
                reject('userinfo获取失败');
            })
        })
    }

    public getUserByOid(openid: string): Promise<any> {

        return new Promise(async (resolve, reject) => {
            await axios.get(`https://vip.coder163.com/getUserByOid?oid=${openid}`).then(resp => {
                resolve(resp.data)
            }).catch(err => {
                reject('userinfo获取失败');
            })
        })
    }

}