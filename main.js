var savedPlayerOne = JSON.parse(localStorage.getItem('playerOne')) || []
var savedPlayerTwo = JSON.parse(localStorage.getItem('playerTwo')) || []
var gameBoard = document.querySelector('.game-board')
var currentPlayerOne = document.querySelector('.one')
var currentPlayerTwo = document.querySelector('.two')

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
  takeTurn(event, currentGame)
  event.target.disabled = true
})
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

function checkForWin(currentGame) {
  var placements = currentGame.board
  var theWinsArray = currentGame.winConds
  if (currentGame.turnCount > 4) {
    for (var i = 0; i < currentGame.winConds.length; i++) {
      // console.log(placements[theWinsArray[i]])
      if (currentGame.board[currentGame.winConds[i][0]] === currentGame.board[currentGame.winConds[i][1]] &&
        currentGame.board[currentGame.winConds[i][1]] === currentGame.board[currentGame.winConds[i][2]]) {
        // save i to player's wins array
        // console.log("you win")
        return true
      }
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

function updateCurrentPlayer(playerOne, playerTwo) {
  currentPlayerOne.classList.toggle('hidden')
  currentPlayerTwo.classList.toggle('hidden')
}

function takeTurn(event, currentGame, playerOne, playerTwo) {
  var currentGameFromStorage = localStorage.getItem("currentGame")
  var currentGame = currentGame || JSON.parse(currentGameFromStorage)
  var playerOne = currentGame.players[0]
  var playerTwo = currentGame.players[1]
  var placement = event.target.id
  if (isPlayerOneTurn(currentGame)) {
    event.target.classList.add('poo')
    currentGame.board[placement] = playerOne.playerName
    var currentPlayer = playerOne.playerName
  } else {
    event.target.classList.add('unicorn')
    currentGame.board[placement] = playerTwo.playerName
    var currentPlayer = playerTwo.playerName
  }
  updateCurrentPlayer(playerOne, playerTwo)
  currentGame.turnCount++
  checkForWin(currentGame)
  saveToStorage(currentGame)
}