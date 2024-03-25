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
    board = new index.Gameboard();
  });

  test("Gameboard creation with correct dimensions", () => {
    // Check if grid has correct dimensions
    expect(board.grid.length).toBe(100);

    // Check if each cell contains the expected coordinates
    let index = 0;
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        expect(board.grid[index]).toEqual({ x: j, y: i });
        index++;
      }
    }
  });
})