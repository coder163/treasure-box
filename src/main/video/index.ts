import {BrowserWindow, ipcMain, Menu} from 'electron'
import {logger} from "@/config/Log4jsConfig";
import {ChannelMessage} from "@/domain/Enums";

let playerWindow: BrowserWindow

function createPlayerWind() {
    playerWindow = new BrowserWindow({
        width: 800,
        height: 600,
        show: false,
        webPreferences: {
            javascript: true,
            plugins: true,
            nodeIntegration: true,      // 是否集成 Nodejs
            webSecurity: false,         //允许跨域请求
            contextIsolation: false,
            enableRemoteModule: true

        }

    });

    Menu.setApplicationMenu(null) //取消菜单栏
    const winURL = process.env.NODE_ENV === 'development' ? `http://localhost:8080/player.html` : `file://${__dirname}/player.html`
    playerWindow.loadURL(winURL)
    if (process.env.NODE_ENV === 'development') {
        playerWindow.webContents.openDevTools();
    }
    playerWindow.on('close', function (event) {
        event.preventDefault();
        playerWindow?.webContents.send(ChannelMessage.TO_RENDERER_DESTROY_PLAYER)
        playerWindow?.hide();
    });
    logger.info('播放窗口加载完成....')
}


ipcMain.on(ChannelMessage.TO_MAIN_OPEN_VIDEO_WINDOWS, function (event, args) {

    playerWindow?.show();

    event.sender.send(ChannelMessage.TO_RENDERER_OPEN_VIDEO_WINDOWS);
});

ipcMain.on(ChannelMessage.TO_MAIN_VIDEO_DATA, async function (event, epi) {
    playerWindow?.webContents.send(ChannelMessage.TO_RENDERER_VIDEO_DATA, epi)
});

ipcMain.on(ChannelMessage.TO_MAIN_DESTROY_PLAYER_WINDOW, () => {
    logger.info('播放器窗口销毁')
    playerWindow?.destroy()
});

createPlayerWind();
