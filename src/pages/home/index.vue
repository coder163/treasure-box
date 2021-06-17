<template>
  <q-layout view="hHh Lpr lff" container :style="{'height': winHeight+'px'}" class="shadow-2 ">
    <layout-header />
    <!-- 内容 -->
    <q-page-container>
      <layout-side />
      <q-scroll-area :thumb-style="thumbStyle" :bar-style="barStyle" :style="{'height': (winHeight-50)+'px'} ">
        <router-view />
      </q-scroll-area>
    </q-page-container>

    <update />
  </q-layout>
</template>

<script>

import LayoutHeader from '@/components/LayoutHeader.vue';
import LayoutSide from "@/components/LayoutSide.vue";

import Update from '@/views/Update.vue'
import { ipcRenderer } from "electron";

export default {
  name: "LayoutDefault",
  components: {
    LayoutHeader, LayoutSide, Update
  },
  data() {
    return {
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
    }
  }
};
</script>

<style lang="sass">
</style>
