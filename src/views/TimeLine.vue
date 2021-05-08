<template>

  <div>

    <q-scroll-area :thumb-style="thumbStyle" :bar-style="barStyle"
                   :style="{'height': (wHeight-80)+'px','margin-left': '31px'} ">

      <div class="q-px-lg q-pb-md">
        <q-timeline color="secondary">
          <q-timeline-entry heading body="Timeline heading"></q-timeline-entry>

          <q-timeline-entry
              title="Event Title"
              subtitle="February 22, 1986"
              avatar="https://cdn.quasar.dev/img/avatar3.jpg"
              :body="body"
          ></q-timeline-entry>

          <q-timeline-entry
              title="Event Title"
              subtitle="February 21, 1986"
              icon="delete"
              :body="body"
          ></q-timeline-entry>

          <q-timeline-entry heading body="November, 2017"></q-timeline-entry>

          <q-timeline-entry
              title="Event Title"
              subtitle="February 22, 1986"
              :body="body"
          ></q-timeline-entry>

          <q-timeline-entry
              title="Event Title"
              subtitle="February 22, 1986"
              :body="body"
          ></q-timeline-entry>

          <q-timeline-entry
              title="Event Title"
              subtitle="February 22, 1986"
              color="orange"
              icon="done_all"
              :body="body"
          ></q-timeline-entry>

          <q-timeline-entry
              title="Event Title"
              subtitle="February 22, 1986"
              :body="body"
          ></q-timeline-entry>

          <q-timeline-entry
              title="Event Title"
              subtitle="February 22, 1986"
              :body="body"
          ></q-timeline-entry>
        </q-timeline>

      </div>
    </q-scroll-area>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import LayoutSide from "@/components/LayoutSide.vue";

@Component({
  components: {LayoutSide},
})
export default class TimeLine extends Vue {
  private drawer: boolean = false;
  private body: string = "hello";
  private type: string = 'java'
  private wHeight: number = document.documentElement.clientHeight

  private thumbStyle = {
    right: '4px',
    borderRadius: '5px',
    backgroundColor: '#027be3',
    width: '5px',
    opacity: 0.75
  }
  private barStyle = {
    right: '2px',
    borderRadius: '9px',
    backgroundColor: '#027be3',
    width: '9px',
    opacity: 0.2
  }

  private mounted() {
    // console.log('内容显示页：', this.filePath, this.$route.params.type)
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