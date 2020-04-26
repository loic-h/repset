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
  font-family: "Roboto Condensed", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: var(--font-size-p);
  color: var(--black);
  background-color: var(--bg);
  height: 100%;
}

.app-container {
  max-width: var(--max-width);
  margin: 0 auto;
  height: 100%;
  box-sizing: border-box;
  position: relative;
  display: flex;
  flex-direction: column;
}
</style>
