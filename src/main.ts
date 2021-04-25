import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './quasar'
const shortid = require('shortid');


Vue.config.productionTip = false

//在main.js定义自定义指令
// Vue.directive('highlight',function (el:HTMLElement) {
//   let blocks:NodeListOf<HTMLElement> = el.querySelectorAll('pre code');
//   blocks.forEach((block:HTMLElement)=>{
//     console.log(block)
//     hljs.highlightBlock(block)
//   })
// })


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
