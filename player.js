class Player {
  constructor(playerId, playerToken) {
    this.playerId = playerId;
    this.playerToken = playerToken;
    this.winCount = 0;
    this.wins = [];
  }

  saveWinsToStorage(playerId) {
    // getPlayerFromStorage()
    // this.winCount++
    // stringify it
    // put it back in localStorage
  }

  getWinsFromStorage(playerId) {
    // getPlayerFromStorage()
    // return this.winCount
  }

  getPlayerFromStorage(playerId) {
    // get player array from localStorage by playerId
    // JSON.parse it
  }
}