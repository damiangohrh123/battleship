const index = require("./index");


describe("Ship", () => {
  let ship;

  beforeEach(() => {
    ship = new index.Ship(3);
  })

  test("Ship creation", () => {
    expect(ship.length).toBe(3);
    expect(ship.hits).toBe(0);
    expect(ship.isSunk()).toBe(false);
  });

})