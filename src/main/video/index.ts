import {BrowserWindow, ipcMain, Menu} from 'electron'
import {logger} from "@/config/Log4jsConfig";

let playerWindow: BrowserWindow;

async function createPlayerWindow() {
    // Create the browser window.
    logger.info('开启播放器')
    if (playerWindow === null) {
        logger.info('播放器打开失败', playerWindow)
    }
    playerWindow = new BrowserWindow({
        width: 800,
        height: 600,
        // show: false,
        frame: true,//添加这一行采用无边框窗口
        webPreferences: {
            javascript: true,
            plugins: true,
            nodeIntegration: true,      // 是否集成 Nodejs
            webSecurity: false,         //允许跨域请求
            contextIsolation: false,
            enableRemoteModule: true

        }

    });

    // Menu.setApplicationMenu(null) //取消菜单栏


    const winURL = process.env.NODE_ENV === 'development'
        ? `http://localhost:8080/player.html`
        : `file://${__dirname}/player.html`

    // await playerWindow.loadURL(winURL + '#/player')
    await playerWindow.loadURL(winURL)
    playerWindow.webContents.openDevTools()
}

ipcMain.on('open-video', function (e, args) {

    createPlayerWindow()


})
