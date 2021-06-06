<template>
  <div class="home">
    <!--TODO 布局没想好，暂时不要了而且轮播图好像没有世纪作用-->

    <player
            :style="{'height':'300px'}"
            :videoSrc="msg"
    />
  </div>


</template>

<script>

import axios from "axios";
import cheerio from 'cheerio';
import Player from '@/components/Player.vue'
export default {
  components: {Player},
  data() {
    return {
      msg: ""
    }

  },

  methods: {},
  mounted() {
    let this_ = this;
    let url = 'https://m3u8.zh188.net/20210508%60/playm3u8.php?url=https://v.qq.com/x/page/n0029pq9fe2.html';
    axios.get(url
    ).then((res) => {


    })
    ;

  },
}

</script>
<style>
.my-card {
  width: 100%;
}


</style>
