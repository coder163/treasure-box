import {ITreeNode, TreeNode} from "@/domain/Tree";

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
            treeNode.href = encodeURIComponent( path.join(pathName, item))
            treeNode.label = item.substring(item.indexOf('-') + 1, item.lastIndexOf('.'))
            // console.log(path.join(pathName, item))
            dirs.push(treeNode)
        }
    })
    return dirs
}

export {
    listFile
}