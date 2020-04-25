<template>
  <div class="stopwatch">
    <navigation />
    <main-content>
      <clock
        class="clock"
        :active="isRunning"
        :start-time="$store.state.current.startTime"
        :offset-time="$store.state.current.offsetTime" />
    </main-content>
    <remote
      main="play"
      @main-click="onPlayClick"
      right="more"
      @right-click="onMoreClick"
      left="reset"
      @left-click="onReplayClick" />
  </div>
</template>

<script>
import Navigation from "@/components/navigation";
import Clock from "@/components/clock";
import Remote from "@/components/remote";
import MainContent from "@/components/main-content";

const ID = "stopwatch";

export default {
  components: {
    Navigation,
    Clock,
    Remote,
    MainContent
  },
  computed: {
    currentId() {
      return this.$store.state.current.id;
    },
    isRunning() {
      return this.currentId === ID && this.$store.state.current.running;
    }
  },
  methods: {
    onPlayClick(isActive) {
      if (isActive) {
        this.$store.commit("current/start", ID);
      } else {
        this.$store.commit("current/pause");
      }
    },
    onMoreClick() {
      this.$router.push("/workouts");
    },
    onReplayClick() {
      this.$store.commit("current/stop");
    }
  }
};
</script>

<style>
.stopwatch {
  width: 100%;
  height: 100%;
}

.clock {
  flex-grow: 1;
  align-self: stretch;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
