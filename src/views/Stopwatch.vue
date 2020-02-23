<template>
  <div class="stopwatch">
    <navigation />
    <counter
      :active="counterActive"
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
import Counter from "@/components/counter";
import Remote from "@/components/remote";

const ID = "stopwatch";

export default {
  components: {
    Navigation,
    Counter,
    Remote
  },
  computed: {
    currentId() {
      return this.$store.state.current.id;
    },
    isCurrentRunning() {
      return this.$store.state.current.running;
    },
    counterActive() {
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
