<template>
  <div class="repetition"
    v-touch:swipe.left="onLeftSwipe"
    v-touch:swipe.right="onRightSwipe">
    <div :class="{
      'inner': true,
      'is-swiped': swiped
    }">
      <ul class="span-list">
        <li
          v-for="(item, index) in items"
          :key="index"
          class="span">
          <span class="time">
            <counter
              :time="item.duration"
              @change="value => onTimeUpdate(value, index)" />
          </span>
          <span class="label">
            {{ item.label }}
          </span>
        </li>
      </ul>
      <span class="repeat">
        × {{ repeat }}
      </span>
    </div>
    <button class="delete" @click="onDeleteClick">
      <sprite id="close" />
    </button>
  </div>
</template>

<script>
import Counter from "./counter";
import Sprite from "./sprite";
import "../../public/sprites/close.svg";

export default {
  components: {
    Counter,
    Sprite
  },
  props: {
    id: { type: String, default: "" },
    repeat: { type: Number, default: 0 },
    items: { type: Array, default: () => [] }
  },
  data() {
    return {
      swiped: false
    };
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
      }, this.id);
    },
    onRepeatUpdate(value) {
      this.$emit("change", {
        repeat: parseInt(value),
        items: this.items
      }, this.id);
    },
    onDeleteClick() {
      this.$emit("delete", this.id);
    },
    onLeftSwipe() {
      this.swiped = true;
    },
    onRightSwipe() {
      this.swiped = false;
    }
  }
};
</script>

<style scoped>
.repetition {
  position: relative;
  margin-bottom: 2rem;
}

.inner {
  position: relative;
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  border-radius: var(--span-border-radius);
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.25);
  padding: 1rem;
  transition: transform 0.1s ease-in-out;
  background: var(--white);
  z-index: 2;
}

.is-swiped {
  transform: translateX(-3rem);
}

.span-list {
  flex-grow: 1;
}

.span {
  display: flex;
  align-items: baseline;
}

.span:not(:last-child) {
  margin-bottom: 1rem;
}

.time {
  margin-right: 1rem;
  font-size: var(--font-size-counter);
}

.repeat {
  display: flex;
  font-size: var(--font-size-repeat);
}

.delete {
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  z-index: 1;
}
</style>
