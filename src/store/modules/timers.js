const state = {
  items: {
    stopwatch: {
      startTime: null,
      offsetTime: 0,
      running: false
    }
  }
};

const getters = {};

const actions = {};

const mutations = {
  run(state, id) {
    state.items[id] = {
      startTime:  Date.now(),
      offsetTime: state.items[id] && state.items[id].offsetTime || 0,
      running: true
    };
  },
  pause(state, id) {
    const now = Date.now();
    const run = state.items[id];
    if (!run) {
      return;
    }
    state.items[id] = {
      startTime:  now,
      offsetTime: run.offsetTime + now - run.startTime,
      running: false
    };
  },
  stop(state, id) {
    state.items[id] = {
      startTime: null,
      offsetTime: 0,
      running: false
    };
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
