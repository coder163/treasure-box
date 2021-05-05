<template>

  <div>
    <q-drawer v-model="drawer" show-if-above :width="200" :breakpoint="400">

      <!--人物头像-->
      <q-img class="absolute-top text-center" src="https://cdn.quasar.dev/img/material.png" style="height: 150px">
        <!-- TODO 此处代码在用户登录之后才可以显示，否则默认只显示背景图即可-->
        <div class="absolute-bottom bg-transparent">
          <q-avatar size="60px" class="q-mb-sm ">
            <!--                       -->
            <!--                      <img :src="user.headImgUrl" alt="舞动的代码">-->
            <!--                      <q-img spinner-color="white" :src="user.headImgUrl" alt="舞动的代码"></q-img>-->
            <q-img
                :src="user.headImgUrl"
                spinner-color="red"
                fade
            >
              <template v-slot:loading>
                <q-spinner-gears color="white"></q-spinner-gears>
              </template>
            </q-img>
          </q-avatar>
          <div>{{ user.nickName===''?'未登录':user.nickName }}</div>
        </div>
      </q-img>
      <!--滚动条-->
      <q-scroll-area :thumb-style="thumbStyle" :bar-style="barStyle"
                     style="height: calc(100% - 150px); margin-top: 150px; ">
        <!--树形菜单-->
        <q-tree ref="tree" :nodes="treeData" :selected.sync="key" accordion node-key="label"/>
      </q-scroll-area>

      <!--左右隐藏显示-->
      <div class="q-mini-drawer-hide absolute" style="top: 50%;right:0">
        <q-btn dense unelevated icon="arrow_left" @click="drawer = false"></q-btn>
      </div>

    </q-drawer>
    <div class="absolute" v-show="!drawer" style="position:fixed;z-index:99999;top: 50%;left: 0;display: block;">
      <q-btn dense unelevated icon="arrow_right" @click="drawer = true"></q-btn>
    </div>
  </div>
</template>

<script lang="ts">
// @ts-ignore
import config from '@/config'

import {Component, Prop, Vue, Watch} from 'vue-property-decorator';
import {Route} from "vue-router";
import {ipcRenderer} from "electron";


@Component({})
export default class LayoutSide extends Vue {
  // !表示有值, 否则 ts 会告警未初始化
  @Prop({required: true, default: 'java'})
  private type !: string;

  private drawer: boolean = false;

  public user = {
    nickName: '',

    headImgUrl: 'https://cdn.quasar.dev/img/avatar.png'
  }
  private treeData = config.docs[this.$route.params.type]

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

  private tree!: object


  //deep:代表开启深度监控，意思是数据的任何一个属性发生变化，监视函数需要执行
  //immediate:设置为 true ，代表代码一加载  立马执行监视函数
  @Watch('key', {immediate: false, deep: true})
  onKeyChange(newVal: string, oldVal: string) {
    let value: string = newVal === null ? oldVal : newVal

    // @ts-ignore
    let $node = this.$refs.tree.getNodeByKey(value);

    if (($node.href !== undefined)) {

      this.$router.push(`/content/${encodeURIComponent($node.href)}/${this.type}`,
          // @ts-ignore
          onComplete => {
          },
          onAbort => {
          })

    } else {
      // @ts-ignore
      this.$refs.tree.setExpanded(value, !this.$refs.tree.isExpanded(value))
    }
  }


  @Watch('$route', {immediate: true, deep: true})
  onRouteChange(newVal: Route, oldVal: Route) {
    // console.log(this.$route.params.type)
    //about界面保持原有树形数据不变
    if (this.$route.params.type !== 'about') {

      this.treeData = config.docs[this.$route.params.type];

    }
  }

  private mounted() {
    let _this = this;

    ipcRenderer.on('login-info', (event, userInfo) => {
      console.log('用户登录', userInfo)
      let {nickName, headImgUrl} = userInfo;

      _this.user.headImgUrl = headImgUrl;
      _this.user.nickName = nickName;
    })
  }


  refresh() {
  }
}

</script>