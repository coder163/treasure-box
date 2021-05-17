<template>
  <div id="setting">
    <q-card flat>

      <q-card-section>
        <div class="doc-note doc-note--tip">
          <p class="doc-note__title">温馨提示：</p>
          <p>- 选择第三方下载之后将不再直接下载而是显示文件的下载路径，同时其他的下载设置将失效</p>
          <p>- 启用独立播放器之后在观看视频时将以独立的窗口进行播放</p>
        </div>

        <span class="text-subtitle1 subtitle ">播放设置</span>
        <q-separator/>
        <q-checkbox v-model="appConfig.isStandalonePlayer" label="独立播放器"/>

        <span class="text-subtitle1 subtitle">更新设置</span>
        <q-separator/>
        <q-checkbox v-model="appConfig.isAutoUpdate" label="自动更新"/>

        <span class="text-subtitle1 subtitle">下载设置</span>
        <q-separator/>


        <q-input filled v-model="appConfig.downDir" style=";max-width: 300px" placeholder="请选择下载目录">

          <template v-slot:after>
            <q-btn round dense flat icon="cloud_download" @click="downDir"/>
          </template>
        </q-input>

        <q-checkbox v-model="appConfig.isKeepDiskPath" label="保留网盘路径"/>

        <q-checkbox v-model="appConfig.isDownTool" label="第三方工具下载"/>

      </q-card-section>

      <q-separator dark/>

      <q-card-actions align="right">
        <q-btn color="primary" label="保存设置" @click="saveSetting"/>
      </q-card-actions>
    </q-card>


  </div>

</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import {ISetting} from "@/domain/Setting";
import {ipcRenderer} from "electron";
import {AppConfig} from '@/db/lowdb'

@Component({})
export default class Setting extends Vue {

  private appConfig: ISetting = Vue.prototype.$AppCofig

  private mounted() {
    let this_ = this;
    ipcRenderer.on('selectedItem', function (event, dir) {
      this_.appConfig.downDir = dir
    });
  }

  downDir() {
    ipcRenderer.send('open-directory-dialog', 'openDirectory');
  }

  saveSetting() {

    let config = this.appConfig
    AppConfig.set('app', {
      //下载目录
      downDir: this.appConfig.downDir,
      //自动更新
      isAutoUpdate: this.appConfig.isAutoUpdate,
      //第三方下载工具
      isDownTool: this.appConfig.isDownTool,
      //保留网盘路径
      isKeepDiskPath: this.appConfig.isKeepDiskPath,
      //独立播放器
      isStandalonePlayer: this.appConfig.isStandalonePlayer
    }).write()
    this.$q.notify({
      type: 'info',
      message: `保存完成！`
    })
  }
}
</script>

<style lang="sass">

#setting

  .doc-note--tip
    background-color: #c1f4cd
    border-color: #21ba45

  .doc-note
    border-radius: 4px
    margin: 16px 0
    padding: 16px 16px
    font-size: 1em
    border-width: 0 5px
    border-style: solid
    letter-spacing: 0.5px

  .subtitle
    width: 100%
    display: inline-block
    padding-left: 10px

  .q-field__native, .q-field__prefix, .q-field__suffix, .q-field__input
    color: rgba(0, 0, 0, 0.87) !important
</style>