<template>
  <div class="workout">
    <template v-if="item">
      <headline
        :value="item.label"
        @change="onHeadlineChange"
        :edit="edit" />
      <main-content>
        <div class="repetitions">
          <repetition
            :key="index"
            :index="index"
            v-for="(item, index) in item.repetitions"
            v-bind="item"
            @change="onRepetitionChange"
            class="repetition" />
        </div>
      </main-content>
      <remote
        v-slot:remote
        left="back"
        @left-click="onBackClick"
        main="play"
        @main-click="onPlayClick" />
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
      return { ...this.$store.state.workouts.sets[this.id] };
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
    onPlayClick() {
      console.log("play");
    },
    onRepetitionChange(payload, index) {
      const repetitions = [...this.item.repetitions];
      repetitions[index] = payload;
      this.$store.commit("workouts/update", {
        id: this.id,
        params: { repetitions }
      });
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

<style scoped>
.workout {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}

.repetitions {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  justify-content: flex-end;
}
</style>
