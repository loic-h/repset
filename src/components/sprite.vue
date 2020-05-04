<template>
  <svg
    :class="className"
    :viewBox="viewBox">
    <use :xlink:href="href" />
  </svg>
</template>

<script>
export default {
  props: {
    id: { type: String, required: true },
    modifiers: { type: Array, default: () => [] }
  },
  computed: {
    href() {
      return `#${this.id}`;
    },
    className() {
      return [
        "sprite",
        ...this.id.split("/"),
        ...this.modifiers
      ]
    },
    viewBox() {
      const el = document.getElementById(this.id);
      if (!el) {
        return;
      }
      return el.getAttribute("viewBox");
    }
  }
};
</script>

<style scoped>
.sprite {
  fill: currentColor;
  width: 1.5rem;
}

.big {
  width: 3.75rem;
}
</style>
