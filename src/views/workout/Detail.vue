<template>
  <div class="workout-detail container">
    <template v-if="item">
      <header-vue>
        <template v-slot:left>
          <button @click="onBackClick">
            <sprite id="back" />
          </button>
        </template>
        <template v-slot:headline>
          <input-text
            :value="item.label"
            :edit="true"
            @change="onHeadlineChange" />
        </template>
        <template v-slot:right>
          <button @click="onDeleteClick">
            <sprite id="close" />
          </button>
        </template>
      </header-vue>

      <main-content class="content">
        <div class="repetitions">
          <repetition
            :key="item.id"
            v-for="item in item.repetitions"
            v-bind="item"
            @change="onRepetitionChange"
            @delete="onRepetitionDelete"
            class="repetition" />
        </div>
        <button @click="onAddClick">
          <sprite id="add" />
        </button>
      </main-content>
      <actions>
        <action
          :handler="onRunClick">
          <sprite id="play" :modifiers="['big']" />
        </action>
      </actions>
    </template>
  </div>
</template>

<script>
import Actions from "@/components/actions";
import Action from "@/components/action";
import InputText from "@/components/input-text";
import Repetition from "@/components/repetition";
import MainContent from "@/components/main-content";
import Header from "@/components/header";
import Sprite from "@/components/sprite";
import "../../../public/sprites/back.svg";
import "../../../public/sprites/close.svg";
import "../../../public/sprites/add.svg";
import "../../../public/sprites/play.svg";

export default {
  components: {
    InputText,
    Repetition,
    MainContent,
    Actions,
    Action,
    HeaderVue: Header,
    Sprite
  },
  computed: {
    id() {
      return this.$route.params.id;
    },
    item() {
      const item = this.$store.state.workouts.sets[this.id];
      if (item) {
        return { ...item };
      }
      return null;
    },
    timer() {
      return this.$store.getters["timers/getTimerById"](this.id);
    },
    isRunning() {
      return this.timer.running;
    }
  },
  watch: {
    item: {
      handler(newValue) {
        if (!newValue) {
          this.$router.push("/workouts");
          return;
        }
      },
      immediate: true
    },
    isRunning: {
      handler(value) {
        if (value) {
          this.$router.push(`/workouts/${this.id}/run`);
          return;
        }
      },
      immediate: true
    }
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
    onRunClick() {
      this.$router.push(`/workouts/${this.id}/run`);
    },
    onDeleteClick() {
      this.$store.commit("workouts/delete", this.id);
      this.$router.push("/");
    },
    onAddClick() {
      this.$store.commit("workouts/addRepetition", this.id);
    },
    onRepetitionChange(payload, id) {
      const repetitions = [...this.item.repetitions];
      const index = repetitions.findIndex(a => a.id === payload.id);
      repetitions[index] = payload;
      this.$store.commit("workouts/update", {
        id: this.id,
        params: { repetitions }
      });
    },
    onRepetitionDelete(id) {
      this.$store.commit("workouts/deleteRepetition", {
        setId: this.id,
        id
      });
    }
  }
}
</script>

<style scoped>
.workout-detail {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.content {
  align-items: center;
}

.repetitions {
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: flex-end;
}
</style>
