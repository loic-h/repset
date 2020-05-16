const START_PAYLOAD = {
  startTime: null,
  offsetTime: 0,
  running: false
};

const COUNTDOWN_DURATION = 5000;

const state = {
  items: [],
  countdown: false,
  displayed: null
};

const getters = {
  getTimerById: state => id => {
    return state.items.find(item => item.id === id);
  },
  getIndexById: state => id => {
    return state.items.findIndex(item => item.id === id);
  },
  getTimerTime: (state, getters) => id => {
    const timer = getters.getTimerById(id);
    if (!timer || !timer.startTime) {
      return 0;
    }
    if (timer.running) {
      return timer.offsetTime + Date.now() - timer.startTime;
    } else {

      return timer.offsetTime;
    }
  },
  isRunning: (state, getters) => id => {
    const timer = getters.getTimerById(id);
    if (timer) {
      return timer.running;
    }
    return false;
  },
  isCurrentRunning: (state, getters) => () => {
    const id = state.displayed;
    return (getters.isReset(id) && state.countdown) || getters.isRunning(id);
  },
  isReset: (state, getters) => id => {
    const timer = getters.getTimerById(id);
    if (timer) {
      return !timer.startTime && !timer.running;
    }
    return true;
  }
};

const mutations = {
  create(state, id) {
    state.items.push({
      ...START_PAYLOAD,
      id
    });
  },
  run(state, index) {
    state.items.splice(index, 1, {
      ...state.items[index],
      startTime: Date.now(),
      running: true
    });
  },
  pause(state, index) {
    const now = Date.now();
    state.items.splice(index, 1, {
      ...state.items[index],
      startTime: now,
      offsetTime: state.items[index].offsetTime + now - state.items[index].startTime,
      running: false
    });
  },
  stop(state, index) {
    state.items.splice(index, 1, {
      ...state.items[index],
      startTime: null,
      offsetTime: 0,
      running: false
    });
  },
  display(state, id) {
    state.displayed = id;
  },
  countdown(state, value) {
    state.countdown = value;
  }
};

const actions = {
  create({ commit, getters }, id) {
    if (getters.getIndexById(id) < 0) {
      commit("create", id);
    }
  },
  run({ commit, dispatch, getters }, id) {
    const index = getters.getIndexById(id);
    dispatch("create", id);
    commit("run", index);
  },
  pause({ commit,dispatch, getters }, id) {
    const index = getters.getIndexById(id);
    dispatch("create", id);
    commit("pause", index);
  },
  stop({ commit, dispatch, getters }, id) {
    const index = getters.getIndexById(id);
    dispatch("create", id);
    commit("stop", index);
    commit("countdown", false);
  },
  currentWorkoutRun({ commit, dispatch, getters, state }) {
    const id = state.displayed;
    if (getters.isReset(id)) {
      commit("countdown", true);
    } else {
      dispatch("run", id);
    }
  },
  currentWorkoutPause({ commit, dispatch, getters, state }) {
    const id = state.displayed;
    if (getters.isReset(id)) {
      commit("countdown", false);
    } else {
      dispatch("pause", id);
    }
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
