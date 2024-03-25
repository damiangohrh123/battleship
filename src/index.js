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
    this.rows = row;
    this.cols = col;
    this.grid = this.createGameboard(this.rows, this.cols);
  }

  createGameboard(row, col) {
    let grid = [];
    for(let i = 0; i < row; i++) {
      let row = [];
      for (let j = 0; j < col; j++) {
        row.push({ x: i, y: j, isHit: false});
      }
      grid.push(row);
    }
    return grid;
  }

  placeShip(ship, position, orientation) {
    if (
      (orientation === "horizontal" && ship.length + position.x > this.cols) ||
      (orientation === "vertical" && ship.length + position.y > this.rows)
    ) {
      throw new Error("Ship is out of bounds.");
    }

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

  recieveAttack(position) {
    this.grid[position.x][position.y].isHit = true;
  }
}

module.exports = {
  Ship,
  Gameboard,
}