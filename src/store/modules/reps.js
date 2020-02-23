const state = {
  items: {},
  itemIds: []
};

const getters = {
  itemSet: state => {
    return state.itemIds.map(id => ({
      id,
      ...state.items[id]
    }));
  }
};

const mutations = {
  add(state, payload) {
    const {
      id,
      label
    } = payload;
    state.items[id] = {
      label
    };
    state.itemIds.push(id);
  },
  delete(state, id) {
    delete state.items[id];
  },
  update(state, id, params) {
    const item = { ...state.items[id] };
    state.items[id] = {
      ...item,
      ...params
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
