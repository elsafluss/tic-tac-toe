class Game {
  constructor(placement) {
    var playerOne = new Player(playerOne, playerToken);
    var playerTwo = new Player(playerTwo, playerToken);
    this.board = {
      a: null,
      b: null,
      c: null,
      d: null,
      e: null,
      f: null,
      g: null,
      h: null,
      i: null
    };
    this.winConds = [
      [board.a, board.b, board.c],
      [board.d, board.e, board.f],
      [board.g, board.h, board.i],
      [board.a, board.d, board.g],
      [board.b, board.e, board.h],
      [board.c, board.f, board.i],
      [board.a, board.e, board.i],
      [board.c, board.e, board.g],
    ];
    this.playerOneTurn = true;
    this.turnCount = 0;
    this.gameOver = false;
  }

  placeToken(turnCount, event) {
    // update this.board with event placement
    if (this.turnCount > 4) {} else {
      console.log("game over, it's a draw")
      resetGame()
    }
  }

  updateWins() {

  }

  checkForWin() {
    for (var i = 0; i < winConds.length; i++) {
      if (winConds[i][0] === winConds[i][1] && winConds[i][1] === winConds[i][2]) {
        // save i to player's wins array
        return true
      }
    }
  }

  resetGame() {

  }

  updateWins() {

  }
}