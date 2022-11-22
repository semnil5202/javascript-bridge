const OutputView = require('./OutputView');
const InputView = require('./InputView');
const BridgeMaker = require('./BridgeMaker');
const BridgeNumber = require('./BridgeRandomNumberGenerator');
const BridgeRecorder = require('./BridgeRecorder');
const { UTIL, INPUT } = require('./constant/constant');

/**
 * 다리 건너기 게임을 관리하는 클래스
 */
class BridgeGame {
  #turn;
  #tries;
  #isPlay;
  #isSuccess;
  #answers;
  #bridgeRecords;

  constructor() {
    this.#turn = UTIL.INIT;
    this.#tries = UTIL.FIRST;
    this.#isPlay = true;
    this.#isSuccess = false;
    this.#bridgeRecords = new BridgeRecorder([], []);
  }

  startGame() {
    OutputView.startMent();
    this.inputBridgeLength();
  }

  inputBridgeLength() {
    const bridgeLength = (input) => {
      OutputView.newLine();
      this.#answers = BridgeMaker.makeBridge(input, BridgeNumber.generate);
      this.inputMoving();
    };
    InputView.readBridgeSize(INPUT.BRIDGE_SIZE, bridgeLength);
  }

  inputMoving() {
    const moving = (input) => {
      this.move(input);
      if (this.#isSuccess) this.clearGame();
      if (!this.#isSuccess && this.#isPlay) this.inputMoving();
      if (!this.#isSuccess && !this.#isPlay) this.inputReGame();
    };
    InputView.readMoving(INPUT.CHOOSE_BLOCK, moving);
  }

  inputReGame() {
    const reGame = (input) => {
      if (input === UTIL.RETRY) this.retry();
      if (input === UTIL.QUIT) this.giveupGame();
    };
    InputView.readMoving(INPUT.RESTART, reGame);
  }

  /**
   * 사용자가 칸을 이동할 때 사용하는 메서드
   * <p>
   * 이동을 위해 필요한 메서드의 반환 값(return value), 인자(parameter)는 자유롭게 추가하거나 변경할 수 있다.
   */
  move(input) {
    const crossable = this.#answers[this.#turn];
    this.#turn += 1;
    this.isCorrect(input, crossable);
  }

  isCorrect(input, crossable) {
    if (input === crossable) this.isFirst(UTIL.GO, input);
    if (input !== crossable) {
      this.#isPlay = false;
      this.isFirst(UTIL.STOP, input);
    }
    if (input === crossable && this.#turn === this.#answers.length) {
      this.#isSuccess = true;
    }
  }

  isFirst(state, input) {
    if (this.#turn === UTIL.FIRST) this.firstBlock(state, input);
    if (this.#turn !== UTIL.FIRST) this.afterFirstBlock(state, input);
  }

  firstBlock(state, input) {
    if (input === UTIL.UP) {
      const bridgeRecords = this.#bridgeRecords.addFirstUpBlock(state);
      OutputView.printMap(bridgeRecords);
    }
    if (input === UTIL.DOWN) {
      const bridgeRecords = this.#bridgeRecords.addFirstDownBlock(state);
      OutputView.printMap(bridgeRecords);
    }
  }

  afterFirstBlock(state, input) {
    if (input === UTIL.UP) {
      const bridgeRecords = this.#bridgeRecords.addUpBlock(state);
      OutputView.printMap(bridgeRecords);
    }
    if (input === UTIL.DOWN) {
      const bridgeRecords = this.#bridgeRecords.addDownBlock(state);
      OutputView.printMap(bridgeRecords);
    }
  }

  /**
   * 사용자가 게임을 다시 시도할 때 사용하는 메서드
   * <p>
   * 재시작을 위해 필요한 메서드의 반환 값(return value), 인자(parameter)는 자유롭게 추가하거나 변경할 수 있다.
   */
  retry() {
    this.#tries += 1;
    this.#isPlay = true;
    this.init();
    this.inputMoving();
  }

  init() {
    this.#turn = UTIL.INIT;
    this.#bridgeRecords.init();
  }

  clearGame() {
    InputView.closeRead();
    const records = this.#bridgeRecords.getResult();
    OutputView.printResult(UTIL.SUCCESS, this.#tries, records);
  }

  giveupGame() {
    InputView.closeRead();
    const records = this.#bridgeRecords.getResult();
    OutputView.printResult(UTIL.FAIL, this.#tries, records);
  }
}

module.exports = BridgeGame;
