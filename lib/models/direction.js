var Direction = {
	// Constants (created as private static attributes).
	directions: {
		UPPER: -1,
		LOWER: 1
	},

	getDirection: function(direction){
		return this.directions[direction];
	}
}

module.exports = Direction;