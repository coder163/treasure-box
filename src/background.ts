'use strict'
import {app, BrowserWindow, ipcMain, Menu, protocol} from 'electron'
import {createProtocol} from 'vue-cli-plugin-electron-builder/lib'
// @ts-ignore
import {autoUpdater, UpdateCheckResult} from 'electron-updater'
// 引入下载
import download from '@/main/download'
// 引入更新检测的文件
import Update from '@/main/update';


const path = require('path');
const fs = require('fs');
// import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer'
const isDevelopment = process.env.NODE_ENV !== 'production'

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
    {scheme: 'app', privileges: {secure: true, standard: true}}
])
if (isDevelopment) {
    if (process.platform === 'win32') {
        process.on('message', (data) => {
            if (data === 'graceful-exit') {
                app.quit()
            }
        })
    } else {
        process.on('SIGTERM', () => {
            app.quit()
        })
    }
}

let win: BrowserWindow;

function createWindow() {
    // Create the browser window.
    win = new BrowserWindow({
        width: 1200,
        height: 768,
        show: false,
        frame: false,//添加这一行采用无边框窗口
        webPreferences: {
            javascript: true,
            plugins: true,
            nodeIntegration: true, // 是否集成 Nodejs
            webSecurity: false,//允许跨域请求
            contextIsolation: false,
            enableRemoteModule: true,
            webviewTag: true

        }

    })
    Menu.setApplicationMenu(null) //取消菜单栏

    win.once('ready-to-show', () => {
        win.show()
    });
    //主窗口关闭时销毁其他窗口
    win.on('close', () => {
        logger.info('主窗口系统菜单销毁')
        win.webContents.send(ChannelMessage.TO_RENDERER_DESTROY_PLAYER_WINDOW);

    })

    if (process.env.WEBPACK_DEV_SERVER_URL) {
        // Load the url of the dev server if in development mode
        win.loadURL(process.env.WEBPACK_DEV_SERVER_URL as string)
        if (!process.env.IS_TEST)
            win.webContents.openDevTools()
    } else {
        createProtocol('app')
        // Load the index.html when not in development
        win.loadURL('app://./index.html')
    }

}


// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // logger.info('window-all-closed')
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {

    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }


})


app.on('ready', async () => {
    await createWindow()
    Update(win)
    download(win)
    require('@/main/video');
})

ipcMain.on('download-is', (event, row) => {
    // console.log('*****************',row)

    win.webContents.downloadURL(row.url + `&${row.path}|${row.size}`);

})

import {dialog} from 'electron'


ipcMain.on('open-directory-dialog', function (event, p) {

    dialog.showOpenDialog({
        properties: ['openDirectory']

    }).then((value) => {

        if (!value.canceled) {
            event.sender.send('selectedItem', value.filePaths[0])
        }

    })
    //
});


//窗口最小化
ipcMain.on('minimize', function () {
    win.minimize();
})
//窗口最大化
ipcMain.on('maximize', function () {
    if (win.isMaximized()) {
        win.restore();
    } else {
        win.maximize();
    }
})
//关闭窗口
ipcMain.on('close', function (e) {
    logger.info('主窗口自定义关闭事件......')
    win.destroy()
    app.quit();
})

//登录
ipcMain.on('login', function () {

    console.log('login-ing....')
    win.webContents.send('is-login');
});

// //登录成功
ipcMain.on('login-info', function (event, userInfo) {
    win.webContents.send('login-success', userInfo);

});

ipcMain.on('open-update-dialog', () => {
    //测试环境下使用自动更新

    win.webContents.send('update-dialog');
})
ipcMain.on('start-update', (event, args) => {
    if (isDevelopment) {
        autoUpdater.updateConfigPath = path.join(__dirname, '../dev-app-update.yml');
    }
    if (args === 0) {
        autoUpdater.checkForUpdates().then((r: UpdateCheckResult) => {

        })
    }


})
app.commandLine.appendSwitch('--ignore-certificate-errors', 'true')


import '@/main/search'
import {logger} from "@/config/Log4jsConfig";
import {ChannelMessage} from "@/domain/Enums";




