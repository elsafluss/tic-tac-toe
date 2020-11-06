class Game {
  constructor(placement) {
    this.board = {
      a: null,
      b: null,
      c: null,
      d: null,
      e: null,
      f: null,
      g: null,
      h: null,
      i: null,
      x: null,
    };
    this.winConds = [
      [this.board.a, this.board.b, this.board.c],
      [this.board.d, this.board.e, this.board.f],
      [this.board.g, this.board.h, this.board.i],
      [this.board.a, this.board.d, this.board.g],
      [this.board.b, this.board.e, this.board.h],
      [this.board.c, this.board.f, this.board.i],
      [this.board.a, this.board.e, this.board.i],
      [this.board.c, this.board.e, this.board.g],
    ];
    this.playerOneTurn = true;
    this.turnCount = 0;
    this.gameOver = false;
    this.players = [];
  }

  saveToStorage(currentGame) {
    var saveThisGame = JSON.stringify(currentGame)
    localStorage.setItem("currentGame", saveThisGame)
  }

  getGameFromStorage(currentGame) {
    console.log(localStorage)
    var savedGame = localStorage.getItem("currentGame")
    JSON.parse(savedGame)
  }

  checkForWin() {
    for (var i = 0; i < winConds.length; i++) {
      if (winConds[i][0] === winConds[i][1] && winConds[i][1] === winConds[i][2]) {
        // save i to player's wins array
        return true
      }
    }
  }

  updateWins() {

  }

  resetGame() {

  }
}