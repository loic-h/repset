<template>
  <div class="countdown">
    <h2>GET READY</h2>
    <counter :time="time" />
  </div>
</template>

<script>
import Counter from "@/components/counter";

export default {
  components: {
    Counter
  },
  props: {
    total: { type: Number, default: 3000 },
    active: { type: Boolean }
  },
  data() {
    return {
      time: this.total,
      startTime: null,
      offsetTime: 0
    }
  },
  watch: {
    active: {
      handler(value) {
        if (value) {
          this.startTime = Date.now();
        }
        this.update();
      },
      immediate: true
    }
  },
  methods: {
    update() {
      if (this.time <= 0) {
          this.$emit("done");
          return;
        }
      if (this.active) {
        this.passedTime = Date.now() - this.startTime + this.offsetTime;
        requestAnimationFrame(this.update);
      } else {
        this.passedTime = this.offsetTime;
      }
      this.time = this.total - this.passedTime;
    }
  }
}
</script>
