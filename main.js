const gameBoard = document.querySelector(".game-board")
const currentPlayerOne = document.querySelector(".one")
const currentPlayerTwo = document.querySelector(".two")
const playerOneWinNumber = document.querySelector(".p1-name")
const playerTwoWinNumber = document.querySelector(".p2-name")
const gameTitle = document.querySelector(".game-title")
const drawDisplay = document.querySelector(".draw-display")
const winsDisplay = document.querySelector(".wins-display")
const playerOneWinDisplay = document.querySelector(".player-one-wins")
const playerTwoWinDisplay = document.querySelector(".player-two-wins")
const currGame = new Game()

// ~~~~~PAGE LOAD~~~~

document.querySelector("body").onload = createGame(event)

function createGame(event) {
  createTempPlayer()
  let playerOne = new Player("p1-name", "p1")
  let playerTwo = new Player("p2-name", "p2")
  addPlayerToGame(playerOne, playerTwo)
  let currWins = playerOne.getWinsFromStorage("currentWins") || {}
  let playerOneWins = currWins.playerOneWins || currGame.players[0].winCount
  let playerTwoWins = currWins.playerTwoWins || currGame.players[1].winCount
  currWins.playerOneWins = playerOneWins
  currWins.playerTwoWins = playerTwoWins
  playerOne.saveWinsToStorage(currWins)
  updatePlayerWins(currWins)
}

function createTempPlayer() {
  tempPlayer = new Player("tempPlayer")
}

function addPlayerToGame(playerOne, playerTwo) {
  currGame.players.push(playerOne)
  currGame.players.push(playerTwo)
}

function updatePlayerWins(currWins) {
  playerOneWinNumber.innerText = `${currWins.playerOneWins}`
  playerTwoWinNumber.innerText = `${currWins.playerTwoWins}`
}

// ~~~~~CLICK ON GAME BOARD~~~~

gameBoard.addEventListener("click", function (event) {
  if (event.target.parentNode.className === "game-board") {
    let currWins = tempPlayer.getWinsFromStorage("currentWins")
    let playerOne = currGame.players[0]
    let playerTwo = currGame.players[1]
    let placement = event.target.id
    let currTurn = new Turn(currGame, currWins, playerOne, playerTwo, placement)
    currTurn.wholeTurn(event)
  }
})

function placeToken(event, useThisToken) {
  event.target.classList.add(`${useThisToken}`)
}

function toggleCurrentPlayerDisplay(nextPlayer) {
  if (nextPlayer === "one") {
    currentPlayerOne.classList.remove("hidden")
    currentPlayerTwo.classList.add("hidden")
  }
  if (nextPlayer === "two") {
    currentPlayerOne.classList.add("hidden")
    currentPlayerTwo.classList.remove("hidden")
  }
}

// ~~~~~AFTER WIN~~~~~

function updateTopWinsDisplay(currGame, isPlayerOneTurn) {
  gameTitle.classList.add("hidden")
  if (currGame.isDraw) {
    drawDisplay.classList.remove("hidden")
  } else if (isPlayerOneTurn) {
    playerOneWinDisplay.classList.remove("hidden")
    winsDisplay.classList.remove("hidden")
  } else {
    playerTwoWinDisplay.classList.remove("hidden")
    winsDisplay.classList.remove("hidden")
  }
}

function resetTopWinsDisplay() {
  gameTitle.classList.remove("hidden")
  drawDisplay.classList.add("hidden")
  winsDisplay.classList.add("hidden")
  playerOneWinDisplay.classList.add("hidden")
  playerTwoWinDisplay.classList.add("hidden")
}

function resetBoardDisplay() {
  const bottomAndSide = ["#a", "#b", "#d", "#e"]
  const bottomOnly = ["#c", "#f"]
  const sideOnly = ["#g", "#h"]
  bottomAndSide.forEach(function (thing, place, array) {
    document.querySelector(`${array[place]}`).className = "bot-bor side-bor"
  })
  bottomOnly.forEach(function (thing, place, array) {
    document.querySelector(`${array[place]}`).className = "bot-bor"
  })
  sideOnly.forEach(function (thing, place, array) {
    document.querySelector(`${array[place]}`).className = "side-bor"
  })
  document.querySelector("#i").className = ""
  toggleButtons(false)
  toggleCurrentPlayerDisplay("one")
}

function toggleButtons(onOrOff) {
  // true === off, false === on
  const buttonLetters = ["#a", "#b", "#c", "#d", "#e", "#f", "#g", "#h", "#i"]
  buttonLetters.forEach(function (thing, place, array) {
    document.querySelector(`${array[place]}`).disabled = onOrOff
  })
}