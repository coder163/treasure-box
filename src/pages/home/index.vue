<template>
  <q-layout view="hHh Lpr lff" container :style="{'height': winHeight+'px'}" class="shadow-2 ">
    <layout-header/>
    <!-- 内容 -->
    <q-page-container>
      <layout-side/>
      <q-scroll-area
          ref="scrollArea"
          :thumb-style="thumbStyle"
          :bar-style="barStyle"
          :style="{'height': (winHeight-50)+'px'} "

      >
        <router-view/>
        <q-page-sticky position="bottom-right" :offset="[15,20]">

          <q-fab-action color="secondary" icon="keyboard_arrow_up" @click="scroll"/>

        </q-page-sticky>
      </q-scroll-area>
    </q-page-container>

    <update/>
  </q-layout>
</template>

<script>

import LayoutHeader from '@/components/LayoutHeader.vue';
import LayoutSide from "@/components/LayoutSide.vue";

import Update from '@/views/Update.vue'
import {ipcRenderer} from "electron";

export default {
  name: "LayoutDefault",
  components: {
    LayoutHeader, LayoutSide, Update
  },
  watch: {
    '$route.path': function (newVal, oldVal) {
      console.log(newVal + ' --- ' + oldVal)
      this.winHeight = document.documentElement.clientHeight;
      this.$refs.scrollArea.setScrollPosition(20)
    }
  },
  data() {
    return {
      scrollArea:20,
      winHeight: document.documentElement.clientHeight,
      thumbStyle: {
        right: '4px',
        borderRadius: '5px',
        backgroundColor: '#027be3',
        width: '5px',
        opacity: 0.75
      },

      barStyle: {
        right: '2px',
        borderRadius: '9px',
        backgroundColor: '#027be3',
        width: '9px',
        opacity: 0.2
      }
    };
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


  },


  methods: {
    dycLoad() {
      ipcRenderer.send('open-video');
    },
    scroll () {
      this.$refs.scrollArea.setScrollPosition(this.position)
      this.position =  20
    }
  }
};
</script>

<style lang="sass">
</style>
