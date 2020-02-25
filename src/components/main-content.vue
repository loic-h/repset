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
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  padding-bottom: var(--content-bottom-padding);
}

.main-content:not(.no-top-padding) {
  padding-top: var(--content-top-padding);
}

</style>
