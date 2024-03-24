class Ship {
  constructor(length) {
    this.length = length;
    this.hits = 0;
  }

  isSunk() {
    return (this.hits >= this.length) ? true : false;
  }
}

module.exports = {
  Ship,
}