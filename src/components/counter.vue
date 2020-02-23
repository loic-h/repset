<template>
  <div class="counter">
    <div class="time">{{ minutes }}:{{ seconds }}</div>
    <div class="mark"></div>
  </div>
</template>

<script>
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
    minutes() {
      return parseInt(this.timeInSeconds / 60);
    },
    seconds() {
      return prettifyTime(this.timeInSeconds % 60);
    },
    timeInSeconds() {
      return parseInt(this.time / 1000);
    }
  },
  methods: {
    update() {
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
    }
  }
};

const prettifyTime = time => {
  return `0${time}`.slice(-2);
};
</script>

<style scoped>
.counter {
  font-size: var(--font-size-counter);
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
