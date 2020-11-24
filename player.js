class Player {
  constructor(playerName, playerToken) {
    this.playerName = playerName;
    this.playerToken = playerToken;
    this.winCount = 0;
  }

  getWinsFromStorage() {
    let currWins = JSON.parse(localStorage.getItem("currentWins"))
    return currWins
  }

  saveWinsToStorage(currWins) {
    let saveTheseWins = JSON.stringify(currWins)
    localStorage.setItem("currentWins", saveTheseWins)
  }
}