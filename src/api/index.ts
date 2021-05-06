import axios from 'axios'
import {UserDaoImpl} from '@/db/indexedDB'

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