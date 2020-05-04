<template>
  <div class="home">
    <main-content
      class="content"
      :modifiers="['no-top-padding']">
      <h1>RepSet</h1>
      <router-link class="watch-link" to="/stopwatch">
        <sprite id="watch" />
      </router-link>
      <h2>Workouts</h2>
      <router-link class="add-link" to="/create">
        <sprite id="add" />
      </router-link>
      <workout-list
        class="link-list container"
        :items="linkList" />
    </main-content>
  </div>
</template>

<script>
import WorkoutList from "@/components/workout-list";
import MainContent from "@/components/main-content";
import Sprite from "@/components/sprite";
import "../../public/sprites/add.svg";
import "../../public/sprites/watch.svg";

export default {
  components: {
    WorkoutList,
    MainContent,
    Sprite
  },
  computed: {
    linkList() {
      const list = this.$store.getters["workouts/sets"].map(set => ({
        ...set,
        path: `/workouts/${set.id}`,
        repetitions: this.$store.getters["workouts/getFlatRepetitions"](set.id)
      }));
      return list;
    }
  },
  methods: {
    onAddClick() {
      this.$router.push("/create");
    }
  }
}
</script>

<style scoped>
.home {
  padding-top: 5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
  width: 100%;
  flex-grow: 1;
}

.content {
  align-items: center;
}

h1 {
  margin-bottom: 2rem;
}

.watch-link {
  margin-bottom: 2rem;
}

h2 {
  margin-bottom: 1rem;
}

.add-link {
  margin-bottom: 1rem;
}

.link-list {
  flex-grow: 1;
  align-self: stretch;
}
</style>
