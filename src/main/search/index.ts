import {ipcMain} from "electron";
import axios from "axios";
import {VideoApiConfig} from '@/db/lowdb'
import {logger} from "@/config/Log4jsConfig";

logger.info("开始搜索")

ipcMain.on("search-video", function (response, name) {

    let resources = VideoApiConfig.get("resource-site").value();
    let count = 0;
    // axios.defaults.headers['Content-Type'] = 'text/plain';

    axios.all(resources.map(function (value: any) {
        let url = value.url + "ac=detail&wd=" + encodeURIComponent(name);
        logger.info(url);
        return axios.get(url).then(function (resp) {
            console.log(resp.data)
            if (count === 0 && resp.data.list.length > 0) {

            }

        }).catch(function (err) {
            // 也可以返回你想要的错误提示结果，如果不返回数据，那么获得的值就是undefined
            logger.info('请求出错');
            return {
                "status": -100,
                "msg": "请求出错"
            }
        });
    })).then(axios.spread((res1, res2, res3) => {
        // 两个请求现在都执行完成
        logger.info("请求全部完成*********************************")
    }))

})