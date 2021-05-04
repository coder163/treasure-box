<template>
  <q-header id="header">
    <q-toolbar class="shadow-2 ">
      <img alt="Vue logo" src="@/assets/logo.png" width="23">
      <div class="text-weight-bold">码农宝典</div>

      <q-space class="q-electron-drag" style="height:50px ;"/>

      <q-btn flat v-for="item in menu" :key="item.id" @click="topMenuSelect(item)">
        <q-icon :name="item.icon" v-if="item.name!=='login'"/>
        <q-menu transition-show="flip-right" transition-hide="flip-left">
          <q-list>
            <q-item clickable v-for=" l in item.menuList" :key="l.id">
              <q-item-section @click="selectMenu(l)">
                {{ l.bel }}
              </q-item-section>
            </q-item>
            <q-separator/>
          </q-list>
        </q-menu>
      </q-btn>

      <!-- 最小化、最大化和关闭 -->
      <q-btn dense flat icon="minimize" @click="windowOperation('minimize')"/>
      <q-btn dense flat icon="crop_square" @click="windowOperation('maximize')"/>
      <q-btn dense flat icon="close" @click="windowOperation('close')"/>
    </q-toolbar>

  </q-header>
</template>

<script lang="ts">
//装饰器组件
import {Component, Vue} from 'vue-property-decorator';
//此注释可兼容js
// @ts-ignore
import config from '@/config'
import {INavMenu} from '@/domain'

const {ipcRenderer: ipc} = require("electron");


@Component({
  // 其他组件列表
})
export default class LayoutHeader extends Vue {
  // 初始数据可以直接声明为实例的 property
  public state: boolean = true;

  public treeData: Array<INavMenu> = config.docs['java']

  public menu = config.navMenu

  // 组件方法也可以直接声明为实例的方法
  windowOperation(operation: string): void {
    ipc.send(operation)
  }

  topMenuSelect(menu: INavMenu): void {
    switch (menu.name) {
      case 'home':
        location.href = '#/';
        break
      case 'login':
        //发送事件至主窗口，Content页面嵌入登录，监听到主进程消息后显示登录窗口
        ipc.send('login', true)
        break;

    }
  }

  /**
   * 顶部菜单的点击事件
   * @param menu
   */
  selectMenu(menu: INavMenu): void {

    if (menu.name === 'update') {
      if (this.$router.currentRoute.path !== '/update') {
        this.$router.push(`/update`)
      }
      return;
    }
    //每个分类的默认首页
    let encode = encodeURIComponent(`html/${menu.name}/index.html`) + "/" + menu.name

    let indexPath = `/content/${encode}`;

    if (this.$router.currentRoute.path !== indexPath) {
      this.$router.push(indexPath)
    }


  }
}

</script>

<style lang="sass">
#header
  font-weight: normal
</style>