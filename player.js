class Player {
  constructor(playerId, playerToken) {
    this.playerId = playerId;
    this.playerToken = playerToken;
    this.winCount = 0;
    this.wins = [];
  }

  saveWinsToStorage(playerId) {
    // getPlayerFromStorage()
    // this.winCount++
    // stringify it
    // put it back in localStorage
  }

  getWinsFromStorage(playerId) {
    // getPlayerFromStorage()
    // return this.winCount
  }

  getPlayerFromStorage(playerId) {
    // get player array from localStorage by playerId
    // JSON.parse it
  }
}

class Game {
  constructor(placement) {
    // playerOne = new Player(playerOne, playerToken)
    // playerTwo = new Player(playerTwo, playerToken)
    // placement = where on board {a: null, b: null, c: null, d: null,
    //   e: null, f: null, g: null, h: null, i: null}
    // playerOneTurn = true
    // turnCount = 0
    // gameOver = false
  }

  checkForWin(turnCount, event) {
    // if turnCount > 4
    // if the event.target was *space*
    // call win checkers
  }
}