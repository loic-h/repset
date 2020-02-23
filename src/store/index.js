import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import current from "./modules/current";
import reps from "./modules/reps";

Vue.use(Vuex);

const store = new Vuex.Store({
  plugins: [createPersistedState()],
  modules: {
    current,
    reps
  },
  strict: true
});

export default store;
