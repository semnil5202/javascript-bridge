const OutputView = require('../view/OutputView');
const InputView = require('../view/InputView');
const Validation = require('../utils/Validation');
const { UTIL } = require('../utils/constant');

class GameController {
  static #instance;
  #service;
  #tries = 1;

  constructor(service) {
    if (GameController.#instance !== undefined) return GameController.#instance;
    GameController.#instance = this;

    this.#service = service;
  }

  startGame() {
    OutputView.startMent();
    this.#inputBridgeSize();
  }

  #inputBridgeSize() {
    InputView.readBridgeSize((input) => {
      this.#BridgeSzie(Number(input));
    });
  }

  #BridgeSzie(input) {
    try {
      OutputView.newLine();
      Validation.validateSize(input);
      this.#service.makeBridge(input);
      this.#inputMove();
    } catch (error) {
      OutputView.printError(error);
      this.#inputBridgeSize();
    }
  }

  #inputMove() {
    InputView.readMoving((input) => {
      this.#move(input);
    });
  }

  #move(input) {
    try {
      Validation.validateMove(input);
      const isMove = this.#service.checkMoving(input);
      this.#outputMoving();
      this.#keepMoving(isMove);
    } catch (error) {
      OutputView.printError(error);
      this.#inputMove();
    }
  }

  #keepMoving(isMove) {
    if (this.#service.isSuccessGame()) this.#isEndGame();
    if (!this.#service.isSuccessGame() && isMove) this.#inputMove();
    if (!this.#service.isSuccessGame() && !isMove) this.#inputReGame();
  }

  #isEndGame() {
    this.#outputResult(UTIL.SUCCESS);
  }

  #inputReGame() {
    InputView.readGameCommand((input) => {
      this.#reGame(input);
    });
  }

  #reGame(input) {
    try {
      Validation.validateReGame(input);
      this.#keepGaming(input);
    } catch (error) {
      OutputView.printError(error);
      this.#inputReGame();
    }
  }

  #keepGaming(input) {
    if (input === UTIL.RETRY) {
      this.#tries += 1;
      this.#service.initTurn();
      this.#service.initRecordBridge();
      this.#inputMove();
    }
    if (input === UTIL.QUIT) {
      this.#outputResult(UTIL.FAIL);
    }
  }

  outputBridge() {
    const bridge = this.#service.getRecordBridge();
    const up = bridge.up.join(UTIL.SEPARATOR).replace(/,/g, UTIL.TRANSLATOR);
    const down = bridge.down.join(UTIL.SEPARATOR).replace(/,/g, UTIL.TRANSLATOR);
    return { up, down };
  }

  #outputMoving() {
    const { up, down } = this.outputBridge();
    OutputView.printMap({ up, down });
  }

  #outputResult(success) {
    const { up, down } = this.outputBridge();
    OutputView.printResult({ up, down, success, tries: this.#tries });
    InputView.closeRead();
  }
}

module.exports = GameController;
