<template>
  <header-vue v-if="id">
    <template v-slot:left>
      <button @click="onBackClick">
        <sprite id="back" />
      </button>
    </template>
    <template v-slot:headline>
      {{ item.label }}
    </template>
    <template v-slot:right>
      <button @click="onResetClick">
        <sprite id="reset" />
      </button>
    </template>
  </header-vue>
</template>

<script>
import Header from "@/components/header";
import Sprite from "@/components/sprite";
import "@/../public/sprites/back.svg";
import "@/../public/sprites/reset.svg";

export default {
  components: {
    HeaderVue: Header,
    Sprite
  },
  computed: {
    id() {
      return this.$store.state.timers.displayed;
    },
    item() {
      return this.$store.getters["workouts/getWorkoutById"](this.id);
    },
    isRunning() {
      return this.$store.getters["timers/isRunning"](this.id);
    }
  },
  methods:{
    onBackClick() {
      if (this.isRunning) {
        this.$router.push("/");
      } else {
        this.$router.push(`/workouts/${this.id}`);
      }
    },
    onResetClick() {
      this.$store.dispatch("timers/stop", this.id);
    }
  }
}
</script>
