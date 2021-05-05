<template>
  <div id="login">

    <q-dialog v-model="persistent" @hide="closeDialog()" @show="showDialog">
      <q-card style="width: 260px">
        <q-bar>
          <!--          <q-icon name="network_wifi"></q-icon>-->
          <div><span class="text-subtitle2">关注即可登录</span></div>

          <q-space></q-space>

          <q-btn dense flat icon="close" v-close-popup>
            <q-tooltip>不想登录了?</q-tooltip>
          </q-btn>
        </q-bar>
        <q-card-section>
          <q-img :src="qrcode"/>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import {ipcRenderer} from "electron";
import axios from 'axios'

@Component({
  components: {},
})
export default class Content extends Vue {
  // @Prop({required: true} )
  private persistent: boolean = false

  private qrcode: string = '/erweima.png';

  closeDialog(): void {
    this.persistent = false

  }

  async showDialog() {
    let _this = this;

    //TODO 此处获取二维码的url需要改为真实的
    await axios.get('http://281244ia88.qicp.vip/getTicket').then(resp => {
      _this.qrcode = resp.data.url;

      let beforeTime: number = Date.now();

      let intervalHandle = setInterval(async () => {
        await  axios.get(`http://281244ia88.qicp.vip/userinfo?uid=${resp.data.id}`).then(resp => {
          //正确响应或者窗口关闭或者超时
          if ((resp.data.status === 200) || !_this.persistent || (Date.now()-beforeTime>1000*60)) {
            console.log(resp.data);
            _this.persistent=false
            clearInterval(intervalHandle);
          }
        }).catch(err => {
          console.log(err);
        })
      }, 4000)
    }).catch(err => {
      console.log(err);
    })
  }

  private async mounted() {

    let _this = this;
    //登录事件
    ipcRenderer.on('is-login', function () {
      _this.persistent = true;
    });
  }


}

</script>

<style>


</style>