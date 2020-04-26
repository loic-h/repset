import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import timers from "./modules/timers";
import workouts from "./modules/workouts";

Vue.use(Vuex);

const store = new Vuex.Store({
  plugins: [createPersistedState()],
  modules: {
    timers,
    workouts
  },
  strict: true
});

export default store;
