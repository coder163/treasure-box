export interface IUser {

    nickName: string;

    headImgUrl: string;

    id: string;
    uid:string;
    openid: string;
}

export class User implements IUser {
    //用户再数据库的ID
    id: string = "1001";
    //公众号中响应的用户ID
    uid:string= "";
    //
    openid: string = "";
    //头像
    headImgUrl: string = "";
    //昵称
    nickName: string = "";
}