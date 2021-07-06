<template>
  <div id="cloud-disk">
    <q-table
        flat
        color="primary"
        :data="data"
        :columns="columns"
        row-key="name"
        :loading="loading"
    >
      <template v-slot:top>
        <a href="#" @click="diskIndex" class="flex items-center q-breadcrumbs">
          网盘
        </a>

        <div v-for="row in $store.getters.getCloudDiskPath">
          <span>/</span>
          <a href="#" @click="changePath(row)">
            {{ row.name }}
          </a>
        </div>

      </template>

      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="name" :props="props">
            <a href="#" @click="refreshFile(props.row)">
              <q-icon style="font-size: 23px" :name="  props.row.type==='FILE'?'description':'folder'"/>
              {{ props.row.name }}
            </a>
          </q-td>

          <q-td key="time" :props="props">
            {{ props.row.time }}
          </q-td>
          <q-td key="size" :props="props">
            {{ props.row.size }}
          </q-td>
          <q-td key="url" @click="download(props.row)" :props="props" class="align-right ">
            <a href="#" :class="props.row.type==='FILE'?'enable-link':'disabled-link'">
              <q-icon v-if="props.row.type==='FILE'" style="font-size: 23px" name="cloud_download"/>

              <span  v-else style="font-size: 23px" >-</span>
            </a>
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>
<script lang="ts">
import {Component, Vue, Watch} from 'vue-property-decorator';
import {ZfileApi} from '@/api'
import {IZfile} from "@/domain/Zfile";
import {Route} from "vue-router";
import {ipcRenderer} from "electron";
import DownDaoImpl from "@/db/indexedDB/DownDao";


@Component({
  components: {},

})
export default class Content extends Vue {

  loading: boolean = true
  winHeight = document.documentElement.clientHeight

  downDao: DownDaoImpl = new DownDaoImpl();

  columns = [
    {
      name: 'name',
      required: true,
      label: '文件名',
      align: 'left',
      sortable: true
    },
    {name: 'time', align: 'left', label: '更新时间', field: 'time', sortable: true},
    {name: 'size', align: 'left', label: '大小', field: 'size', sortable: true},

    {name: 'url', align: 'right', label: '下载', field: 'url', sortable: true},
  ];

  public data: Array<IZfile> = new Array<IZfile>();


  @Watch('$route', {immediate: true, deep: true})
  async onRouteChange(newVal: Route, oldVal: Route) {
    // await this.fileListInit();
  }

  async mounted() {
    await this.fileListInit();
    let $vue = this;
    window.addEventListener(
        "resize",
        function () {
          $vue.winHeight = document.documentElement.clientHeight;
        },
        false
    );

    ipcRenderer.on('download-status', (event, item) => {
      this.downDao.putItem(item);
    })
    ipcRenderer.on('download-done', (event, item) => {
      this.downDao.putItem(item);
    })
  }

  async refreshFile(row: any) {
    if (row.type === 'FILE') {
      //此处调用播放器
      return;
    }
    this.data.length = 0;
    this.loading = true

    this.data = await ZfileApi.getName(row.path + row.name);

    this.loading = false
    //更新网盘路径
    this.$store.commit('updateCloudDiskPath', row)
  }

  async fileListInit() {
    this.data.length = 0;
    this.loading = true
    let rows: Array<IZfile> = this.$store.getters.getCloudDiskPath;
    //最后一个打开的文件夹+文件名字即为当前的文件夹
    let url=rows[rows.length-1]===undefined?'':rows[rows.length-1].path+rows[rows.length-1].name;
    if (url === "" || url===undefined) {

      this.data = await ZfileApi.getName();
    }else {
      this.data = await ZfileApi.getName(url);
    }
    this.data = await ZfileApi.getName();
    this.loading = false

  }

  download(row: any) {

    if (row.type === "FOLDER") {
      return;
    }

    ipcRenderer.send('download-is', row);

  }

  async changePath(row: any) {
    this.$store.commit('subCloudDiskPath', row)

    await this.refreshFile(row);
  }

  async diskIndex(){
    //清空路径数组
    this.$store.commit('updateCloudDiskPath', 0)
    //清空表格数据，其实就是请求默认目录
    this.data = await ZfileApi.getName();
  }
}

</script>
<style lang="sass">


.my-card
  width: 100%


.q-field__native, .q-field__prefix, .q-field__suffix, .q-field__input
  color: black !important

#cloud-disk
  span
    margin: 3px


  a:link
    color: #3495e8
    text-decoration: none
    font-size: 14px

  a:hover
    color: #ff9b00
    text-decoration: underline

  .disabled-link
    color: grey !important
    pointer-events: none
    cursor: default

  .enable-link
    color: #64d2ff !important

</style>