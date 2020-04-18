<template>
  <div class="repetition">
    <ul>
      <li
        v-for="(item, index) in items"
        :key="index"
        class="span">
        <span class="label">
          {{ item.label }}
        </span>
        <span class="time">
          <counter
            :time="item.duration"
            @change="value => onTimeUpdate(value, index)"
            :edit="true" />
        </span>
      </li>
    </ul>
    <span class="repeat">
      x
      <input-number
        :value="repeat"
        :edit="true"
        @input="onRepeatUpdate" />
    </span>
  </div>
</template>

<script>
import Counter from "./counter";
import InputNumber from "./input-number";

export default {
  components: {
    Counter,
    InputNumber
  },
  props: {
    index: { type: Number, default: 0 },
    repeat: { type: Number, default: 0 },
    items: { type: Array, default: () => [] }
  },
  methods: {
    onTimeUpdate(value, index) {
      const items = Array.from(this.items);
      items[index] = {
        ...items[index],
        duration: value
      };
      this.$emit("change", {
        repeat: this.repeat,
        items
      }, this.index);
    },
    onRepeatUpdate(value) {
      this.$emit("change", {
        repeat: parseInt(value),
        items: this.items
      }, this.index);
    }
  }
};
</script>

<style scoped>
.repetition {
  position: relative;
  padding: 0.5rem 1rem;
  border-radius: var(--span-border-radius);
  background: var(--span-backgound);
}

.span {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.label {
  font-weight: bold;
  font-style: italic;
}

.time {
  font-size: var(--font-size-counter);
}

.repeat {
  position: absolute;
  left: 50%;
  bottom: 0;
  display: flex;
  transform: translate(-50%, 50%);
  font-size: var(--font-size-repeat);
  border-radius: var(--span-border-radius);
  border: var(--span-backgound) solid 3px;
  background-color: var(--white);
  padding: 0.125rem 0.5rem;
}
</style>
