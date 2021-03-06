import {DownLoadStatus} from "@/domain/Enums";
import {BrowserWindow, dialog} from "electron";
// @ts-ignore
import shortId from "shortid";
import DownloadImpl, {DownloadItem} from "@/domain/Download";

// downloadItem.fileName = row.name

//每一次下载都是一个新的下载项
// downloadItem.downloadDir = `E:\\download\\${row.path.replaceAll('/', '\\')}`;
import {AppConfig} from '@/db/lowdb'
import {logger} from "@/config/Log4jsConfig";

const fs = require('fs')

export default (win: BrowserWindow) => {
    win.webContents.session.on('will-download', (event, item, webContents) => {
        logger.info('*****************************开始下载******************')
        let downloadItem: DownloadItem = new DownloadImpl();
        downloadItem.id = shortId.generate();

        let index = item.getURL().lastIndexOf('&') + 1;

        //参数
        let parames = item.getURL().substring(index).split('|');


        //设置文件存放位置，如果用户没有设置保存路径，Electron将使用默认方式来确定保存路径（通常会提示保存对话框）

        const fullPath = `${AppConfig.get("app").value().downDir}\\${item.getFilename()}`;

        if (fs.existsSync(fullPath)) {
            console.log('文件存在')
           let handle= dialog.showMessageBoxSync(win, {
                type: 'warning',title:'码农宝典',message: '温馨提示', detail: '文件已经存在点击确认将会覆盖文件',
                buttons:['确认','取消']
            })

            if (handle === 1) {
                console.log(handle,'下载已取消');
                item.cancel()
            }

        }

        console.log('下载目录：', fullPath);
        item.setSavePath(fullPath)

        downloadItem.fileName = item.getFilename()
        //此处有问题
        downloadItem.totalSize = parseInt(parames[1]);
        console.log('总字节数', downloadItem.totalSize);
        item.on('updated', (event, state) => {
            if (state === 'interrupted') {
                //下载中断
                downloadItem.status = DownLoadStatus.INTERRUPTED;
                console.log('下载中断')
            } else if (state === 'progressing') {
                if (item.isPaused()) {
                    //下载暂停
                    downloadItem.status = DownLoadStatus.PAUSED
                    console.log('下载暂停')
                } else {
                    downloadItem.status = DownLoadStatus.DOWNLOADING;
                    //已经收到的数据
                    downloadItem.receivedSize = item.getReceivedBytes();
                    // console.log('正在下载')
                }
            }

            //入库
            win.webContents.send('download-status', downloadItem)
            win.webContents.send('download-process', downloadItem)

        })
        item.once('done', (event, state) => {
            if (state === 'completed') {
                //回显 调用渲染进程方法
                downloadItem.status = DownLoadStatus.COMPLETED;
                win.webContents.send('download-process-done', downloadItem)
            } else if (state === 'cancelled') {
                //回显 调用渲染进程方法
                downloadItem.status = DownLoadStatus.CANCELLED;
            } else {
                downloadItem.status = DownLoadStatus.INTERRUPTED
            }

            win.webContents.send('download-done', downloadItem)

        })
    })
}
