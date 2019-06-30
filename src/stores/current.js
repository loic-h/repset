export default {
  debug: true,
  name: "current",
  state: {
    id: null,
    startTime: 0,
    offsetTime: 0,
    running: false
  },
  start(id) {
    if (this.debug) {
      console.log("start", id);
    }
    this.state.startTime = Date.now();
    this.state.id = id;
    this.state.running = true;
  },
  pause() {
    if (this.debug) {
      console.log("pause", this.state.id);
    }
    const now = Date.now();
    this.state.offsetTime = this.state.offsetTime + now - this.state.startTime;
    this.state.startTime = now;
    this.state.running = false;
  },
  stop() {
    this.state.id = null;
    this.state.time = null;
    this.state.running = false;
  }
};
