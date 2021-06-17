<template>
  <q-drawer v-model="drawer" :mini="mini" show-if-above :width="200" :breakpoint="400">
    <!--人物头像：https://cdn.quasar.dev/img/material.png-->
    <q-img class="absolute-top text-center" src="/001.jpg"
           style="height: 150px">
      <!-- 在用户登录之后才可以显示，否则默认只显示背景图即可-->
      <!--      <div class="absolute-center bg-transparent">-->
      <!--        <q-btn flat fab-mini @click="mini ?login():clickMini()">-->
      <!--          &lt;!&ndash;未登录显示&ndash;&gt;-->
      <!--          <q-icon name="account_circle"  v-if="user.headImgUrl === '' " :size="mini?'30px':'46px'"/>-->
      <!--          &lt;!&ndash;登录之后显示&ndash;&gt;-->
      <!--          <q-img v-else :style="{'border-radius': mini?'15px':'23px' , 'width': mini?'30px':'46px'}"-->
      <!--                 :src="user.headImgUrl" alt=""/>-->
      <!--        </q-btn>-->
      <!--      </div>-->
      <span class="absolute-bottom" v-if="!mini">

<!--        <q-btn flat class=" text-bold text-white" v-if="user.nickName === '' " @click="login">未登录</q-btn>-->

        <!--         <span v-else class=" text-bold text-white">{{ user.nickName }}</span>-->
      <q-btn flat class=" text-bold text-white" @click="clickMini">致敬每个爱学习的你</q-btn>
      </span>
    </q-img>
    <!--滚动条-->
    <q-scroll-area :thumb-style="thumbStyle" :bar-style="barStyle" style="height: calc(100% - 150px); margin-top: 150px; ">

      <div class="row items-center" v-if="mini">
        <q-btn flat>
          <!--          <span style="font-size: 12px" @click="mini=!mini">目录</span>-->
          <q-icon name="format_list_bulleted" @click="mini=!mini"></q-icon>
        </q-btn>
      </div>
      <!--树形菜单-->
      <q-tree v-show="!mini" ref="tree" :nodes="$store.getters.getTreeData" :selected.sync="key" accordion node-key="label"/>

    </q-scroll-area>
  </q-drawer>
</template>

<script lang="ts">
// @ts-ignore
import config from '@/db/json'

import {Component, Vue, Watch} from 'vue-property-decorator';
import {ipcRenderer} from "electron";
import {ChannelMessage, StatusCode} from "@/domain/Enums";


import UserDaoImpl from '@/db/indexedDB/UserDao'
import Api from "@/api";
import {logger} from "@/config/Log4jsConfig";
import {IUser, User} from "@/domain/User";


let api = new Api();

@Component({})
export default class LayoutSide extends Vue {

  //@Prop设置为required: true会导致默认值失效

  // !表示有值, 否则 ts 会告警未初始化 required: true,
  private drawer: boolean = true;
  //侧边栏mini状态
  private mini: boolean = false

  private userDaoImpl: UserDaoImpl = new UserDaoImpl();

  private thumbStyle = {
    right: '4px',
    borderRadius: '5px',
    backgroundColor: '#027be3',
    width: '5px',
    opacity: 0.75
  }

  private barStyle = {
    right: '2px',
    borderRadius: '9px',
    backgroundColor: '#027be3',
    width: '9px',
    opacity: 0.2
  }

  private key: string = 'any'

  private user: IUser = new User();

  //deep:代表开启深度监控，意思是数据的任何一个属性发生变化，监视函数需要执行immediate:设置为 true ，代表代码一加载  立马执行监视函数
  @Watch('key', {immediate: false, deep: true})
  onKeyChange(newVal: string, oldVal: string) {

    //点击了任意一个节点都需要将侧边栏的模式该为展开
    this.mini = false;
    //当前点击的key
    let value: string = newVal === null ? oldVal : newVal
    // @ts-ignore
    let $node = this.$refs.tree.getNodeByKey(value);

    if (($node.href !== undefined)) {
      // console.log('LayoutSide.vue', $node.href)
      //文档类
      this.$router.push(`/content/${$node.href}`)

    } else if ($node.routerLink !== undefined) {
      // @ts-ignore
      this.$store.commit('updateEpisodes', config.videos[$node.name]);
      if ($node.routerLink === '/play-list' && Vue.prototype.$AppCofig.isStandalonePlayer) {
        logger.info('LayoutSide.vue：独立播放')
        ipcRenderer.send(ChannelMessage.TO_MAIN_OPEN_VIDEO_WINDOWS);
        ipcRenderer.on(ChannelMessage.TO_RENDERER_OPEN_VIDEO_WINDOWS, (event, args) => {
          // @ts-ignore
          ipcRenderer.send(ChannelMessage.TO_MAIN_VIDEO_DATA, config.videos[$node.name]);
        })
      } else if ($node.routerLink === '/play-list') {
        logger.info('LayoutSide.vue：/play-list')
        //组件类
        this.$router.push($node.routerLink + `?name=${$node.name}&time=${Date.now()}`);

      } else {
        logger.info($node.routerLink)
        //组件类
        this.$router.push($node.routerLink + `?name=${$node.name}&time=${Date.now()}`);
      }

    } else {
      // @ts-ignore
      this.$refs.tree.setExpanded(value, !this.$refs.tree.isExpanded(value))
    }
  }


  private async mounted() {
    let _this = this;
    ipcRenderer.on('login-success', (event, userInfo) => {
      _this.user = userInfo;
    })
    // await this.refresh()
  }


  async refresh() {
    let dbuser = await this.userDaoImpl.getFirstUser();

    // console.log('side数据库查询结果', dbuser)

    if (dbuser !== undefined && ((await api.getUserByOid(dbuser.openid)).status !== StatusCode.UNSUBSCRIBE)) {
      let userTemp = await api.getUserByOid(dbuser.openid);
      // console.log('自动登录', userTemp)
      this.user = userTemp.info
    }
  }

  clickMini() {
    this.mini = !this.mini
  }

  login() {
    ipcRenderer.send('login')

  }
}

</script>
<style lang="sass">

.q-img__content > div
  padding: 5px 0
</style>