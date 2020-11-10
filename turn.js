class Turn {
  constructor(currentGame, currentWins, playerOne, playerTwo, placement) {
    this.currentGame = currentGame;
    this.currentWins = currentWins;
    this.playerOne = playerOne;
    this.playerTwo = playerTwo;
    this.placement = placement;
    this.isPlayerOneTurn = currentGame.isItPlayerOnesTurn();
  }

  wholeTurn(event) {
    event.target.disabled = true
    this.currentGame.turnCount++
    this.oneMove(event)
    updateCurrentPlayerDisplay()
    this.currentGame.checkForWin(currentGame, this.placement)
    tempPlayer.saveWinsToStorage(this.currentWins)
    resetTopWinsDisplay()
    if (currentGame.gameOver) {
      currentGame.gameOver = false;
      this.updateWins(currentGame)
      currentGame.resetGame(currentGame, this.playerOne, this.playerTwo, this.currentPlayer)
      resetTopWinsDisplay()
      turnOffButtons()
      updateTopWinsDisplay(this.isPlayerOneTurn, currentGame)
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
      var currentPlayer = currentGame.setPlayerElements(currentGame, this.placement, this.playerOne)
      var useThisToken = 'p1'
      placeToken(event, useThisToken)
    } else {
      var currentPlayer = currentGame.setPlayerElements(currentGame, this.placement, this.playerTwo)
      var useThisToken = 'p2'
      placeToken(event, useThisToken)
    }
    return currentPlayer
  }
}