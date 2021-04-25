<template>
        <q-header id="header">
            <q-toolbar class="shadow-2 ">
                <img alt="Vue logo" src="@/assets/logo.png" width="23">
                <div class="text-weight-bold">码农宝典</div>
                <q-space class="q-electron-drag" style="height:50px ;"/>

                <q-btn flat v-for="item in menu" :key="item.id" :to="item.icon==='home'?'/':''">
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
            </q-toolbar>

        </q-header>
</template>

<script lang="ts">
    //装饰器组件
    import { Component, Vue } from 'vue-property-decorator';
    const {ipcRenderer: ipc} = require("electron");
    //此注释可兼容js
    // @ts-ignore
    import config from '@/config'
    /**
     * 顶部导航菜单
     */
    interface NavMenu{
        id: string,
        bel: string,
        name: string
        menuList:Array<NavMenu>
    }

    @Component({
        // 其他组件列表
    })
    export default class LayoutHeader extends Vue {
        // 初始数据可以直接声明为实例的 property
        public state:boolean=true;

        public treeData:Array<NavMenu>= config.docs['java']

        public menu =config.navMenu

        // 组件方法也可以直接声明为实例的方法
        windowOperation (operation:string): void {
            ipc.send(operation)
        }
        selectMenu(menu:NavMenu):void{

            if (menu.name === 'update') {
                if (this.$router.currentRoute.path !== '/update') {
                    this.$router.push(`/update`)
                }
                return;
            }
            //每个分类的默认首页
            let encode=encodeURIComponent(`html/${menu.name}/index.html`)+"/"+menu.name

            let indexPath = `/content/${encode}`;

            if (this.$router.currentRoute.path !== indexPath) {
                console.log('LayoutHeader-默认首页跳转：',indexPath);
                this.$router.push(indexPath)
            }


        }
    }

</script >

<style lang="sass">
    #header
        font-weight: normal
</style>