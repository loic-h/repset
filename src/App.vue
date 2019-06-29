<template>
  <div class="app">
    <div class="app-container">
      <navigation />
      <router-view />
    </div>
  </div>
</template>

<script>
import Navigation from "@/components/navigation";
import "@/reset.css";
import "@/variables.css";

export default {
  components: {
    navigation: Navigation
  }
};
</script>

<style>
.app {
  font-family: "Roboto Condensed", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: white;
  background-color: var(--bg-color);
  height: 100%;
}

.app-container {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: var(--space);
  height: 100%;
  box-sizing: border-box;
}
</style>
