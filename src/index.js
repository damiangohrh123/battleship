class Ship {
  constructor(length, name) {
    this.length = length;
    this.name = name;
    this.hits = 0;
    this.positions = [];
  }

  isSunk() {
    return (this.hits >= this.length) ? true : false;
  }

  hit() {
    this.hits += 1;
  }

  addPosition(x, y) {
    this.positions.push({x, y});
  }
}

class Gameboard {
  constructor(row, col) {
    this.rows = row;
    this.cols = col;
    this.grid = this.createGameboard(this.rows, this.cols);
    this.ships = [];
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

  placeShip(length, name, position, orientation) {
    // Create a new ship
    const ship = new Ship(length, name);

    // Make sure ship is within bounds
    if (
      (orientation === "horizontal" && ship.length + position.x > this.cols) ||
      (orientation === "vertical" && ship.length + position.y > this.rows)
    ) {
      throw new Error("Ship is out of bounds.");
    }

    // Update the positions of the ship object
    for (let i = 0; i < ship.length; i++) {
      if (orientation === "horizontal") {
        ship.addPosition(position.x + i, position.y);
      }
      if (orientation === "vertical") {
        ship.addPosition(position.x, position.y + i);
      }
    }

    // Update the ships array
    this.ships.push(ship);

    return ship;
  }

  recieveAttack(attackPosition) {
    this.grid[attackPosition.x][attackPosition.y].isHit = true;
    for (const ship of this.ships) {
      for (const position of ship.positions) {
        if (attackPosition.x === position.x && attackPosition.y === position.y) {
          ship.hit();
        }
      }
    }
  }
}

const board = new Gameboard(10, 10);

module.exports = {
  Ship,
  Gameboard,
}