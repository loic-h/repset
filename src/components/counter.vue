<template>
  <div class="counter ">
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
    <div class="display" v-else>
      <div class="display-main">
        <span>{{ minutes }}</span>
        <span :class="{ 'blink': isPlaying }">:</span>
        <span>{{ prettySeconds }}</span>
      </div>
      <span v-if="showCentiseconds" class="centiseconds">
        {{ centiSeconds }}
      </span>
    </div>
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
    edit: { type: Boolean, default: false },
    isPlaying: { type: Boolean, default: false },
    showCentiseconds: { type: Boolean, default: false }
  },
  data() {
    return {
      minutes: prettifyTime(0),
      seconds: prettifyTime(0),
      prettySeconds: null
    };
  },
  computed: {
    date() {
      const date = new Date(this.time);
      return new Date(this.time);
    },
    centiSeconds() {
      return prettifyTime(Math.ceil(this.date.getMilliseconds() / 10));
    }
  },
  watch: {
    date: {
      handler(value) {
        this.minutes = this.date.getMinutes();
        this.seconds = this.date.getSeconds();
      },
      immediate: true
    },
    seconds: {
      handler(value) {
        this.prettySeconds = prettifyTime(value);
      },
      immediate: true
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
.counter {
  font-feature-settings: "ss01" 1, "tnum" 1;
  font-variant-ligatures: contextual common-ligatures;
  line-height: 1;
}

input {
  display: inline;
}

.display {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.centiseconds {
  font-size: 0.5em;
  flex-basis: 100%;
}

.blink {
  animation-name: blink;
  animation-duration: 1s;
  animation-iteration-count: infinite;
  animation-timing-function: step-start;
}

@keyframes blink {
  0% {
    opacity: 1
  }
  50% {
    opacity: 0
  }
}
</style>
