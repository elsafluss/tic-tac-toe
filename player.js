class Player {
  constructor(playerName, playerToken) {
    this.playerName = playerName;
    this.playerToken = playerToken;
    this.winCount = 0;
    this.wins = [];
  }

  // saveWinsToStorage(playerId) {
  //   this.getPlayerFromStorage(playerId)
  //   // this.winCount++
  //   JSON.stringify('playerId')
  //   localStorage.setItem('playerId', playerId)
  // }
  //
  // getWinsFromStorage(playerId) {
  //   // getPlayerFromStorage()
  //   // return this.winCount
  // }
  //
  // getPlayerFromStorage(playerId) {
  //   JSON.parse(localStorage.getItem(playerId))
  // }
}