<template>
  <ul v-if="items.length > 0">
    <li
      v-for="item in items"
      :key="item.path">
      <router-link
        class="link"
        active-class="is-active"
        :to="item.path"
        v-html="item.label" />
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    items: { type: Array }
  }
};
</script>

<style scoped>
ul {
  text-align: center;
}

ul li:not(:last-child) {
  margin-bottom: var(--space);
}
</style>
