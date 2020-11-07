class Game {
  constructor(placement) {
    this.board = {
      a: "",
      b: "",
      c: "",
      d: "",
      e: "",
      f: "",
      g: "",
      h: "",
      i: "",
      x: "",
    };
    this.winConds = [
      ["a", "b", "c"],
      ["d", "e", "f"],
      ["g", "h", "i"],
      ["a", "d", "g"],
      ["b", "e", "h"],
      ["c", "f", "i"],
      ["a", "e", "i"],
      ["c", "e", "g"],
    ];
    this.playerOneTurn = true;
    this.turnCount = 0;
    this.gameOver = false;
    this.players = [];
  }

  updateWins() {

  }

  resetGame() {

  }
}