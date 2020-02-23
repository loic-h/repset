<template>
  <button
    @click="onClick">
    <vue-material-icon
      :name="icon"
      :size="iconSize" />
  </button>
</template>

<script>
export default {
  props: {
    type: { type: String, required: true },
    size: { type: String, default: "small" }
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
        case "more":
          return "more_horiz";
        case "add":
          return "add_circle";
        case "back":
          return "arrow_back";
        default:
          return this.main;
      }
    },
    iconSize() {
      if (this.size === "big") {
        return 64;
      }
      return 32;
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
