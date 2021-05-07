<template>
  <div class="home">
    <!--TODO 布局没想好，暂时不要了而且轮播图好像没有世纪作用-->
    <carousel/>
    <!--    <LayoutSide type="java"/>-->
    <!--        <q-scroll-area :thumb-style="thumbStyle" :bar-style="barStyle"  :style="{'height': wHeight-280+'px','margin-left': '31px'} ">
                <div class="text-h5">最近更新</div>
                <q-separator/>
                <div class="q-pa-md row items-start q-gutter-md">
                    <q-card class="my-card" v-for=" i in 3" :key="i" style="max-width:225px">
                        <q-img src="https://cdn.quasar.dev/img/parallax2.jpg" basic>
                            <div class="absolute-bottom text-h6">
                                Delphi第一季
                            </div>
                        </q-img>
                        <q-card-section>
                            00000000000000
                        </q-card-section>
                    </q-card>

                </div>
            </q-scroll-area>-->


  </div>


</template>

<script>
import Carousel from "@/components/Carousel";
import LayoutSide from "@/components/LayoutSide.vue";

const stringOptions = [
  'Google', 'Facebook', 'Twitter', 'Apple', 'Oracle'
].reduce((acc, opt) => {
  for (let i = 1; i <= 5; i++) {
    acc.push(opt + ' ' + i)
  }
  return acc
}, [])
export default {
  components: {
    Carousel,
    LayoutSide
  },
  data() {
    return {
      wHeight: document.documentElement.clientHeight,
      model: null,
      options: [
        'Google', 'Facebook', 'Twitter', 'Apple', 'Oracle'
      ],

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
    };
  },
  methods: {
    filterFn(val, update, abort) {
      update(() => {
        const needle = val.toLocaleLowerCase()
        this.options = stringOptions.filter(v => v.toLocaleLowerCase().indexOf(needle) > -1)
      })
    },

    setModel(val) {
      this.model = val
    }
  },
  mounted() {

    let $vue = this;

    window.addEventListener(
        "resize",
        function () {
          $vue.wHeight = document.documentElement.clientHeight;
        },
        false
    );
    // let div = this.$refs.indexcontent.$el;
    // div.addEventListener('scroll', this.handleScroll);//监听滚动条
  },
}

</script>
<style>
.my-card {
  width: 100%;
}


</style>
