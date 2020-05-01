<template>
  <div class="stopwatch">
    <navigation />
    <main-content>
      <clock
        class="clock"
        :active="isRunning"
        :start-time="startTime"
        :offset-time="offsetTime" />
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
        label="Play"
        :handler="onPlayClick" />
      <action
        label="Menu"
        :handler="onMenuClick" />
    </actions>
  </div>
</template>

<script>
import Navigation from "@/components/navigation";
import Clock from "@/components/clocks/stopwatch";
import MainContent from "@/components/main-content";
import Actions from "@/components/actions";
import Action from "@/components/action";

const ID = "stopwatch";

export default {
  components: {
    Navigation,
    Clock,
    Actions,
    Action,
    MainContent
  },
  computed: {
    timer() {
      return this.$store.getters["timers/getTimerById"](ID);
    },
    isRunning() {
      return this.timer.running;
    },
    startTime() {
      return this.timer.startTime;
    },
    offsetTime() {
      return this.timer.offsetTime;
    }
  },
  methods: {
    onPlayClick(isActive) {
      this.$store.dispatch("timers/run", ID);
    },
    onPauseClick(isActive) {
      this.$store.dispatch("timers/pause", ID);
    },
    onMenuClick() {
      this.$router.push("/workouts");
    },
    onResetClick() {
      this.$store.dispatch("timers/stop", ID);
    }
  },
  created() {
    this.$store.dispatch("timers/create", ID);
  }
};
</script>

<style scoped>
.stopwatch {
  display: flex;
  flex-direction: column;
  width: 100%;
  flex-grow: 1;
}

.clock {
  flex-grow: 1;
  align-self: stretch;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
