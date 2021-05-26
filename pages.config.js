module.exports = {
  index: {
    entry: './src/pages/home/index.ts',    //  入口js
    template: 'index.html',                 //  模版文件 默认是public里的index.html
    filename: 'index.html',                 //  url访问路径
    title: '码农宝典',                   //  页面标题
  },
  player: {
    entry: './src/pages/player/index.ts',
    template: 'index.html',
    filename: 'player.html',
    title: '码农播放器',
  }
}