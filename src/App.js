const GameController = require('./controller/GameController');
const BridgeGame = require('./service/BridgeGame');

class App {
  play() {
    new GameController(new BridgeGame()).startGame();
  }
}

module.exports = App;
