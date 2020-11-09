class Player {
  constructor(playerName, playerToken) {
    this.playerName = playerName;
    this.playerToken = playerToken;
    this.winCount = 0;
  }

  saveWinsToStorage(currentWins) {
    var saveTheseWins = JSON.stringify(currentWins)
    localStorage.setItem("currentWins", saveTheseWins)
  }

  getWinsFromStorage() {
    var currentWins = JSON.parse(localStorage.getItem("currentWins"))
    return currentWins
  }
}