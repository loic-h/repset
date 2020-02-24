<template>
  <div class="list">
    <link-list :items="linkList" />
    <remote
      v-slot:remote
      left="back"
      @left-click="onMenuBackClick"
      main="add"
      @main-click="onAddClick" />
  </div>
</template>

<script>
import Remote from "@/components/remote";
import LinkList from "@/components/link-list";

export default {
  components: {
    Remote,
    LinkList
  },
  computed: {
    linkList() {
      const list = [
        {
          path: "/stopwatch",
          label: "Stopwatch"
        },
        ...this.$store.getters["workouts/sets"].map(set => ({
          ...set,
          path: `/workouts/${set.id}/edit`
        }))
      ];
      return list;
    }
  },
  methods: {
    onAddClick() {
      this.$router.push("/create");
    },
    onMenuBackClick() {
      this.$router.go(-1);
    }
  }
}
</script>

<style>
.list {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}
</style>
