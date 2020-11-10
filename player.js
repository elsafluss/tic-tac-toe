class Player {
  constructor(playerName, playerToken) {
    this.playerName = playerName;
    this.playerToken = playerToken;
    this.winCount = 0;
  }

  getWinsFromStorage() {
    var currentWins = JSON.parse(localStorage.getItem("currentWins"))
    return currentWins
  }

  saveWinsToStorage(currentWins) {
    var saveTheseWins = JSON.stringify(currentWins)
    localStorage.setItem("currentWins", saveTheseWins)
  }
}