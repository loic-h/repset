<template>
  <actions class="actions">
    <action
      v-if="isRunning"
      :handler="onPauseClick">
      <sprite id="pause" :modifiers="['big']" />
    </action>
    <action
      v-else
      :handler="onPlayClick">
      <sprite id="play" :modifiers="['big']" />
    </action>
  </actions>
</template>

<script>
import Actions from "@/components/actions";
import Action from "@/components/action";
import Sprite from "@/components/sprite";
import "@/../public/sprites/play.svg";
import "@/../public/sprites/pause.svg";

export default {
  components: {
    Sprite,
    Actions,
    Action
  },
  computed: {
    isRunning() {
      return this.$store.getters["timers/isCurrentRunning"]();
    }
  },
  methods: {
    onPlayClick() {
      this.$store.dispatch("timers/currentWorkoutRun");
    },
    onPauseClick() {
      this.$store.dispatch("timers/currentWorkoutPause");
    }
  }
}
</script>
