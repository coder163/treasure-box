<template>
  <div>
    <div id="video"></div>
  </div>

</template>

<script>
import Player from 'xgplayer';
import HlsJsPlayer from 'xgplayer-hls.js';

// import  loading from 'xgplayer-loading'

export default {
  name: "PlayerXg",
  mounted() {
    let player = new HlsJsPlayer({
      id: 'video',
      url: 'https://shls.mcloud.139.com/hls/K8846280c8a908fa4e8ea50cbdc5eb0bcf/playlist.m3u8',
      fitVideoSize: 'auto',
      poster: "//s2.pstatp.com/cdn/expire-1-M/byted-player-videos/1.0.0/poster.jpg",
      videoInit: true,
      fluid: true,
      playbackRate: [0.5, 1, 1.5, 2],
      defaultPlaybackRate: 1,
      lastPlayTime: 20, //视频起播时间（单位：秒）
      lastPlayTimeHideDelay: 5, //提示文字展示时长（单位：秒）
      download: false,//设置download控件显示
      cssFullscreen: true,
      keyShortcut: 'on',
      ignores: ['fullscreen', 'i18n'],
      lang: 'zh-cn',
      disableProgress: false,
      closeInactive: true,
      screenShot: true,
      errorTips: `请<span>刷新</span>试试`
    })
    player.ev[15].loadeddata = function () {
      console.log('************')
    };
   console.log()

  },
  methods: {
    play() {

    }
  }
}
</script>

<style scoped>

</style>