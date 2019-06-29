<template>
  <div class="stopwatch">
    <counter :active="counterActive" />
    <remote main="play" @main-click="onMainClick" />
  </div>
</template>

<script>
import Counter from "@/components/counter";
import Remote from "@/components/remote";

export default {
  components: {
    Counter,
    Remote
  },
  data() {
    return {
      counterActive: false
    };
  },
  methods: {
    onMainClick(isActive) {
      this.counterActive = isActive;
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
