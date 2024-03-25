const index = require("./index");


describe("Ship", () => {
  let ship;

  beforeEach(() => {
    ship = new index.Ship(3);
  });

  test("Ship creation", () => {
    expect(ship.length).toBe(3);
    expect(ship.hits).toBe(0);
  });

  test("Ship isSunk", () => {
    expect(ship.isSunk()).toBe(false);
  });
})

describe("Gameboard", () => {
  let board;

  beforeEach(() => {
    board = new index.Gameboard(10, 10);
  });

  test("Gameboard creation with correct dimensions (10 x 10)", () => {
    // Check if grid has correct dimensions
    expect(board.grid.length).toBe(10);
    board.grid.forEach(row => {
      expect(row.length).toBe(10);
    })

    // Check if each cell contains the expected coordinates
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        expect(board.grid[i][j]).toEqual({ x: i, y: j });
      }
    }
  });

  test("Placing ships horizontally on board", () => {
    const ship = new index.Ship(3);
    const position = { x: 2, y: 3};
    const orientation = "horizontal";
    
    // Place the ship
    board.placeShip(ship, position, orientation);
    
    // Verify if ship is placed at correct coorrdinates
    expect(board.grid[position.x][position.y]).toBe(ship);
  });
})