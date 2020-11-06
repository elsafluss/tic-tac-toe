// on pageload:
// update win display

// on click:
// get event.target
//  update this.board.target with playerId
//  placeToken()
//  updateTurnCount()
//  flip playerOneTurn value
//  checkForWin()

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
  console.log(currentGame)
  currentGame.saveToStorage(currentGame)
  return currentGame
}

gameBoard.addEventListener('click', function (event) {
  var currentGameFromStorage = localStorage.getItem("currentGame")
  var currentGame = JSON.parse(currentGameFromStorage)
  var square = event.target.id
  placeToken(event, currentGame)
  currentGame.playerOneTurn = !(currentGame.playerOneTurn)
  event.target.disabled = true
  if (currentGame.turnCount > 4) {
    checkForWin()
  }
})

function placeToken(event, currentGame, playerOne, playerTwo) {
  var currentGameFromStorage = localStorage.getItem("currentGame")
  var currentGame = JSON.parse(currentGameFromStorage)
  var playerOne = currentGame.players[0]
  if (currentGame.playerOneTurn) {
    // console.log('playerOne', currentGame.playerOneTurn)
    event.target.classList.add('poo')
  } else {
    // console.log('playerTwo', currentGame.playerOneTurn)
    event.target.classList.add('unicorn')
    // currentGame.playerOneTurn = true
  }
  // and disable that button
}