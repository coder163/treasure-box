'use strict'


import {app, BrowserWindow, ipcMain, Menu, protocol} from 'electron'
import {createProtocol} from 'vue-cli-plugin-electron-builder/lib'
// @ts-ignore
import {autoUpdater, UpdateCheckResult} from 'electron-updater'
// 引入更新检测的文件
import Update from '@/main/update';
import * as Process from "process";

const path = require('path');
const fs = require('fs');
// import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer'
const isDevelopment = process.env.NODE_ENV !== 'production'

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
    {scheme: 'app', privileges: {secure: true, standard: true}}
])
let win: BrowserWindow;

async function createWindow() {
    // Create the browser window.
    win = new BrowserWindow({
        width: 1200,
        height: 768,
        // show: false,
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
    win.webContents.openDevTools()
    if (process.env.WEBPACK_DEV_SERVER_URL) {
        // Load the url of the dev server if in development mode
        await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL as string)
        // if (!process.env.IS_TEST)
        // win.webContents.openDevTools()
    } else {
        createProtocol('app')
        // Load the index.html when not in development
        await win.loadURL('app://./index.html')
    }
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        console.log('window-all-closed')
        app.quit()
    }
})

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
})


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
    if (isDevelopment) {
        autoUpdater.updateConfigPath = path.join(__dirname, '../dev-app-update.yml');
    }

    /*  autoUpdater.checkForUpdates().then((r:UpdateCheckResult) => {
          console.log(r)
      })*/
    win.webContents.send('update-dialog');
})

app.commandLine.appendSwitch('--ignore-certificate-errors', 'true')

app.on('ready', async () => {
    await createWindow()
    require('./main/video')
    Update(win)
})

ipcMain.on('download-is', (event, url,path) => {

    win.webContents.downloadURL(url);

    win.webContents.session.on('will-download', (event, item, webContents) => {
        //设置文件存放位置，如果用户没有设置保存路径，Electron将使用默认方式来确定保存路径（通常会提示保存对话框）
        const fullPath = `E:\\download\\${path.replaceAll('/','\\')}${item.getFilename()}`;
        console.log(fullPath);
        item.setSavePath(fullPath)

        item.on('updated', (event, state) => {
            if (state === 'interrupted') {
                //下载中断
                console.log('Download is interrupted but can be resumed')
            } else if (state === 'progressing') {
                if (item.isPaused()) {
                    //下载暂停
                    console.log('Download is paused')
                } else {
                    //已经收到的数据
                    console.log(`Received bytes: ${item.getReceivedBytes()}`)
                }
            }
        })
        item.once('done', (event, state) => {
            if (state === 'completed') {
                console.log('Download successfully')
                //回显 调用渲染进程方法
                win.webContents.send('downloadItemDone', state)
            } else {
                console.log(`Download failed: ${state}`)
                //回显 调用渲染进程方法
                win.webContents.send('downstate', state)
            }
        })
    })
})



