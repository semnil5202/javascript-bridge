class BridgeRecorder {
  static #instance;
  #up = [];
  #down = [];

  constructor() {
    if (BridgeRecorder.#instance !== undefined) return BridgeRecorder.#instance;
    BridgeRecorder.#instance = this;
  }

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
