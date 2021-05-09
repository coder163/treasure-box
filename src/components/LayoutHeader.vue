<template>

  <q-header class="q-electron-drag">
    <q-toolbar class="row ">
      <!--logo处理 -->
      <div class="col-lg-1 col-md-2  gt-sm position-relative">
        <img alt="logo" src='@/assets/logo.png' class="float-left" style="height: 25px"/>
        <span class="text-weight-bold float-left" style="line-height: 25px ">码农宝典</span>
      </div>
      <!--中间搜索-->
      <div class="col-lg-10 col-md-8 col-sm-10 col-xs-8">
        <div class="row">
          <div class="col-md-6 col-sm-7 gt-xs">
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

            <q-select
                class="q-electron-drag--exception"
                outlined
                use-input
                dense
                v-model="model" :options="options"
                rounded
                style=" float: right;width: 65%;"
            >
            </q-select>
          </div>

          <div class="col-md-6 col-sm-5 text-right">
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
      <div class="col-lg-1 col-md-2 col-sm-2  col-xs-4 text-right">
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
import config from '@/db/json'
import {INavMenu, StatusCode} from '@/domain'
import {UserDaoImpl} from '@/db/indexedDB'
import Api from '@/api'
import {ipcRenderer} from "electron";


const {ipcRenderer: ipc} = require("electron");


let userDaoImpl: UserDaoImpl = new UserDaoImpl();
let api = new Api();
@Component({
  // 其他组件列表
})
export default class LayoutHeader extends Vue {
  // 初始数据可以直接声明为实例的 property
  public state: boolean = true;
  private label: string = '影视';
  // public treeData: Array<INavMenu> = config.docs['java']
  public menu = config.navMenu
  model = null;
  public options = [
    'Google', 'Facebook', 'Twitter', 'Apple', 'Oracle'
  ]

  /**
   * 貌似不太好处理啊
   */
  @Watch('model', {immediate: true, deep: true})
  onModelChange(newVal: any, oldVal: any) {
    switch (this.label) {

      case '文章':
        break;
      case '教程':
        break;
      case'影视':
        break;
      default:
        this.triggerWarning()

    }
    // console.log(newVal)
  }


  // 组件方法也可以直接声明为实例的方法
  windowOperation(operation: string): void {
    ipc.send(operation)
  }

  private mounted() {
  }

  triggerWarning() {
    // @ts-ignore
    this.$q.notify({
      type: 'warning',
      message: `请选择对应的搜索类型！`
    })

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

    if (menu.docType === undefined) {

      this.$router.push(menu.href)
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