const state = {
  items: {}
};

const getters = {};

const mutations = {
  add(state, payload) {
    const id = UID();
    const {
      label
    } = payload;
    state.items[id] = {
      label
    };
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
  create({ coomit }, payload) {
    const id = UID();
    commit('add', payload);
    return id;
  }
};

const UID = () => {
  var array = new Uint32Array(1);
  window.crypto.getRandomValues(array);
  return array[0];
}

export default {
  state,
  getters,
  actions,
  mutations
};