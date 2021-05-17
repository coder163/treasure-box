import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './quasar'
import store from './store'

import VueRouter, {RawLocation} from 'vue-router'
//初始化数据库
import Dexie from 'dexie';
//全局配置对象
import Setting from "@/domain/Setting";

Vue.config.productionTip = false

/*
全局守卫
*/
router.beforeEach((to, from, next) => {
    // console.log("全局前置守卫",to)
    next();
})
router.afterEach((to, from) => {
    // console.log("全局后置守卫")
})

//解决路由重复（即当前路径多次点击报错，不影响页面效果）
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location: RawLocation) {
    // @ts-ignore
    return originalPush.call(this, location).catch(err => err)
}

//数据库相关
const dbDexie: Dexie = new Dexie('local');

dbDexie.version(1).stores(
    {
        user: 'id,openid',
        download: 'id,fileName,totalSize,receivedSize,status,downloadDir',
    }
);
//打开失败的情况几乎不会出现
dbDexie.open().catch(function (e) {
    console.error("浏览器不支持 " + e);
});

//全局配置
import {AppConfig} from '@/db/lowdb'

let {
    downDir,
    isAutoUpdate,
    isDownTool,
    isKeepDiskPath,
    isStandalonePlayer
} = AppConfig.get("app").value()

Vue.prototype.$AppCofig =  new Setting(downDir, isAutoUpdate, isDownTool, isKeepDiskPath, isStandalonePlayer);

//将数据库对象挂载到vue的全局对象
Vue.prototype.$dexie = dbDexie;

//请求相关

import axios from "axios";
// http request 请求拦截器
axios.interceptors.request.use(
    function (config) {
        config.headers = {
            'Access-Control-Allow-Origin': '*',
            'Accept': 'application/json,text/plain,text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*!/!*;q=0.8,application/signed-exchange;v=b3;q=0.9',

        }
        // console.log("请求拦截", config)
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

// http response 服务器响应拦截器，
/*axios.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error) {
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    console.log("401");
                    break;
                case 404:
                    console.log("404");
                    break;
                case 403:
                    console.log("403");
                    break;
            }
        }
        return Promise.reject(error.response.data)
    }
);*/
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
