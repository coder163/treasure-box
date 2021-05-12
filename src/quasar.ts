import Vue from 'vue'

import './styles/quasar.scss'
import '@quasar/extras/material-icons/material-icons.css'
import {Quasar, Notify} from 'quasar'
import hans from 'quasar/lang/zh-hans'

Vue.use(Quasar, {
    lang: hans,
    config: {
        Notify
    },
    plugins: {
        Notify
    }
})