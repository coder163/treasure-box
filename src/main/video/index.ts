import {ipcMain} from 'electron'
import {logger} from "@/config/Log4jsConfig";

ipcMain.on('open-video',function (e,args) {

    logger.info('信息收到')

})