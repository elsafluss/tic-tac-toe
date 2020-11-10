class Turn {
  constructor(currentGame, currentWins, playerOne, playerTwo, placement, isPlayerOneTurn) {
    this.currentGame = currentGame;
    this.currentWins = currentWins;
    this.playerOne = playerOne;
    this.playerTwo = playerTwo;
    this.placement = placement;
    this.isPlayerOneTurn = currentGame.isItPlayerOnesTurn();
  }

  wholeTurn(event) {
    resetTopWinsDisplay()
    event.target.disabled = true
    this.currentGame.turnCount++
    this.oneMove(event)
    updateCurrentPlayerDisplay()
    this.currentGame.checkForWin(currentGame, this.currentPlayer, this.placement)
    tempPlayer.saveWinsToStorage(this.currentWins)
    if (currentGame.gameOver) {
      resetTopWinsDisplay()
      turnOffButtons()
      updateTopWinsDisplay(this.isPlayerOneTurn, currentGame)
      currentGame.gameOver = false;
      this.updateWins(currentGame, this.currentPlayer, this.playerOne, this.playerTwo, this.currentWins)
      currentGame.resetGame(currentGame, this.playerOne, this.playerTwo, this.currentPlayer)
    }
  }

  updateWins(currentGame) {
    var currentWins = tempPlayer.getWinsFromStorage("currentWins")
    if (!currentGame.isDraw && this.isPlayerOneTurn) {
      currentWins.playerOneWins++
    } else if (!currentGame.isDraw) {
      currentWins.playerTwoWins++
    }
    currentGame.isDraw = false
    this.playerOne.saveWinsToStorage(currentWins)
    document.querySelector('.player-one-name').innerText = `${currentWins.playerOneWins}`
    document.querySelector('.player-two-name').innerText = `${currentWins.playerTwoWins}`

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