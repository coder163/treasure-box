let uiData = {
    navMenu: [
        {
            icon: 'video_library',
            menuList: [
                'Delphi视频',
                'Java视频'
            ]
        }, {
            icon: 'library_books',
            menuList: [
                'Delphi文档',
                'Java文档',
                'PDF电子书'
            ]
        }, {
            icon: 'wb_cloudy',
            menuList: [
                '世纪互联',
                '百度网盘'
            ]
        }, {
            icon: 'help',
            menuList: [
                '关于作者',
                '检查更新'
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
            },{
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
            }
        ],
        delphi: [
            {
                label: '基础语法',
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
            }
        ]
    }
}


export default uiData