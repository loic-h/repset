<template>
  <div
    v-if="currentSet"
    class="clock">
    <h2 class="label">
      {{ currentSet.label }}
    </h2>
    <counter
      class="counter"
      :time="time" />
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
      passedTime: 0,
      timeOffinishedSets: 0
    }
  },
  computed: {
    currentSet() {
      return this.sets[this.currentSetIndex];
    },
    currentSetDuration() {
      return this.currentSet ? this.currentSet.duration : 0;
    }
  },
  watch: {
    active: {
      handler(value) {
        this.$nextTick(() => {
          this.update();
        });
      },
      immediate: true
    },
    passedTime: {
      handler(value) {
        let time = 0;
        this.currentSetIndex = this.sets.findIndex(set => {
          time += set.duration;
          return value < time;
        });
      },
      immediate: true
    },
    currentSetIndex: {
      handler(value) {
        const time = this.sets.slice(0, value).reduce((time, set) => {
          return time + set.duration;
        }, 0);
        this.timeOffinishedSets = time;
      }
    },
    startTime(value) {
      this.update();
    }
  },
  methods: {
    update() {
      if (!this.startTime) {
        this.time = this.currentSetDuration;
        return;
      }
      if (this.currentSetIndex < 0) {
          this.time = 0;
          this.$emit("done");
          return;
        }
      if (this.active) {
        this.passedTime = Date.now() - this.startTime + this.offsetTime;
        requestAnimationFrame(this.update);
      } else {
        this.passedTime = this.offsetTime;
      }
      this.time = this.currentSetDuration - this.passedTime + this.timeOffinishedSets;
    }
  }
};
</script>

<style scoped>
.clock {
  text-align: center;
}

.counter {
  font-size: var(--font-size-clock);
}
</style>
