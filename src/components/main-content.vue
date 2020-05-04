<template>
  <main :class="className">
    <slot />
  </main>
</template>

<script>
export default {
  props: {
    modifiers: { type: Array, default: () => [] }
  },
  computed: {
    className() {
      return ["main-content"].concat(this.modifiers).join(" ");
    }
  }
}
</script>

<style scoped>
.main-content {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  box-sizing: border-box;
  padding-left: 1rem;
  padding-right: 1rem;
}
</style>
