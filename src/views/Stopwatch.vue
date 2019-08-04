<template>
  <div class="stopwatch">
    <navigation />
    <counter
      :active="counterActive"
      :start-time="currentStore.startTime"
      :offset-time="currentStore.offsetTime" />
    <remote
      main="play"
      @main-click="onPlayClick"
      right="more"
      @right-click="onMoreClick" />
    <modal v-if="showMenu">
      <link-list :items="linkList" />
      <remote
        v-slot:remote
        left="back"
        @left-click="onMenuBackClick"
        main="add"
        @main-click="onAddClick" />
    </modal>
  </div>
</template>

<script>
import Navigation from "@/components/navigation";
import Counter from "@/components/counter";
import Remote from "@/components/remote";
import Modal from "@/components/modal";
import LinkList from "@/components/link-list";
import currentStore from "@/stores/current";
import repsStore from "@/stores/current";

export default {
  components: {
    Navigation,
    Counter,
    Remote,
    Modal,
    LinkList
  },
  data() {
    return {
      currentStore: currentStore.state,
      repsStore: repsStore.state,
      showMenu: false
    };
  },
  computed: {
    counterActive() {
      return this.currentStore.id === "stopwatch" && this.currentStore.running;
    },
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
    onPlayClick(isActive) {
      if (isActive) {
        currentStore.start("stopwatch");
      } else {
        currentStore.pause();
      }
    },
    onMoreClick() {
      this.showMenu = true;
    },
    onAddClick() {
      this.$router.push("/create");
    },
    onMenuBackClick() {
      this.showMenu = false;
    }
  }
};
</script>

<style>
.stopwatch {
  padding-top: 30vh;
  display: flex;
  justify-content: center;
  width: 100%;
}
</style>
