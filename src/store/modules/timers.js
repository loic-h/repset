const startPayload = {
  startTime: null,
  offsetTime: 0,
  running: false
}

const state = [];

const getters = {
  getTimerById: state => id => {
    return state.find(item => item.id === id);
  },
  getIndexById: state => id => {
    return state.findIndex(item => item.id === id);
  },
  getTimerTime: (state, getters) => id => {
    const timer = getters.getTimerById(id);
    if (!timer || !timer.startTime) {
      return 0;
    }
    if (timer.running) {
      return timer.offsetTime + Date.now() - timer.startTime;
    }
    return timer.offsetTime;
  },
  isRunning: (state, getters) => id => {
    const timer = getters.getTimerById(id);
    if (timer) {
      return timer.running;
    }
    return false;
  }
};

const mutations = {
  create(state, id) {
    state.push({
      ...startPayload,
      id
    });
  },
  run(state, index) {
    state.splice(index, 1, {
      ...state[index],
      startTime: Date.now(),
      running: true
    });
  },
  pause(state, index) {
    const now = Date.now();
    state.splice(index, 1, {
      ...state[index],
      startTime: now,
      offsetTime: state[index].offsetTime + now - state[index].startTime,
      running: false
    });
  },
  stop(state, index) {
    state.splice(index, 1, {
      ...state[index],
      startTime: null,
      offsetTime: 0,
      running: false
    });
  }
};

const actions = {
  create({ commit, getters }, id) {
    if (getters.getIndexById(id) < 0) {
      commit("create", id);
    }
  },
  run({ commit, dispatch, getters }, id) {
    dispatch("create", id);
    commit("run", getters.getIndexById(id));
  },
  pause({ commit, dispatch, getters }, id) {
    dispatch("create", id);
    commit("pause", getters.getIndexById(id));
  },
  stop({ commit, dispatch, getters }, id) {
    dispatch("create", id);
    commit("stop", getters.getIndexById(id));
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
