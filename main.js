var gameBoard = document.querySelector('.game-board')
var currentPlayerOne = document.querySelector('.one')
var currentPlayerTwo = document.querySelector('.two')

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
  document.querySelector('.player-one-name').innerText = `${currentWins.playerOneWins}`
  document.querySelector('.player-two-name').innerText = `${currentWins.playerTwoWins}`
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
  var currentWins = getWinsFromStorage("currentWins")
  var playerOne = currentGame.players[0]
  var playerTwo = currentGame.players[1]
  var placement = event.target.id
  takeTurn(event, currentGame, currentWins, playerOne, playerTwo, placement)
})

function takeTurn(event, currentGame, currentWins, playerOne, playerTwo, placement) {
  event.target.disabled = true
  getWinsFromStorage("currentWins")
  currentGame.turnCount++
  if (isPlayerOneTurn(currentGame)) {
    placeToken(event, playerOne)
    var currentPlayer = setPlayerElements(currentGame, placement, playerOne)
  } else {
    placeToken(event, playerTwo)
    var currentPlayer = setPlayerElements(currentGame, placement, playerTwo)
  }
  resetDisplay(currentPlayer)
  updateCurrentPlayerDisplay()
  checkForWin(currentGame, currentPlayer, placement)
  saveGameToStorage(currentGame)
  saveWinsToStorage(currentWins)
  if (currentGame.gameOver) {
    updateWinsDisplay(currentPlayer)
    currentGame.gameOver = false;
    updateWins(currentGame, currentPlayer, playerOne, playerTwo, currentWins)
    resetGame(currentGame, playerOne, playerTwo, currentPlayer)
  }
}

function isPlayerOneTurn(currentGame) {
  return (currentGame.turnCount % 2 !== 0)
}

function placeToken(event, currentPlayer) {
  if (currentPlayer.playerToken === 'p1') {
    event.target.classList.add('p1')
  } else {
    event.target.classList.add('p2')
  }
}

function setPlayerElements(currentGame, placement, player) {
  var currentPlayerName = player.playerName
  var putItHere = currentGame.board.indexOf(placement)
  currentGame.board[putItHere] = currentPlayerName
  var currentPlayer = player
  return currentPlayer
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

function updateWinsDisplay(currentPlayer) {
  document.querySelector('.game-title').classList.add('hidden')
  document.querySelector('.wins-display').classList.remove('hidden')
  document.querySelector('.wins-instructions').classList.remove('hidden')
  if (currentPlayer.playerName === "player-one-name") {
    document.querySelector('.player-one-wins').classList.remove('hidden')
  } else {
    document.querySelector('.player-two-wins').classList.remove('hidden')
  }
}

function checkForWin(currentGame, currentPlayer, placement) {
  var winConds = []
  winConds[0] = [currentGame.board[0], currentGame.board[1], currentGame.board[2]]
  winConds[1] = [currentGame.board[3], currentGame.board[4], currentGame.board[5]]
  winConds[2] = [currentGame.board[6], currentGame.board[7], currentGame.board[8]]
  winConds[3] = [currentGame.board[0], currentGame.board[3], currentGame.board[6]]
  winConds[4] = [currentGame.board[1], currentGame.board[4], currentGame.board[7]]
  winConds[5] = [currentGame.board[2], currentGame.board[5], currentGame.board[8]]
  winConds[6] = [currentGame.board[0], currentGame.board[4], currentGame.board[8]]
  winConds[7] = [currentGame.board[2], currentGame.board[4], currentGame.board[6]]
  if (!currentGame.gameOver) {
    if (winConds[0][0] === winConds[0][1] && winConds[0][0] === winConds[0][2]) {
      currentGame.gameOver = true
    } else if (winConds[1][0] === winConds[1][1] && winConds[1][0] === winConds[1][2]) {
      currentGame.gameOver = true
    } else if (winConds[2][0] === winConds[2][1] && winConds[2][0] === winConds[2][2]) {
      currentGame.gameOver = true
    } else if (winConds[3][0] === winConds[3][1] && winConds[3][0] === winConds[3][2]) {
      currentGame.gameOver = true
    } else if (winConds[4][0] === winConds[4][1] && winConds[4][0] === winConds[4][2]) {
      currentGame.gameOver = true
    } else if (winConds[5][0] === winConds[5][1] && winConds[5][0] === winConds[5][2]) {
      currentGame.gameOver = true
    } else if (winConds[6][0] === winConds[6][1] && winConds[6][0] === winConds[6][2]) {
      currentGame.gameOver = true
    } else if (winConds[7][0] === winConds[7][1] && winConds[7][0] === winConds[7][2]) {
      currentGame.gameOver = true
    } else if (!currentGame.gameOver && currentGame.turnCount > 8) {
      currentGame.gameOver = true
      currentGame.isDraw = true
    }
  }
}

function resetGame(currentGame, playerOne, playerTwo, currentPlayer) {
  currentGame.board = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "x"]
  currentPlayerName = playerOne.playerName
  currentGame.turnCount = 0
  currentGame.playerOneTurn = true
  var timeOut = setTimeout(function () {
    resetBoard(currentGame)
  }, 2000)
  saveGameToStorage(currentGame)
  currentGame.players[0] = playerOne
  currentGame.players[0] = playerTwo
}

function resetDisplay(currentPlayer) {
  document.querySelector('.game-title').classList.remove('hidden')
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