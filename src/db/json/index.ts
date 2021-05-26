// @ts-ignore
import shortId from "shortid";

export default {
    navMenu: [
        {
            id: shortId.generate(),
            icon: 'video_library',
            menuList: [
                {
                    id: shortId.generate(),
                    bel: 'Delphi视频',
                    name: 'delphiVideo',
                    docType: 'delphiVideo'
                },
                {
                    id: shortId.generate(),
                    bel: 'Java视频',
                    name: 'javaVideo'
                },
                {
                    id: shortId.generate(),
                    bel: '其他视频',
                    name: 'otherVideo',
                    docType: 'otherVideo'
                },
                {
                    id: shortId.generate(),
                    bel: '网络视频',
                    name: 'networkVideo',
                    docType: 'networkVideo'
                }

            ]
        },

        {
            id: shortId.generate(),
            icon: 'library_books',
            menuList: [
                {
                    id: shortId.generate(),
                    bel: 'Delphi',
                    //此字段为路由跳转时使用的动态名称
                    name: 'delphi',
                    //此字段为判断是否属于树形菜单中文档的依据
                    docType: 'delphi'
                },
                {
                    id: shortId.generate(),
                    bel: 'Java',
                    name: 'java',
                    docType: 'java'
                },

            ]
        }, {
            id: shortId.generate(),
            icon: 'wb_cloudy',
            name: 'cloudDisk',
            href: '/cloud-disk'

        },
        {
            id:shortId.generate(),
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
        java: [
            {
                label: '基础语法',
                children: [
                    {
                        label: '搭建环境',
                        href: 'html/java/basic/001-搭建环境.html',
                        selectable: true,
                    },
                    {
                        label: '数据类型',
                        href: 'html/java/basic/002-数据类型.html'

                    },
                    {
                        label: '语句',
                        href: 'html/java/basic/003-语句.html'

                    },
                    {
                        label: 'Eclipse配置',
                        href: 'html/java/basic/004-Eclipse配置.html'

                    },
                    {
                        label: '数组',
                        href: 'html/java/basic/005-数组.html'

                    },
                    {
                        label: '类和对象',
                        href: 'html/java/basic/006-类和对象.html'

                    },
                    {
                        label: '变量和方法',
                        href: 'html/java/basic/007-变量和方法总结.html'

                    },
                    {
                        label: '继承和设计模式',
                        href: 'html/java/basic/008-继承和设计模式.html'

                    },
                    {
                        label: '接口及封装和多态',
                        href: 'html/java/basic/009-接口及封装和多态.html'

                    },
                    {
                        label: '常用类库',
                        href: 'html/java/basic/010-常用类库.html'

                    },
                    {
                        label: '异常机制',
                        href: 'html/java/basic/011-异常机制.html'

                    },
                    {
                        label: 'IO流',
                        href: 'html/java/basic/012-IO流.html'

                    },
                    {
                        label: '集合',
                        href: 'html/java/basic/013-集合.html'

                    },
                    {
                        label: '多线程',
                        href: 'html/java/basic/014-多线程.html'

                    },
                    {
                        label: 'XML解析',
                        href: 'html/java/basic/015-XML解析.html'

                    }
                ]
            }
            /*,{
                label: 'Web编程',
                children: [
                    {
                        label: '点击测试',
                        href: '/about',
                        selectable: true,

                    },
                    {
                        label: '首页',
                        href: '/'

                    }
                ]
            }*/
        ],
        delphi: [
            {
                label: 'Delphi百集',
                children: [
                    {
                        label: '安装破解',
                        href: 'html/delphi/basic/2018-05-09-安装破解.html',
                        selectable: true,

                    },
                    {
                        label: '单元文件结构',
                        href: 'html/delphi/basic/2018-05-14-单元文件结构.html'

                    },
                    {
                        label: '变量和常量',
                        href: 'html/delphi/basic/2018-05-29-变量和常量.html'

                    },
                    {
                        label: '复杂数据类型',
                        href: 'html/delphi/basic/2018-05-29-复杂数据类型.html'

                    }
                ]
            },
            {
                label: '官方案例',
                children: [
                    {
                        label: '安装破解',
                        href: 'html/delphi/basic/2018-05-09-安装破解.html',
                        selectable: true,

                    }
                ]
            }
        ],
        cloudDisk:[
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
                        name:'delphi001',
                        selectable: true,
                        source: 'iframe',
                        routerLink: '/play-list'
                    }
                ]
            }
        ],
        otherVideo:[
            {
                label: '开源计划',
                children: [
                    {
                        label: 'GitBook',
                        name:'openSource',
                        selectable: true,
                        source: 'iframe',
                        routerLink: '/play-list'
                    }
                ]
            }
        ],
        networkVideo:[

        ]
    },
    videos:{
        'delphi001':{
            name:'Delphi第一季',
            src:[
                "https://www.ixigua.com/iframe/6808815041043759629",
                "https://www.ixigua.com/iframe/6808907684264280588",
                "https://www.ixigua.com/iframe/6808941540468064782",
                "https://www.ixigua.com/iframe/6809137366750462468",
                "https://www.ixigua.com/iframe/6809218838563914244",
                "https://www.ixigua.com/iframe/6809219838767006222"
            ],
            desc:`此类视频无法自动更换下一集`,
            source:'iframe'

        },
        'openSource':{
            name:'文档开源计划',
            src:[
                "https://www.ixigua.com/iframe/6808815041043759629",
                "https://www.ixigua.com/iframe/6808907684264280588",
                "https://www.ixigua.com/iframe/6808941540468064782",
                "https://www.ixigua.com/iframe/6809137366750462468",
                "https://www.ixigua.com/iframe/6809218838563914244",
                "https://www.ixigua.com/iframe/6809219838767006222"
            ],
            desc:`此类视频无法自动更换下一集`,
            download: '此类视频请去网盘进行下载',
            source:'iframe'
        }
    }
}

