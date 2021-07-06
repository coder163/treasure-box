<template>

  <q-header class="q-electron-drag">
    <q-toolbar class="row ">
      <!--logo处理 -->
      <div class="col-lg-1   gt-md position-relative">
        <img alt="logo" src='@/assets/logo.png' class="float-left" style="height: 25px"/>
        <span class="text-weight-bold float-left" style="line-height: 25px;">码农宝典</span>
      </div>
      <!--中间搜索-->
      <div class="col-lg-10 col-md-10 col-sm-10 col-xs-8 ">
        <div class="row">

          <div class="col-lg-8 col-md-8 col-sm-12 col-xs-11">
            <!--   @input-value="inputSearchValue"-->
            <q-select
                class="q-electron-drag--exception"
                outlined
                options-selected-class="text-deep-orange"
                use-input
                v-model="model"
                :options="options"
                rounded
                dense
                ref="searchInput"

                @new-value="inputSearchValue"

            >
<!--                :loading="loading"-->
              <template v-slot:selected class="text-no-wrap">
                <span class="text-no-wrap">  {{ model !== null ? model.name : model }}</span>
              </template>

              <!--  input-debounce="100"有搜索结果-->
              <template v-slot:option="scope">
                <q-item v-bind="scope.itemProps" v-on="scope.itemEvents" @click="selectEpisodes(scope.opt)">
                  <q-item-section>
                    <q-item-label caption>

                      <div v-if="isEnd" v-html=" scope.opt.name "></div>
                      <span v-else>{{ scope.opt.name }}</span>

                      <div class="float-right">

                        <span >{{ scope.opt.sourceName }}</span>

                      来源：  {{ scope.opt.sourceName }}-
                        {{ scope.opt.type }}
                        <span v-if="scope.opt.lang!==null && scope.opt.lang!==''">
                          -{{ scope.opt.lang }}
                        </span>

                      </div>

                    </q-item-label>
                  </q-item-section>
                </q-item>
              </template>

              <template v-slot:before>
                <q-btn-dropdown :label="searchType" rounded flat  >
                  <q-list>
                    <q-item clickable v-close-popup @click="selectSearchType('文章')">
                      <q-item-section>
                        <q-item-label>文章</q-item-label>
                      </q-item-section>
                    </q-item>

                    <q-item clickable v-close-popup  @click="selectSearchType('影视')" >
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
import {IEpisodes} from "@/domain/Episode";
import {ChannelMessage} from '@/domain/Enums'

@Component({
  // 其他组件列表
})
export default class LayoutHeader extends Vue {
  private searchType: string = '影视';
  private menu = config.navMenu
  private model: IEpisodes | null = null;

  private options = new Array<IEpisodes>()
  private isEnd: boolean = false;
  private loading: boolean = false;


  private mounted() {
    let this_ = this;
    //渲染进程接收到主窗口销毁消息
    ipcRenderer.on(ChannelMessage.TO_RENDERER_DESTROY_PLAYER_WINDOW, () => {

      ipcRenderer.send(ChannelMessage.TO_MAIN_DESTROY_PLAYER_WINDOW);
    })
    ipcRenderer.on('episodes-result', ((event, args) => {
      this_.isEnd = false;
      switch (args.status) {
        case 'success':
          args.data.forEach((value: IEpisodes) => {
            this_.options.push(value)
          });

          if (this_.$refs.searchInput !== undefined) {
            //@ts-ignore
            this_.$refs.searchInput.refresh(-1)
            //@ts-ignore
            this_.$refs.searchInput.showPopup();
          }
          break;
        case 'err':
          console.log('搜索失败');
          break;
        case 'end':
          console.log('搜索完成')
          if (this_.options.length > 0) {
            return;
          }
          // let episode: Episode = new Episode();
          // episode.name = `很抱歉没有搜索结果，请尝试 <a class=" text-blue "   href="/#/vip"  >VIP解析</a>`;
          // this_.options.push(episode)
          // this_.isEnd = true;
          // if (this_.$refs.searchInput !== undefined) {
          //   //@ts-ignore
          //   this_.$refs.searchInput.refresh(-1)
          //   //@ts-ignore
          //   this_.$refs.searchInput.showPopup();
          // }

      }

    }));

  }


  /**
   * 选择之后才会响应
   */
  @Watch('model', {immediate: true, deep: true})
  onModelChange(newVal: any, oldVal: any) {
    let epi = newVal === null ? oldVal : newVal;
    console.log(epi);
    if (epi === undefined) {
      return;
    }
    if (epi.name.indexOf('搜索结果') > 0) {

      this.model = null;
      return;
    }

  }


  //下拉菜单选择对应的影视
  selectEpisodes(curEpi: IEpisodes) {
    console.log('选择：', curEpi.name)
    //更新剧集列表
    this.$store.commit('updateEpisodes', curEpi);
    //不是独立播放才跳转
    if (!Vue.prototype.$AppCofig.isStandalonePlayer) {
      this.$router.push('/play-list?time=' + Date.now());
    } else {
      ipcRenderer.send(ChannelMessage.TO_MAIN_OPEN_VIDEO_WINDOWS);
      ipcRenderer.on(ChannelMessage.TO_RENDERER_OPEN_VIDEO_WINDOWS, (event, args) => {
        ipcRenderer.send(ChannelMessage.TO_MAIN_VIDEO_DATA, curEpi);
      })


    }
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
    //自定义销毁按钮发送销毁播放窗口
    if (operation === "close") {
      ipcRenderer.send(ChannelMessage.TO_MAIN_DESTROY_PLAYER_WINDOW);
    }
    ipcRenderer.send(operation);
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
    //这个需要弹框
    if (menu.name === 'update') {
      ipcRenderer.send('open-update-dialog');
      return
    }
    //vue组件的页面
    if (menu.href) {
      // @ts-ignore
      this.$router.push(menu.href + `?time=${Date.now()}`);
      return
    }
    // @ts-ignore
    let encode = encodeURIComponent(`html/docs/${menu.name}/index.html`);
    let nodeType = menu.name
    // @ts-ignore
    if (menu.video) {
      //视频路径
      // @ts-ignore
      encode = encodeURIComponent(`html/video/${menu.video}/index.html`);
      // @ts-ignore
      nodeType = menu.video
    }
    this.$store.commit('updateNodeType', nodeType);
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