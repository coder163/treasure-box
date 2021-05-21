<template>
  <div class="vip">

    <carousel/>

    <div class="row q-pa-md" >
      <div class="col-1">

      </div>
      <div class="col-10">

        <q-input rounded  v-model="text" clearable hide-hint hint="视频播放页面地址">
          <template v-slot:append>
            <q-btn round dense flat icon="play_arrow"></q-btn>
          </template>
        </q-input>
      </div>
      <div class="col-1"></div>
    </div>

  </div>


</template>

<script>
import Carousel from "@/components/Carousel";

export default {
  components: {
    Carousel
  },
  data() {
    return {
      text: ''
    };
  },
  methods: {},
  mounted() {


  },
}

</script>
<style>

.q-field__native, .q-field__prefix, .q-field__suffix, .q-field__input{
  color: rgba(0, 0, 0, 0.87) !important;
}
</style>
