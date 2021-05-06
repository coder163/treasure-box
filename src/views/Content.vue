<template>
  <div id="content">

      <login/>
        <q-scroll-area :thumb-style="thumbStyle" :bar-style="barStyle"
                       :style="{'height': (wHeight-80)+'px','margin-left': '31px'} ">

          <markdown :file-path="filePath"/>
        </q-scroll-area>

        <LayoutSide :type="this.$route.params.type"/>

<!--    <button @click="test()">测试按钮</button>-->
  </div>
</template>

<script lang="ts">
import {Component, Vue, Watch} from 'vue-property-decorator';
import {Route} from "vue-router";


import Markdown from "@/components/Markdown.vue";

import LayoutSide from "@/components/LayoutSide.vue";

import Login from '@/views/Login.vue';

@Component({
  components: {Markdown, LayoutSide, Login},

})
export default class Content extends Vue {

  private wHeight: number = document.documentElement.clientHeight

  private filePath: string = this.$route.params.filePath
  private thumbStyle = {
    right: '4px',
    borderRadius: '5px',
    backgroundColor: '#027be3',
    width: '5px',
    opacity: 0.75
  }
  private barStyle = {
    right: '2px',
    borderRadius: '9px',
    backgroundColor: '#027be3',
    width: '9px',
    opacity: 0.2
  }

  //第一次渲染监听和深度监听{ immediate: true, deep: true }，默认都是false
  @Watch('$route', {immediate: true, deep: true})
  onRouteChange(newVal: Route, oldVal: Route) {

    this.filePath = this.$route.params.filePath;

    // console.log(this.filePath,this.$route.params.type)
  }

  //钩子函数
  private mounted() {
    // console.log('内容显示页：', this.filePath, this.$route.params.type)
    let $vue = this;
    window.addEventListener(
        "resize",
        function () {
          $vue.wHeight = document.documentElement.clientHeight;
        },
        false
    );

  }
  test(){
  }
}


</script>

<style scoped>

</style>