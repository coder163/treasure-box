<template>
  <div id="content">

    <markdown :file-path="filePath"/>
  </div>
</template>

<script lang="ts">
import {Component, Vue, Watch} from 'vue-property-decorator';
import {Route} from "vue-router";
import Markdown from "@/components/Markdown.vue";

@Component({
  components: {Markdown},

})
export default class Content extends Vue {


  private filePath: string = this.$route.params.filePath


  //第一次渲染监听和深度监听{ immediate: true, deep: true }，默认都是false
  @Watch('$route', {immediate: true, deep: true})
  onRouteChange(newVal: Route, oldVal: Route) {

    this.filePath = this.$route.params.filePath;

    // @ts-ignore
    this.$store.commit('updateNodeType', this.$store.getters.getNodeType);
  }

  //钩子函数
  private mounted() {
    // console.log('内容显示页：', this.filePath, this.$route.params.type)

  }

}


</script>

<style scoped>

</style>