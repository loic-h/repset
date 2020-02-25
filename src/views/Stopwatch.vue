<template>
  <div class="stopwatch">
    <navigation />
    <clock
      :active="clockActive"
      :start-time="$store.state.current.startTime"
      :offset-time="$store.state.current.offsetTime" />
    <remote
      main="play"
      @main-click="onPlayClick"
      right="more"
      @right-click="onMoreClick" />
  </div>
</template>

<script>
import Navigation from "@/components/navigation";
import Clock from "@/components/clock";
import Remote from "@/components/remote";

const ID = "stopwatch";

export default {
  components: {
    Navigation,
    Clock,
    Remote
  },
  computed: {
    currentId() {
      return this.$store.state.current.id;
    },
    isCurrentRunning() {
      return this.$store.state.current.running;
    },
    clockActive() {
      return this.currentId === ID && this.isCurrentRunning;
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
      this.$router.push("/list");
    }
  }
};
</script>

<style>
.stopwatch {
  padding-top: 30vh;
  display: flex;
  justify-content: center;
  width: 100%;
}
</style>
