<template>

  <div>


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
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import LayoutSide from "@/components/LayoutSide.vue";

@Component({
  components: {LayoutSide},
})
export default class TimeLine extends Vue {
  private body: string = "hello";


  private mounted() {
    // console.log('内容显示页：', this.filePath, this.$route.params.type)
 

  }
}
</script>

<style scoped>

</style>