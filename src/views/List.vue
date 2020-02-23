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
        }
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
