var savedPlayerOne = JSON.parse(localStorage.getItem('playerOne')) || []
var savedPlayerTwo = JSON.parse(localStorage.getItem('playerTwo')) || []
var gameBoard = document.querySelector('.game-board')
var currentPlayerOne = document.querySelector('.one')
var currentPlayerTwo = document.querySelector('.two')

document.querySelector('body').onload = createGame(event)

function createGame(event) {
  var playerOne = new Player('player one name', 'p1');
  var playerTwo = new Player('player two name', 'p2');
  var currentGame = new Game(x)
  currentGame.players.push(playerOne)
  currentGame.players.push(playerTwo)
  saveToStorage(currentGame)
}

function saveToStorage(currentGame) {
  var saveThisGame = JSON.stringify(currentGame)
  localStorage.setItem("currentGame", saveThisGame)
}

gameBoard.addEventListener('click', function (event) {
  var currentGame = getGameFromStorage("currentGame")
  var square = event.target.id
  takeTurn(event, currentGame)
  event.target.disabled = true
})

function getGameFromStorage() {
  var savedGame = localStorage.getItem("currentGame")
  var currentGame = JSON.parse(savedGame)
  return currentGame
}

function takeTurn(event, currentGame) {
  var playerOne = currentGame.players[0]
  var playerTwo = currentGame.players[1]
  var placement = event.target.id
  if (isPlayerOneTurn(currentGame)) {
    placeToken(event, playerOne)
    var currentPlayer = setPlayerElements(currentGame, placement, playerOne)
  } else {
    placeToken(event, playerTwo)
    var currentPlayer = setPlayerElements(currentGame, placement, playerTwo)
  }
  updateCurrentPlayerDisplay() // flip current player
  currentGame.turnCount++
  console.log(currentGame)
  saveToStorage(currentGame) // save the current game to storage
  checkForWin(currentGame, currentPlayer, placement) // has someone won? who knows
  if (checkForWin) { // if someone won
    currentGame.gameOver = true // the game is over
    updateWins(currentPlayer.winCount) // update that player's win count
    // resetGame(currentGame, playerOne) // reset the game (after a timeout)
  }
}

// function saveToStorage(currentGame) {
//   var saveThisGame = JSON.stringify(currentGame)
//   localStorage.setItem("currentGame", saveThisGame)
// }

function isPlayerOneTurn(currentGame) {
  return (currentGame.turnCount % 2 === 0)
}

function placeToken(event, currentPlayer) {
  if (currentPlayer.playerToken === 'p1') {
    event.target.classList.add('p1')
  } else {
    event.target.classList.add('p2')
  }
}
// i just finished checking this one 
function setPlayerElements(currentGame, placement, player) {
  var currentPlayerName = player.playerName
  // var currentPlayerWinCount = player.winCount
  var putItHere = currentGame.board.indexOf(placement)
  currentGame.board[putItHere] = currentPlayerName
  var currentPlayer = player
  return currentPlayer
}

function updateCurrentPlayerDisplay() {
  currentPlayerOne.classList.toggle('hidden')
  currentPlayerTwo.classList.toggle('hidden')
}

function checkForWin(currentGame, currentPlayer, placement) {
  for (var i = 0; i < 8; i++) {
    // console.log("the winConds now", currentGame.winConds[i])
    if (currentGame.winConds[i].includes(placement)) { // does the winConds array include that placement letter?
      // var thisCouldWin = currentGame.winConds[i] // each winConds that has that placement letter
      var putPlayerNameHere = currentGame.winConds[i].indexOf(placement) // get index of placement letter within winConds array
      currentGame.winConds[i][putPlayerNameHere] = currentPlayer.playerName // replace the letter with the playerName
      // ??that's working, but it's resetting each time?
      // console.log(placement)
      // console.log("index of placement", currentGame.winConds[i].indexOf(placement))
      if (currentGame.winConds[i][0] == currentGame.winConds[i][1] && currentGame.winConds[i][0] == currentGame.winConds[i][2]) {
        console.log("please")
        return true
      }
    }
  }
}

function updateWins(currentPlayerWinCount) {
  currentPlayerWinCount++
}
//
// function resetGame(currentGame, playerOne) {
//   currentGame.board[0] = a
//   currentGame.board[1] = b
//   currentGame.board[2] = c
//   currentGame.board[3] = d
//   currentGame.board[4] = e
//   currentGame.board[5] = f
//   currentGame.board[6] = g
//   currentGame.board[7] = h
//   currentGame.board[8] = i
//   currentPlayerName = playerOne.playerName
//   currentGame.turnCount = 0
//   currentGame.playerOneTurn = true
//   currentGame.gameOver = false
//   // do not clear localStorage or you'll lose the win count
// }