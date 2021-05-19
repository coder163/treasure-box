<template>
<!--  'height': winHeight+'px',-->
    <div id="dplayer" :style="{'height':'450px'}">

    </div>

</template>

<script>
import Hls from 'hls.js'
import DPlayer from 'dplayer';
import {logger} from "@/config/Log4jsConfig";
import background from "@/assets/bg.gif";
import {ZfileApi} from '@/api'

export default {
        name: "Player",
        data() {
            return {
                player: null,
                winHeight: document.documentElement.clientHeight,
                showing: true,
                display: 'none'
            }
        },
        mounted() {


            let $vue = this;

            window.addEventListener(
                "resize",
                function () {
                    $vue.winHeight = document.documentElement.clientHeight;
                },
                false
            );
            //播放配置项
            let options = {
                container: document.getElementById('dplayer'),
                autoplay: false,
                airplay: true,
                lang: 'zh-cn',
                screenshot: true,
                volume: 0.7,//音量播放器会记忆用户设置
                logo: '',
                video: {
                    url: "https://v8.dious.cc/20210411/PwWzzJyO/index.m3u8",
                    pic:background,  //图片地址。img4
                    type: 'customHls',//可选值:'customHls' 'auto', 'hls', 'flv', 'dash', 'webtorrent', 'normal' 或其他自定义类型
                    customType: {
                        // @ts-ignore
                        'customHls': function (video, player) {
                            const hls = new Hls({
                                debug: false,
                            });
                            hls.loadSource(video.src);
                            hls.attachMedia(video);


                        }
                    }
                },


            }

            this.player = new DPlayer(options);

            //TODO 暂时不了解这里为什么不能直接使用枚举(DPlayerEvents)
            this.player.on('loadeddata', () => {
                logger.info('数据加载完成loadstart')
                this.player.seek(100);

                this.player.play()
            })
            //
            // this.player.on('progress', () => {
            //     logger.info('progress')
            // })

        }
    }
</script>

<style lang="sass">


</style>