var gameBoard = document.querySelector('.game-board')
var currentPlayerOne = document.querySelector('.one')
var currentPlayerTwo = document.querySelector('.two')
var playerOneWinNumber = document.querySelector('.player-one-name')
var playerTwoWinNumber = document.querySelector('.player-two-name')

document.querySelector('body').onload = createGame(event)

function createGame(event) {
  var playerOne = new Player('player-one-name', 'p1');
  var playerTwo = new Player('player-two-name', 'p2');
  var currentGame = getGameFromStorage("currentGame") || new Game(x)
  currentGame.players.push(playerOne)
  currentGame.players.push(playerTwo)
  var currentWins = getWinsFromStorage("currentWins") || {}
  var playerOneWins = currentWins.playerOneWins || currentGame.players[0].winCount
  var playerTwoWins = currentWins.playerTwoWins || currentGame.players[1].winCount
  currentWins.playerOneWins = playerOneWins
  currentWins.playerTwoWins = playerTwoWins
  saveGameToStorage(currentGame)
  saveWinsToStorage(currentWins)
  playerOneWinNumber.innerText = `${currentWins.playerOneWins}`
  playerTwoWinNumber.innerText = `${currentWins.playerTwoWins}`
}

function saveGameToStorage(currentGame) {
  var saveThisGame = JSON.stringify(currentGame)
  localStorage.setItem("currentGame", saveThisGame)
}

function saveWinsToStorage(currentWins) {
  var saveTheseWins = JSON.stringify(currentWins)
  localStorage.setItem("currentWins", saveTheseWins)
}

function getGameFromStorage() {
  var currentGame = JSON.parse(localStorage.getItem("currentGame"))
  return currentGame
}

function getWinsFromStorage() {
  var currentWins = JSON.parse(localStorage.getItem("currentWins"))
  return currentWins
}

gameBoard.addEventListener('click', function (event) {
  var currentGame = getGameFromStorage("currentGame")
  // rehydrate currentGame
  var tempGame = new Game(x)
  var currentWins = getWinsFromStorage("currentWins")
  var playerOne = currentGame.players[0]
  var playerTwo = currentGame.players[1]
  var placement = event.target.id
  takeTurn(event, currentGame, currentWins, playerOne, playerTwo, placement, tempGame)
})

function takeTurn(event, currentGame, currentWins, playerOne, playerTwo, placement, tempGame) {
  event.target.disabled = true
  var savedWins = getWinsFromStorage("currentWins")
  currentGame.turnCount++
  if (tempGame.isPlayerOneTurn(currentGame)) {
    placeToken(event, playerOne)
    var currentPlayer = tempGame.setPlayerElements(currentGame, placement, playerOne)
  } else {
    placeToken(event, playerTwo)
    var currentPlayer = tempGame.setPlayerElements(currentGame, placement, playerTwo)
  }
  resetTopDisplay(currentPlayer)
  updateCurrentPlayerDisplay()
  tempGame.checkForWin(currentGame, currentPlayer, placement)
  saveGameToStorage(currentGame)
  saveWinsToStorage(currentWins)
  if (currentGame.gameOver) {
    updateWinsDisplay(currentPlayer, currentGame)
    currentGame.gameOver = false;
    updateWins(currentGame, currentPlayer, playerOne, playerTwo, currentWins)
    tempGame.resetGame(currentGame, playerOne, playerTwo, currentPlayer)
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
  var currentWins = getWinsFromStorage("currentWins")
  if (!currentGame.isDraw && currentPlayer.playerName === "player-one-name") {
    currentWins.playerOneWins++
  } else if (!currentGame.isDraw) {
    currentWins.playerTwoWins++
  }
  currentGame.isDraw = false
  saveWinsToStorage(currentWins)
  document.querySelector('.player-one-name').innerText = `${currentWins.playerOneWins}`
  document.querySelector('.player-two-name').innerText = `${currentWins.playerTwoWins}`
}

function updateWinsDisplay(currentPlayer, currentGame) {
  document.querySelector('.game-title').classList.add('hidden')
  document.querySelector('.wins-instructions').classList.remove('hidden')
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
  document.querySelector('.wins-instructions').classList.add('hidden')
  document.querySelector('.player-one-wins').classList.add('hidden')
  document.querySelector('.player-two-wins').classList.add('hidden')
}

function resetBoard(currentGame) {
  document.querySelector("#a").className = "bottom-border side-border"
  document.querySelector("#b").className = "bottom-border side-border"
  document.querySelector("#c").className = "bottom-border"
  document.querySelector("#d").className = "bottom-border side-border"
  document.querySelector("#e").className = "bottom-border side-border"
  document.querySelector("#f").className = "bottom-border"
  document.querySelector("#g").className = "side-border"
  document.querySelector("#h").className = "side-border"
  document.querySelector("#i").className = ""
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