const { UTIL } = require('../utils/constant');

class Bridge {
  #answer;
  #input;

  constructor(answer, input) {
    this.#answer = answer;
    this.#input = input;
  }

  returnBridge() {
    return this.checkPosition();
  }

  checkPosition() {
    const input = this.checkRightInput();
    if (input === UTIL.GO && this.#input === UTIL.UP) return { up: ' O ', down: '   ' };
    if (input === UTIL.GO && this.#input === UTIL.DOWN) return { up: '   ', down: ' O ' };
    if (input === UTIL.STOP && this.#input === UTIL.UP) return { up: ' X ', down: '   ' };
    if (input === UTIL.STOP && this.#input === UTIL.DOWN) return { up: '   ', down: ' X ' };
  }

  checkRightInput() {
    if (this.#answer === this.#input) return UTIL.GO;
    return UTIL.STOP;
  }
}

module.exports = Bridge;
