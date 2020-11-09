var gameBoard = document.querySelector('.game-board')
var currentPlayerOne = document.querySelector('.one')
var currentPlayerTwo = document.querySelector('.two')
var playerOneWinNumber = document.querySelector('.player-one-name')
var playerTwoWinNumber = document.querySelector('.player-two-name')
var currentGame = new Game(x)
document.querySelector('body').onload = createGame(event)


function createGame(event) {
  var playerOne = new Player('player-one-name', 'p1');
  var playerTwo = new Player('player-two-name', 'p2');
  currentGame.players.push(playerOne)
  currentGame.players.push(playerTwo)
  var currentWins = playerOne.getWinsFromStorage("currentWins") || {}
  var playerOneWins = currentWins.playerOneWins || currentGame.players[0].winCount
  var playerTwoWins = currentWins.playerTwoWins || currentGame.players[1].winCount
  currentWins.playerOneWins = playerOneWins
  currentWins.playerTwoWins = playerTwoWins
  playerOne.saveWinsToStorage(currentWins)
  playerOneWinNumber.innerText = `${currentWins.playerOneWins}`
  playerTwoWinNumber.innerText = `${currentWins.playerTwoWins}`
}

gameBoard.addEventListener('click', function (event) {
  createTempPlayer()
  var currentWins = tempPlayer.getWinsFromStorage("currentWins")
  var playerOne = currentGame.players[0]
  var playerTwo = currentGame.players[1]
  var placement = event.target.id
  takeTurn(event, currentGame, currentWins, playerOne, playerTwo, placement)
})

function createTempPlayer() {
  tempPlayer = new Player('tempPlayer')
}

function takeTurn(event, currentGame, currentWins, playerOne, playerTwo, placement) {
  event.target.disabled = true
  var savedWins = tempPlayer.getWinsFromStorage("currentWins")
  currentGame.turnCount++
  if (currentGame.isPlayerOneTurn(currentGame)) {
    placeToken(event, playerOne)
    var currentPlayer = currentGame.setPlayerElements(currentGame, placement, playerOne)
  } else {
    placeToken(event, playerTwo)
    var currentPlayer = currentGame.setPlayerElements(currentGame, placement, playerTwo)
  }
  resetTopDisplay(currentPlayer)
  updateCurrentPlayerDisplay()
  currentGame.checkForWin(currentGame, currentPlayer, placement)
  playerOne.saveWinsToStorage(currentWins)
  if (currentGame.gameOver) {
    turnOffButtons()
    updateWinsDisplay(currentPlayer, currentGame)
    currentGame.gameOver = false;
    updateWins(currentGame, currentPlayer, playerOne, playerTwo, currentWins)
    currentGame.resetGame(currentGame, playerOne, playerTwo, currentPlayer)
  }
}

function placeToken(event, currentPlayer) {
  if (currentPlayer.playerToken === 'p1') {
    event.target.classList.add('p1')
  } else {
    event.target.classList.add('p2')
  }
}

function updateCurrentPlayerDisplay() {
  currentPlayerOne.classList.toggle('hidden')
  currentPlayerTwo.classList.toggle('hidden')
}

function updateWins(currentGame, currentPlayer, playerOne, playerTwo, currentWins) {
  var currentWins = tempPlayer.getWinsFromStorage("currentWins")
  if (!currentGame.isDraw && currentPlayer.playerName === "player-one-name") {
    currentWins.playerOneWins++
  } else if (!currentGame.isDraw) {
    currentWins.playerTwoWins++
  }
  updateCurrentPlayerDisplay()
  currentGame.isDraw = false
  playerOne.saveWinsToStorage(currentWins)
  document.querySelector('.player-one-name').innerText = `${currentWins.playerOneWins}`
  document.querySelector('.player-two-name').innerText = `${currentWins.playerTwoWins}`
}

function updateWinsDisplay(currentPlayer, currentGame) {
  document.querySelector('.game-title').classList.add('hidden')
  if (currentGame.isDraw) {
    document.querySelector('.draw-display').classList.remove('hidden')
  } else if (currentPlayer.playerName === "player-one-name") {
    document.querySelector('.player-one-wins').classList.remove('hidden')
    document.querySelector('.wins-display').classList.remove('hidden')
  } else {
    document.querySelector('.player-two-wins').classList.remove('hidden')
    document.querySelector('.wins-display').classList.remove('hidden')
  }
}

function resetTopDisplay(currentPlayer) {
  document.querySelector('.game-title').classList.remove('hidden')
  document.querySelector('.draw-display').classList.add('hidden')
  document.querySelector('.wins-display').classList.add('hidden')
  document.querySelector('.player-one-wins').classList.add('hidden')
  document.querySelector('.player-two-wins').classList.add('hidden')
}

function resetBoardDisplay(currentGame) {
  document.querySelector("#a").className = "bottom-border side-border"
  document.querySelector("#b").className = "bottom-border side-border"
  document.querySelector("#c").className = "bottom-border"
  document.querySelector("#d").className = "bottom-border side-border"
  document.querySelector("#e").className = "bottom-border side-border"
  document.querySelector("#f").className = "bottom-border"
  document.querySelector("#g").className = "side-border"
  document.querySelector("#h").className = "side-border"
  document.querySelector("#i").className = ""
  turnOnButtons()
}

function turnOnButtons() {
  document.querySelector("#a").disabled = false
  document.querySelector("#b").disabled = false
  document.querySelector("#c").disabled = false
  document.querySelector("#d").disabled = false
  document.querySelector("#e").disabled = false
  document.querySelector("#f").disabled = false
  document.querySelector("#g").disabled = false
  document.querySelector("#h").disabled = false
  document.querySelector("#i").disabled = false
}

function turnOffButtons() {
  document.querySelector("#a").disabled = true
  document.querySelector("#b").disabled = true
  document.querySelector("#c").disabled = true
  document.querySelector("#d").disabled = true
  document.querySelector("#e").disabled = true
  document.querySelector("#f").disabled = true
  document.querySelector("#g").disabled = true
  document.querySelector("#h").disabled = true
  document.querySelector("#i").disabled = true
}