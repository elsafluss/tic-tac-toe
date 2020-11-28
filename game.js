class Game {
  constructor() {
    this.brd = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "x"];
    this.turnCount = 0;
    this.gameOver = false;
    this.isDraw = false;
    this.players = [];
  }

  resetGame(currGame, playerOne, playerTwo, currentPlayer) {
    currGame.brd = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "x"]
    this.updatePlayers(currGame, playerOne, playerTwo)
    currGame.turnCount = 0
    setTimeout(function () {
      resetBoardDisplay()
    }, 1500)
  }

  updatePlayers(currGame, playerOne, playerTwo) {
    let currentPlayerName = playerOne.playerName
    currGame.playerOneTurn = true
    currGame.players[0] = playerOne
    currGame.players[1] = playerTwo
  }

  setPlayerElements(currGame, placement, player) {
    let currentPlayerName = player.playerName
    let square = currGame.brd.indexOf(placement)
    currGame.brd[square] = currentPlayerName
    let currentPlayer = player
    return currentPlayer
  }

  isItPlayerOnesTurn(currGame) {
    return (this.turnCount % 2 === 0)
  }

  checkForWin(currGame, placement) {
    let winConds = [
      [currGame.brd[0], currGame.brd[1], currGame.brd[2]],
      [currGame.brd[3], currGame.brd[4], currGame.brd[5]],
      [currGame.brd[6], currGame.brd[7], currGame.brd[8]],
      [currGame.brd[0], currGame.brd[3], currGame.brd[6]],
      [currGame.brd[1], currGame.brd[4], currGame.brd[7]],
      [currGame.brd[2], currGame.brd[5], currGame.brd[8]],
      [currGame.brd[0], currGame.brd[4], currGame.brd[8]],
      [currGame.brd[2], currGame.brd[4], currGame.brd[6]],
    ]
    if (!currGame.gameOver) {
      this.checkRows(winConds)
      this.checkColumns(winConds)
      this.checkDiagonals(winConds)
      this.checkForDraw(currGame)
    }
  }

  checkForDraw(currGame) {
    if (currGame.turnCount > 8) {
      currGame.gameOver = true
      currGame.isDraw = true
      return currGame.isDraw
    } else {
      currGame.isDraw = false
    }
  }

  checkRows(winConds) {
    if (winConds[0][0] === winConds[0][1] && winConds[0][0] === winConds[0][2]) {
      currGame.gameOver = true
    } else if (winConds[1][0] === winConds[1][1] && winConds[1][0] === winConds[1][2]) {
      currGame.gameOver = true
    } else if (winConds[2][0] === winConds[2][1] && winConds[2][0] === winConds[2][2]) {
      currGame.gameOver = true
    }
  }

  checkColumns(winConds) {
    if (winConds[3][0] === winConds[3][1] && winConds[3][0] === winConds[3][2]) {
      currGame.gameOver = true
    } else if (winConds[4][0] === winConds[4][1] && winConds[4][0] === winConds[4][2]) {
      currGame.gameOver = true
    } else if (winConds[5][0] === winConds[5][1] && winConds[5][0] === winConds[5][2]) {
      currGame.gameOver = true
    }
  }

  checkDiagonals(winConds) {
    if (winConds[6][0] === winConds[6][1] && winConds[6][0] === winConds[6][2]) {
      currGame.gameOver = true
    } else if (winConds[7][0] === winConds[7][1] && winConds[7][0] === winConds[7][2]) {
      currGame.gameOver = true
    }
  }
}