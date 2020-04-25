<template>
  <div class="counter">
    <div
      class="input"
      v-if="edit">
      <input-number
        :value.sync="minutes"
        :edit="edit"
        @input="onMinutesChange" />
      :
      <input-number
        :value.sync="prettySeconds"
        :edit="edit"
        @blur="onSecondsBlur"
        @input="onSecondsChange" />
    </div>
    <span v-else>
      {{ minutes }}:{{ seconds }}
    </span>
  </div>
</template>

<script>
import InputNumber from "./input-number";

export default {
  components: {
    InputNumber
  },
  props: {
    time: { type: [Number, String], default: 0 },
    edit: { type: Boolean, default: false }
  },
  data() {
    return {
      minutes: Math.floor(this.time / 60),
      seconds: this.time % 60
    };
  },
  watch: {
    time(value) {
      this.minutes = Math.floor(this.time / 60);
      this.seconds = this.time % 60;
    },
    seconds(value) {
      this.prettySeconds = prettifyTime(value);
    }
  },
  methods: {
    onMinutesChange(value) {
      this.minutes = value;
      this.$emit("change", this.getTime());
    },
    onSecondsChange(value) {
      this.seconds = value;
      this.$emit("change", this.getTime());
    },
    onSecondsBlur() {
      this.prettySeconds = prettifyTime(this.seconds)
    },
    getTime() {
      return parseInt(this.minutes) * 60 + parseInt(this.seconds) ;
    }
  }
};

const prettifyTime = time => {
  return `00${time}`.slice(-2);
};
</script>

<style scoped>
.clock {
  font-size: var(--font-size-counter);
  display: flex;
  justify-content: center;
  align-items: center;
}

input {
  display: inline;
}
</style>
