import Vue from 'vue'
import Vuex from 'vuex'
import config from "@/db/json";
import {IZfile} from "@/domain/Zfile";
import EpisodesImpl, {CurrentEpisodes} from "@/domain/Episode";


Vue.use(Vuex)


export default new Vuex.Store({
    // 驱动应用的数据源
    state: {
        nodeType: 'delphi',
        //网盘路径
        cloudDiskPath: new Array<IZfile>(),

        episodes: new EpisodesImpl(),

    },
    getters: {
        getTreeData(state) {
            // @ts-ignore
            return config.docs[state.nodeType];
        },
        getNodeType(state) {
            return state.nodeType
        },

        getCloudDiskPath(state) {
            return state.cloudDiskPath;
        },

        getEpisodes(state) {
            return state.episodes;
        },

    },
    mutations: {


        updateEpisodes(state, currentVideo) {
            state.episodes = currentVideo;
        },

        updateNodeType(state, payload = 'java') {
            state.nodeType = payload;

        },
        updateCloudDiskPath(state, payload) {
            if (payload === 0) {
                // console.log('清空数组')
                state.cloudDiskPath.splice(0);
                return;
            }

            // @ts-ignore
            state.cloudDiskPath.push(payload);
            // @ts-ignore
            // console.log('updateCloudDiskPath向数组添加元素', payload.path);
        },
        subCloudDiskPath(state, row) {
            // console.log('截断之前的数组',state.cloudDiskPath)
            let num: number = 0;
            state.cloudDiskPath.forEach((value, index) => {
                // @ts-ignore
                if (value.name === row.name) {
                    state.cloudDiskPath.splice(index);
                    num++;
                    return;
                }
            })
            // console.log('截断之后的数组',num,state.cloudDiskPath)
        },

    },
    actions: {},
    modules: {}
})
