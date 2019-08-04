<template>
  <div class="headline">
    <input
      v-if="edit"
      class="headline_input"
      v-model="localValue" />
    <div
      v-else
      class="headline_label">
      {{ value }}
    </div>
  </div>
</template>

<script>

export default {
  props: {
    value: { type: String, default: "" },
    edit: { type: Boolean, default: false }
  },
  computed: {
    localValue: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("change", value);
      }
    }
  }
};
</script>

<style>
.headline {
  position: absolute;
  top: 0;
  display: flex;
  width: 100%;
  justify-content: center;
  padding: var(--space);
  box-sizing: border-box;
}

.headline_input {
  text-align: center;
  text-decoration: underline;
}
</style>
