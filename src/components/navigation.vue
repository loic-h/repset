<template>
  <nav>
    <router-link to="/stopwatch" class="link">Stopwatch</router-link>
  </nav>
</template>

<script>
export default {
  name: "navigation"
};
</script>

<style scoped>
nav {
  position: absolute;
  top: 0;
  display: flex;
  width: 100%;
  justify-content: center;
  padding: var(--space);
  box-sizing: border-box;
}
</style>
