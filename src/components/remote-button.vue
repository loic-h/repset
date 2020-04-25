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
    size: { type: String, default: "small" },
    active: { type: Boolean, default: false }
  },
  data() {
    return {
      localActive: this.active
    };
  },
  computed: {
    icon() {
      switch (this.type) {
        case "play":
          return this.localActive ? "pause_circle_filled" : "play_circle_filled";
        case "more":
          return "more_horiz";
        case "add":
          return "add_circle";
        case "back":
          return "arrow_back";
        case "delete":
          return "delete";
        case "reset":
          return "replay"
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
  watch: {
    active(value) {
      this.localActive = value;
    }
  },
  methods: {
    onClick() {
      this.localActive = !this.localActive;
      this.$emit("click", this.localActive);
    }
  }
};
</script>
