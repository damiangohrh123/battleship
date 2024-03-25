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
    board = new Gameboard();
  });

  test("Gameboard creation", () => {
    // Check the rows and columms of the gameboad
    expect(board.grid.length).toBe(10);
    expect(board.grid[0].length).toBe(10);
  });
})