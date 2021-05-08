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
        redirect:'/content/html%2Fjava%2Findex.html'
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
        component: () => import('../views/Player.vue')
    },{
        path: '/login',
        name: 'Login',
        component: () => import('../views/Login.vue')
    },{
        path: '/time-line',
        name: 'TimeLine',
        component: () => import('../views/TimeLine.vue')
    }
]

const router = new VueRouter({
    mode: 'hash',
    base: process.env.BASE_URL,
    routes
})

export default router
