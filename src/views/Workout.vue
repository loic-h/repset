<template>
  <div class="workout">
    <template v-if="item">
      <headline
        :value="item.label"
        @change="onHeadlineChange"
        :edit="edit" />
      <main-content>
        <div
          v-if="isCurrent">
          yo
        </div>
        <div
          v-else
          class="repetitions">
          <repetition
            :key="index"
            :index="index"
            v-for="(item, index) in item.repetitions"
            v-bind="item"
            @change="onRepetitionChange"
            class="repetition" />
        </div>
      </main-content>
      <actions>
        <action
          label="Back"
          :handler="onBackClick" />
        <action
          label="Play"
          :handler="onPlayClick" />
        <action
          label="Delete"
          :handler="onDeleteClick" />
      </actions>
    </template>
  </div>
</template>

<script>
import Actions from "@/components/actions";
import Action from "@/components/action";
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
      const item = this.$store.state.workouts.sets[this.id];
      if (item) {
        return { ...item };
      }
      return null;
    },
    isCurrent() {
      return this.$store.state.current.id === this.id;
    },
    isRunning() {
      return this.isCurrent && this.$store.state.running;
    }
  },
  components: {
    Headline,
    Repetition,
    MainContent,
    Actions,
    Action
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
      this.$store.commit(`current/${this.isRunning ? "pause" : "start"}`, this.id);
    },
    onDeleteClick() {
      this.$store.commit("workouts/delete", this.id);
      this.$router.push("/workouts");
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
          this.$router.push("/workouts");
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
  flex-grow: 1;
}

.repetitions {
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: flex-end;
}
</style>
