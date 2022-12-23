const Bridge = require('../model/Bridege');
const BridgeRecorder = require('../model/BridgeRecorder');
const BridgeMaker = require('../BridgeMaker');
const BridgeNumber = require('../BridgeRandomNumberGenerator');
const { UTIL } = require('../utils/constant');

/**
 * 다리 건너기 게임을 관리하는 클래스
 */
class BridgeGame {
  static #instance;
  #answer;
  #turn = 0;

  constructor() {
    if (BridgeGame.#instance !== undefined) return BridgeGame.#instance;
    BridgeGame.#instance = this;
  }

  #initTurn() {
    this.#turn = 0;
  }

  makeBridge(size) {
    this.#answer = BridgeMaker.makeBridge(size, BridgeNumber.generate);
  }

  checkMoving(move) {
    const result = new Bridge(this.#answer[this.#turn], move).sendToDto().getPosition();
    this.#recordBridge(result);
    return this.#move(result);
  }

  #move(result) {
    if (result.up.includes(UTIL.GO) || result.down.includes(UTIL.GO)) {
      this.#turn += 1;
      return true;
    }
    this.#turn = 0;
    return false;
  }

  retry() {
    this.#initTurn();
    this.#initRecordBridge();
  }

  #initRecordBridge() {
    new BridgeRecorder().init();
  }

  getRecordDto() {
    return new BridgeRecorder().sendToDto();
  }

  #recordBridge(result) {
    return new BridgeRecorder().recordBridge(result);
  }

  isSuccessGame() {
    if (this.#answer.length === this.#turn) return true;
    return false;
  }
}

module.exports = BridgeGame;
