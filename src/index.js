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
  constructor() {
    this.grid = this.createGameboard(10, 10);
  }

  createGameboard(rows, cols) {
    let grid = [];
    for(let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        grid.push({ x: j, y: i});
      }
    }
    return grid;
  }
}

module.exports = {
  Ship,
  Gameboard,
}