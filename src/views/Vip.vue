<template>
  <div class="vip">

    <carousel/>

    <div class="row q-pa-md">
      <div class="col-1">

      </div>
      <div class="col-10">

        <q-input rounded v-model="text" clearable hide-hint hint="视频播放页面地址">

          <template v-slot:before>
            <q-btn-dropdown :label="platformVip" rounded flat>
              <q-list>
                <q-item clickable v-close-popup @click="selectVipType('思古解析')">
                  <q-item-section>
                    <q-item-label>思古解析</q-item-label>
                  </q-item-section>
                </q-item>

                <q-item clickable v-close-popup @click="selectVipType('解析618')">
                  <q-item-section>
                    <q-item-label>解析618</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-btn-dropdown>
          </template>
          <template v-slot:append>
            <q-btn round dense flat icon="play_arrow" label="播放"></q-btn>
          </template>
        </q-input>
      </div>
      <div class="col-1"></div>
    </div>

  </div>


</template>

<script lang="ts">
//@ts-ignore
import Carousel from "@/components/Carousel";
import {Component, Vue} from "vue-property-decorator";

@Component({
  components: {Carousel}
})
export default class Setting extends Vue {
  private text: string = '';
  private platformVip: string = '思古解析';
  //平台
  selectVipType(platform: string) {

    this.platformVip = platform;
  }
}

</script>
<style>

.q-field__native, .q-field__prefix, .q-field__suffix, .q-field__input {
  color: rgba(0, 0, 0, 0.87) !important;
}
</style>
