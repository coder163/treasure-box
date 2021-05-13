import {DownloadImpl, DownloadItem, DownLoadStatus} from "@/domain";
import {BrowserWindow, ipcMain} from "electron";
// @ts-ignore
import shortId from "shortid";


// downloadItem.fileName = row.name

//每一次下载都是一个新的下载项
// downloadItem.downloadDir = `E:\\download\\${row.path.replaceAll('/', '\\')}`;

export default (win: BrowserWindow) => {


    win.webContents.session.on('will-download', (event, item, webContents) => {
        let downloadItem: DownloadItem = new DownloadImpl();
        downloadItem.id = shortId.generate();

        //设置文件存放位置，如果用户没有设置保存路径，Electron将使用默认方式来确定保存路径（通常会提示保存对话框）

        const fullPath = `E:\\download\\${item.getFilename()}`;

        item.setSavePath(fullPath)

        downloadItem.fileName = item.getFilename()
        //此处有问题
        downloadItem.totalSize = item.getTotalBytes();
        console.log('总字节数',item.getTotalBytes());
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
