<template>
  <div class="headline">
    <input
      v-if="edit"
      class="input"
      v-model="localValue" />
    <div
      v-else
      class="label">
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

<style scoped>
.headline {
  position: sticky;
  top: 0;
  display: flex;
  width: 100%;
  justify-content: center;
  padding: var(--space);
  box-sizing: border-box;
}

.input {
  text-align: center;
  text-decoration: underline;
}
</style>
