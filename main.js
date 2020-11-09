var gameBoard = document.querySelector('.game-board')
var currentPlayerOne = document.querySelector('.one')
var currentPlayerTwo = document.querySelector('.two')
var playerOneWinNumber = document.querySelector('.player-one-name')
var playerTwoWinNumber = document.querySelector('.player-two-name')
var gameTitle = document.querySelector('.game-title')
var drawDisplay = document.querySelector('.draw-display')
var winsDisplay = document.querySelector('.wins-display')
var playerOneWinDisplay = document.querySelector('.player-one-wins')
var playerTwoWinDisplay = document.querySelector('.player-two-wins')
var buttonLetters = ["#a", "#b", "#c", "#d", "#e", "#f", "#g", "#h", "#i"]
var currentGame = new Game(x)
document.querySelector('body').onload = createGame(event)

function createTempPlayer() {
  tempPlayer = new Player('tempPlayer')
}

function createGame(event) {
  createTempPlayer()
  var playerOne = new Player('player-one-name', 'p1');
  var playerTwo = new Player('player-two-name', 'p2');
  addPlayerToGame(playerOne, playerTwo)
  var currentWins = playerOne.getWinsFromStorage("currentWins") || {}
  var playerOneWins = currentWins.playerOneWins || currentGame.players[0].winCount
  var playerTwoWins = currentWins.playerTwoWins || currentGame.players[1].winCount
  currentWins.playerOneWins = playerOneWins
  currentWins.playerTwoWins = playerTwoWins
  playerOne.saveWinsToStorage(currentWins)
  updatePlayerWins(currentWins)
}

function updatePlayerWins(currentWins) {
  playerOneWinNumber.innerText = `${currentWins.playerOneWins}`
  playerTwoWinNumber.innerText = `${currentWins.playerTwoWins}`
}

function addPlayerToGame(playerOne, playerTwo) {
  currentGame.players.push(playerOne)
  currentGame.players.push(playerTwo)
}

gameBoard.addEventListener('click', function (event) {
  var currentWins = tempPlayer.getWinsFromStorage("currentWins")
  var playerOne = currentGame.players[0]
  var playerTwo = currentGame.players[1]
  var placement = event.target.id
  var currentTurn = new Turn(currentGame, currentWins, playerOne, playerTwo, placement)
  currentTurn.wholeTurn(event)
})

function placeP1Token(event) {
  event.target.classList.add('p1')
}

function placeP2Token(event) {
  event.target.classList.add('p2')
}

function updateCurrentPlayerDisplay() {
  currentPlayerOne.classList.toggle('hidden')
  currentPlayerTwo.classList.toggle('hidden')
}

function updateTopWinsDisplay(isPlayerOneTurn, currentGame) {
  gameTitle.classList.add('hidden')
  if (currentGame.isDraw) {
    drawDisplay.classList.remove('hidden')
  } else if (isPlayerOneTurn) {
    playerOneWinDisplay.classList.remove('hidden')
    winsDisplay.classList.remove('hidden')
  } else {
    playerTwoWinDisplay.classList.remove('hidden')
    winsDisplay.classList.remove('hidden')
  }
}

function resetTopWinsDisplay() {
  gameTitle.classList.remove('hidden')
  drawDisplay.classList.add('hidden')
  winsDisplay.classList.add('hidden')
  playerOneWinDisplay.classList.add('hidden')
  playerTwoWinDisplay.classList.add('hidden')
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
  for (var i = 0; i < buttonLetters.length; i++) {
    document.querySelector(`${buttonLetters[i]}`).disabled = false
  }
}

function turnOffButtons() {
  for (var i = 0; i < buttonLetters.length; i++) {
    document.querySelector(`${buttonLetters[i]}`).disabled = true
  }
}