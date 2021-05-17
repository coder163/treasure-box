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

import UserDaoImpl from '@/db/indexedDB/UserDao'
import Api from '@/api'


let api = new Api();

@Component({
  components: {},
})
export default class Content extends Vue {
  // @Prop({required: false})
  private persistent: boolean = false
  //默认为空
  private qrcode: string = '/erweima.png';
  private userDaoImpl: UserDaoImpl = new UserDaoImpl();

  closeDialog(): void {
    this.persistent = false
  }

  async showDialog() {
    // console.log(this.user)
    //没有本地存储或者本地有数据，但是远程没有查询到，表示取消关注了,此时需要修改数据库内容
    /*if (this.user === undefined || ((await api.getUserByOid(this.user.openid)).status === StatusCode.UNSUBSCRIBE)) {
      let ticket = await api.getTicket();
      console.log('ticket', ticket)
      //刷新二维码
      this.qrcode = ticket.url;
      //展示二维码之后开始轮询服务器
      let beforeTime: number = Date.now();
      let _this = this;
      let intervalHandle =setInterval(async () => {
        let userInfo = await api.userinfo(ticket.id);
        console.log('userInfo', userInfo,_this.persistent)
        //正确响应或者窗口关闭或者超时
        if ((userInfo.status === StatusCode.SUCCESS) || !_this.persistent || Date.now()-beforeTime>1000*60) {
            if ((this.user === undefined) && (userInfo.status === StatusCode.SUCCESS)) {
              this.userDaoImpl.add({'id': '1001', 'uid': ticket.id, 'openid': userInfo.info.oid});
              this.user = userInfo;
              ipcRenderer.send('login-info',this.user.info);
            } else if((this.user !== undefined) && (userInfo.status === StatusCode.SUCCESS)) {
               this.userDaoImpl.update({'id': '1001', 'uid': ticket.id, 'openid': userInfo.info.oid});
              this.user = userInfo;
              ipcRenderer.send('login-info',this.user.info);
            }
          _this.persistent = false
          clearInterval(intervalHandle);
        }
      }, 3000);

      console.log('---------------', this.user)
      return
    }*/

  }


  private async mounted() {
    //页面加载之后查询本地数据库
    // this.user = await  this.userDaoImpl.getFirstUser();
    // // console.log('数据库查询结果', this.user)
    //
    // if (this.user !== undefined && ((await api.getUserByOid(this.user.openid)).status !== StatusCode.UNSUBSCRIBE)) {
    //   let userTemp = await api.getUserByOid(this.user.openid);
    //   console.log('自动登录', userTemp)
    //
    //
    // }

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