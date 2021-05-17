<template>

  <q-header class="q-electron-drag">
    <q-toolbar class="row ">
      <!--logo处理 -->
      <div class="col-lg-1   gt-md position-relative">
        <img alt="logo" src='@/assets/logo.png' class="float-left" style="height: 25px"/>
        <span class="text-weight-bold float-left" style="line-height: 25px ">码农宝典</span>
      </div>
      <!--中间搜索-->
      <div class="col-lg-10 col-md-10 col-sm-10 col-xs-8 ">
        <div class="row">

          <div class="col-lg-8 col-md-8 col-sm-5 col-xs-11">

            <q-select
                class="q-electron-drag--exception"
                outlined
                use-input
                dense
                v-model="model" :options="options" filled-input
                rounded
                input-debounce="5000"
                @input-value="inputSearchValue"
            >
              <!--                @filter="filterFn"-->
              <template v-slot:before>
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
              </template>
            </q-select>
          </div>
          <!--TODO sm导航处理，现在直接隐藏导航-->
          <div class="lt-sm-xs col-sm-5 col-xs-1 q-pa-xs lt-sm">
            <q-btn dense icon="format_list_bulleted" flat></q-btn>
          </div>
          <!--工具图标-->
          <div class="col-lg-4 col-md-4 col-sm-7   gt-xs   text-right">
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
          </div>
        </div>
      </div>
      <!--最右侧工具-->
      <div class="col-lg-1 col-md-2 col-sm-2  col-xs-4  text-right">
        <q-btn dense flat icon="minimize" @click="windowOperation('minimize')"/>
        <q-btn dense flat icon="crop_square" @click="windowOperation('maximize')"/>
        <q-btn dense flat icon="close" @click="windowOperation('close')"/>
      </div>
    </q-toolbar>

  </q-header>
</template>

<script lang="ts">

import {Component, Vue, Watch} from 'vue-property-decorator';
import config from '@/db/json'
import Api from '@/api'
import {ipcRenderer} from "electron";

import {INavMenu} from '@/domain/Menu'

const {ipcRenderer: ipc} = require("electron");


let api = new Api();
@Component({
  // 其他组件列表
})
export default class LayoutHeader extends Vue {
  // 初始数据可以直接声明为实例的 property
  private state: boolean = true;
  private label: string = '影视';
  private menu = config.navMenu
  private model = null;
  private options = [
    'Google', 'Facebook', 'Twitter', 'Apple', 'Oracle'
  ]

  /**
   * 选择之后才会响应
   */
  @Watch('model', {immediate: true, deep: true})
  onModelChange(newVal: any, oldVal: any) {
    console.log(newVal, this.label)

  }

  /**
   * 监听输入
   */
  inputSearchValue(value: string) {
    console.log(value)
    if (value !== null && value.trim() !== "") {
      ipcRenderer.send('search-video', value);
    }


  }

  /**
   * 窗口操作
   */
  windowOperation(operation: string): void {
    ipc.send(operation)
  }

  private mounted() {
  }


  //顶部无子菜单
  topMenuSelect(menu: INavMenu): void {

    switch (menu.name) {
      case 'cloudDisk':
        // console.log(menu)
        // location.href = '#'+menu.href;
        this.$store.commit('updateNodeType', menu.name);
        // @ts-ignore
        this.$router.push(menu.href + `?time=${Date.now()}`);
        break;
      case 'setting':
        // @ts-ignore
        this.$router.push(menu.href + `?time=${Date.now()}`);
    }

  }


  /**
   * 顶部菜单的点击事件
   * @param menu
   */
  selectMenu(menu: INavMenu): void {

    if (menu.docType === undefined) {
      if (menu.name === 'update') {
        ipcRenderer.send('open-update-dialog');
        return
      }
      //time为虚拟参数，主要是为了让路径发生变化
      // @ts-ignore
      this.$router.push(menu.href + `?time=${Date.now()}`);
      return
    }
    //每个分类的默认首页，修改树形菜单的类型
    let encode = encodeURIComponent(`html/${menu.name}/index.html`);
    if (menu.docType) {
      this.$store.commit('updateNodeType', menu.docType);
    }

    let indexPath = `/content/${encode}`;

    this.$router.push(indexPath)


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
  .q-field--auto-height .q-field__control
    height: 30px

  .q-field--auto-height .q-field__control, .q-field--auto-height .q-field__native
    min-height: 28px

  .q-field__marginal
    height: 30px

.q-field__native, .q-field__prefix, .q-field__suffix, .q-field__input
  color: #fff !important

.q-field--outlined .q-field__control:before
//border: 1px solid #fff !important
.q-field--outlined .q-field__control:after
//border: 1px solid #fff !important

</style>