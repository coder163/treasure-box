
/**
 * 顶部导航菜单
 */
export interface INavMenu {
    id: string,
    bel: string,
    name: string
    docType: string,
    href: string,
    menuList: Array<INavMenu>
}