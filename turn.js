class Turn {
  constructor(currGame, currWins, play1, play2, placement) {
    this.currGame = currGame;
    this.currWins = currWins;
    this.play1 = play1;
    this.play2 = play2;
    this.placement = placement;
    this.isPlayerOneTurn = currGame.isItPlayerOnesTurn();
  }

  wholeTurn(event) {
    resetTopWinsDisplay("hidden")
    this.disableButton(event)
    this.incrementTurns(currGame)
    this.oneMove(event)
    this.flipPlayer()
    this.currGame.checkForWin(currGame, this.placement)
    tempPlayer.saveWinsToStorage(this.currWins)
    this.gameOverUpdate(currGame)
  }

  disableButton(event) {
    event.target.disabled = true
  }

  incrementTurns(currGame) {
    this.currGame.turnCount++
  }

  flipPlayer() {
    if (this.isPlayerOneTurn) {
      toggleCurrentPlayerDisplay("two")
    } else {
      toggleCurrentPlayerDisplay("one")
    }
  }

  gameOverUpdate(currGame) {
    if (currGame.gameOver) {
      currGame.gameOver = false;
      this.updateWins(currGame)
      currGame.resetGame(currGame, this.play1, this.play2, this.currentPlayer)
      resetTopWinsDisplay()
      toggleButtons(true)
      updateTopWinsDisplay(currGame, this.isPlayerOneTurn, "hidden")
    }
  }

  oneMove(event) {
    if (this.isPlayerOneTurn) {
      let currentPlayer = currGame.setPlayerElements(currGame, this.placement, this.play1)
      let useThisToken = 'p1'
      placeToken(event, useThisToken)
    } else {
      let currentPlayer = currGame.setPlayerElements(currGame, this.placement, this.play2)
      let useThisToken = 'p2'
      placeToken(event, useThisToken)
    }
  }

  updateWins(currGame) {
    let currWins = tempPlayer.getWinsFromStorage("currentWins")
    this.incrementWins(currWins)
    this.play1.saveWinsToStorage(currWins)
    document.querySelector('.p1-name').innerText = `${currWins.playerOneWins}`
    document.querySelector('.p2-name').innerText = `${currWins.playerTwoWins}`
    return currGame.isDraw
  }

  incrementWins(currWins) {
    if (!currGame.isDraw && this.isPlayerOneTurn) {
      currWins.playerOneWins++
    }
    if (!currGame.isDraw && !this.isPlayerOneTurn) {
      currWins.playerTwoWins++
    }
  }
}