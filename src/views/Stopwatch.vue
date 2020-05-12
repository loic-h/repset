<template>
  <div class="stopwatch container">
    <div class="section">
      <header-vue>
        <template v-slot:left>
          <button @click="onBackClick">
            <sprite id="back" />
          </button>
        </template>
        <template v-slot:headline>
          <sprite id="watch-light" />
        </template>
        <template v-slot:right>
          <button @click="onResetClick">
            <sprite id="reset" />
          </button>
        </template>
      </header-vue>
    </div>
    <div class="section">
      <main-content class="content">
        <clock
          class="clock"
          :active="isRunning"
          :start-time="startTime"
          :offset-time="offsetTime" />
      </main-content>
    </div>
    <div class="section">
      <actions class="actions">
        <action
          v-if="isRunning"
          :handler="onPauseClick">
          <sprite id="pause" :modifiers="['big']" />
        </action>
        <action
          v-else
          :handler="onPlayClick">
          <sprite id="play" :modifiers="['big']" />
        </action>
      </actions>
    </div>
  </div>
</template>

<script>
import Clock from "@/components/clocks/stopwatch";
import MainContent from "@/components/main-content";
import Actions from "@/components/actions";
import Action from "@/components/action";
import Sprite from "@/components/sprite";
import Header from "@/components/header";
import "../../public/sprites/watch-light.svg";
import "../../public/sprites/back.svg";
import "../../public/sprites/reset.svg";
import "../../public/sprites/play.svg";
import "../../public/sprites/pause.svg";

const ID = "stopwatch";

export default {
  components: {
    Clock,
    Actions,
    Action,
    MainContent,
    Sprite,
    HeaderVue: Header
  },
  computed: {
    timer() {
      return this.$store.getters["timers/getTimerById"](ID);
    },
    isRunning() {
      return this.timer.running;
    },
    startTime() {
      return this.timer.startTime;
    },
    offsetTime() {
      return this.timer.offsetTime;
    }
  },
  methods: {
    onPlayClick(isActive) {
      this.$store.dispatch("timers/run", ID);
    },
    onPauseClick(isActive) {
      this.$store.dispatch("timers/pause", ID);
    },
    onMenuClick() {
      this.$router.push("/workouts");
    },
    onResetClick() {
      this.$store.dispatch("timers/stop", ID);
    },
    onBackClick() {
      this.$router.push("/");
    }
  },
  created() {
    this.$store.dispatch("timers/create", ID);
  }
};
</script>

<style scoped>
.stopwatch {
  display: flex;
  flex-direction: column;
  width: 100%;
  flex-grow: 1;
  justify-content: space-around;
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

.content {
  display: flex;
  align-items: center;
  justify-content: center;
}

.clock {
  align-self: stretch;
  display: flex;
  align-items: center;
  justify-content: center;
}

.actions {
  align-items: flex-end;
  justify-content: center;
  padding-bottom: 2rem;
  box-sizing: border-box;
}
</style>
