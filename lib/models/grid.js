var Grid = {
	// Constants (created as private static attributes).
	grid: [],
	rows: 5,

	initializeGrid: function(totalCharacters){
		//create grid of size rows*totalCharacters with initial value of '-'
		this.grid = [...Array(this.rows)].map(x => Array(totalCharacters).fill("-"));
	},

	addCharacters: function(row, characters){
		for(let col=0;col<characters.length;col++){
			this.grid[row][col] = characters[col];
		}
	},

	displayGrid: function(){
		console.log("Current Grid:\n");
		for (let row = 0; row < this.grid.length; row++) {
			console.log(this.rowFormatter(this.grid[row])+"\n");
		}
	},

	rowFormatter: function(gridRow){
		return gridRow.reduce((col1, col2) => `${col1}\t${col2}`, '');
	},

	removeCharacterFromGrid: function(row, col){
		this.grid[row][col]="-";
	},

	updatePlayerPositionOnGrid: function(prevRow, prevCol, row, col){
		this.grid[row][col]=this.grid[prevRow][prevCol];
		this.grid[prevRow][prevCol]="-";
	},

	validateGrid: function(totalCharacters){	
		//if number of players given by Player2 is not equals to Player1's character
		if(this.grid[0].length!=totalCharacters){
			console.log("Please enter the same number of characters as Player1");
			return false;
		}
		return true;
	},

	getRows: function(){
		return this.rows;
	},

	getGrid: function(){
		return this.grid;
	}
}

module.exports = Grid;