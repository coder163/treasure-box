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
            <a href="#" >
              <q-icon :name="  props.row.type==='FILE'?'description':'folder'"/>
              {{ props.row.name }}
            </a>
          </q-td>



          <q-td key="url"  :props="props" class="align-right ">
            <a href="#" >
              <q-icon :name="props.row.type==='FILE'?'cloud_download':'block'"/>
            </a>
          </q-td>
          <q-td key="size" :props="props">
            {{ props.row.size }}
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import {ipcRenderer} from "electron";
import {IZfile} from "@/domain";

@Component({
  components: {},

})
export default class Content extends Vue {
  loading: boolean = true
  columns = [
    {
      name: 'name',
      required: true,
      label: '文件名',
      align: 'left',
      sortable: true
    },

    {name: 'url', align: 'left', label: '状态', field: 'url', sortable: true},
    {name: 'size', align: 'left', label: '操作', field: 'size', sortable: true},
  ];

  public data: Array<IZfile> = new Array<IZfile>();

  async mounted() {

    ipcRenderer.on('downloadProgress', (event, args) => {
      console.log('下载进度', args)
    })
    ipcRenderer.on('downloadItemDone', (event, args) => {
      console.log('下载完成', args)
    })
  }
}
</script>

<style scoped>

</style>