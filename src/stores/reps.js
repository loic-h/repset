export default {
  debug: true,
  state: {
    items: {
      "3631819238": {
        label: "Yo"
      }
    }
  },
  create() {
    const id = UID();
    this.state.items[id] = {
      label: "Workout"
    };
    return id;
  },
  delete(id) {
    delete this.state.items[id];
  },
  update(id, params) {
    const item = { ...this.state.items[id] };
    this.state.items[id] = {
      ...item,
      ...params
    };
  }
};

const UID = () => {
  var array = new Uint32Array(1);
  window.crypto.getRandomValues(array);
  return array[0];
}
