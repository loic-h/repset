const DEFAULT_REPETITION = {
  repeat: 3,
  items: [
    {
      label: "WORK!",
      duration: 180000
    },
    {
      label: "REST...",
      duration: 180000
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
  },
  getWorkoutById: state => id => {
    return state.sets[id];
  },
  getFlatRepetitions: (state, getters) => id => {
    const item = getters.getWorkoutById(id);
    let repetitions = [];
    for(let rep of item.repetitions) {
      for (let i = 0; i < rep.repeat; i++) {
        repetitions = repetitions.concat(rep.items);
      }
    }
    return repetitions;
  }
};

const mutations = {
  create(state, payload) {
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
    const index = state.setIds.indexOf(id);
    if (index >= 0) {
      state.setIds.splice(index, 1);
    }
  },
  update(state, payload) {
    const item = { ...state.sets[payload.id] };
    state.sets[payload.id] = {
      ...item,
      ...payload.params
    };
  },
  addRepetition(state, id) {
    const item = { ...state.sets[id] };
    state.sets[id] = {
      ...item,
      repetitions: [
        ...item.repetitions,
        {
          ...DEFAULT_REPETITION,
          id: UID()
        }
      ]
    };
  },
  deleteRepetition(state, payload) {
    const item = { ...state.sets[payload.setId] };
    const index = item.repetitions.findIndex(a => a.id === payload.id);
    item.repetitions.splice(index, 1);
    state.sets[payload.setId] = {
      ...item,
      repetitions: item.repetitions
    };
  }
};

const actions = {
  create({ commit }, payload) {
    const id = UID();
    commit('create', { ...payload, id });
    return id;
  }
};

const UID = () => {
  var array = new Uint32Array(1);
  window.crypto.getRandomValues(array);
  return array[0] + "";
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
