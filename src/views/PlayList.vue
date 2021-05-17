<template>
  <div id="play-list">
    <div class="row">
      <div class="col-8 q-mt-xs ">
        <!--   <player/>-->
        <q-video :src="currentVideo.src" style="height: 450px;"/>
      </div>
      <div class="col-4">
        <!--间距     <q-space style="height: 10px"/>-->
        <q-card flat>
          <q-tabs
              v-model="episodesTab"
              dense
              class="text-grey q-mt-xs"
              active-color="primary"
              indicator-color="primary"
              align="justify"
              narrow-indicator
          >
            <q-tab name="episodes" label="剧集列表"></q-tab>
            <q-tab name="other" label="其他平台"></q-tab>
          </q-tabs>
          <q-separator></q-separator>
          <q-tab-panels v-model="episodesTab" animated>
            <q-tab-panel name="episodes" :style="{'height':'240px'}">
              <div class="row">
                <div class="col-xs-6 col-sm-3 col-md-2" v-for="(c,index) in videos">
                  <q-btn :color="index===currentVideo.index?'primary':'secondary'" flat :label="index<10?'0'+(index+1):(index+1)" @click="changeVideo(index,c)"/>
                </div>
              </div>
            </q-tab-panel>
            <q-tab-panel name="other" :style="{'height':'240px'}">
              <div class="row">
                <div class="col-xs-6 col-sm-3 col-md-2">
                  0000000000000
                </div>
              </div>
            </q-tab-panel>
          </q-tab-panels>
        </q-card>
      </div>
    </div>
    <q-space style="height: 10px"/>
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
        <q-tab name="plot" label="视频简介"></q-tab>
        <q-tab name="download" label="下载相关"></q-tab>
      </q-tabs>

      <q-separator></q-separator>

      <q-tab-panels v-model="plotTab" animated>
        <q-tab-panel name="plot" :style="{'max-height':winHeight-553+'px'}">
          <p v-html="currentVideo.desc">
          </p>
        </q-tab-panel>
        <q-tab-panel name="download" :style="{'max-height':winHeight-553+'px'}">
          <p>
            {{ currentVideo.download }}
          </p>
        </q-tab-panel>

      </q-tab-panels>
    </q-card>
  </div>

</template>

<script lang="ts">
import Player from '@/components/Player.vue'
import {Component, Vue, Watch} from "vue-property-decorator";
import PlayerXg from '@/components/PlayerXg.vue'
import {Route} from "vue-router";
import config from '@/db/json'

import CurrentVideo, {Episodes} from '@/domain/Episode';


@Component({
  components: {Player, PlayerXg},
})
export default class PlayList extends Vue {
  isStandalonePlayer :boolean= Vue.prototype.$AppCofig.isStandalonePlayer
  // @ts-ignore
  videosConfig = config.videos[this.$route.query.name];

  episodesTab: string = 'episodes';
  plotTab: string = 'plot';

  winHeight = document.documentElement.clientHeight;
  //剧集列表
  private videos: Array<string> = new Array<string>();
  //当前集
  public currentVideo: Episodes = new CurrentVideo("", "", 0, "");

  @Watch('$route', {immediate: true, deep: true})
  onRouteChange(newVal: Route, oldVal: Route) {

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
    this.getVideosWithConfig();

  }

  changeVideo(index: number, src: string) {
    this.currentVideo.index = index;
    this.currentVideo.src = src;
  }

  getVideosWithConfig() {
    console.log(this.$route.query.name)
    // @ts-ignore,根据请求参数获取对应的视频配置信息
    let {desc, download, videos}: any = config.videos[this.$route.query.name];
    this.videos = videos;
    this.currentVideo.desc = desc;
    this.currentVideo.index = 0;
    this.currentVideo.src = this.videos[0];
    this.currentVideo.download = download;

  }
}
</script>

<style scoped>

</style>