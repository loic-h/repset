<template>
  <div class="counter">
    <div class="counter_time">{{ minutes }}:{{ seconds }}</div>
  </div>
</template>

<script>
export default {
  limit: 59 * 60 + 59,
  interval: null,
  props: {
    initialTime: { type: Number, default: 0 },
    countdown: { type: Boolean, default: false },
    active: { type: Boolean, require: true }
  },
  data() {
    return {
      time: this.initialTime
    };
  },
  computed: {
    minutes() {
      return Math.floor(this.time / 60);
    },
    seconds() {
      return prettifyTime(this.time % 60);
    }
  },
  watch: {
    active: {
      handler(newVal) {
        clearInterval(this.interval);
        if (newVal) {
          this.interval = setInterval(() => {
            this.time = this.countdown ? this.time - 1 : this.time + 1;
          }, 1000);
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

<style>
.counter {
  font-size: var(--font-size-counter);
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
