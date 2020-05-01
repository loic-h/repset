<template>
  <div class="clock">
    <h2 class="label">
      {{ currentSet.label }}
    </h2>
    <counter :time="timeInSeconds" />
  </div>
</template>

<script>
import Counter from "@/components/counter";

export default {
  components: {
    Counter
  },
  props: {
    sets: { type: Array },
    active: { type: Boolean },
    startTime: { type: Number },
    offsetTime: { type: Number }
  },
  data() {
    return {
      time: 0,
      currentSetIndex: 0,
      passedTime: 0
    }
  },
  computed: {
    currentSet() {
      return this.sets[this.currentSetIndex];
    },
    currentSetDuration() {
      return this.currentSet.duration * 1000;
    },
    timeInSeconds() {
      return parseInt(this.time / 1000);
    }
  },
  watch: {
    active: {
      handler(value) {
        this.update();
      },
      immediate: true
    },
    passedTime: {
      handler(value) {
        let time = 0;
        this.currentSetIndex = this.sets.findIndex(set => {
          time += set.duration;
          return parseInt(value/1000) < time;
        });
      },
      immediate: true
    },
    currentSetIndex: {
      handler(value) {
        const time = this.sets.slice(0, value).reduce((time, set) => {
          return time + set.duration;
        }, 0);
        this.timeOffinishedSets = time * 1000;
      },
      immediate: true
    }
  },
  methods: {
    update() {
      if (!this.startTime) {
        this.time = this.currentSetDuration;
        return;
      }
      if (this.active) {
        this.passedTime = Date.now() - this.startTime + this.offsetTime;
        requestAnimationFrame(this.update);
      } else {
        this.passedTime = this.offsetTime;
      }
      this.time = Math.ceil(this.currentSetDuration - this.passedTime + this.timeOffinishedSets + 1000);
    }
  }
};
</script>

<style scoped>
.clock {
  font-size: var(--font-size-clock);
}

.label {
  font-size: inherit;
  text-align: center;
}
</style>
