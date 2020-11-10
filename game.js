class Game {
  constructor() {
    this.board = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "x"];
    this.turnCount = 0;
    this.gameOver = false;
    this.isDraw = false;
    this.players = [];
  }

  resetGame(currentGame, playerOne, playerTwo, currentPlayer) {
    currentGame.board = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "x"]
    var currentPlayerName = playerOne.playerName
    currentGame.turnCount = 0
    currentGame.playerOneTurn = true
    var timeOut = setTimeout(function () {
      resetBoardDisplay()
    }, 1500)
    currentGame.players[0] = playerOne
    currentGame.players[1] = playerTwo
  }

  setPlayerElements(currentGame, placement, player) {
    var currentPlayerName = player.playerName
    var square = currentGame.board.indexOf(placement)
    currentGame.board[square] = currentPlayerName
    var currentPlayer = player
    return currentPlayer
  }

  isItPlayerOnesTurn(currentGame) {
    return (this.turnCount % 2 === 0)
  }

  checkForWin(currentGame, placement) {
    var winConds = []
    winConds[0] = [currentGame.board[0], currentGame.board[1], currentGame.board[2]]
    winConds[1] = [currentGame.board[3], currentGame.board[4], currentGame.board[5]]
    winConds[2] = [currentGame.board[6], currentGame.board[7], currentGame.board[8]]
    winConds[3] = [currentGame.board[0], currentGame.board[3], currentGame.board[6]]
    winConds[4] = [currentGame.board[1], currentGame.board[4], currentGame.board[7]]
    winConds[5] = [currentGame.board[2], currentGame.board[5], currentGame.board[8]]
    winConds[6] = [currentGame.board[0], currentGame.board[4], currentGame.board[8]]
    winConds[7] = [currentGame.board[2], currentGame.board[4], currentGame.board[6]]
    if (!currentGame.gameOver) {
      if (winConds[0][0] === winConds[0][1] && winConds[0][0] === winConds[0][2]) {
        // row one
        currentGame.gameOver = true
      } else if (winConds[1][0] === winConds[1][1] && winConds[1][0] === winConds[1][2]) {
        // row two
        currentGame.gameOver = true
      } else if (winConds[2][0] === winConds[2][1] && winConds[2][0] === winConds[2][2]) {
        // row three
        currentGame.gameOver = true
      } else if (winConds[3][0] === winConds[3][1] && winConds[3][0] === winConds[3][2]) {
        // column one
        currentGame.gameOver = true
      } else if (winConds[4][0] === winConds[4][1] && winConds[4][0] === winConds[4][2]) {
        // column two
        currentGame.gameOver = true
      } else if (winConds[5][0] === winConds[5][1] && winConds[5][0] === winConds[5][2]) {
        // column three
        currentGame.gameOver = true
      } else if (winConds[6][0] === winConds[6][1] && winConds[6][0] === winConds[6][2]) {
        // diagonal to right
        currentGame.gameOver = true
      } else if (winConds[7][0] === winConds[7][1] && winConds[7][0] === winConds[7][2]) {
        // diagonal to left
        currentGame.gameOver = true
      } else if (currentGame.turnCount > 8) {
        currentGame.gameOver = true
        currentGame.isDraw = true
        return currentGame.isDraw
      }
    }
  }
}