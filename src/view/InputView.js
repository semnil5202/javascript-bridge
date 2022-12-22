const { Console } = require('@woowacourse/mission-utils');
const { INPUT } = require('../utils/constant');

/**
 * 사용자로부터 입력을 받는 역할을 한다.
 */
const InputView = {
  /**
   * 다리의 길이를 입력받는다.
   * @param {string} 사용자 입력 안내문
   * @param {function()} 사용자 입력을 받은 후 실행할 콜백 함수
   */
  readBridgeSize(callback) {
    Console.readLine(INPUT.BRIDGE_SIZE, callback);
  },

  /**
   * 사용자가 이동할 칸을 입력받는다.
   * @param {string} 사용자 입력 안내문
   * @param {function()} 사용자 입력을 받은 후 실행할 콜백 함수
   */
  readMoving(callback) {
    Console.readLine(INPUT.CHOOSE_BLOCK, callback);
  },

  /**
   * 사용자가 게임을 다시 시도할지 종료할지 여부를 입력받는다.
   * @param {string} 사용자 입력 안내문
   * @param {function()} 사용자 입력을 받은 후 실행할 콜백 함수
   */
  readGameCommand(callback) {
    Console.readLine(INPUT.RESTART, callback);
  },

  /**
   * 사용자 입력을 종료한다.
   */
  closeRead() {
    Console.close();
  },
};

module.exports = InputView;
