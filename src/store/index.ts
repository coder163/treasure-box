import Vue from 'vue'
import Vuex from 'vuex'
import config from "@/db/json";
import {DownloadItem} from "@/domain";
import {DownDaoImpl} from "@/db/indexedDB";

Vue.use(Vuex)


export default new Vuex.Store({
    // 驱动应用的数据源
    state: {
        nodeType: 'java',
        //实时
        localPath: ''

    },
    getters: {
        getTreeData(state) {
            // @ts-ignore
            return config.docs[state.nodeType];
        },
        getNodeType(state) {
            return state.nodeType
        },

        getLocalPath(state) {

            return state.localPath;

        }
    },
    mutations: {

        updateNodeType(state, payload = 'java') {
            state.nodeType = payload;

        },
        updateLocalPath(state, payload = 'E:\\download\\') {
            state.localPath = payload;
        }
    },
    actions: {},
    modules: {}
})
