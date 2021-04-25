import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './quasar'


Vue.config.productionTip = false

/*
全局守卫
*/
router.beforeEach((to,from,next)=>{
  // console.log("全局前置守卫")
  next();
})
router.afterEach((to,from)=>{
  // console.log("全局后置守卫")
})


//解决路由重复（即当前路径多次点击报错，不影响页面效果）
/*import VueRouter, {RawLocation} from 'vue-router'

const originalPush = VueRouter.prototype.push

VueRouter.prototype.push = function push(location:RawLocation) {
  // @ts-ignore
  return originalPush.call(this, location).catch(err => err)
}*/




new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
