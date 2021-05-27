import Vue from 'vue'
import VueRouter, {RouteConfig} from 'vue-router'
import Home from '../views/Home.vue'

import Content from '../views/Content.vue'

Vue.use(VueRouter)


const routes: Array<RouteConfig> = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        redirect:'/content/html/docs%2Fjava%2Findex.html'
        // redirect:'/update'
    }, {
        path: '/content/:filePath',
        name: 'Content',
        component: Content
    },{
        path: '/update',
        name: 'Update',
        component: () => import('../views/Update.vue')
    },{
        path: '/player',
        name: 'Player',
        component: () => import('@/components/Player.vue')
    },{
        path: '/login/:persistent',
        name: 'Login',
        component: () => import('../views/Login.vue')
    },{
        path: '/cloud-disk',
        name: 'CloudDisk',
        component: () => import('../views/CloudDisk.vue')
    }
    ,{
        path: '/play-list',
        name: 'PlayList',
        component: () => import('../views/PlayList.vue')
    } ,{
        path: '/transmission',
        name: 'Transmission',
        component: () => import('../views/Transmission.vue')
    } ,{
        path: '/setting',
        name: 'Setting',
        component: () => import('../views/Setting.vue')
    },{
        path: '/vip',
        name: 'Vip',
        component: () => import('../views/Vip.vue')
    }

]

const router = new VueRouter({
    mode: 'hash',
    base: process.env.BASE_URL,
    routes
})

export default router
