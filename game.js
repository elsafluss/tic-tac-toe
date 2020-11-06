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

  getGameFromStorage(currentGame) {
    console.log(localStorage)
    var savedGame = localStorage.getItem("currentGame")
    JSON.parse(savedGame)
  }


  updateWins() {

  }

  resetGame() {

  }
}