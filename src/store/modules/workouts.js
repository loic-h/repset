const DEFAULT_REPETITION = {
  repeat: 3,
  items: [
    {
      label: "WORK!",
      duration: 180
    },
    {
      label: "REST...",
      duration: 180
    }
  ]
};

const state = {
  sets: {},
  setIds: []
};

const getters = {
  sets: state => {
    return state.setIds.map(id => ({
      id,
      ...state.sets[id]
    }));
  }
};

const mutations = {
  add(state, payload) {
    const {
      id,
      label
    } = payload;
    state.sets[id] = {
      label,
      repetitions: [ DEFAULT_REPETITION ]
    };
    state.setIds.push(id);
  },
  delete(state, id) {
    delete state.sets[id];
  },
  update(state, payload) {
    const item = { ...state.sets[payload.id] };
    state.sets[payload.id] = {
      ...item,
      ...payload.params
    };
  }
};

const actions = {
  create({ commit }, payload) {
    const id = UID();
    commit('add', { ...payload, id });
    return id;
  }
};

const UID = () => {
  var array = new Uint32Array(1);
  window.crypto.getRandomValues(array);
  return array[0];
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
