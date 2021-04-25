import Vue from 'vue'
import VueRouter, {RouteConfig} from 'vue-router'
import Home from '../views/Home.vue'
import {RawLocation} from "vue-router/types/router";

// @ts-ignore
import Content from '../views/Content'

Vue.use(VueRouter)


const routes: Array<RouteConfig> = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        redirect:'/content/html%2Fjava%2Findex.html/java'
    }, {
        path: '/content/:filePath/:type',
        name: 'Content',
        component: Content
    },{
        path: '/update',
        name: 'Update',
        component: () => import('../views/Update.vue')
    }
    // {
        // path: '/about',
        // name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        // component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    // },
    // {
    //     path:'*',
    //     redirect:'/'
    // }
]

const router = new VueRouter({
    mode: 'hash',
    base: process.env.BASE_URL,
    routes
})

export default router