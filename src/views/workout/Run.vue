<template>
  <div class="workout-run">
    <template v-if="item">
      <headline :value="item.label" />
      <main-content class="content">
        <h2 v-if="done">
          DONE!
        </h2>
        <clock
          v-else
          :sets="sets"
          :active="isRunning"
          :start-time="timer.startTime"
          :offset-time="timer.offsetTime"
          @done="onDone" />
      </main-content>
      <actions>
        <action
          label="Reset"
          :handler="onResetClick" />
        <action
          v-if="isRunning"
          label="Pause"
          :handler="onPauseClick" />
        <action
          v-else
          label="Start"
          :handler="onStartClick" />
      </actions>
    </template>
  </div>
</template>

<script>
import Actions from "@/components/actions";
import Action from "@/components/action";
import Headline from "@/components/headline";
import MainContent from "@/components/main-content";
import Clock from "@/components/clocks/run";

export default {
  components: {
    Headline,
    MainContent,
    Actions,
    Action,
    Clock
  },
  data() {
    return {
      time: 0,
      passedTime: 0,
      done: false
    }
  },
  computed: {
    id() {
      return this.$route.params.id;
    },
    item() {
      return this.$store.getters["workouts/getSetById"](this.id);
    },
    sets() {
      const sets = [];
      for (let repetition of this.item.repetitions) {
        for (let _ of new Array(repetition.repeat)) {
          for (let item of repetition.items) {
            sets.push(item);
          }
        }
      }
      return sets;
    },
    timer() {
      return this.$store.getters["timers/getTimerById"](this.id);
    },

    isRunning() {
      return this.timer.running;
    }
  },
  methods: {
    onStartClick() {
      this.$store.dispatch("timers/run", this.id);
    },
    onPauseClick() {
      this.$store.dispatch("timers/pause", this.id);
    },
    onResetClick() {
      this.done = false;
      this.$store.dispatch("timers/stop", this.id);
    },
    onDone() {
      this.done = true;
      this.$store.dispatch("timers/stop", this.id);
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
  },
  created() {
    this.$store.dispatch("timers/create", this.id);
  }
}
</script>

<style scoped>
.workout-run {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.content {
  align-items: center;
  justify-content: center;
}
</style>
