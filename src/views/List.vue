<template>
  <div class="list">
    <main-content :modifiers="['no-top-padding']">
      <link-list
        class="link-list"
        :items="linkList" />
    </main-content>
    <actions>
      <action
        label="Back"
        :handler="onMenuBackClick" />
      <action
        label="Add"
        :handler="onAddClick" />
    </actions>
  </div>
</template>

<script>
import Actions from "@/components/actions";
import Action from "@/components/action";
import LinkList from "@/components/link-list";
import MainContent from "@/components/main-content";

export default {
  components: {
    LinkList,
    MainContent,
    Actions,
    Action
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
  flex-grow: 1;
}

.link-list {
  flex-grow: 1;
  align-self: stretch;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
