<template>
    <div id="q-app">

        <div class="q-pa-md">
            <!--                    src="http://youku.cdn33-okzy.com/20210125/764_6b415676/index.m3u8"-->
            <q-video
            src="https://www.ixigua.com/iframe/6879711566996963848"
            ></q-video>
            <button @click="play">打开播放器</button>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Vue, Watch} from 'vue-property-decorator';
    import {ipcRenderer} from 'electron';
    import {logger} from "@/config/Log4jsConfig";

    @Component({})
    export default class Update extends Vue{

        public play(){
            logger.info('open-video')
            ipcRenderer.send('open-video')
        }
    }
</script>

<style scoped>

</style>