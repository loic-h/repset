<template>
  <ul
    class="link-list"
    v-if="items.length > 0">
    <li
      v-for="item in items"
      :key="item.path">
      <router-link
        class="item link"
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
