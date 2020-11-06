var savedPlayerOne = JSON.parse(localStorage.getItem('playerOne')) || []
var savedPlayerTwo = JSON.parse(localStorage.getItem('playerTwo')) || []
var gameBoard = document.querySelector('.game-board')

document.querySelector('body').onload = createGame(event)

function createGame(event) {
  var playerOne = new Player("Elsa", 'poo');
  var playerTwo = new Player('Matt', 'unicorn');
  var currentGame = new Game(x)
  currentGame.players.push(playerOne)
  currentGame.players.push(playerTwo)
  saveToStorage(currentGame)
}

gameBoard.addEventListener('click', function (event) {
  var currentGameFromStorage = localStorage.getItem("currentGame")
  var currentGame = JSON.parse(currentGameFromStorage)
  var square = event.target.id
  placeToken(event, currentGame)
  event.target.disabled = true
  if (currentGame.turnCount > 4) {
    checkForWin()
  }
})


function checkForWin(currentGame) {
  for (var i = 0; i < currentGame.winConds.length; i++) {
    if (winConds[i][0] === currentGame.winConds[i][1] && currentGame.winConds[i][1] === currentGame.winConds[i][2]) {
      // save i to player's wins array
      return true
    }
  }
}

function saveToStorage(currentGame) {
  var saveThisGame = JSON.stringify(currentGame)
  localStorage.setItem("currentGame", saveThisGame)
}

function whoseTurn(currentGame) {
  if (currentGame.turnCount === 0 || currentGame.turnCount % 2 !== 0) {
    return true
  } else {
    return false
  }
}

function placeToken(event, currentGame, playerOne, playerTwo) {
  var currentGameFromStorage = localStorage.getItem("currentGame")
  var currentGame = JSON.parse(currentGameFromStorage)
  var playerOne = currentGame.players[0]
  var playerTwo = currentGame.players[1]
  var playerOneTurn = whoseTurn(currentGame)
  if (playerOneTurn = true) {
    event.target.classList.add('poo')
  } else {
    event.target.classList.add('unicorn')
  }
  console.log(currentGame.turnCount)
  currentGame.turnCount++
  saveToStorage(currentGame)
}