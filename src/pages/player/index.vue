<template>
  <div id="app">
    <play-list></play-list>

  </div>
</template>

<script>
import PlayList from '@/views/PlayList.vue'
import {ipcRenderer} from "electron";

export default {
  components: {
    PlayList

  },
  mounted() {
    // console.log('能获取到吗', this.$store.getters.getNodeType)
    // let $this = this;
    // ipcRenderer.on('receive-play-demo', function (event, args) {
    //   // $this.$store.commit('updateEpisodes',args)
    //   console.log('---------------',args)
    // });
  }
}
</script>

<style>

</style>
