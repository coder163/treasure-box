// @ts-ignore
import shortId from "shortid";
import {listFile} from "@/common/utils";

export default {
    navMenu: [
        {
            id: shortId.generate(),
            icon: 'video_library',
            menuList: [
                {
                    id: shortId.generate(),
                    bel: 'Delphi视频',
                    video: 'delphiVideo'
                },
                {
                    id: shortId.generate(),
                    bel: 'Java视频',
                    video: 'javaVideo'
                },
                {
                    id: shortId.generate(),
                    bel: '其他视频',
                    video: 'otherVideo'
                }

            ]
        },

        {
            id: shortId.generate(),
            icon: 'library_books',
            menuList: [
                {
                    id: shortId.generate(),
                    bel: 'Delphi篇',
                    //此字段为路由跳转时使用的动态名称
                    name: 'delphi',
                },
                {
                    id: shortId.generate(),
                    bel: 'Java篇',
                    name: 'java',
                },
                {
                    id: shortId.generate(),
                    bel: '番外篇',
                    name: 'fanwai',
                }

            ]
        }, {
            id: shortId.generate(),
            icon: 'wb_cloudy',
            name: 'cloudDisk',
            href: '/cloud-disk'

        },
        {
            id: shortId.generate(),
            icon: 'settings',
            name: 'setting',
            //vue组件的路由名称
            href: '/setting'
        },
        {
            id: shortId.generate(),
            icon: 'help',
            menuList: [
                {
                    id: shortId.generate(),
                    bel: '关于作者',
                    name: 'about',
                    //此种为md文件，但又不是树形菜单中的文档
                    href: `/content/${encodeURIComponent('html/about/index.html')}`
                },
                {
                    id: shortId.generate(),
                    bel: '检查更新',
                    name: 'update',
                    //vue组件的路由名称
                    // href: '/time-line'
                },
            ]
        }

    ],
    docs: {
        fanwai: [
            {
                label: '公众号文章',
                children: listFile(`./html/docs/fanwai/articles`, [])
            }

        ],
        java: [
            {
                label: '基础语法',
                children: listFile(`./html/docs/java/basic`, [])
            }

        ],
        delphi: [
            {
                label: '基础编程',
                children: listFile(`./html/docs/delphi/basic`, [])

            },
            {
                label: '设计模式',
                children: listFile(`./html/docs/delphi/design`, [])
            },
            {
                label: '附录',
                children: listFile(`./html/docs/delphi/appendix`, [])
            }
        ],
        cloudDisk: [
            {
                label: '网盘传输',
                children: [
                    {
                        label: '返回网盘',
                        routerLink: '/cloud-disk',
                        name: 'download-return',


                    },
                    {
                        label: '正在下载',
                        routerLink: '/transmission',
                        name: 'download',

                    },
                    {
                        label: '传输完成',
                        routerLink: '/transmission',
                        name: 'download-done',

                    }
                ]
            }
        ],
        delphiVideo: [
            {
                label: 'Delphi基础',
                children: [
                    {
                        label: '第一季',
                        name: 'delphi001',
                        source: 'iframe',
                        routerLink: '/play-list'
                    },
                    {
                        label: '第二季',
                        name: 'delphi002',
                        source: 'iframe',
                        routerLink: '/play-list'
                    }
                ]
            }
        ],
        otherVideo: [
            {
                label: '开源计划',
                children: [
                    {
                        label: '文档开源计划',
                        name: 'openSource',
                        source: 'iframe',
                        routerLink: '/play-list'
                    }
                ]
            }
        ],

        javaVideo: []
    },
    videos: {
        'delphi001': {
            name: 'Delphi第一季',
            src: [
                "https://www.ixigua.com/iframe/6808815041043759629",
                "https://www.ixigua.com/iframe/6808907684264280588",
                "https://www.ixigua.com/iframe/6808941540468064782",
                "https://www.ixigua.com/iframe/6809137366750462468",
                "https://www.ixigua.com/iframe/6809218838563914244",
                "https://www.ixigua.com/iframe/6809219838767006222"
            ],
            desc: `此类视频无法自动更换下一集`,
            source: 'iframe'

        },
        'delphi002': {
            name: 'Delphi第一季',
            src: [
                "https://www.ixigua.com/iframe/6808815041043759629",
                "https://www.ixigua.com/iframe/6808907684264280588",
                "https://www.ixigua.com/iframe/6808941540468064782",
                "https://www.ixigua.com/iframe/6809137366750462468",
                "https://www.ixigua.com/iframe/6809218838563914244",
                "https://www.ixigua.com/iframe/6809219838767006222"
            ],
            desc: `此类视频无法自动更换下一集`,
            source: 'iframe'

        },
        'openSource': {
            name: '文档开源计划',
            src: [
                "https://www.ixigua.com/iframe/6808815041043759629",
                "https://www.ixigua.com/iframe/6808907684264280588",
                "https://www.ixigua.com/iframe/6808941540468064782",
                "https://www.ixigua.com/iframe/6809137366750462468",
                "https://www.ixigua.com/iframe/6809218838563914244",
                "https://www.ixigua.com/iframe/6809219838767006222"
            ],
            desc: `此类视频无法自动更换下一集`,
            download: '此类视频请去网盘进行下载',
            source: 'iframe'
        }
    }
}

