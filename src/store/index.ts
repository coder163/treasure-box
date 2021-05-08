import Vue from 'vue'
import Vuex from 'vuex'
import config from "@/db/json";

Vue.use(Vuex)


export default new Vuex.Store({
    // 驱动应用的数据源
    state: {
        //@ts-ignore
        treeData: config.docs['java'],

        nodeType: 'java'
    },
    getters: {
        getTreeData(state) {
            return state.treeData;
        },
        getNodeType(state) {


            return state.nodeType
        }
    },
    mutations: {
        updateTreeData(state, payload = 'java') {
            // @ts-ignore
            state.treeData = config.docs[payload];
        },
        updateNodeType(state, payload = 'java') {
            state.nodeType = payload;

        }

    },
    actions: {},
    modules: {}
})
