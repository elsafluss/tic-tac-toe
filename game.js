class Game {
  constructor(placement) {
    this.board = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "x"];
    this.turnCount = 0;
    this.gameOver = false;
    this.isDraw = false;
    this.players = [];
  }
}