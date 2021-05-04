<template>
  <div id="login">

    <q-dialog v-model="persistent" @hide="closeDialog()">
      <q-card style="width: 260px">
        <q-bar>
<!--          <q-icon name="network_wifi"></q-icon>-->
          <div> <span class="text-subtitle2">关注即可登录</span></div>

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
  private persistent: boolean = true

  private qrcode: string = '';

  closeDialog(): void {
    this.persistent = false

  }

  private async mounted() {
    let _this = this;
    //TODO 此处获取二维码的url需要改为真实的
    await axios.get('http://281244ia88.qicp.vip/getTicket').then(resp=>{
      console.log(resp)
      _this.qrcode = resp.data;

    }).catch(err=>{
      console.log(err);
    })

    let beforeTime:number=Date.now();

    let intervalHandle=setInterval(()=>{

      axios.get('http://281244ia88.qicp.vip/userinfo').then(resp=>{
        //超时
        if (Date.now()-beforeTime  > 1000*60) {
          console.log('超时')
          clearInterval(intervalHandle);
          _this.persistent=false
          return;
        }

        if (resp.data ) {
          // console.log(resp);
          let userInfo={
            nickName:resp.data.nickname,
            headImgUrl:resp.data.headimgurl
          };

          ipcRenderer.send('login-user',userInfo);

          console.log('发送消息');

          clearInterval(intervalHandle);
        }




      }).catch(err=>{
        console.log(err);
      })
    },3000)
    //登录事件
    ipcRenderer.on('is-login', function (event, isLogin) {
      _this.persistent = isLogin;
    });
  }



}

</script>

<style>


</style>