<template>
  <li class="action">
    <button @click="handler">
      <template v-if="label">
      {{ label }}
      </template>
      <slot else />
    </button>
  </li>
</template>

<script>
export default {
  props: {
    handler: { type: Function, default: () => {} },
    label: { type: String, require: true }
  }
};
</script>

<style scoped>
.action {
  margin: 0.5rem;
}
</style>
