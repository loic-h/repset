<template>
  <div class="remote">
    <div class="remote_place-left"></div>
    <div class="remote_place-center">
      <remote-button
        v-if="main"
        class="remote_main"
        type="play"
        @click="onMainClick"
      />
    </div>
    <div class="remote_place-right"></div>
  </div>
</template>

<script>
import RemoteButton from "./remote-button";
export default {
  props: {
    main: { type: String }
  },
  components: {
    RemoteButton
  },
  methods: {
    onMainClick(active) {
      this.$emit("main-click", active);
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
  justify-content: center;
  color: var(--green);
  padding: var(--space);
  box-sizing: border-box;
}
</style>
