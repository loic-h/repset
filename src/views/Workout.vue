<template>
  <div class="workout">
    <div v-if="item">
      <headline
        :value="item.label"
        @change="onHeadlineChange"
        :edit="edit" />
      <remote
        v-slot:remote
        left="back"
        @left-click="onBackClick"
        main="add"
        @main-click="onAddClick" />
    </div>
  </div>
</template>

<script>
import Remote from "@/components/remote";
import Headline from "@/components/headline";

export default {
  props: {
    edit: { type: Boolean, default: false }
  },
  computed: {
    id() {
      return this.$route.params.id;
    },
    item() {
      return this.$store.state.workouts.sets[this.id];
    }
  },
  components: {
    Remote,
    Headline
  },
  methods: {
    onHeadlineChange(value) {
      this.$store.commit("workouts/update", {
        id: this.id,
        params: { label: value }
      });
    },
    onBackClick() {
      this.$router.go(-1);
    },
    onAddClick() {
      console.log("add");
    }
  },
  watch: {
    item: {
      handler(newValue) {
        if (!newValue) {
          this.$router.push("/list");
        }
      },
      immediate: true
    }
  }
}
</script>

<style scoped>
.workout {
  height: 100%;
}
</style>
