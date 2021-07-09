<template>
  <div id="update">

    <q-dialog v-model="persistent" persistent transition-show="flip-down" transition-hide="scale">
      <q-card style="width: 300px">
        <q-bar>
          <q-avatar>
            <img src="@/assets/logo.png" alt="logo"/>
          </q-avatar>
          <div>
            <span class="text-subtitle2">更新详情</span></div>
          <q-space />
          <q-btn dense flat icon="close" v-close-popup>
            <q-tooltip>后台更新</q-tooltip>
          </q-btn>
        </q-bar>

        <q-card-section>
          <div>
            {{updateMessage}}

          </div>
          <q-linear-progress v-if="statusCode=== 3" stripe rounded size="25px" :value="percent" color="secondary">
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
import {UpdateStatusCode} from "@/domain/Enums";
import {autoUpdater, UpdateCheckResult} from "electron-updater";


@Component({
  components: {},
})
export default class Update extends Vue {
  private persistent: boolean = false;

  private schedule: string = '0.00%';
  private percent: any = 0.0;

  private updateMessage: string = '正在连接服务器...';

  private statusCode: UpdateStatusCode = UpdateStatusCode.CHECKING_FOR_UPDATE;

  private count:number=0;

  private mounted() {

    let _this = this;
    ipcRenderer.on('update-dialog', () => {
      logger.info('打开对话框')
      _this.persistent = true;
      console.log(_this.count)
      ipcRenderer.send('start-update',_this.count)
      _this.count++;
    })

    ipcRenderer.on('UpdateMsg', (event, args) => {
      _this.statusCode = args.state;
      switch (args.state) {

        case UpdateStatusCode.CHECKING_FOR_UPDATE:
          _this.updateMessage='正在检查更新';
          break
        case UpdateStatusCode.NEW_VERSION_DETECTED:

          _this.updateMessage='检测到新版本';

          break;
        case UpdateStatusCode.NO_NEW_VERSION_DETECTED:
          _this.updateMessage='当前已经是最新版本';
          break;
        case UpdateStatusCode.DOWNLOADING:
          _this.updateMessage='下载中....';
          _this.percent = parseFloat(Number(args.msg.percent).toFixed(2)) / 100
          _this.schedule = Number(_this.percent * 100).toFixed(2) + '%'
          break;
        case UpdateStatusCode.DOWNLOAD_COMPLETED:
          ipcRenderer.send('confirm-update')
          _this.persistent = false;
          _this.count = 0;
          break;
      }
    })
  }
}

</script>

<style lang="sass">

</style>