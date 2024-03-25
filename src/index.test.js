const index = require("./index");


describe("Ship", () => {
  let ship;

  beforeEach(() => {
    ship = new index.Ship(3, "submarine");
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
    const ship = new index.Ship(3, "submarine");
    const position = { x: 2, y: 3};
    const orientation = "horizontal";
    
    board.placeShip(ship, position, orientation);

    // Verify if ship is placed at correct coordinates and orientation
    expect(board.grid[position.x][position.y]).toBe(ship);
    expect(board.grid[position.x][position.y + 1]).toBe(ship);
    expect(board.grid[position.x][position.y + 2]).toBe(ship);
  });

  test("Placing ships vertically on board", () => {
    const ship = new index.Ship(3, "submarine");
    const position = { x: 2, y: 3};
    const orientation = "vertical";

    board.placeShip(ship, position, orientation);

    // Verify if ship is placed at correct coordinates and orientation
    expect(board.grid[position.x][position.y]).toBe(ship);
    expect(board.grid[position.x + 1][position.y]).toBe(ship);
    expect(board.grid[position.x + 2][position.y]).toBe(ship);
  });

  test("Placing ships out of bounds", () => {
    const ship = new index.Ship(3, "submarine");
    const position = { x: 10, y: 10};
    const orientation = "horizontal";

    board.placeShip(ship, position, orientation);

    // Verify if ship is not placed
    try {
      board.placeShip(ship, position, orientation);
    } catch(error) {
      expect(error.message).toBe("Ship is out of bounds.")
    }
  });
})