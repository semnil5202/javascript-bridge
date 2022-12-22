const { BRIDGE } = require('../utils/constant');

class BridgeRecorder {
  #up = [];
  #down = [];

  init() {
    this.#up = [];
    this.#down = [];
  }

  recordBridge({ up, down }) {
    this.#up.push(up);
    this.#down.push(down);
    return { up: this.#up, down: this.#down };
  }
}

module.exports = BridgeRecorder;
