<template>
  <div id="play-list">

    <div class="row">
      <div :class="fabRight?'col-12':'col-8' ">

        <div v-if="video.source==='iframe'">
          <q-video v-if="isClose" ref="qvideo" :src="currentEpisodes.src"

                   :style="{'height':(isStandalonePlayer?winHeight:winHeight-135)+'px'}"
          />
        </div>
        <div v-else>
          <player ref="cplayer"
                  :style="{'height':(isStandalonePlayer?winHeight:winHeight-135)+'px'}"
                  :videoSrc="currentEpisodes.src"

          :video-type="currentEpisodes.videoType"

          :videoType="currentEpisodes.videoType"

          @play="play()"
          @ended="nextVideo"/>
        </div>

      </div>
      <div style="position: fixed;z-index:9999">
        <q-fab v-model="fabRight" flat color="primary" icon="menu" active-icon="menu"/>
      </div>
      <div :class="fabRight?'':'col-4'">
        <div v-if="!fabRight">
          <div class="text-h6 q-pl-md">{{ video.name }}</div>
          <q-separator/>
          <q-card flat>
            <q-tabs
                v-model="plotTab"
                dense
                class="text-grey"
                active-color="primary"
                indicator-color="primary"
                align="justify"
                narrow-indicator
            >
              <q-tab name="plot" label="剧集列表"></q-tab>
              <q-tab name="other" label="其他平台"></q-tab>
            </q-tabs>

            <q-tab-panels v-model="plotTab" animated>
              <q-tab-panel name="plot" :style="{'max-height':winHeight-380+'px'}">
                <div class="row">
                  <div class="col-xs-6 col-sm-3 col-md-2 col-lg-2" v-for="(src,index) in video.src">
                    <q-btn flat
                           :color="(index)===(currentEpisodes.index)?'primary':'secondary'"
                           :label="index+1<10?'0'+(index+1):index+1"
                           @click="changeVideo(src,index)"/>
                  </div>
                </div>
              </q-tab-panel>
              <q-tab-panel name="other" :style="{'max-height':winHeight-380+'px'}">

                <q-list separator>
                  <q-item clickable v-ripple v-for="(item,index) in extraList">
                    <q-item-section @click="extraListClick(item.url)">
                      <span style="display: inline-block">{{ item.website }}</span>
                    </q-item-section>
                  </q-item>

                </q-list>
              </q-tab-panel>

            </q-tab-panels>
          </q-card>

          <div class="doc-note doc-note--tip">
            <p> 视频均为第三方资源站采集，勿要相信视频中的广告内容</p>
          </div>
        </div>
      </div>
    </div>

  </div>

</template>

<script lang="ts">
import Player from '@/components/Player.vue'
import {Component, Vue, Watch} from "vue-property-decorator";
import {Route} from "vue-router";
// @ts-ignore
import config from '@/db/json'
import {CurrentEpisodes, ICurrentEpisodes, IEpisodes} from '@/domain/Episode';
import {ipcRenderer, shell} from "electron";
import {ChannelMessage} from "@/domain/Enums";
import {logger} from "@/config/Log4jsConfig";

import {extraResult, html2M3u8} from '@/common/utils'

@Component({
  components: {Player},
})
export default class PlayList extends Vue {
  private isStandalonePlayer: boolean = Vue.prototype.$AppCofig.isStandalonePlayer
  private plotTab: string = 'plot';
  private isClose = true
  private winHeight = document.documentElement.clientHeight;
  //剧集列表
  private video: IEpisodes = this.$store.getters.getEpisodes;
  private fabRight = false
  //其他观看平台
  private extraList = new Array<string>();
  //当前剧集
  private currentEpisodes: ICurrentEpisodes = new CurrentEpisodes();

  @Watch('$route', {immediate: true, deep: true})
  async onRouteChange(newVal: Route, oldVal: Route) {
    // logger.info('PlayList.vue')
    //当前剧集
    this.video = this.$store.getters.getEpisodes;
    //路径切换，初始化第一集

    this.changeVideo(this.video.src[0]);


  }

  @Watch('plotTab', {immediate: true, deep: true})
  async onPlotTabChange(newVal: string, oldVal: string) {
    if (newVal === 'other' && this.extraList.length <= 0) {
      this.extraList = await extraResult(this.video.name)
      logger.info('plotTab:' + this.extraList)
    }
  }

  //钩子函数
  private mounted() {
    let $vue = this;
    window.addEventListener(
        "resize",
        function () {
          $vue.winHeight = document.documentElement.clientHeight;
        },
        false
    );


    //当前剧集
    this.video = this.$store.getters.getEpisodes;
    //初始化第一集

    this.changeVideo(this.video.src[0]);
    ipcRenderer.on(ChannelMessage.TO_RENDERER_VIDEO_DATA, (event, args) => {


      ipcRenderer.on(ChannelMessage.TO_RENDERER_VIDEO_DATA, async (event, args) => {
        // console.log('*************TO_RENDERER_VIDEO_DATA')

        $vue.isClose = true;
        $vue.video = args;

        this.changeVideo($vue.video.src[0]);

        // console.log('*************TO_RENDERER_VIDEO_DATA')

        await $vue.changeVideo(this.video.src[0]);

      });

      ipcRenderer.on(ChannelMessage.TO_RENDERER_DESTROY_PLAYER, () => {
        // console.log('*************TO_RENDERER_DESTROY_PLAYER')
        $vue.isClose = false;
      })
    })
  }


  extraListClick(href: string) {
    shell.openExternal(href);

  }

  async changeVideo(src: string, index: number = 0) {


    this.currentEpisodes.index = index;

    if (src.endsWith('html')) {
      //请求解析接口
      let resp = await html2M3u8(src);
      if (resp.type !== "hls") {
        this.currentEpisodes.videoType = resp.type;
      }
      this.currentEpisodes.src = resp.url;

      return;
    }
    this.currentEpisodes.src = src;
    this.currentEpisodes.videoType = 'customHls'
    //解析处理，获取对应的类型
    if (src.endsWith('html')) {
      let result = await html2M3u8(src);
      this.currentEpisodes.src = result.url;
      this.currentEpisodes.videoType = result.type;
    }
    console.log(this.currentEpisodes);
  }

  async nextVideo() {

    if (this.currentEpisodes.index + 1 >= this.video.src.length) {

      return
    }

    await   this.changeVideo(this.video.src[this.currentEpisodes.index], this.currentEpisodes.index + 1)
    console.log('播放下一集');

  }


  play() {
    if (this.video.source !== 'iframe') {
      // @ts-ignore
      this.$refs.cplayer.player.play()
    }
  }

}
</script>

<style lang="sass">
.doc-note--tip
  background-color: #f9e09b
  border-color: #f2c037

.doc-note
  border-radius: 4px
  margin: 6px 0
  padding: 6px 6px
  font-size: 1em
  border-width: 0 5px
  border-style: solid
  letter-spacing: 0.5px
</style>