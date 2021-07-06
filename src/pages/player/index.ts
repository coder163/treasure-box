import Vue from 'vue'
import App from './index.vue'
import store from '@/store'
import router from "@/router";
import '../../quasar'
//全局配置
import {AppConfig} from '@/db/lowdb'
//全局配置对象
import Setting from "@/domain/Setting";

//请求相关

import axios from "axios";
// http request 请求拦截器
axios.interceptors.request.use(
    function (config) {
      config.headers = {
        'Access-Control-Allow-Origin': '*',
        'Accept': 'application/json,text/plain,text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*!/!*;q=0.8,application/signed-exchange;v=b3;q=0.9',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36'
      }
      // console.log("请求拦截", config)
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
);

// http response 服务器响应拦截器，
axios.interceptors.response.use(
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
);

let {
  downDir,
  isAutoUpdate,
  isDownTool,
  isKeepDiskPath,
  isStandalonePlayer,
  isSkipTitle,
  titleDuration,
  creditDuration,
} = AppConfig.get("app").value();

Vue.prototype.$AppCofig = new Setting(downDir, isAutoUpdate, isDownTool, isKeepDiskPath, isStandalonePlayer,isSkipTitle,titleDuration,creditDuration);
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
