<template>
  <div class="input-text">
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
.input {
  text-align: center;
}
</style>
