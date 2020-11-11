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
    resetTopWinsDisplay()
    currentGame.isDraw = false
    event.target.disabled = true
    this.currentGame.turnCount++
    this.oneMove(event)
    if (this.isPlayerOneTurn) {
      toggleCurrentPlayerDisplay("two")
    } else {
      toggleCurrentPlayerDisplay("one")
    }
    this.currentGame.checkForWin(currentGame, this.placement)
    tempPlayer.saveWinsToStorage(this.currentWins)
    if (currentGame.gameOver) {
      currentGame.gameOver = false;
      this.updateWins(currentGame)
      currentGame.resetGame(currentGame, this.playerOne, this.playerTwo, this.currentPlayer)
      resetTopWinsDisplay()
      toggleButtons(true)
      updateTopWinsDisplay(currentGame, this.isPlayerOneTurn)
    }
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

  updateWins(currentGame) {
    var currentWins = tempPlayer.getWinsFromStorage("currentWins")
    if (!currentGame.isDraw && this.isPlayerOneTurn) {
      currentWins.playerOneWins++
    }
    if (!currentGame.isDraw && !this.isPlayerOneTurn) {
      currentWins.playerTwoWins++
    }
    this.playerOne.saveWinsToStorage(currentWins)
    document.querySelector('.player-one-name').innerText = `${currentWins.playerOneWins}`
    document.querySelector('.player-two-name').innerText = `${currentWins.playerTwoWins}`
    return currentGame.isDraw
  }
}