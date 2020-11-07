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
//
// function checkForWin(currentGame) {
//   var placements = currentGame.board
//   for (var i = 0; i < currentGame.winConds.length; i++) {
//     var hasWon = currentGame.winConds[i]
//     for (var j = 0; j < 3; j++) {
//       if (currentGame.turnCount > 4) {
//         placements[hasWon[j]] === placements[hasWon[j + 1]] && placements[hasWon[j + 1]] === placements[hasWon[j + 2]]
//       }
//     }
//     console.log("placements[hasWon[i]]", placements[hasWon[j]])
//     console.log("placements[hasWon[i + 1]", placements[hasWon[j + 1]])
//     console.log("placements[hasWon[i + 2]", placements[hasWon[j + 2]])
//   }
// }

function checkForWin(currentGame, currentPlayerName) {

}


function checkForWin(currentGame, currentPlayerName) {
  for (var i = 0; i < 8; i++) {
    var winCondsPositionOne = currentGame.winConds[i][0]
    var winCondsPositionTwo = currentGame.winConds[i][1]
    var winCondsPositionThree = currentGame.winConds[i][2]
    console.log(currentGame.board.a) // where all the tokens are sitting
    console.log(winCondsPositionOne)
    // console.log(currentGame.board.winCondsPositionOne)
    if (currentGame.board.winCondsPositionOne !== "") {
      // console.log("could win")
    }
    // ((currentGame.board[winCondsPositionOne] === currentGame.board[winCondsPositionTwo]) &&
    // (currentGame.board[winCondsPositionTwo] === currentGame.board[winCondsPositionThree]))) {
    // console.log("win")
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

function resetGame(currentGame, playerOne) {
  currentGame.board.a = ""
  currentGame.board.b = ""
  currentGame.board.c = ""
  currentGame.board.d = ""
  currentGame.board.e = ""
  currentGame.board.f = ""
  currentGame.board.g = ""
  currentGame.board.h = ""
  currentGame.board.i = ""
  currentPlayerName = playerOne.playerName
  currentGame.turnCount = 0
  currentGame.playerOneTurn = true
  currentGame.gameOver = false
  // do not clear localStorage or you'll lose the win count
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
  var placement = event.target.id
  if (isPlayerOneTurn(currentGame)) {
    placeToken(event, playerOne)
    // currentGame.board[placement] = playerOne.playerName
    var currentPlayer = setPlayerElements(currentGame, placement, playerOne)
  } else {
    placeToken(event, currentGame, playerTwo)
    // currentGame.board[placement] = playerTwo.playerName
    var currentPlayer = setPlayerElements(currentGame, placement, playerTwo)
  }
  updateCurrentPlayer(playerOne, playerTwo) // flip current player
  currentGame.turnCount++ // add one to turn count
  saveToStorage(currentGame) // save the current game to storage
  checkForWin(currentGame, currentPlayer, placement) // has someone won? who knows
  if (checkForWin) { // if someone won
    currentGame.gameOver = true // the game is over
    updateWins(currentPlayer.winCount) // update that player's win count
    resetGame(currentGame, playerOne) // reset the game (after a timeout)
  }
}