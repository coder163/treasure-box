<template>
  <div id="update">

    <q-dialog v-model="persistent" persistent transition-show="flip-down" transition-hide="scale">
      <q-card style="width: 300px">
        <q-bar>
          <q-avatar>
            <img src="@/assets/logo.png"  alt="logo"/>
          </q-avatar>
          <div><span class="text-subtitle2">更新详情</span></div>

          <q-space></q-space>

          <q-btn dense flat icon="close" v-close-popup>
            <q-tooltip>开始了是不能停止的</q-tooltip>
          </q-btn>
        </q-bar>

        <q-card-section>

          <q-linear-progress stripe rounded size="25px" :value="percent" color="secondary">
            <div class="absolute-full flex flex-center">
              <q-badge style="background: transparent;color:#1D1D1D " :label="schedule"/>
            </div>
          </q-linear-progress>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import {ipcRenderer} from "electron";
import {logger} from "@/config/Log4jsConfig";
import {UpdateStatusCode} from "@/domain";

@Component({
  components: {},
})
export default class Content extends Vue {
  private persistent: boolean = false;

  private schedule: string = '0.00%';
  private percent: any = 0.0;

  private mounted() {
    let _this = this;
    ipcRenderer.on('update-dialog', () => {
      _this.persistent = true
    })
    ipcRenderer.on('UpdateMsg', (event, args) => {
      switch (args.state) {
        case UpdateStatusCode.CHECKING_FOR_UPDATE:
          logger.info('正在检查更新');
          break
        case UpdateStatusCode.NEW_VERSION_DETECTED:
          logger.info('检测到新版本');
          break;
        case UpdateStatusCode.NO_NEW_VERSION_DETECTED:
          logger.info('没有检测到新版本');
          break;
        case UpdateStatusCode.DOWNLOADING:
          logger.info('下载中', args);
          _this.percent = parseFloat(Number(args.msg.percent).toFixed(2)) / 100
          _this.schedule = Number(_this.percent * 100).toFixed(2) + '%'
          break;
        case UpdateStatusCode.DOWNLOAD_COMPLETED:
          _this.persistent = false;
          break;
      }
    })
  }
}

</script>

<style lang="sass">

</style>