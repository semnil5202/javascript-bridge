const { UTIL, BRIDGE } = require('../utils/constant');

class Bridge {
  #answer;
  #input;

  constructor(answer, input) {
    this.#answer = answer;
    this.#input = input;
  }

  returnBridge() {
    return this.#checkPosition();
  }

  #checkPosition() {
    const input = this.#checkRightInput();
    if (input === UTIL.GO && this.#input === UTIL.UP) return { up: BRIDGE.GO, down: BRIDGE.NULL };
    if (input === UTIL.GO && this.#input === UTIL.DOWN) return { up: BRIDGE.NULL, down: BRIDGE.GO };
    if (input === UTIL.STOP && this.#input === UTIL.UP) {
      return { up: BRIDGE.STOP, down: BRIDGE.NULL };
    }
    if (input === UTIL.STOP && this.#input === UTIL.DOWN) {
      return { up: BRIDGE.NULL, down: BRIDGE.STOP };
    }
  }

  #checkRightInput() {
    if (this.#answer === this.#input) return UTIL.GO;
    return UTIL.STOP;
  }
}

module.exports = Bridge;
