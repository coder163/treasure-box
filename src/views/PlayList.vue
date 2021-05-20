<template>
  <div id="play-list">

    <div class="row">
      <div class="col-8 ">

        <q-video v-if="video.source==='iframe'" src="https://www.ixigua.com/iframe/6808815041043759629" :style="{'height':winHeight-290+'px'}"/>

        <player ref="cplayer" :videoSrc="currentEpisodes.src" @ended="nextVideo" v-else/>

      </div>
      <div class="col-4">

        <q-card class="episodes-card" flat>
          <q-card-section>
            <div class="text-h6 q-mb-xs"> {{ video.name }}</div>
            <q-separator></q-separator>
            <q-scroll-area :style="{'height':winHeight-500+'px'}">
              <div class="row">
                <div class="col-xs-6 col-sm-3 col-md-2 col-lg-2" v-for="(src,index) in video.src">
                  <q-btn flat
                         :color="(index)===(currentEpisodes.index)?'primary':'secondary'"
                         :label="index<10?'0'+(index+1):index"
                         @click="changeVideo(index,src)"/>
                </div>
              </div>
            </q-scroll-area>

          </q-card-section>
        </q-card>
      </div>
    </div>
    <q-space style="height: 10px"/>
    <q-separator></q-separator>

    <!--独立播放器不显示-->
    <q-card flat v-if="!isStandalonePlayer">
      <q-tabs
          v-model="plotTab"
          dense
          class="text-grey"
          active-color="primary"
          indicator-color="primary"
          align="justify"
          narrow-indicator
      >
        <q-tab name="plot" label="剧情简介">

        </q-tab>
        <q-tab name="download" label="其他平台"></q-tab>
      </q-tabs>

      <q-tab-panels v-model="plotTab" animated>
        <q-tab-panel name="plot" v-html="$store.getters.getEpisodes.desc" :style="{'max-height':winHeight-553+'px'}">
        </q-tab-panel>
        <q-tab-panel name="download" :style="{'max-height':winHeight-553+'px'}">
          <p>
          </p>
        </q-tab-panel>

      </q-tab-panels>
    </q-card>
  </div>

</template>

<script lang="ts">
import Player from '@/components/Player.vue'
import {Component, Vue, Watch} from "vue-property-decorator";
import {Route} from "vue-router";

import {CurrentEpisodes, ICurrentEpisodes, IEpisodes} from '@/domain/Episode';
import {ipcRenderer} from "electron";


@Component({
  components: {Player},
})
export default class PlayList extends Vue {
  private isStandalonePlayer: boolean = Vue.prototype.$AppCofig.isStandalonePlayer
  private plotTab: string = 'plot';

  private winHeight = document.documentElement.clientHeight;
  //剧集列表
  private video: IEpisodes = this.$store.getters.getEpisodes;

  //当前剧集
  private currentEpisodes: ICurrentEpisodes = new CurrentEpisodes();


  @Watch('$route', {immediate: true, deep: true})
  onRouteChange(newVal: Route, oldVal: Route) {
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
    //独立播放
    if (this.isStandalonePlayer) {
      ipcRenderer.send('open-video');
    }

    //初始化第一集
    this.videoInit();
  }

  videoInit() {
    this.currentEpisodes.src = this.video.src[0];
    this.currentEpisodes.index = 0;
  }

  changeVideo(index: number, src: string) {
    console.log(index, src);
    this.currentEpisodes.index = index;
    this.currentEpisodes.src = src;

  }

  nextVideo() {
    if (this.currentEpisodes.index + 1 >= this.video.src.length) {
      console.log('最后一集了');
      return
    }
    this.currentEpisodes.index = this.currentEpisodes.index+1;
    this.currentEpisodes.src = this.video.src[this.currentEpisodes.index];
    console.log('播放下一集');
  }


}
</script>

<style scoped>

</style>