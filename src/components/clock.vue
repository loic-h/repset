<template>
  <div class="clock">
    <counter :time="timeInSeconds" />
    <div class="mark"></div>
  </div>
</template>

<script>
import Counter from "./counter";

export default {
  limit: 59 * 60 + 59,
  startTime: 0,
  props: {
    active: { type: Boolean, default: false },
    startTime: { type: Number, default: 0 },
    offsetTime: { type: Number, default: 0 },
    countdown: { type: Boolean, default: false }
  },
  data() {
    return {
      time: 0
    };
  },
  computed: {
    timeInSeconds() {
      return parseInt(this.time / 1000);
    }
  },
  components: {
    Counter
  },
  methods: {
    update() {
      if (this.startTime === null) {
        this.time = 0;
        return;
      }
      this.time = Date.now() - this.startTime + this.offsetTime;
      if (this.active) {
        requestAnimationFrame(this.update);
      }
    }
  },
  watch: {
    active: {
      handler(newVal) {
        if (newVal) {
          requestAnimationFrame(this.update);
          this.$emit("play");
        } else {
          this.$emit("pause", this.time);
        }
      },
      immediate: true
    },
    startTime() {
      this.update();
    }
  }
};
</script>

<style scoped>
.clock {
  font-size: var(--font-size-clock);
}
</style>
