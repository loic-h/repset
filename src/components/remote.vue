<template>
  <div class="remote">
    <div>
      <remote-button
        v-if="left"
        :type="left"
        @click="onLeftClick" />
    </div>
    <div>
      <remote-button
        v-if="main"
        :type="main"
        size="big"
        :active="mainActive"
        @click="onMainClick" />
    </div>
    <div>
      <remote-button
        v-if="right"
        :type="right"
        @click="onRightClick" />
    </div>
  </div>
</template>

<script>
import RemoteButton from "./remote-button";
export default {
  props: {
    left: { type: String },
    main: { type: String },
    right: { type: String },
    mainActive: { type: Boolean }
  },
  components: {
    RemoteButton
  },
  methods: {
    onLeftClick(active) {
      this.$emit("left-click", active);
    },
    onMainClick(active) {
      this.$emit("main-click", active);
    },
    onRightClick(active) {
      this.$emit("right-click", active);
    }
  }
};
</script>

<style scoped>
.remote {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  color: var(--green);
  padding: var(--space);
  box-sizing: border-box;
}

.remote > div {
  flex-basis: 4rem;
  display: flex;
  justify-content: center;
}
</style>
