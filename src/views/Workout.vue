<template>
  <div class="workout">
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
      return this.$store.reps.state.items[this.id];
    }
  },
  components: {
    Remote,
    Headline
  },
  methods: {
    onHeadlineChange(value) {
      this.$store.reps.update(this.id, { label: value });
    },
    onBackClick() {
      this.$router.go(-1);
    },
    onAddClick() {
      console.log("add");
    }
  }
}
</script>
