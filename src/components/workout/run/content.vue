<template>
  <main-content class="content" v-if="id">
    <h2 class="label">{{ label }}</h2>
    <countdown
      v-if="inCountdown"
      :active="isCountdownRunning"
      @done="onCountdownDone" />
    <clock
      v-else
      :sets="sets"
      :active="isRunning"
      :start-time="timer.startTime"
      :offset-time="timer.offsetTime"
      @set="onSetChange"
      @done="onDone" />
  </main-content>
</template>

<script>
import MainContent from "@/components/main-content";
import Clock from "@/components/clocks/run";
import Countdown from "@/components/clocks/countdown";

export default {
  components: {
    MainContent,
    Clock,
    Countdown,
  },
  data() {
    return {
      time: 0,
      passedTime: 0,
      done: false,
      currentSet: null
    }
  },
  computed: {
    id() {
      return this.$store.state.timers.displayed;
    },
    item() {
      return this.$store.getters["workouts/getWorkoutById"](this.id);
    },
    isRunning() {
      return this.$store.getters["timers/isRunning"](this.id);
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
    isReset() {
      return this.$store.getters["timers/isReset"](this.id);
    },
    label() {
      if (this.done) {
        return "DONE";
      }
      if (this.inCountdown) {
        return "GET READY";
      }
      if (this.currentSet) {
        return this.currentSet.label;
      }
      return "";
    },
    inCountdown() {
      return this.isReset;
    },
    isCountdownRunning() {
      return this.$store.state.timers.countdown;
    }
  },
  mounted() {
    this.$store.commit("timers/countdown", this.isReset);
  },
  watch: {
    item: {
      handler(newValue) {
        if (!newValue) {
          this.$router.push("/");
        } else {
          this.$store.dispatch("timers/create", this.id);
        }
      },
      immediate: true
    }
  },
  methods: {
    onSetChange(index) {
      this.currentSet = this.sets[index];
    },
    onDone() {
      this.done = true;
      this.$store.dispatch("timers/stop", this.id);
    },
    onCountdownDone() {
      this.$store.dispatch("timers/run", this.id);
    }
  }
}
</script>

<style scoped>
.content {
  align-items: center;
  flex-grow: 0;
}

.label {
  text-align: center;
  font-size: 3rem;
  margin-bottom: 1rem;
}
</style>
