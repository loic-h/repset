<template>
  <div class="stopwatch">
    <navigation />
    <counter
      :active="counterActive"
      :start-time="$store.state.current.startTime"
      :offset-time="$store.state.current.offsetTime" />
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

const ID = "stopwatch";

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
      showMenu: false
    };
  },
  computed: {
    currentId() {
      return this.$store.state.current.id;
    },
    isCurrentRunning() {
      return this.$store.state.current.running;
    },
    counterActive() {
      return this.currentId === ID && this.isCurrentRunning;
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
        this.$store.commit("current/start", ID);
      } else {
        this.$store.commit("current/pause");
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
