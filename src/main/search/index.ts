import {BrowserWindow, ipcMain} from "electron";
import axios from "axios";
import {VideoApiConfig} from '@/db/lowdb'
import {logger} from "@/config/Log4jsConfig";
import Episodes, {IEpisodes} from "@/domain/Episode";
// @ts-ignore
import shortId from "shortid";

const urlencode = require('urlencode');

/**
 * 解析src
 * @param src 可以是m3u8的连接，也可以是html的原播放页
 */
function analysisSrc(src:string):any{


    if (src.endsWith("m3u8") || src.endsWith("m3u8#")) {
        return src.match(/https.*?\/index.m3u8/gi)
    }

    if (src.endsWith("html")) {

        ///https?:\/\/[a-zA-Z0-9\.\?/%-_]*/gm
        return   src.match(/https?:\/\/[a-zA-Z0-9\.\?/%-_]*/gm);
    }
}

ipcMain.on("search-video", function (response, name) {
    let currentWin: Electron.BrowserWindow | null = BrowserWindow.getFocusedWindow();
    let resources = VideoApiConfig.get("resource-site").value();
    let episodesList: Array<IEpisodes> = new Array<IEpisodes>();

    axios.all(resources.map(function (value: any) {
            let url = `${value.url}ac=detail&wd=${urlencode(name)}`;

            return axios.get(url).then(function (resp) {
                console.log(value.name, value.url)
                if (resp.data.list.length > 0) {
                    for (let i = 0; i < resp.data.list.length; i++) {
                        let {vod_play_from, vod_play_note, vod_play_url, vod_time, vod_content, type_name, vod_lang, vod_name} = resp.data.list[i];
                        let episodes: Episodes = new Episodes();
                        episodes.sourceName = value.name;
                        //剧情描述
                        episodes.id = shortId.generate()
                        episodes.desc = vod_content;
                        episodes.name = vod_name;
                        episodes.type = type_name;
                        episodes.lang = vod_lang
                        episodes.time = vod_time;
                        episodes.source = 'm3u8'
                        //按照指定的分隔符进行拆分,该数组内容的形式$https://vod.bunediy.com/share/zOBt4pGh3U47vXFe#$$$超清$https://vod.bunediy.com/20201119/vVYz7uzh/index.m3u8#
                        let urls = vod_play_url;
                        if ('' !== vod_play_note) {
                            //播放平台 $$$
                            let fromSource = vod_play_from.split('$$$');
                            console.log('播放平台：', vod_play_note)
                            //具体的剧集列表
                            let sourceList = vod_play_url.split('$$$')[0];
                            //选出集数最多的播放平台
                            for (let i = 0; i < fromSource.length; i++) {
                                urls = vod_play_url.split('$$$')[i];
                                if (sourceList.length < urls.length) {
                                    sourceList = urls;
                                }
                            }
                            urls = sourceList;
                        }
                        episodes.src = analysisSrc(urls);
                        console.log(episodes.name, episodes.src)
                        episodesList.push(episodes);
                    }

                }

                if (currentWin !== null) {
                    let result = {
                        //成功
                        status: 'success',
                        data: episodesList
                    }

                    currentWin.webContents.send('episodes-result', result);
                }

            }).catch(function (err) {
                // 也可以返回你想要的错误提示结果，如果不返回数据，那么获得的值就是undefined 英雄
                logger.info('请求出错', value.name);
                if (currentWin !== null) {
                    let result = {
                        //成功
                        status: 'err',
                        data: episodesList
                    }
                    currentWin.webContents.send('episodes-result', result);
                }
            });

        }
    )).then(

        axios.spread((res1) => {
                // 两个请求现在都执行完成
            // @ts-ignore
            logger.info("请求全部完成*********************************",res1.data)
                let result = {
                    //成功
                    status: 'end',
                    data: episodesList
                }
                if (currentWin !== null) {
                    currentWin.webContents.send('episodes-result', result);
                }

            }
        ))

})


