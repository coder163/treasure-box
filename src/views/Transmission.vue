<!--
<template>
  <div id="transmission">
    <q-table
        flat
        color="primary"
        :data="data"
        :columns="columns"
        row-key="name"
        :loading="loading"
    >


      <template v-slot:body="props">

        <q-tr :props="props">
          <q-td key="name" :props="props">
            <q-icon :name="  props.row.type==='FILE'?'description':'folder'"/>
            {{ props.row.fileName }}
          </q-td>

          <q-td key="url" :props="props" class="align-right ">
            &lt;!&ndash;&lt;!&ndash;          &ndash;&gt;&ndash;&gt;
            <q-linear-progress :value="percentage(props.row.receivedSize,props.row.totalSize)/100" v-if="percentage(props.row.receivedSize,props.row.totalSize)<100" stripe rounded size="20px" color="secondary">
              <div class="absolute-full flex flex-center">

                <q-badge :label="percentage(props.row.receivedSize,props.row.totalSize)+'%'" style="background: transparent;color:#000 !important; " text-color="accent"/>
              </div>
            </q-linear-progress>

            <span v-if="percentage(props.row.receivedSize,props.row.totalSize)===100">
              已完成
            </span>
          </q-td>
          <q-td key="size" :props="props" >

            <a href="#" class="q-pa-sm" @click="openFileHandler">打开所在目录</a>
            &lt;!&ndash;最好将ID传过去            &ndash;&gt;
            <a href="#" class="q-pa-sm" @click="delDownItem(props.row)">删除</a>
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>

<script lang="ts">
import {Component, Vue, Watch} from 'vue-property-decorator';
import {DownloadItem} from "@/domain/Download";
import {Route} from "vue-router";
import DownDaoImpl from "@/db/indexedDB/DownDao";
import {ipcRenderer} from "electron";

@Component({
  components: {},

})
export default class Transmission extends Vue {
  loading: boolean = false

  downDao: DownDaoImpl=new DownDaoImpl(this.$dexie);

  columns = [
    {
      name: 'name',
      required: true,
      label: '文件名',
      align: 'left',
      sortable: true
    },

    {name: 'url', align: 'center', label: '状态', field: 'url', sortable: true},
    {name: 'size', align: 'center', label: '操作', field: 'size', sortable: true},
  ];

  public data: Array<DownloadItem> = new Array<DownloadItem>();

  async mounted() {


    //页面切换时的初始化，根据提交的参数
    switch (this.$route.query.name) {
      case  "download":
        this.data = await this.downDao.findItemWithDownloading();
        break;
      case "download-done":
        this.data = await this.downDao.findWithDownloadDone();
        break;

    }
    let this_ = this;
    //下载进度
    ipcRenderer.on('download-process', async () => {
      // console.log('download-process')
      this_.data = await this_.downDao.findItemWithDownloading();
    })
    //下载完成
    ipcRenderer.on('download-process-done', async () => {
      // console.log('download-process-done')

      setTimeout(async () => {
        this_.data = await this_.downDao.findItemWithDownloading();
      }, 500)

    })

  }

  @Watch('$route', {immediate: true, deep: true})
  async onRouteChange(newVal: Route, oldVal: Route) {

    switch (this.$route.query.name) {
      case  "download":
        this.data = await this.downDao.findItemWithDownloading();
        break;
      case "download-done":
        this.data = await this.downDao.findWithDownloadDone();
        break;
    }
  }


  percentage(num1: number, num2: number): number {

    let result = Number(num1 / num2) * 100;
    return parseInt(result.toFixed(2))

  }

  openFileHandler() {
    const {shell} = require("electron").remote;
    shell.showItemInFolder("D:\\网络视频");
  }
  delDownItem(row:any){
    console.log('删除')
  }
}
</script>

<style scoped>

</style>-->
