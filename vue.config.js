const pages = require('./pages.config')

module.exports = {
    pages,
    chainWebpack: config => {
        // 修复热更新
        config.resolve.symlinks(true);
    },
    devServer: {
        //open: true,               npm run serve 自动打开浏览器
        index: '/index.html'    //  默认启动页面
    },
    lintOnSave: false,
    assetsDir: 'static',      //  打包后静态文件夹名称

    pluginOptions: {
        electronBuilder: {
            nodeIntegration: true,
            builderOptions: {
                "asar": false,
                extraResources: [
                    {
                        "from": "./config/",
                        "to": "../config"
                    },
                    {
                        "from": "./html/",
                        "to": "../html"
                    }
                ],
                "publish": [
                    {
                        "provider": "generic",
                        "url": "http://vip.coder163.com/public/",//更新服务器地址,可为空
                    }
                ],
                "appId": "com.coder163",
                "productName": "码农宝典",//项目名，也是生成的安装文件名，即aDemo.exe
                "copyright": "Copyright © 2021",//版权信息
                directories: {
                    output: 'build' // 打包产物的位置
                },
                linux: {
                    "icon": "./favicon.ico", // 包含各种尺寸图标的文件夹
                    target: [
                        "AppImage"
                    ],

                },
                win: {//win相关配置
                    "icon": "./favicon.ico",//图标，当前图标在根目录下，注意这里有两个坑
                    "requestedExecutionLevel": "highestAvailable", // 申请高级权限
                    "target": [
                        {
                            "target": "nsis",//利用nsis制作安装程序
                            "arch": [
                                "x64",//64位
                                "ia32"//32位
                            ]
                        }
                    ]
                },
                nsis: {
                    oneClick: false, // 是否一鍵安裝
                    perMachine: true, // 是否為每一台機器安裝
                    // installerIcon: 'public/icon.ico', // 安裝圖示
                    // uninstallerIcon: 'public/icon.ico', // 卸載圖示
                    // installerHeaderIcon: 'public/icon.ico', // 安裝頂部圖示
                    allowToChangeInstallationDirectory: true, // 是否可更改安裝目錄
                    createDesktopShortcut: true, // 是否建立桌面捷徑
                    createStartMenuShortcut: true // 是否建立開始捷徑
                }
            }

        },
        quasar: {
            importStrategy: 'kebab',
            rtlSupport: false
        }
    },
    transpileDependencies: [
        'quasar'
    ],
    //警告 webpack 的性能提示
    configureWebpack: {
        performance: {
            hints: 'warning',
            //入口起点的最大体积 整数类型（以字节为单位）
            maxEntrypointSize: 10000000,
            //生成文件的最大体积 整数类型（以字节为单位 3000k）
            maxAssetSize: 30000000,
            //只给出 js 文件的性能提示
            assetFilter: function (assetFilename) {
                return assetFilename.endsWith('.js');
            }
        }
    }
}
