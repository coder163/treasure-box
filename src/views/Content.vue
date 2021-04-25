<template>
    <div id="content">
        <div v-if="isIndex">
            <carousel />
            <q-separator/>
        </div>

        <q-scroll-area :thumb-style="thumbStyle" :bar-style="barStyle"
                       :style="{'height': (isIndex?(wHeight-300):(wHeight-80))+'px','margin-left': '31px'} ">
            <markdown :file-path="filePath"/>
        </q-scroll-area>

        <LayoutSide :tree-data="treeData" :type="this.$route.params.type"/>
    </div>
</template>

<script>
    import Markdown from "@/components/Markdown";
    import config from '@/config'
    import Carousel from "@/components/Carousel";
    import LayoutSide from "@/components/LayoutSide";

    export default {
        name: "Content",
        components: {
            Markdown,
            LayoutSide,
            Carousel
        },
        data() {
            return {
                isIndex: true,
                treeData: config.docs[this.$route.params.type],
                wHeight: document.documentElement.clientHeight,
                filePath: this.$route.params.filePath,
                thumbStyle: {
                    right: '4px',
                    borderRadius: '5px',
                    backgroundColor: '#027be3',
                    width: '5px',
                    opacity: 0.75
                },
                barStyle: {
                    right: '2px',
                    borderRadius: '9px',
                    backgroundColor: '#027be3',
                    width: '9px',
                    opacity: 0.2
                }
            }

        },
        watch: {
            $route(to, from) {
                // console.log(from,to)
                this.filePath = this.$route.params.filePath

                this.isIndex = this.filePath.indexOf('index.html') !== -1

                this.treeData = config.docs[this.$route.params.type]


            }
        },
        mounted() {
            console.log('内容显示页：', this.filePath, this.$route.params.type)

            let $vue = this;
            window.addEventListener(
                "resize",
                function () {
                    $vue.wHeight = document.documentElement.clientHeight;
                },
                false
            );
        }
    }
</script>

<style scoped>

</style>