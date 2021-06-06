import {ITreeNode, TreeNode} from "@/domain/Tree";
import axios from "axios";
import {logger} from "@/config/Log4jsConfig";

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
    console.log('待解析的url:'+sourceUrl)
    let playUrl = `https://m3u8.tv.janan.net/json.php?url=${sourceUrl}`;
    let result = {
        type: 'mp4',
        url: ''
    };
    await axios.get(playUrl).then(resp => {
        console.log('m3u8.tv', resp.data);

        result.url = resp.data.url;
        result.type = resp.data.type;

    }).catch(err => {
        // 请求失败后的处理函数
        console.log('请求失败！！', err);
    });

    return result;
}

export {
    listFile,
    html2M3u8,
    extraResult
};