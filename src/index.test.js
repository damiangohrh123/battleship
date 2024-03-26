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
          expect(board.grid[i][j]).toEqual({x: i, y: j, isHit: false});
        }
      }
    });
  });

  describe("Placing ship", () => {
    test("Placing ships horizontally", () => {
      board.placeShip(3, "submarine", {x: 2, y: 3}, "horizontal");
      const horizontalShipPositions = [{ x: 2, y: 3 }, { x: 3, y: 3 }, { x: 4, y: 3 }];
      expect(board.ships[0].positions).toEqual(horizontalShipPositions);
    });

    test("Placing ships vertically", () => {
      board.placeShip(3, "submarine", {x: 2, y: 3}, "vertical");
      const verticalShipPositions = [{ x: 2, y: 3 }, { x: 2, y: 4 }, { x: 2, y: 5 }];
      expect(board.ships[0].positions).toEqual(verticalShipPositions);
    });
  
    test("Placing ships out of bounds", () => {
      // Try placing ship out of bounds initally
      try {
        board.placeShip(3, "submarine", {x: 10, y: 10}, "horizontal");
      } catch(error) {
        expect(error.message).toBe("Ship is out of bounds.");
      }

      // Try placing ship in bounds initially, but the length of ship will be out of bounds
      try {
        board.placeShip(3, "submarine", {x: 8, y: 8}, "horizontal");
      } catch(error) {
        expect(error.message).toBe("Ship is out of bounds.")
      }
    });
  });

  describe("Recieve attacks", () => {
    test("Check if attack hits the water", () => {
      board.recieveAttack({x: 5, y: 5});
      expect(board.grid[5][5].isHit).toBe(true);
    });

    test("Check if attack hits a ship", () => {
      board.placeShip(3, "submarine", {x: 5, y: 5}, "horizontal");
      board.recieveAttack({x: 5, y: 5});
      expect(board.grid[5][5].isHit).toBe(true);
      expect(board.ships[0].hits).toBe(1);
    })
  });
})