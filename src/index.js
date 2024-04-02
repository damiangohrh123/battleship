import "./styles.css";

class Ship {
  constructor(length, name) {
    this.length = length;
    this.name = name;
    this.hits = 0;
    this.positions = [];
  }

  isSunk() {
    return this.hits >= this.length;
  }

  addPosition(x, y) {
    this.positions.push({x, y});
  }
}

class Player {
  constructor(name) {
    this.name = name;
    this.gameboard = new Gameboard();
  }

  attack(row, col, gameboard) {
    console.log("Attacked" + row + col);

    // Computer gamebard recieve attack
    gameboard.recieveAttack(row, col);
  }
}

class Gameboard {
  constructor() {
    this.rows = 10;
    this.cols = 10;
    this.gameboard = [];
    this.ships = [];
    this.shipIndex = 0;
    this.createGameboard(this.rows, this.cols);
  }

  createGameboard(rows, cols) {
    for(let i = 0; i < rows; i++) {
      let row = [];
      for (let col = 0; col < cols; col++) {
        row.push({ x: col, y: row, isHit: false});
      }
      this.gameboard.push(row);
    }
  }

  updateGameboard(row, col) {
    // Check if there are 5 ships
    if (this.ships.length >= 5) {
      throw new Error("Maximum numberof ships placed.");
    }

    this.placeShip(shipTypes[this.shipIndex].length,
                   shipTypes[this.shipIndex].name,
                   {x: col, y: row},
                   "horizontal");
    this.shipIndex++;
  }

  // For player to place ship
  placeShip(length, name, position, orientation) {
    const ship = new Ship(length, name);

    if (this.isValidPosition(position.x, position.y, ship.length, orientation)) {

      // Update the positions of the ship object, mark the cell as occupied by the ship
      for (let i = 0; i < ship.length; i++) {
        if (orientation === "horizontal") {
          ship.addPosition(position.x + i, position.y);
          this.gameboard[position.x + i][position.y] = ship;
        }
        if (orientation === "vertical") {
          ship.addPosition(position.x, position.y + i);
          this.gameboard[position.x][position.y + i] = ship;
        }
      }

      // Update the ships array
      this.ships.push(ship);
      console.log(this.ships);

    } else {
      throw new Error("Ship cannot be placed here!");
    }
  }

  // Place random ships for the computer gameboard
  placeRandomShip(index) {
    const shipType = shipTypes[index];
    const ship = new Ship(shipType.length, shipType.name);

    // Randomize orientation
    const orientation = Math.random() < 0.5 ? "horizontal" : "vertical";

    let isValidPlacement = false;

    // Keep geerating random coordinates until it is valid
    while (!isValidPlacement) {
      let randomX = Math.floor(Math.random() * this.rows);
      let randomY = Math.floor(Math.random() * this.cols);
      
      if (this.isValidPosition(randomX, randomY, ship.length, orientation)) {
        this.placeShip(ship.length, ship.name, {x: randomX, y: randomY}, orientation);
        isValidPlacement = true;
      }
    }
  }

  isValidPosition(x, y, length, orientation) {
    if (orientation === "horizontal" && x + length > this.cols) {
        return false;
    }
    if (orientation === "vertical" && y + length > this.rows) {
        return false;
    }

    for (let i = 0; i < length; i++) {
        if (orientation === "horizontal" && this.gameboard[x + i][y] instanceof Ship) {
            return false;
        }
        if (orientation === "vertical" && this.gameboard[x][y + i] instanceof Ship) {
            return false;
        }
    }
    return true;
}

  recieveAttack(row, col) {
    this.gameboard[row][col].isHit = true;

    // Search through array of ships' position to check if it was hit
    for (let i = 0; i < this.ships.length; i++) {
      const ship = this.ships[i];
      for (const position of ship.positions) {

        if (col === position.x && row === position.y) {
          ship.hits += 1;

          if (ship.isSunk()) {
            console.log("sunk");
            // Remove ship from ships array
            this.ships.splice(i, 1);
          }
        }
      }
    }
  }
}

class Game {
  constructor(player1, computer) {
    this.player1 = player1;
    this.computer = computer;
    this.player1Gameboard = player1.gameboard;
    this.computerGameboard = computer.gameboard;
    this.currentPlayerIndex = 0;
    this.winner = null;
    this.phase = "placing";
    
    // Populate the computer gameboard with random ships
    for (let i = 0; i < shipTypes.length; i++) {
      this.computer.gameboard.placeRandomShip(i);
    }
  }

  play(row, col, playerIndex) {
    if (this.phase === "placing" && playerIndex === 0) {
      this.player1.gameboard.updateGameboard(row, col);

      // Update hase to playing and stop ship placement
      if (this.player1.gameboard.ships.length >= 5) {
        this.phase = "playing";
        console.log("Playing phase");
      }

    } else if (this.phase === "playing" && playerIndex === 1) {
      this.player1.attack(row, col, this.computerGameboard);
    }
  }
}

class UI {
  constructor(game) {
    this.content = document.querySelector(".content");
    this.game = game;
    this.player1 = this.game.player1;
    this.computer = this.game.computer;
    this.player1Gameboard = this.player1.gameboard;
    this.computerGameboard = this.computer.gameboard;
    this.initUI();
  }

  initUI() {
    this.renderGameboard(this.player1Gameboard, "playerGameboard", 0);
    this.renderGameboard(this.computerGameboard, "computerGameboard", 1);
  }

  renderGameboard(gameboard, name, playerIndex) {
    const gameboardElement = document.createElement("div");
    gameboardElement.classList.add(name);

    // Clear the existing gameboard
    gameboardElement.innerHTML = '';

    for (let i = 0; i < gameboard.rows; i++) {
      for (let j = 0; j < gameboard.cols; j++) {

        const cell = document.createElement("div");
        cell.setAttribute("id", `cell-${i}-${j}`);

        // Check if the cell corresponds to a ship position
        const isShipPosition = gameboard.gameboard[i][i] instanceof Ship;
        cell.classList.add((isShipPosition) ? "ship" : "cell");

        if (gameboard.gameboard[j][i] instanceof Ship) {
          cell.classList.add("ship");
        } else {
          cell.classList.add("cell");
        }

        // Add event listener to cell
        cell.addEventListener("click", () => {

          // Prevent multiple attacks on the same cell
          if (gameboard.gameboard[i][j].isHit) {
            console.log("This cell has already been attacked.");
            return;
          }

          this.game.play(i, j, playerIndex);
          this.updateGameboard(gameboard, name);
        });

        gameboardElement.append(cell);
      }
    }
    this.content.append(gameboardElement);
  }

  updateGameboard(gameboard, name) {
    const gameboardElement = document.querySelector('.' + name);

    for (let i = 0; i < gameboard.rows; i++) {
      for (let j = 0; j < gameboard.cols; j++) {
        const cell = gameboardElement.querySelector(`#cell-${i}-${j}`);

        if (gameboard.gameboard[i][j].isHit) {
          cell.classList.add("isHit");
        }
        if (gameboard.gameboard[i][j] instanceof Ship) {
          cell.classList.add("ship");
        }
      }
    }
  }
}

// Initialize ship types
const shipTypes = [
  {name: "carrier", length: 5},
  {name: "battleship", length: 4},
  {name: "destroyer", length: 3},
  {name: "submarine", length: 3},
  {name: "patrol boat", length: 2}
]

// Initialize the game and UI
const game = new Game(new Player("player1"), new Player("computer"));
const ui = new UI(game);


export {
  Ship,
  Gameboard,
}