/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((module) => {

eval("class Ship {\n  constructor(length, name) {\n    this.length = length;\n    this.name = name;\n    this.hits = 0;\n    this.positions = [];\n  }\n\n  isSunk() {\n    return (this.hits >= this.length) ? true : false;\n  }\n\n  hit() {\n    this.hits += 1;\n  }\n\n  addPosition(x, y) {\n    this.positions.push({x, y});\n  }\n}\n\nclass Gameboard {\n  constructor(row, col) {\n    this.rows = row;\n    this.cols = col;\n    this.grid = this.createGameboard(this.rows, this.cols);\n    this.ships = [];\n  }\n\n  createGameboard(row, col) {\n    let grid = [];\n    for(let i = 0; i < row; i++) {\n      let row = [];\n      for (let j = 0; j < col; j++) {\n        row.push({ x: i, y: j, isHit: false});\n      }\n      grid.push(row);\n    }\n    return grid;\n  }\n\n  placeShip(ship, position, orientation) {\n    // Make sure ship is within bounds\n    if (\n      (orientation === \"horizontal\" && ship.length + position.x > this.cols) ||\n      (orientation === \"vertical\" && ship.length + position.y > this.rows)\n    ) {\n      throw new Error(\"Ship is out of bounds.\");\n    }\n\n    // Update the positions of the ship object\n    for (let i = 0; i < ship.length; i++) {\n      if (orientation === \"horizontal\") {\n        ship.addPosition(position.x + i, position.y);\n      }\n      if (orientation === \"vertical\") {\n        ship.addPosition(position.x, position.y + i);\n      }\n    }\n\n    // Update the ships array\n    this.ships.push({ship, position, orientation});\n  }\n\n  recieveAttack(attackPosition) {\n    this.grid[attackPosition.x][attackPosition.y].isHit = true;\n    for (const ship of this.ships) {\n      for (const position of ship.positions) {\n        if (attackPosition === position) {\n          ship.hit();\n        }\n      }\n    }\n  }\n}\n\nmodule.exports = {\n  Ship,\n  Gameboard,\n}\n\n//# sourceURL=webpack://battleship/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;