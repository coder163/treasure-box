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
        <a href="#" @click="fileListInit" class="flex items-center q-breadcrumbs">
          网盘
        </a>

        <div v-for="row in pathNames">
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
              <q-icon :name="  props.row.type==='FILE'?'description':'folder'"/>
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
              <q-icon :name="props.row.type==='FILE'?'cloud_download':'block'"/>
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
import {IZfile} from "@/domain";
import {Route} from "vue-router";
import {ipcRenderer} from "electron";

@Component({
  components: {},

})
export default class Content extends Vue {

  loading: boolean = true
  winHeight = document.documentElement.clientHeight

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

  private currentRow: any = "";

  private pathNames: Array<IZfile> = new Array<IZfile>();

  @Watch('$route', {immediate: true, deep: true})
  async onRouteChange(newVal: Route, oldVal: Route) {
    await this.fileListInit();

  }

  async mounted() {
    let $vue = this;
    window.addEventListener(
        "resize",
        function () {
          $vue.winHeight = document.documentElement.clientHeight;
        },
        false
    );
    await this.fileListInit();
  }

  async refreshFile(row: any) {
    console.log(row.url)
    if (row.type === 'FILE') {
      //此处调用播放器
      return;
    }

    this.pathNames.push(row)
    this.data.length = 0;
    this.loading = true
    let fileList: Array<IZfile> = await ZfileApi.getName(row.path + row.name);
    fileList.forEach((item) => {
      this.data.push(item);

    })
    this.loading = false
  }

  async fileListInit() {
    this.data.length = 0;
    this.pathNames.length = 0;
    this.loading = true
    let fileList: Array<IZfile> = await ZfileApi.getName();
    fileList.forEach((item) => {
      this.data.push(item);

    })
    this.loading = false
  }

  download(row: any) {

    if (row.type === "FOLDER") {
      return;
    }
    console.log('准备下载')

    ipcRenderer.send('download-is', row.url,row.path);


  }

  async changePath(row: any) {
    this.pathNames.forEach((value, index) => {
      if (value.name === row.name) {
        this.pathNames.splice(index);
      }
    })

    await this.refreshFile(row);
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
    color: #64d2ff
    text-decoration: none
    font-size: 14px

  a:hover
    color: #ec4141
    text-decoration: underline

  .disabled-link
    color: grey !important
    pointer-events: none
    cursor: default

  .enable-link
    color: #64d2ff !important

</style>