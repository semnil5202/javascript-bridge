const OutputView = require('../view/OutputView');
const InputView = require('../view/InputView');
const Validation = require('../utils/Validation');
const { UTIL } = require('../utils/constant');

class GameController {
  #service;
  #tries = 1;
  #bridges;

  constructor(service) {
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
      const result = this.#service.checkMoving(input);
      const isMove = result.isGo;
      this.#bridges = result.bridges;
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

  #outputMoving() {
    const up = this.#bridges.up.join(',').replace(/,/g, '|');
    const down = this.#bridges.down.join(',').replace(/,/g, '|');
    OutputView.printMap({ up, down });
  }

  #outputResult(success) {
    const up = this.#bridges.up.join(',').replace(/,/g, '|');
    const down = this.#bridges.down.join(',').replace(/,/g, '|');
    OutputView.printResult(up, down, success, this.#tries);
    InputView.closeRead();
  }
}

module.exports = GameController;
