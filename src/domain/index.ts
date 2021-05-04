export interface IUser {
    nickName: string;

    headImgUrl: string;
}

/**
 * 顶部导航菜单
 */
export interface INavMenu {
    id: string,
    bel: string,
    name: string
    menuList: Array<INavMenu>
}