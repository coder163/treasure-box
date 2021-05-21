<template>
  <div id="app">
    <player />
<!--    <a href="/page1.html">page1</a>-->
  </div>
</template>

<script>
import Player from '@/components/Player.vue'

export default {
  components: {
    Player

  },
  mounted(){
    console.log('能获取到吗',this.$store.getters.getNodeType)
  }
}
</script>

<style>

</style>
