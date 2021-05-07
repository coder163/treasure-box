// @ts-ignore
import { autoUpdater } from 'electron-updater'
import { ipcMain, BrowserWindow, dialog } from 'electron'

import { logger } from '@/config/Log4jsConfig'

/**
 * -1 检查更新失败 0 正在检查更新 1 检测到新版本，准备下载 2 未检测到新版本 3 下载中 4 下载完成
 **/
// 负责向渲染进程发送信息
function Message(mainWindow: BrowserWindow, type: Number, data?: String) {

    const senddata = {
        state: type,
        msg: data || ''
    }
    console.log(senddata)

    mainWindow.webContents.send('UpdateMsg', senddata)
}
// 更新应用的方法
export default (mainWindow: BrowserWindow) => {
    // autoUpdater.updateConfigPath = path.join(__filename, '../../dist/win-ia32-unpacked/resources/app-update.yml')

    // 在下载之前将autoUpdater的autoDownload属性设置成false，通过渲染进程触发主进程事件来实现这一设置(将自动更新设置成false)
    autoUpdater.autoDownload = true
    //设置版本更新地址，即将打包后的latest.yml文件和exe文件同时放在
    autoUpdater.setFeedURL('http://281244ia88.qicp.vip/public')
    // 当更新发生错误的时候触发。
    autoUpdater.on('error', (err:any) => {
        logger.log(err)
    })
    // 当开始检查更新的时候触发
    autoUpdater.on('checking-for-update', (event:any, arg:any) => {
        logger.log('checking-for-update', '当开始检查更新的时候触发')
        Message(mainWindow, 0)
    })
    // 发现可更新数据时
    autoUpdater.on('update-available', (event:any, arg:any) => {
        logger.log('update-available', '发现可更新数据时')
        Message(mainWindow, 1)
    })
    // 没有可更新数据时
    autoUpdater.on('update-not-available',(event:any, arg:any) => {
        logger.log('update-not-available', '没有可更新数据时')
        Message(mainWindow, 2)
    })
    // 下载监听
    autoUpdater.on('download-progress', (progressObj:any) => {
        logger.log('download-progress', '下载监听')
        Message(mainWindow, 3, progressObj)
    })
    // 下载完成
    autoUpdater.on('update-downloaded', () => {
        logger.log('update-downloaded', '下载完成')
        Message(mainWindow, 4)
    })
    // 执行更新检查
    ipcMain.on('check-update', () => {
        logger.log('check-update', '执行更新检查')
        autoUpdater.checkForUpdates()
    })
    // 退出并安装
    ipcMain.on('confirm-update', () => {
        autoUpdater.quitAndInstall()
    })

    // 手动下载更新文件
    ipcMain.on('confirm-downloadUpdate', () => {
        autoUpdater.downloadUpdate()
    })
}