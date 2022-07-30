//this method will check gamestatus after every player's move
let checkGameStatus = async (grid) => {
	let totalTeamAPlayers=0, totalTeamBPlayers=0, type;
	for(let row=0;row<grid.length;row++){
		for(let col=0;col<grid[0].length;col++){
			[type, ]=grid[row][col].split("-");
			if(type=="A"){
				totalTeamAPlayers++;
			}
			else{
				totalTeamBPlayers++;
			}
		}
	}
	if(totalTeamAPlayers==0){
		console.log("Player B is winner.");
		process.exit(0);
	}
	else if(totalTeamBPlayers==0){
		console.log("Player A is winner.");
		process.exit(0);
	}
}

module.exports = {
	checkGameStatus
};