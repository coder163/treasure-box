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

          <div class="col-lg-8 col-md-8 col-sm-12 col-xs-11">
            <!--   @input-value="inputSearchValue"-->
            <q-select
                class="q-electron-drag--exception"

                outlined
                clearable
                options-selected-class="text-deep-orange"
                use-input
                v-model="model" :options="options"
                rounded
                dense
                ref="searchInput"
                input-debounce="100"
                @new-value="inputSearchValue"
            >
              <template v-slot:selected class="text-no-wrap" >
                <span class="text-no-wrap">  {{ model !== null ? model.name : model }}</span>
              </template>

              <!-- 有搜索结果-->
              <template v-slot:option="scope" >
                <q-item v-bind="scope.itemProps" v-on="scope.itemEvents">
                  <q-item-section>
                    <q-item-label caption>
                      {{ scope.opt.name }}

                      <div class="float-right">
                         {{ scope.opt.type }}
                        <span  v-if="scope.opt.lang!==null && scope.opt.lang!==''" >
                          -{{ scope.opt.lang }}
                        </span>
                      </div>

                    </q-item-label>
                  </q-item-section>
                </q-item>
              </template>
              <template v-slot:before>
                <q-btn-dropdown :label="searchType" rounded flat>
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
          <!--          <div class="lt-sm-xs col-sm-5 col-xs-1 q-pa-xs gt-sm">
                      <q-btn dense icon="format_list_bulleted" flat></q-btn>
                    </div>-->
          <!--工具图标-->
          <div class="col-lg-4 col-md-4    gt-sm   text-right">
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
      <div class="col-lg-1 col-md-2 col-sm-2  col-xs-4  text-right ">
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
import {ipcRenderer} from "electron";

import {INavMenu} from '@/domain/Menu'
import Episode, {IEpisodes} from "@/domain/Episode";

@Component({
  // 其他组件列表
})
export default class LayoutHeader extends Vue {
  private searchType: string = '影视';
  private menu = config.navMenu
  private model: IEpisodes|null = null;

  private options = new Array<IEpisodes>()


  private mounted() {
    let this_ = this;
    ipcRenderer.on('episodes-result', ((event, args) => {
      switch (args.status) {
        case 'success':
          args.data.forEach((value: IEpisodes) => {

            this_.options.push(value)
          });
          this_.options.filter((value, index, arr) => {
            return value.name === arr[index].name;
          });
          if (this_.$refs.searchInput !== undefined) {
            //@ts-ignore
            this_.$refs.searchInput.showPopup();
          }
          break;
        case 'end':
          //TODO 需要增加一个VIP解析页面
          if (args.data.length <= 0) {
            this.$q.notify({
              type: 'warning',
              html: true,
              position: 'bottom-right',
              timeout: 5000,
              message: `很抱歉没有搜索结果，尝试  <a class="q-btn text-blue"   href="/#/play-list"  >VIP解析</a>`
            })
          }

      }

    }));

  }
  vip(){
    this.model = null;
    console.log('vip解析')
  }
  /**
   * 选择之后才会响应
   */
  @Watch('model', {immediate: true, deep: true})
  onModelChange(newVal: any, oldVal: any) {

    console.log(newVal)

  }

  /**
   * 监听输入
   */
  inputSearchValue(value: string) {
    let this_ = this;
    if (value !== null && value.trim() !== "") {
      ipcRenderer.send('search-video', value);
      this_.options.length = 0;
    }


  }

  /**
   * 窗口操作
   */
  windowOperation(operation: string): void {
    ipcRenderer.send(operation)
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
    this.searchType = searchType;
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