var gameBoard = document.querySelector('.game-board')
var currentPlayerOne = document.querySelector('.one')
var currentPlayerTwo = document.querySelector('.two')

document.querySelector('body').onload = createGame(event)

function createGame(event) {
  var playerOne = new Player('player-one-name', 'p1');
  var playerTwo = new Player('player-two-name', 'p2');
  var savedGame = getGameFromStorage("currentGame")
  var currentGame = savedGame || new Game(x)
  currentGame.players.push(playerOne)
  currentGame.players.push(playerTwo)
  var savedWins = getWinsFromStorage("currentWins")
  var playerOneWins = savedWins.playerOneWins || currentGame.players[0].winCount
  var playerTwoWins = savedWins.playerTwoWins || currentGame.players[1].winCount
  var currentWins = getWinsFromStorage("currentWins") || {}
  currentWins.playerOneWins = playerOneWins
  currentWins.playerTwoWins = playerTwoWins
  saveGameToStorage(currentGame)
  saveWinsToStorage(currentWins)
}

function saveGameToStorage(currentGame) {
  var saveThisGame = JSON.stringify(currentGame)
  localStorage.setItem("currentGame", saveThisGame)
}

function saveWinsToStorage(currentWins) {
  var saveTheseWins = JSON.stringify(currentWins)
  localStorage.setItem("currentWins", saveTheseWins)
}

gameBoard.addEventListener('click', function (event) {
  var currentGame = getGameFromStorage("currentGame")
  var currentWins = getWinsFromStorage("currentWins")
  currentGame.gameOver = false
  var square = event.target.id
  takeTurn(event, currentGame, currentWins)
  event.target.disabled = true
})

function getGameFromStorage() {
  var currentGame = JSON.parse(localStorage.getItem("currentGame"))
  return currentGame
}

function getWinsFromStorage() {
  var currentWins = JSON.parse(localStorage.getItem("currentWins"))
  return currentWins
}

function takeTurn(event, currentGame, currentWins) {
  getWinsFromStorage("currentWins")
  var playerOne = currentGame.players[0]
  var playerTwo = currentGame.players[1]
  var placement = event.target.id
  currentGame.turnCount++
  if (isPlayerOneTurn(currentGame)) {
    placeToken(event, playerOne)
    var currentPlayer = setPlayerElements(currentGame, placement, playerOne)
  } else {
    placeToken(event, playerTwo)
    var currentPlayer = setPlayerElements(currentGame, placement, playerTwo)
  }
  updateCurrentPlayerDisplay()
  checkForWin(currentGame, currentPlayer, placement)
  saveGameToStorage(currentGame)
  saveWinsToStorage(currentWins)
  if (currentGame.gameOver === true) {
    currentGame.gameOver = false;
    updateWins(currentGame, currentPlayer, playerOne, playerTwo, currentWins)
    resetGame(currentGame, playerOne, playerTwo)
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
  console.log(currentWins)
  if (currentPlayer.playerName === "player-one-name") {
    currentWins.playerOneWins++
  } else {
    currentWins.playerTwoWins++
  }
  saveWinsToStorage(currentWins)
  document.querySelector('.player-one-name').innerText = `${currentWins.playerOneWins}`
  document.querySelector('.player-two-name').innerText = `${currentWins.playerTwoWins}`
}

function checkForWin(currentGame, currentPlayer, placement) {
  // also show who has won
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
      console.log("congrats row 1", currentPlayer.playerName)
      currentGame.gameOver = true
    } else if (winConds[1][0] === winConds[1][1] && winConds[1][0] === winConds[1][2]) {
      console.log("congrats row 2", currentPlayer.playerName)
      currentGame.gameOver = true
    } else if (winConds[2][0] === winConds[2][1] && winConds[2][0] === winConds[2][2]) {
      console.log("congrats row 3", currentPlayer.playerName)
      currentGame.gameOver = true
    } else if (winConds[3][0] === winConds[3][1] && winConds[3][0] === winConds[3][2]) {
      console.log("congrats column 1", currentPlayer.playerName)
      currentGame.gameOver = true
    } else if (winConds[4][0] === winConds[4][1] && winConds[4][0] === winConds[4][2]) {
      console.log("congrats column 2", currentPlayer.playerName)
      currentGame.gameOver = true
    } else if (winConds[5][0] === winConds[5][1] && winConds[5][0] === winConds[5][2]) {
      console.log("congrats column 3", currentPlayer.playerName)
      currentGame.gameOver = true
    } else if (winConds[6][0] === winConds[6][1] && winConds[6][0] === winConds[6][2]) {
      console.log("congrats diagonal a", currentPlayer.playerName)
      currentGame.gameOver = true
    } else if (winConds[7][0] === winConds[7][1] && winConds[7][0] === winConds[7][2]) {
      console.log("congrats diagonal b", currentPlayer.playerName)
      currentGame.gameOver = true
    } else if (!currentGame.gameOver && currentGame.turnCount > 8) {
      console.log("nobody wins")
      currentGame.gameOver = true
      currentGame.isDraw = true
    }
    // update win count here maybe
  }
}

function resetGame(currentGame, playerOne, playerTwo, currentWins) {
  currentGame.board = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "x"]
  currentPlayerName = playerOne.playerName
  currentGame.turnCount = 0
  currentGame.playerOneTurn = true
  var timeOut = setTimeout(function () {
    resetBoard(currentGame)
  }, 2000)
  currentGame.gameOver = false
  saveGameToStorage(currentGame)
  currentGame.players[0] = playerOne
  currentGame.players[0] = playerTwo
}

function resetBoard(currentGame) { // yeah, i know
  document.querySelector("#a").classList.remove('p1')
  document.querySelector("#b").classList.remove('p1')
  document.querySelector("#c").classList.remove('p1')
  document.querySelector("#d").classList.remove('p1')
  document.querySelector("#e").classList.remove('p1')
  document.querySelector("#f").classList.remove('p1')
  document.querySelector("#g").classList.remove('p1')
  document.querySelector("#h").classList.remove('p1')
  document.querySelector("#i").classList.remove('p1')
  document.querySelector("#a").classList.remove('p2')
  document.querySelector("#b").classList.remove('p2')
  document.querySelector("#c").classList.remove('p2')
  document.querySelector("#d").classList.remove('p2')
  document.querySelector("#e").classList.remove('p2')
  document.querySelector("#f").classList.remove('p2')
  document.querySelector("#g").classList.remove('p2')
  document.querySelector("#h").classList.remove('p2')
  document.querySelector("#i").classList.remove('p2')
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