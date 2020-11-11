var gameBoard = document.querySelector(".game-board")
var currentPlayerOne = document.querySelector(".one")
var currentPlayerTwo = document.querySelector(".two")
var playerOneWinNumber = document.querySelector(".player-one-name")
var playerTwoWinNumber = document.querySelector(".player-two-name")
var gameTitle = document.querySelector(".game-title")
var drawDisplay = document.querySelector(".draw-display")
var winsDisplay = document.querySelector(".wins-display")
var playerOneWinDisplay = document.querySelector(".player-one-wins")
var playerTwoWinDisplay = document.querySelector(".player-two-wins")
var currentGame = new Game()

// ~~~~~PAGE LOAD~~~~

document.querySelector("body").onload = createGame(event)

function createGame(event) {
  createTempPlayer()
  var playerOne = new Player("player-one-name", "p1")
  var playerTwo = new Player("player-two-name", "p2")
  addPlayerToGame(playerOne, playerTwo)
  var currentWins = playerOne.getWinsFromStorage("currentWins") || {}
  var playerOneWins = currentWins.playerOneWins || currentGame.players[0].winCount
  var playerTwoWins = currentWins.playerTwoWins || currentGame.players[1].winCount
  currentWins.playerOneWins = playerOneWins
  currentWins.playerTwoWins = playerTwoWins
  playerOne.saveWinsToStorage(currentWins)
  updatePlayerWins(currentWins)
}

function createTempPlayer() {
  tempPlayer = new Player("tempPlayer")
}

function addPlayerToGame(playerOne, playerTwo) {
  currentGame.players.push(playerOne)
  currentGame.players.push(playerTwo)
}

function updatePlayerWins(currentWins) {
  playerOneWinNumber.innerText = `${currentWins.playerOneWins}`
  playerTwoWinNumber.innerText = `${currentWins.playerTwoWins}`
}

// ~~~~~CLICK ON GAME BOARD~~~~

gameBoard.addEventListener("click", function (event) {
  if (event.target.parentNode.className === "game-board") {
    var currentWins = tempPlayer.getWinsFromStorage("currentWins")
    var playerOne = currentGame.players[0]
    var playerTwo = currentGame.players[1]
    var placement = event.target.id
    var currentTurn = new Turn(currentGame, currentWins, playerOne, playerTwo, placement)
    currentTurn.wholeTurn(event)
  }
})

function placeToken(event, useThisToken) {
  event.target.classList.add(`${useThisToken}`)
}

function updateCurrentPlayerDisplay() {
  currentPlayerOne.classList.toggle("hidden")
  currentPlayerTwo.classList.toggle("hidden")
}

function toggleCurrentPlayerDisplay(nextPlayer) {
  if (nextPlayer === "one") {
    currentPlayerOne.classList.remove("hidden")
    currentPlayerTwo.classList.add("hidden")
  }
  if (nextPlayer === "two") {
    currentPlayerOne.classList.add("hidden")
    currentPlayerTwo.classList.remove("hidden")
  }
}

// ~~~~~AFTER WIN~~~~~

function updateTopWinsDisplay(currentGame, isPlayerOneTurn) {
  gameTitle.classList.add("hidden")
  if (currentGame.isDraw) {
    drawDisplay.classList.remove("hidden")
  } else if (isPlayerOneTurn) {
    playerOneWinDisplay.classList.remove("hidden")
    winsDisplay.classList.remove("hidden")
  } else {
    playerTwoWinDisplay.classList.remove("hidden")
    winsDisplay.classList.remove("hidden")
  }
}

function resetTopWinsDisplay() {
  gameTitle.classList.remove("hidden")
  drawDisplay.classList.add("hidden")
  winsDisplay.classList.add("hidden")
  playerOneWinDisplay.classList.add("hidden")
  playerTwoWinDisplay.classList.add("hidden")
}

function resetBoardDisplay() {
  var bottomAndSide = ["#a", "#b", "#d", "#e"]
  var bottomOnly = ["#c", "#f"]
  var sideOnly = ["#g", "#h"]
  for (var i = 0; i < bottomAndSide.length; i++) {
    document.querySelector(`${bottomAndSide[i]}`).className = "bottom-border side-border"
  }
  for (var i = 0; i < bottomOnly.length; i++) {
    document.querySelector(`${bottomOnly[i]}`).className = "bottom-border"
  }
  for (var i = 0; i < sideOnly.length; i++) {
    document.querySelector(`${sideOnly[i]}`).className = "side-border"
  }
  document.querySelector("#i").className = ""
  toggleButtons(false)
  toggleCurrentPlayerDisplay("one")
}

function toggleButtons(onOrOff) {
  // true === off, false === on
  var buttonLetters = ["#a", "#b", "#c", "#d", "#e", "#f", "#g", "#h", "#i"]
  for (var i = 0; i < buttonLetters.length; i++) {
    document.querySelector(`${buttonLetters[i]}`).disabled = onOrOff
  }
}