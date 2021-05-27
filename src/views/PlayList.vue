<template>
  <div id="play-list">

    <div class="row">
      <div :class="fabRight?'col-12':'col-8' ">

        <div v-if="video.source==='iframe'">
          <q-video v-if="isClose" ref="qvideo" :src="currentEpisodes.src"

                   :style="{'height':isStandalonePlayer?winHeight+'px':'450px'}"
          />
        </div>
        <div v-else>
          <player ref="cplayer"
                  :style="{'height':isStandalonePlayer?winHeight+'px':'450px'}"
                  :videoSrc="currentEpisodes.src"
                  @play="play()"
                  @ended="nextVideo"/>
        </div>

      </div>
      <div style="position: fixed;z-index:9999">
        <q-fab v-model="fabRight" flat color="primary" icon="menu" active-icon="menu"/>
      </div>
      <div :class="fabRight?'':'col-4'" >

        <q-card class="episodes-card" flat  v-if="!fabRight">
          <q-card-section>

            <div class="text-h6">{{ video.name }}</div>
            <q-separator/>
            <q-scroll-area :style="{'height':isStandalonePlayer?winHeight-300+'px':winHeight-500+'px'}">
              <div class="row">
                <div class="col-xs-6 col-sm-3 col-md-2 col-lg-2" v-for="(src,index) in video.src">
                  <q-btn flat
                         :color="(index)===(currentEpisodes.index)?'primary':'secondary'"
                         :label="index+1<10?'0'+(index+1):index+1"
                         @click="changeVideo(index,src)"/>
                </div>
              </div>
            </q-scroll-area>

          </q-card-section>
        </q-card>

      </div>
    </div>
    <div v-if="!isStandalonePlayer">
      <q-space style="height: 10px"/>
      <q-separator></q-separator>

      <!--独立播放器不显示-->
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
          <q-tab name="plot" label="剧情简介"></q-tab>
          <q-tab name="download" label="其他平台"></q-tab>
        </q-tabs>

        <q-tab-panels v-model="plotTab" animated>
          <q-tab-panel name="plot" v-html="video.desc" :style="{'max-height':winHeight-553+'px'}">
          </q-tab-panel>
          <q-tab-panel name="download" :style="{'max-height':winHeight-553+'px'}">
            <p>
            </p>
          </q-tab-panel>

        </q-tab-panels>
      </q-card>
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
import {ipcRenderer} from "electron";
import {ChannelMessage} from "@/domain/Enums";
import {logger} from "@/config/Log4jsConfig";


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
  //当前剧集
  private currentEpisodes: ICurrentEpisodes = new CurrentEpisodes();

  @Watch('$route', {immediate: true, deep: true})
  onRouteChange(newVal: Route, oldVal: Route) {
    logger.info('PlayList.vue')
    //当前剧集
    this.video = this.$store.getters.getEpisodes;
    //路径切换，初始化第一集
    this.videoInit();

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
    this.videoInit();

    ipcRenderer.on(ChannelMessage.TO_RENDERER_VIDEO_DATA, (event, args) => {

      $vue.isClose = true;

      $vue.video = args;
      $vue.videoInit();

      console.log('*************TO_RENDERER_VIDEO_DATA')
    });

    ipcRenderer.on(ChannelMessage.TO_RENDERER_DESTROY_PLAYER, () => {
      console.log('*************TO_RENDERER_DESTROY_PLAYER')
      $vue.isClose = false;
    })
  }


  videoInit() {
    this.currentEpisodes.src = this.video.src[0];
    this.currentEpisodes.index = 0;

  }

  changeVideo(index: number, src: string) {
    this.currentEpisodes.index = index;
    this.currentEpisodes.src = src;

  }

  nextVideo() {
    if (this.currentEpisodes.index + 1 >= this.video.src.length) {
      console.log('最后一集了');
      return
    }
    this.currentEpisodes.index = this.currentEpisodes.index + 1;
    this.currentEpisodes.src = this.video.src[this.currentEpisodes.index];
    console.log('播放下一集');

  }
  play(){
    console.log('可以播放了')
    if (this.video.source !== 'iframe' ) {
      // @ts-ignore
      this.$refs.cplayer.player.play()
    }
  }

}
</script>

<style scoped>

</style>