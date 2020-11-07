var savedPlayerOne = JSON.parse(localStorage.getItem('playerOne')) || []
var savedPlayerTwo = JSON.parse(localStorage.getItem('playerTwo')) || []
var gameBoard = document.querySelector('.game-board')
var currentPlayerOne = document.querySelector('.one')
var currentPlayerTwo = document.querySelector('.two')

document.querySelector('body').onload = createGame(event)

gameBoard.addEventListener('click', function (event) {
  var currentGame = getGameFromStorage("currentGame")
  var square = event.target.id
  takeTurn(event, currentGame)
  event.target.disabled = true
})

function getGameFromStorage(currentGame) {
  var savedGame = localStorage.getItem("currentGame")
  JSON.parse(savedGame)
}

function createGame(event) {
  var playerOne = new Player('player one name', 'p1');
  var playerTwo = new Player('player two name', 'p2');
  var currentGame = new Game(x)
  currentGame.players.push(playerOne)
  currentGame.players.push(playerTwo)
  saveToStorage(currentGame)
}

function checkForWin(currentGame, currentPlayer, placement) {
  for (var i = 0; i < 8; i++) {
    if (currentGame.winConds[i].includes(placement)) { // does the array include that placement letter?
      var thisCouldWin = currentGame.winConds[i] // each winConds that has that placement letter
      var putPlayerNameHere = currentGame.winConds.indexOf(placement) // get index of placement letter within winConds array
      currentGame.winConds[putPlayerNameHere] = currentPlayer // replace the letter with the playerName
      if (thisCouldWin[0] == thisCouldWin[1] && thisCouldWin[0] == thisCouldWin[2]) {
        console.log("please")
        return true
      }
    }
  }
}

function saveToStorage(currentGame) {
  var saveThisGame = JSON.stringify(currentGame)
  localStorage.setItem("currentGame", saveThisGame)
}

function isPlayerOneTurn(currentGame) {
  return (currentGame.turnCount % 2 === 0)
}

function updateCurrentPlayer(playerOne, playerTwo) {
  currentPlayerOne.classList.toggle('hidden')
  currentPlayerTwo.classList.toggle('hidden')
}

function updateWins(currentPlayerWinCount) {
  currentPlayerWinCount++
}
//
// function resetGame(currentGame, playerOne) {
//   currentGame.board.a = ""
//   currentGame.board.b = ""
//   currentGame.board.c = ""
//   currentGame.board.d = ""
//   currentGame.board.e = ""
//   currentGame.board.f = ""
//   currentGame.board.g = ""
//   currentGame.board.h = ""
//   currentGame.board.i = ""
//   currentPlayerName = playerOne.playerName
//   currentGame.turnCount = 0
//   currentGame.playerOneTurn = true
//   currentGame.gameOver = false
//   // do not clear localStorage or you'll lose the win count
// }

function placeToken(event, currentPlayer) {
  if (currentPlayer.playerToken === 'p1') {
    event.target.classList.add('p1')
  } else {
    event.target.classList.add('p2')
  }
}

function setPlayerElements(currentGame, placement, player) {
  var currentPlayerName = player.playerName
  var currentPlayerWinCount = player.winCount
  currentGame.board[placement] = player.playerName
  var currentPlayer = player
  return currentPlayer
}

function takeTurn(event, currentGame, playerOne, playerTwo) {
  var currentGameFromStorage = localStorage.getItem("currentGame")
  var currentGame = currentGame || JSON.parse(currentGameFromStorage) // not working?
  var playerOne = currentGame.players[0]
  var playerTwo = currentGame.players[1]
  var placement = event.target.id // game board is numbered like an array
  if (isPlayerOneTurn(currentGame)) {
    placeToken(event, playerOne)
    var currentPlayer = setPlayerElements(currentGame, placement, playerOne)
  } else {
    placeToken(event, currentGame, playerTwo)
    var currentPlayer = setPlayerElements(currentGame, placement, playerTwo)
  }
  updateCurrentPlayer(playerOne, playerTwo) // flip current player
  currentGame.turnCount++ // add one to turn count
  saveToStorage(currentGame) // save the current game to storage
  if (currentGame.turnCount > 4) {
    checkForWin(currentGame, currentPlayer, placement)
  } // has someone won? who knows
  if (checkForWin) { // if someone won
    currentGame.gameOver = true // the game is over
    updateWins(currentPlayer.winCount) // update that player's win count
    // resetGame(currentGame, playerOne) // reset the game (after a timeout)
  }
}