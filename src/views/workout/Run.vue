<template>
  <div class="workout-run">
    <template v-if="item">
      <headline :value="item.label" />
      <main-content>

      </main-content>
      <actions>
        <action
          v-if="isRunning"
          label="Play"
          :handler="onPlayClick" />
        <action
          v-else
          label="Pause"
          :handler="onPlayClick" />
      </actions>
    </template>
  </div>
</template>

<script>
import Actions from "@/components/actions";
import Action from "@/components/action";
import Headline from "@/components/headline";
import MainContent from "@/components/main-content";

export default {
  computed: {
    id() {
      return this.$route.params.id;
    },
    item() {
      const item = this.$store.state.workouts.sets[this.id];
      if (item) {
        return { ...item };
      }
      return null;
    },
    isRunning() {
      return this.$store.state.current.id === this.id;
    }
  },
  components: {
    Headline,
    MainContent,
    Actions,
    Action
  },
  methods: {
    onPlayClick() {
      this.$store.commit("current/play", this.id);
    },
    onPauseClick() {
      this.$store.commit("current/pause", this.id);
    }
  },
  watch: {
    item: {
      handler(newValue) {
        if (!newValue) {
          this.$router.push("/workouts");
        }
      },
      immediate: true
    }
  }
}
</script>

<style scoped>
.workout-detail {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.repetitions {
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: flex-end;
}
</style>
