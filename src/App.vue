<template>
  <q-layout view="hHh Lpr lff" container :style="{'height': winHeight+'px'}" class="shadow-2 ">
    <layout-header/>
    <!-- 内容 -->
    <q-page-container>
      <router-view/>
    </q-page-container>
  </q-layout>

</template>

<script>
import Home from "./views/Home";

import LayoutHeader from './components/LayoutHeader.vue';

import LayoutFooter from "./components/LayoutFooter.vue";

import Carousel from "@/components/Carousel";

export default {
  name: "LayoutDefault",
  components: {
    // QBacktop,
    Home,
    LayoutHeader,
    LayoutFooter,
    Carousel
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
    // let div = this.$refs.indexcontent.$el;
    // div.addEventListener('scroll', this.handleScroll);//监听滚动条
  },
  methods: {}
};
</script>

<style>


/*::-webkit-scrollbar {
  display: none; !* Chrome Safari*!

}*/
/**
隐藏滚动条
.q-page-container {
  overflow-y: scroll !important;
}

::-webkit-scrollbar-thumb {
  border-radius: 20px;
  -webkit-box-shadow: inset 0 0 15px rgb(236, 65, 65);
  background: rgba(224, 224, 224, 0.2);
}

::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 15px #ccc;
  border-radius: 0;
  background: rgba(0, 0, 0, 0.1);
} */
</style>
