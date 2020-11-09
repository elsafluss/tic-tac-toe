class Turn {
  constructor(currentGame, currentWins, playerOne, playerTwo, placement) {
    this.currentGame = currentGame;
    this.currentWins = currentWins;
    this.playerOne = playerOne;
    this.playerTwo = playerTwo;
    this.placement = placement;
  }

  wholeTurn(event) {
    event.target.disabled = true
    var savedWins = tempPlayer.getWinsFromStorage("currentWins")
    this.currentGame.turnCount++
    oneMove(event)
    resetTopWinsDisplay(currentPlayer)
    updateCurrentPlayerDisplay()
    this.currentGame.checkForWin(currentGame, currentPlayer, placement)
    playerOne.saveWinsToStorage(currentWins)
    if (currentGame.gameOver) {
      turnOffButtons()
      updateTopWinsDisplay(currentPlayer, currentGame)
      currentGame.gameOver = false;
      updateWins(currentGame, currentPlayer, playerOne, playerTwo, currentWins)
      currentGame.resetGame(currentGame, playerOne, playerTwo, currentPlayer)
    }
  }

  oneMove(event)
  if (currentGame.isPlayerOneTurn(currentGame)) {
    placeToken(event, this.playerOne)
    var currentPlayer = currentGame.setPlayerElements(currentGame, placement, playerOne)
  } else {
    placeToken(event, playerTwo)
    var currentPlayer = currentGame.setPlayerElements(currentGame, placement, playerTwo)
  }
}