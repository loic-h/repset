<template>
  <div class="clock">
    <counter :time="timeInSeconds" />
    <div class="mark"></div>
  </div>
</template>

<script>
import Counter from "@/components/counter";

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
      if (this.active) {
        this.time = Date.now() - this.startTime + this.offsetTime;
        requestAnimationFrame(this.update);
      } else {
        this.time = this.offsetTime;
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
    startTime: {
      handler() {
        this.update();
      },
      immediate: true
    }
  }
};
</script>

<style scoped>
.clock {
  font-size: var(--font-size-clock);
}
</style>
