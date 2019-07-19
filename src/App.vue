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
    Navigation
  }
};
</script>

<style>
.app {
  font-family: "Roboto Condensed", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: var(--font-size-p);
  color: var(--white);
  background-color: var(--bg);
  height: 100%;
}

.app-container {
  max-width: var(--max-width);
  margin: 0 auto;
  height: 100%;
  box-sizing: border-box;
  position: relative;
}
</style>
