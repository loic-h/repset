<template>
  <div class="app">
    <div class="app-container">
      <router-view />
    </div>
  </div>
</template>

<script>
import "@/reset.css";
import "@/variables.css";

export default {};
</script>

<style>
.app {
  font-size: var(--font-size-p);
  color: var(--black);
  background-color: var(--bg);
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.app-container {
  max-width: var(--max-width);
  margin: 0 auto;
  box-sizing: border-box;
  position: relative;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  width: 100%;
}
</style>
