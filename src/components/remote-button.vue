<template>
  <button class="remote-button" @click="onClick">
    <vue-material-icon :name="icon" :size="64"></vue-material-icon>
  </button>
</template>

<script>
export default {
  props: {
    type: { type: String, required: true }
  },
  data() {
    return {
      active: false
    };
  },
  computed: {
    icon() {
      switch (this.type) {
        case "play":
          return this.active ? "pause_circle_filled" : "play_circle_filled";
        default:
          return this.main;
      }
    }
  },
  methods: {
    onClick() {
      this.active = !this.active;
      this.$emit("click", this.active);
    }
  }
};
</script>
