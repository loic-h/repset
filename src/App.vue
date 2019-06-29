<template>
  <div class="app">
    <navigation />
    <router-view />
  </div>
</template>

<script>
import Navigation from "@/components/navigation";
import "@/reset.css";

export default {
  components: {
    navigation: Navigation
  }
};
</script>

<style>
:root {
  --grey: #6f6c77;
  --green: #32db9e;
  --white: #ffffff;
  --bg-color: var(--grey);
}

.app {
  font-family: "Roboto Condensed", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: white;
  background-color: var(--bg-color);
  height: 100%;
}
</style>
