// @flow

/**
 * Creates a random multidimensional array, which represents a population
 *
 * @param {number} sideCellAmount - amount of cells on each side of the square in the grid
 * @return {array} commonPopulation
 */
const createPopulation = (sideCellAmount: number): any => {
	if(sideCellAmount > 1) {
		const remainderSideCellAmount: number = sideCellAmount;
		const commonPopulation: Array<Array<number>> = [];
		const createPopulation = (sideCellAmount: number, remainderSideCellAmount: number, commonPopulation: Array<Array<number>>): Array<Array<number>> => {
		const population: Array<number> = [];
			for(let i: number = 0; i < sideCellAmount; i++) {
				population.push(Math.round(Math.random()));
			}
			commonPopulation.push(population);
			return (--remainderSideCellAmount == 0) ? commonPopulation : createPopulation(sideCellAmount, remainderSideCellAmount, commonPopulation);
		}
		return createPopulation(sideCellAmount, remainderSideCellAmount, commonPopulation);
	}
	return [];
}

/**
 * Changes a population, which represents a new generation
 *
 * @param {array} currentCommonPopulation - a multidimensional array
 * @return {array} newCommonPopulation
 */
const updatePopulation = (currentCommonPopulation: Array<Array<number>>): Array<Array<number>> => {
	const newCommonPopulation: Array<Array<number>> = [];
	for(let outerCounter: number = 0; outerCounter < currentCommonPopulation.length; outerCounter++) {
		const population: Array<number> = [];
		for(let innerCounter: number = 0; innerCounter < currentCommonPopulation[outerCounter].length; innerCounter++) {
			let quantityOfAliveNeighbours: number = 0;
			if(currentCommonPopulation[outerCounter][innerCounter - 1] !== undefined) quantityOfAliveNeighbours += currentCommonPopulation[outerCounter][innerCounter - 1]; // prev in a row
			if(currentCommonPopulation[outerCounter][innerCounter + 1] !== undefined) quantityOfAliveNeighbours += currentCommonPopulation[outerCounter][innerCounter + 1]; // next in a row

			if(currentCommonPopulation[outerCounter - 1] !== undefined) {
				if(currentCommonPopulation[outerCounter - 1][innerCounter] !== undefined) quantityOfAliveNeighbours += currentCommonPopulation[outerCounter - 1][innerCounter]; // prev in a column
				if(currentCommonPopulation[outerCounter - 1][innerCounter - 1] !== undefined) quantityOfAliveNeighbours += currentCommonPopulation[outerCounter - 1][innerCounter - 1]; // prev in a column and prev in a row
				if(currentCommonPopulation[outerCounter - 1][innerCounter + 1] !== undefined) quantityOfAliveNeighbours += currentCommonPopulation[outerCounter - 1][innerCounter + 1]; // prev in a column and next in a column
			}

			if(currentCommonPopulation[outerCounter + 1] !== undefined) {
				if(currentCommonPopulation[outerCounter + 1][innerCounter] !== undefined) quantityOfAliveNeighbours += currentCommonPopulation[outerCounter + 1][innerCounter]; // next in a column
				if(currentCommonPopulation[outerCounter + 1][innerCounter - 1] !== undefined) quantityOfAliveNeighbours += currentCommonPopulation[outerCounter + 1][innerCounter - 1]; // next in a column and prev in a row
				if(currentCommonPopulation[outerCounter + 1][innerCounter + 1] !== undefined) quantityOfAliveNeighbours += currentCommonPopulation[outerCounter + 1][innerCounter + 1]; // next in a column and next in a row
			}

			if(currentCommonPopulation[outerCounter][innerCounter] === 0) { // if the current cell is dead
				if(quantityOfAliveNeighbours === 3) {
					population.push(1);
				} else {
					population.push(0);
				}
			} else { // if the current cell is alive
				if(quantityOfAliveNeighbours < 2) {
					population.push(0);
				} else if(quantityOfAliveNeighbours === 2 || quantityOfAliveNeighbours === 3) {
					population.push(1);
				} else if(quantityOfAliveNeighbours > 3) {
					population.push(0);
				}
			}
		}
		newCommonPopulation.push(population);
	}
	return newCommonPopulation;
}

module.exports = {
  createPopulation,
  updatePopulation
};