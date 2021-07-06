<template>
  <!--  'height': winHeight+'px',-->
  <div id="dplayer">

  </div>

</template>

<script>
import Hls from 'hls.js'
import DPlayer from 'dplayer';
import {logger} from "@/config/Log4jsConfig";
import {ipcRenderer} from "electron";
import {ChannelMessage} from "@/domain/Enums";

export default {
  name: "Player",
  props: ['videoSrc','videoType'],
  data() {
    return {
      player: null,
      winHeight: document.documentElement.clientHeight,
      showing: true,
      display: 'none',
    }
  },
  watch: {
    videoSrc: {
      handler(val, oldVal) {
        this.player.switchVideo(
            {
              url: val,
              type:this.videoType
            }
        );
      },
      deep: true //true 深度监听
    }
  },
  mounted() {


    let $vue = this;
    ipcRenderer.on(ChannelMessage.TO_RENDERER_DESTROY_PLAYER, () => {

      // @ts-ignore
      $vue.stopPlayer();
    })
    window.addEventListener(
        "resize",
        function () {
          $vue.winHeight = document.documentElement.clientHeight;
        },
        false
    );

    //播放配置项
    let options = {
      container: document.getElementById('dplayer'),
      autoplay: false,
      airplay: true,
      lang: 'zh-cn',
      screenshot: true,
      volume: 0.7,//音量播放器会记忆用户设置
      video: {
        url: $vue.videoSrc,
        // url: "https://m3u8.tv.janan.net/m3u8cache/iqiyi/d5c1dfa4c225fbaf6366e3dd2074634e.m3u8",
        //   pic: background,  图片地址。img4
        type: $vue.videoType,//可选值:'customHls' 'auto', 'hls', 'flv', 'dash', 'webtorrent', 'normal' 或其他自定义类型
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
      if (this.$AppCofig.isSkipTitle) {
        this.player.seek(this.$AppCofig.titleDuration);
      }
      this.$emit('play');
      this.player.play();

    })
    this.player.on('progress', () => {

      if (this.$AppCofig.isSkipTitle) {
        if (this.player.video.duration - this.player.video.currentTime <= this.$AppCofig.creditDuration) {
          this.$emit('ended');
        }
      }
    })
    this.player.on('error', () => {
      logger.info('error')
    })
    this.player.on('canplay', () => {


    })

    this.player.on('ended', () => {
      logger.info('ended')
      this.$emit('ended');
    })
  },
  methods:{
    stopPlayer(){

      this.player.pause();
    }
  }
}
</script>

<style lang="sass">


</style>