<template>
  <q-header id="header" class="q-electron-drag">
    <q-toolbar class="shadow-2 ">
      <img alt="logo" src="@/assets/logo.png" width="23">
      <div class="text-weight-bold">码农宝典</div>
      <q-space class="q-electron-drag"/>
      <div style="height: 35px;width:50%;position: absolute;right: 35%;">
        <q-select
            color="negative" outlined
            class="q-electron-drag--exception"
            use-input
            dense
            style=" float: right;width: 360px;height: 35px; line-height: 35px"
            v-model="model" :options="options"
            rounded
            loading
            @input-value="setModel"

        >
        </q-select>
<!--   @filter="filterFn"-->
        <div class="q-pa-sm-sm" style=" float: right">
          <q-btn-dropdown :label="label" rounded flat>
            <q-list>
              <q-item clickable v-close-popup @click="selectSearchType('文章')">
                <q-item-section>
                  <q-item-label>文章</q-item-label>
                </q-item-section>
              </q-item>

              <q-item clickable v-close-popup @click="selectSearchType('教程')">
                <q-item-section>
                  <q-item-label>教程</q-item-label>
                </q-item-section>
              </q-item>

              <q-item clickable v-close-popup @click="selectSearchType('影视')">
                <q-item-section>
                  <q-item-label>影视</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
        </div>
      </div>
      <div style="float: right;right:10px;position: absolute">
        <q-btn flat v-for="item in menu" :key="item.id" @click="topMenuSelect(item)">
          <q-icon :name="item.icon"/>
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
      </div>


    </q-toolbar>

  </q-header>
</template>

<script lang="ts">
//装饰器组件
import {Component, Vue, Watch} from 'vue-property-decorator';
//此注释可兼容js
// @ts-ignore
import config from '@/config'
import {INavMenu, StatusCode} from '@/domain'
import {UserDaoImpl} from '@/db/indexedDB'
import Api from '@/api'
import {ipcRenderer} from "electron";
import {Route} from "vue-router";

const {ipcRenderer: ipc} = require("electron");


let userDaoImpl: UserDaoImpl = new UserDaoImpl();
let api = new Api();
@Component({
  // 其他组件列表
})
export default class LayoutHeader extends Vue {
  // 初始数据可以直接声明为实例的 property
  public state: boolean = true;
  private label: string = '类型';
  public treeData: Array<INavMenu> = config.docs['java']
  public menu = config.navMenu
  model = null;
  public options = [
    'Google', 'Facebook', 'Twitter', 'Apple', 'Oracle',
    'Google', 'Facebook', 'Twitter', 'Apple', 'Oracle',
    'Google', 'Facebook', 'Twitter', 'Apple', 'Oracle',
    'Google', 'Facebook', 'Twitter', 'Apple', 'Oracle'
  ]

  @Watch('model', {immediate: true, deep: true})
  onModelChange(newVal: any, oldVal: any) {
    console.log(newVal)
  }

  setModel(val:string) {
    console.log(val)
    // this.model = val
  }

/*  filterFn(val, update, abort) {
    update(() => {
      const needle = val.toLocaleLowerCase()
      this.options = this.options.filter(v => v.toLocaleLowerCase().indexOf(needle) > -1)
    })
  }*/

  select(){
    console.log('0000000000000000')
  }
  // 组件方法也可以直接声明为实例的方法
  windowOperation(operation: string): void {
    ipc.send(operation)
  }

  private mounted() {
  }

  topMenuSelect(menu: INavMenu): void {
    switch (menu.name) {
      case 'home':
        location.href = '#/';
        break


    }
  }


  /**
   * 顶部菜单的点击事件
   * @param menu
   */
  selectMenu(menu: INavMenu): void {

    if (menu.name === 'update') {
      if (this.$router.currentRoute.path !== '/update') {
        ipcRenderer.send('open-update-dialog')
        // this.$router.push('/update')
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

  selectSearchType(searchType: string) {
    this.label = searchType;
  }
}
</script>

<style lang="sass">
/* 滚动条宽度 */
::-webkit-scrollbar
  right: 2px
  border-radius: 9px
  background-color: #cce5f9
  width: 9px
  opacity: 0.2
/* 滚动条的滑块 */
::-webkit-scrollbar-thumb
  right: 4px
  border-radius: 5px
  background-color: #3495e8
  width: 5px
  opacity: 0.75

#header
  font-weight: normal

  .q-field--auto-height .q-field__control
    height: 35px

  .q-field--auto-height .q-field__control, .q-field--auto-height .q-field__native
    min-height: 34px

  .q-field__marginal
    height: 35px

  .q-field__native, .q-field__prefix, .q-field__suffix, .q-field__input
    color: #fff3e0
</style>