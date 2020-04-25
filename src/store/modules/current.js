const state = {
  id: null,
  startTime: null,
  offsetTime: 0,
  running: false
};

const getters = {};

const actions = {};

const mutations = {
  start(state, id) {
    state.startTime = Date.now();
    state.id = id;
    state.running = true;
  },
  pause(state) {
    const now = Date.now();
    state.offsetTime = state.offsetTime + now - state.startTime;
    state.startTime = now;
    state.running = false;
  },
  stop(state) {
    state.startTime = null;
    state.offsetTime = 0;
    state.running = false;
    state.id = null;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
