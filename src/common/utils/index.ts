import {ITreeNode, TreeNode} from "@/domain/Tree";
import axios from "axios";

const fs = require('fs')
const path = require('path')

//读取文件目录
function listFile(pathName: string, dirs: ITreeNode[]) {
    fs.readdirSync(pathName).forEach((item: string, index: number) => {
        let stat = fs.lstatSync(path.join(pathName, item))
        if (stat.isDirectory()) {
            listFile(path.join(pathName, item), dirs)
        } else if (stat.isFile()) {
            let treeNode: ITreeNode = new TreeNode();
            // console.log(path.join(pathName, item))
            treeNode.href = encodeURIComponent(path.join(pathName, item))
            treeNode.label = item.substring(item.indexOf('-') + 1, item.lastIndexOf('.'))
            // console.log(path.join(pathName, item))
            dirs.push(treeNode)
        }
    })
    return dirs
}

/**
 * 第三方结果
 * @returns 数组
 */
async function extraResult(title: string, size: number = 5) {
    console.log(title)
    let url = "https://api.jackeriss.com/api/v1/search/?text=" + encodeURIComponent(title) + "&type=0&from=0&size=" + size;
    let sources = new Array<string>();
    await axios.get(url).then(resp => {

        sources = resp.data.resources;
    }).catch(err => {
        // 请求失败后的处理函数
        console.log('请求失败！！', err);
    });
    return sources;
}

async function html2M3u8(sourceUrl: string) {
    console.log('待解析的url:' + sourceUrl)
    // let playUrl = `https://json.m3u8.tv:7788/json.php?url=${sourceUrl}`;
    let playUrl = `https://json.m3u8.tv:7788/json.php?url=${sourceUrl}`;
    let result = {
        type: 'mp4',
        url: ''
    };
    await axios.get(playUrl).then(async resp => {
        console.log('解析完成', resp.data);
        result.url = resp.data.url;
        result.type = (resp.data.type === 'hls' || resp.data.type === 'm3u8') ? 'customHls' : resp.data.type;
    }).catch(err => {
        // 请求失败后的处理函数
        console.log('请求失败！！', err);
    });
    console.log('最后的地址：', result);
    return result;
}


export {
    listFile,
    html2M3u8,
    extraResult
};