class Ship {
  constructor(length) {
    this.length = length;
    this.hits = 0;
  }

  isSunk() {
    return (this.hits >= this.length) ? true : false;
  }
}

class Gameboard {
  constructor(row, col) {
    this.grid = this.createGameboard(row, col);
  }

  createGameboard(row, col) {
    let grid = [];
    for(let i = 0; i < row; i++) {
      let row = [];
      for (let j = 0; j < col; j++) {
        row.push({ x: i, y: j});
      }
      grid.push(row);
    }
    return grid;
  }
}

module.exports = {
  Ship,
  Gameboard,
}