<template>

    <!--TODO 要求类型参数type，监听路由变化，根据type直接查询树形数据-->

    <div>
        <q-drawer v-model="drawer" show-if-above :width="200" :breakpoint="400">
            <!--滚动条-->
            <q-scroll-area :thumb-style="thumbStyle" :bar-style="barStyle"
                           style="height: calc(100% - 150px); margin-top: 150px; ">
                <!--树形菜单-->
                <q-tree ref="tree" :nodes="treeData" :selected.sync="select" accordion node-key="label">

                </q-tree>

            </q-scroll-area>
            <!--人物头像-->
            <q-img class="absolute-top" src="https://cdn.quasar.dev/img/material.png" style="height: 150px">
                <div class="absolute-bottom bg-transparent">
                    <q-avatar size="56px" class="q-mb-sm">
                        <img src="https://cdn.quasar.dev/img/boy-avatar.png">
                    </q-avatar>
                    <div class="text-weight-bold">舞动的代码</div>
                </div>
            </q-img>
            <!--左右隐藏显示-->
            <div class="q-mini-drawer-hide absolute" style="top: 50%;right:0">
                <q-btn dense unelevated icon="arrow_left" @click="drawer = false"></q-btn>
            </div>

        </q-drawer>
        <div class="absolute" v-show="!drawer" style="position:fixed;z-index:99999;top: 50%;left: 0;display: block;">
            <q-btn dense unelevated icon="arrow_right" @click="drawer = true"></q-btn>
        </div>
    </div>
</template>

<script>

    export default {
        props: ['treeData','type'],
        data() {
            return {
                drawer: false,
                select: null,
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
            select:
                {
                    handler(newval, oldval) {
                        let value = newval === null ? oldval : newval
                        let $node = this.$refs.tree.getNodeByKey(value);

                        if (($node.href !== undefined) && (this.$router.currentRoute.path !== $node.href)) {
                            this.$router.push(`/content/${encodeURIComponent($node.href)}/${this.type}`,
                                onComplete => {
                                },
                                onAbort => {
                                })
                        } else {

                            let isOpen = this.$refs.tree.isExpanded(value);
                            // console.log(isOpen, value)
                            this.$refs.tree.setExpanded(value, !isOpen)

                        }

                    }
                }

        }
    }
</script>