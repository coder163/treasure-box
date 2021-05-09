import Vue from 'vue'
import Vuex from 'vuex'
import config from "@/db/json";

Vue.use(Vuex)


export default new Vuex.Store({
    // 驱动应用的数据源
    state: {
        nodeType: 'java'
    },
    getters: {
        getTreeData(state) {
            // @ts-ignore
            return config.docs[state.nodeType];
        },
        getNodeType(state) {
            return state.nodeType
        }
    },
    mutations: {

        updateNodeType(state, payload = 'java') {
            state.nodeType = payload;

        }

    },
    actions: {},
    modules: {}
})
