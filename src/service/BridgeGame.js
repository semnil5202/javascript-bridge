const Bridge = require('../model/Bridege');
const BridgeMaker = require('../BridgeMaker');
const BridgeNumber = require('../BridgeRandomNumberGenerator');

class BridgeGame {
  makeBridge(size) {
    return BridgeMaker.makeBridge(size, BridgeNumber.generate());
  }
}

module.exports = BridgeGame;
