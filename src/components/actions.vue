<template>
  <ul class="actions">
    <slot />
  </ul>
</template>

<style scoped>
.actions {
  position: sticky;
  bottom: 0;
  display: flex;
  justify-content: center;
  background-color: var(--white);
}
</style>
