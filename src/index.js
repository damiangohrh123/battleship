class Ship {
  constructor(length, name) {
    this.length = length;
    this.name = name;
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

  placeShip(ship, position, orientation) {
    // Horizonatal placement
    if (orientation === "horizontal") {
      for (let i = 0; i < ship.length; i++) {
        this.grid[position.x][position.y + i] = ship;
      }
    }
    if (orientation === "vertical") {
      for (let i = 0; i < ship.length; i++) {
        this.grid[position.x + i][position.y] = ship;
      }
    }
  }
}

module.exports = {
  Ship,
  Gameboard,
}