<template>
    <div>
        <q-header>
            <q-toolbar class="shadow-2 ">
                <img alt="Vue logo" src="@/assets/logo.png" width="23">

                <div class="text-weight-bold">编程宝盒</div>
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
                <q-btn dense flat icon="minimize" @click="minimize()"/>
                <q-btn dense flat icon="crop_square" @click="maximize()"/>
                <q-btn dense flat icon="close" @click="close()"/>
            </q-toolbar>

        </q-header>
        <!-- :state="state" -->
<!--        <layout-side :treeData="treeData"/>-->
    </div>
</template>

<script>
    import LayoutSide from "@/components/LayoutSide.vue";

    const {ipcRenderer: ipc} = require("electron");
    import shortId from 'shortid'
    import config from '@/config'

    export default {
        components: {
            LayoutSide
        },
        data() {
            return {
                state: true,
                treeData: config.docs['java'],
                menu: [
                    {
                        id: shortId.generate(),
                        icon: 'home'
                    },
                    {
                        id: shortId.generate(),
                        icon: 'video_library',
                        menuList: [

                            {
                                id: shortId.generate(),
                                bel: 'Delphi视频', name: 'delphi'
                            },
                            {
                                id: shortId.generate(),
                                bel: 'Java视频', name: 'java'
                            },

                        ]
                    }, {
                        id: shortId.generate(),
                        icon: 'library_books',
                        menuList: [
                            {
                                id: shortId.generate(),
                                bel: 'Delphi文档', name: 'delphi'
                            },
                            {
                                id: shortId.generate(),
                                bel: 'Java文档', name: 'java'
                            },

                        ]
                    }, {
                        id: shortId.generate(),
                        icon: 'wb_cloudy',

                        menuList: [

                            {
                                id: shortId.generate(),
                                bel: '世纪互联', name: 'oneDrive'
                            },
                            {
                                id: shortId.generate(),
                                bel: '百度网盘', name: 'baidu'
                            },
                        ]
                    }, {
                        id: shortId.generate(),
                        icon: 'help',
                        menuList: [
                            {
                                id: shortId.generate(),
                                bel: '关于作者', name: 'about', href: 'html/about.html'
                            },
                            {
                                id: shortId.generate(),
                                bel: '检查更新',
                                name: 'update'
                            },  //name是用于获取树形菜单的key
                        ]
                    }

                ]
            }
        },
        //生命周期方法
        mounted() {

        },
        watch: {
            $router() {

            }
        },
        methods: {
            selectMenu(l) {
                if (l.name === 'update') {
                    this.$router.push(`/update`,
                        onComplete => {
                        },
                        onAbort => {
                        })
                    return;
                }
                //每个分类的默认首页
                let indexPath = encodeURIComponent(`html/${l.name}/index.html`)+"/"+l.name;
                // console.log('默认首页跳转：', indexPath)
                this.$router.push(`/content/${indexPath}`,
                    onComplete => {
                    },
                    onAbort => {
                    })

            },
            minimize() {

                ipc.send("minimize");
            },
            maximize() {
                ipc.send("maximize");
            },
            close() {
                ipc.send("close");
            }
        },
    }
</script>

<style>
</style>