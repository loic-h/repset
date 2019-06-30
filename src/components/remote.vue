<template>
  <div class="remote">
    <div class="remote_place"></div>
    <div class="remote_place">
      <remote-button
        v-if="main"
        class="remote_main"
        :type="main"
        size="big"
        @click="onMainClick"
      />
    </div>
    <div class="remote_place">
      <remote-button
        v-if="right"
        class="remote_main"
        :type="right"
        @click="onRightClick"
      />
    </div>
  </div>
</template>

<script>
import RemoteButton from "./remote-button";
export default {
  props: {
    main: { type: String },
    right: { type: String }
  },
  components: {
    RemoteButton
  },
  methods: {
    onMainClick(active) {
      this.$emit("main-click", active);
    },
    onRightClick(active) {
      this.$emit("right-click", active);
    }
  }
};
</script>

<style>
.remote {
  position: absolute;
  bottom: 0;
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: var(--green);
  padding: var(--space);
  box-sizing: border-box;
}

.remote_place {
  flex-basis: 4rem;
  display: flex;
  justify-content: center;
}
</style>
