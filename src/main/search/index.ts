import {BrowserWindow, ipcMain} from "electron";
import axios from "axios";
import {VideoApiConfig} from '@/db/lowdb'
import {logger} from "@/config/Log4jsConfig";
import Episodes, {IEpisodes} from "@/domain/Episode";

const urlencode = require('urlencode');

ipcMain.on("search-video", function (response, name) {
    let currentWin: Electron.BrowserWindow | null = BrowserWindow.getFocusedWindow();
    let resources = VideoApiConfig.get("resource-site").value();
    let episodesList: Array<IEpisodes> = new Array<IEpisodes>();
    axios.all(resources.map(function (value: any) {
            let url = `${value.url}ac=detail&wd=${urlencode(name)}`;
            console.log(url, value.name)
            return axios.get(url).then(function (resp) {

                //Contents of collection 'episodesList' are updated, but never queried
                if (resp.data.list.length > 0) {
                    for (let i = 0; i < resp.data.list.length; i++) {
                        let {vod_play_note, vod_play_url, vod_time, vod_content, type_name, vod_lang, vod_name} = resp.data.list[i];
                        let episodes: Episodes = new Episodes();
                        //剧情描述
                        episodes.desc = vod_content;
                        episodes.name = vod_name;
                        episodes.type = type_name;
                        episodes.lang = vod_lang
                        episodes.time = vod_time;
                        episodes.source='m3u8'
                        //按照指定的分隔符进行拆分,该数组内容的形式$https://vod.bunediy.com/share/zOBt4pGh3U47vXFe#$$$超清$https://vod.bunediy.com/20201119/vVYz7uzh/index.m3u8#
                        let urls = vod_play_url.split(vod_play_note)

                        urls.map((item: string) => {
                            if (item.endsWith("m3u8") || item.endsWith("m3u8#")) {
                                let list = item.match(/https.*?\/index.m3u8/gi)
                                if (list !== null) {
                                    episodes.src = list;
                                }

                            }
                        })
                        // console.log(episodes.src)
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
        axios.spread((res1, res2) => {
                // 两个请求现在都执行完成
                logger.info("请求全部完成*********************************")
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