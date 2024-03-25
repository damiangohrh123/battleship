const index = require("./index");


describe("Ship", () => {
  const ship = new index.Ship(3, "submarine");

  test("Ship creation", () => {
    expect(ship.length).toBe(3);
    expect(ship.hits).toBe(0);
    expect(ship.isSunk()).toBe(false);
  });
})

describe("Gameboard", () => {
  let board;
  beforeEach(() => {
    board = new index.Gameboard(10, 10);
  });

  describe("Gameboard creation", () => {

    test("Gameboard creation with correct dimensions (10 x 10)", () => {
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
  });

  describe("Placing ship", () => {
    let ship;
    beforeEach(() => {
      ship = new index.Ship(3, "submarine");
    });

    test("Placing ships horizontally & vertically on board", () => {
      board.placeShip(ship, {x: 2, y: 3}, "horizontal");
      expect(board.grid[2][3]).toBe(ship);
      expect(board.grid[2][3 + 1]).toBe(ship);
      expect(board.grid[2][3 + 2]).toBe(ship);

      board.placeShip(ship, {x: 2, y: 3}, "vertical");
      expect(board.grid[2][3]).toBe(ship);
      expect(board.grid[2 + 1][3]).toBe(ship);
      expect(board.grid[2 + 2][3]).toBe(ship);
    });
  
    test("Placing ships out of bounds", () => {
      // Try placing ship out of bounds initally
      try {
        board.placeShip(ship, {x: 10, y: 10}, "horizontal");
      } catch(error) {
        expect(error.message).toBe("Ship is out of bounds.");
      }

      // Try placing ship in bounds initially, but the length of ship will be out of bounds
      try {
        board.placeShip(ship, {x: 8, y: 8}, "horizontal");
      } catch(error) {
        expect(error.message).toBe("Ship is out of bounds.")
      }
    });
  });

  describe("Recieve attacks", () => {
    test("Check if attack hits the water", () => {
      board.recieveAttack({x: 5, y: 5});
      expect(board.grid[5][5].hit).toBe(true);
    });
  });
})