// on pageload:
// getPlayerFromStorage(playerOne)
// getPlayerFromStorage(playerTwo)
// update win display

// on click:
// get event.target
//  update this.board.target with playerId
//  placeToken()
//  updateTurnCount()
//  checkForWin()

var playerOne = JSON.parse(localStorage.getItem('playerOne')) || []
var gameBoard = document.querySelector('.game-board')

gameBoard.addEventListener('click', function (event, currentGame) {
  var currentGame = new Game(event.target.id)
  var square = event.target.id
  placeToken(event, currentGame)
  event.target.disabled = true
  if (currentGame.turnCount > 4) {
    checkForWin()
  }
})

// it's always player one's turn!
function placeToken(event, currentGame) {
  if (currentGame.playerOneTurn) {
    console.log("playerOne", currentGame.playerOneTurn)
    event.target.classList.add('poo')
    currentGame.playerOneTurn = false
  } else {
    console.log("playerTwo", currentGame.playerOneTurn)
    event.target.classList.add('unicorn')
    currentGame.playerOneTurn = true
  }
  // and disable that button
}