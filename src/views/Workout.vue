<template>
  <div class="workout">
    <template v-if="item">
      <headline
        :value="item.label"
        @change="onHeadlineChange"
        :edit="edit" />
      <main-content class="repetitions">
        <div>
          <repetition
            :key="index"
            v-for="(repetition, index) in item.repetitions" />
        </div>
      </main-content>
      <remote
        v-slot:remote
        left="back"
        @left-click="onBackClick"
        main="add"
        @main-click="onAddClick" />
    </template>
  </div>
</template>

<script>
import Remote from "@/components/remote";
import Headline from "@/components/headline";
import Repetition from "@/components/repetition";
import MainContent from "@/components/main-content";

export default {
  props: {
    edit: { type: Boolean, default: false }
  },
  computed: {
    id() {
      return this.$route.params.id;
    },
    item() {
      return this.$store.state.workouts.sets[this.id];
    }
  },
  components: {
    Remote,
    Headline,
    Repetition,
    MainContent
  },
  methods: {
    onHeadlineChange(value) {
      this.$store.commit("workouts/update", {
        id: this.id,
        params: { label: value }
      });
    },
    onBackClick() {
      this.$router.go(-1);
    },
    onAddClick() {
      console.log("add");
    }
  },
  watch: {
    item: {
      handler(newValue) {
        if (!newValue) {
          this.$router.push("/list");
        }
      },
      immediate: true
    }
  }
}
</script>
