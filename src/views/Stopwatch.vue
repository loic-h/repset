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
import Clock from "@/components/clock";
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
    isRunning() {
      const run = this.$store.state.timers.items[ID]
      return run && run.running;
    },
    startTime() {
      return this.$store.state.timers.items[ID].startTime;
    },
    offsetTime() {
      return this.$store.state.timers.items[ID].offsetTime;
    }
  },
  methods: {
    onPlayClick(isActive) {
      this.$store.commit("timers/run", ID);
    },
    onPauseClick(isActive) {
      this.$store.commit("timers/pause", ID);
    },
    onMenuClick() {
      this.$router.push("/workouts");
    },
    onResetClick() {
      this.$store.commit("timers/stop", ID);
    }
  }
};
</script>

<style>
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
