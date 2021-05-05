'use strict'


import {logger} from "@/config/Log4jsConfig";

const path = require('path');
const fs = require('fs');
import { app, protocol, BrowserWindow, Menu, ipcMain } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
// import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer'
const isDevelopment = process.env.NODE_ENV !== 'production'

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
    { scheme: 'app', privileges: { secure: true, standard: true } }
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
            enableRemoteModule: true

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

app.on('ready', async () => {
    await createWindow()
    require('./main/video')
    // console.log('************************************',__dirname)
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

    // console.log(isLogin)
    win.webContents.send('is-login');


});

// //登录成功
// ipcMain.on('login-user', function (event, userinfo) {
//     console.log('用户登录成功',userinfo)
//     win.webContents.send('login-info', userinfo);
//
// });
