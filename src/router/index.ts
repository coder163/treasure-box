import Vue from 'vue'
import VueRouter, {RouteConfig} from 'vue-router'

Vue.use(VueRouter)


const routes: Array<RouteConfig> = [
    {
        path: '/',
        name: 'Home',
        redirect:'/content/html/docs%2Fjava%2Findex.html'
        // redirect:'/update'
    }, {
        path: '/content/:filePath',
        name: 'Content',
        component:  () => import('../views/Content.vue')
    },{
        path: '/update',
        name: 'Update',
        component: () => import('../views/Update.vue')
    },{
        path: '/player',
        name: 'Player',
        component: () => import('@/components/Player.vue')
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
    }

]

const router = new VueRouter({
    mode: 'hash',
    base: process.env.BASE_URL,
    routes
})

export default router
