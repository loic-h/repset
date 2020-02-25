<template>
  <div class="counter">{{ minutes }}:{{ seconds }}</div>
</template>

<script>
export default {
  props: {
    time: { type: Number, default: 0 } // in seconds
  },
  computed: {
    minutes() {
      return parseInt(this.time / 60);
    },
    seconds() {
      return prettifyTime(this.time % 60);
    }
  }
};

const prettifyTime = time => {
  return `0${time}`.slice(-2);
};
</script>

<style scoped>
.clock {
  font-size: var(--font-size-counter);
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
