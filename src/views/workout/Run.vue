<template>
  <div class="workout-run container">
    <div class="section">
      <workout-run-header />
    </div>
    <div class="section">
      <workout-run-content />
    </div>
    <div class="section">
      <workout-run-actions />
    </div>
  </div>
</template>

<script>
import WorkoutRunHeader from "@/components/workout/run/header";
import WorkoutRunContent from "@/components/workout/run/content";
import WorkoutRunActions from "@/components/workout/run/actions";

export default {
  components: {
    WorkoutRunHeader,
    WorkoutRunContent,
    WorkoutRunActions

  },
  computed: {
    id() {
      return this.$route.params.id;
    }
  },
  created() {
    this.$store.commit("timers/display", this.id);
  },
  destroyed() {
    this.$store.commit("timers/display", null);
  }
}
</script>

<style scoped>
.workout-run {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.section {
  flex-grow: 1;
  flex-basis: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.section:first-child {
  justify-content: flex-start;
}

.section:last-child {
  justify-content: flex-end;
}
</style>
