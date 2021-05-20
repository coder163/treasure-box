<template>
  <!--  'height': winHeight+'px',-->
  <div id="dplayer" :style="{'height':'450px'}">

  </div>

</template>

<script>
import Hls from 'hls.js'
import DPlayer from 'dplayer';
import {logger} from "@/config/Log4jsConfig";
import background from "@/assets/bg.gif";

export default {
  name: "Player",
  props: ['videoSrc'],
  data() {
    return {
      player: null,
      winHeight: document.documentElement.clientHeight,
      showing: true,
      display: 'none',
    }
  },
  watch: {
    videoSrc: {//深度监听，可监听到对象、数组的变化
      handler(val, oldVal) {
        console.log('**********************', val)
        this.player.switchVideo(
            {
              url: val,
              type: 'customHls'
            }
        );
      },
      deep: true //true 深度监听
    }
  },
  mounted() {


    let $vue = this;

    window.addEventListener(
        "resize",
        function () {
          $vue.winHeight = document.documentElement.clientHeight;
        },
        false
    );
    console.log('播放地址：', $vue.vurl)
    //播放配置项
    let options = {
      container: document.getElementById('dplayer'),
      autoplay: true,
      airplay: true,
      lang: 'zh-cn',
      screenshot: true,
      volume: 0.7,//音量播放器会记忆用户设置
      video: {
        url: $vue.videoSrc,
        pic: background,  //图片地址。img4
        type: 'customHls',//可选值:'customHls' 'auto', 'hls', 'flv', 'dash', 'webtorrent', 'normal' 或其他自定义类型
        customType: {
          // @ts-ignore
          'customHls': function (video, player) {
            const hls = new Hls({
              debug: false
            });
            hls.loadSource(video.src);
            hls.attachMedia(video);


          }
        }
      },


    }

    this.player = new DPlayer(options);

    this.player.on('loadeddata', (e) => {
      logger.info('数据加载完成loadstart')
      // this.player.seek(100);
      this.player.play()
    })
    this.player.on('progress', () => {
      // logger.info('progress',e)
    })
    this.player.on('error', () => {
      logger.info('error')
    })
    this.player.on('canplay', () => {
      logger.info('canplay')

    })

    this.player.on('ended', () => {
      logger.info('ended')
      this.$emit('ended');
    })
  }
}
</script>

<style lang="sass">


</style>