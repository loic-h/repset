<template>
  <div class="stopwatch">
    <counter
      :active="counterActive"
      :start-time="store.startTime"
      :offset-time="store.offsetTime"
    />
    <remote
      main="play"
      right="more"
      @main-click="onMainClick"
      @right-click="onMoreClick"
    />
  </div>
</template>

<script>
import Counter from "@/components/counter";
import Remote from "@/components/remote";
import currentStore from "@/stores/current";

export default {
  components: {
    Counter,
    Remote
  },
  data() {
    return {
      store: currentStore.state
    };
  },
  computed: {
    counterActive() {
      return this.store.id === "stopwatch" && this.store.running;
    }
  },
  methods: {
    onMainClick(isActive) {
      if (isActive) {
        currentStore.start("stopwatch");
      } else {
        currentStore.pause();
      }
    },
    onMoreClick() {
      console.log("more");
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
