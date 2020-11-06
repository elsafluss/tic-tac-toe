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
  // if (currentGame.turnCount > 4) {
  //   checkForWin(currentGame)
  // }
})

function checkForWin(currentGame) {
  for (var i = 0; i < currentGame.winConds.length; i++) {
    if (currentGame.winConds[i][0] === currentGame.winConds[i][1] && currentGame.winConds[i][1] === currentGame.winConds[i][2]) {
      console.log("you won")
      // save i to player's wins array
      return true
    }
  }
}

function getGameFromStorage(currentGame) {
  console.log(localStorage)
  var savedGame = localStorage.getItem("currentGame")
  JSON.parse(savedGame)
}

function saveToStorage(currentGame) {
  var saveThisGame = JSON.stringify(currentGame)
  localStorage.setItem("currentGame", saveThisGame)
}

function isPlayerOneTurn(currentGame) {
  return (currentGame.turnCount % 2 === 0)
}

function placeToken(event, currentGame, playerOne, playerTwo) {
  var currentGameFromStorage = localStorage.getItem("currentGame")
  var currentGame = currentGame || JSON.parse(currentGameFromStorage)
  var playerOne = currentGame.players[0]
  var playerTwo = currentGame.players[1]
  var placement = event.target.id
  if (isPlayerOneTurn(currentGame)) {
    event.target.classList.add('poo')
    currentGame.board[placement] = playerOne.playerName
    console.log(currentGame.board)
  } else {
    event.target.classList.add('unicorn')
    currentGame.board[placement] = playerTwo.playerName
  }
  currentGame.turnCount++
  checkForWin(currentGame)
  saveToStorage(currentGame)
}