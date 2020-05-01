<template>
  <div class="workout-detail">
    <template v-if="item">
      <headline
        :value="item.label"
        @change="onHeadlineChange" />
      <main-content>
        <div class="repetitions">
          <repetition
            :key="index"
            :index="index"
            v-for="(item, index) in item.repetitions"
            v-bind="item"
            @change="onRepetitionChange"
            @delete="onRepetitionDelete"
            class="repetition" />
        </div>
      </main-content>
      <actions>
        <action
          label="Back"
          :handler="onBackClick" />
        <action
          label="Run"
          :handler="onRunClick" />
        <action
          label="Delete"
          :handler="onDeleteClick" />
        <action
          label="Add"
          :handler="onAddClick" />
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
  components: {
    Headline,
    Repetition,
    MainContent,
    Actions,
    Action
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
    timer() {
      return this.$store.getters["timers/getTimerById"](this.id);
    },
    isRunning() {
      return this.timer.running;
    }
  },
  watch: {
    item: {
      handler(newValue) {
        if (!newValue) {
          this.$router.push("/workouts");
          return;
        }
      },
      immediate: true
    },
    isRunning: {
      handler(value) {
        if (value) {
          this.$router.push(`/workouts/${this.id}/run`);
          return;
        }
      },
      immediate: true
    }
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
    onRunClick() {
      this.$router.push(`/workouts/${this.id}/run`);
    },
    onDeleteClick() {
      this.$store.commit("workouts/delete", this.id);
      this.$router.push("/workouts");
    },
    onAddClick() {
      this.$store.commit("workouts/addRepetition", this.id);
    },
    onRepetitionChange(payload, index) {
      const repetitions = [...this.item.repetitions];
      repetitions[index] = payload;
      this.$store.commit("workouts/update", {
        id: this.id,
        params: { repetitions }
      });
    },
    onRepetitionDelete(index) {
      this.$store.commit("workouts/deleteRepetition", {
        id: this.id,
        index
      });
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
