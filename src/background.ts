'use strict'


const path = require('path');
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
            // Use pluginOptions.nodeIntegration, leave this alone
            // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
            // nodeIntegration: (process.env
            //     .ELECTRON_NODE_INTEGRATION as unknown) as boolean
            javascript: true,
            plugins: true,
            nodeIntegration: true, // 是否集成 Nodejs
            webSecurity: false,//允许跨域请求
            contextIsolation: false,
            enableRemoteModule: true

        }

    })

    Menu.setApplicationMenu(null) //取消菜单栏

    if (process.env.WEBPACK_DEV_SERVER_URL) {
        // Load the url of the dev server if in development mode
        await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL as string)
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
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
    // if (isDevelopment && !process.env.IS_TEST) {
    //   // Install Vue Devtools
    //   try {
    //     await installExtension(VUEJS_DEVTOOLS)
    //   } catch (e) {
    //     console.error('Vue Devtools failed to install:', e.toString())
    //   }
    // }
    createWindow()
    require('./main/video')
})


// Exit cleanly on request from parent process in development mode.
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
})
