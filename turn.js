class Turn {
  constructor(currentGame, currentWins, playerOne, playerTwo, placement, isPlayerOneTurn) {
    this.currentGame = currentGame;
    this.currentWins = currentWins;
    this.playerOne = playerOne;
    this.playerTwo = playerTwo;
    this.placement = placement;
    this.isPlayerOneTurn = currentGame.isPlayerOneTurn();
  }

  wholeTurn(event) {
    event.target.disabled = true
    var savedWins = tempPlayer.getWinsFromStorage("currentWins")
    this.currentGame.turnCount++
    this.oneMove(event)
    updateCurrentPlayerDisplay()
    this.currentGame.checkForWin(currentGame, this.currentPlayer, this.placement)
    tempPlayer.saveWinsToStorage(this.currentWins)
    if (currentGame.gameOver) {
      resetTopWinsDisplay(this.currentPlayer)
      turnOffButtons()
      debugger
      updateTopWinsDisplay(this.isPlayerOneTurn, currentGame)
      currentGame.gameOver = false;
      updateWins(currentGame, this.currentPlayer, this.playerOne, this.playerTwo, this.currentWins)
      currentGame.resetGame(currentGame, this.playerOne, this.playerTwo, this.currentPlayer)
    }
  }

  oneMove(event) {
    if (this.isPlayerOneTurn) {
      placeP1Token(event)
      var currentPlayer = currentGame.setPlayerElements(currentGame, this.placement, this.playerOne)
    } else {
      placeP2Token(event)
      var currentPlayer = currentGame.setPlayerElements(currentGame, this.placement, this.playerTwo)
    }
    return currentPlayer
  }
}