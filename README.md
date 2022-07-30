## Chess Game

This game is for two player where grid's rows are fixed 5(can be change with little twick, i fixed it in order to complete game as soon as possible) and cols are dependends upon Players.

## Classes:
	1. Character: This contains the common character variables and related methods. This is similar to abstract class which is inherited by Pawn, Hero1, Hero2, Hero3.

	2. Direction: This gives the Direction of player in grid.
		example:  Player A Direction will be -1 as rows will be decreased(he moves in upside direction) and  Player B, Direction will be 1 as rows will be increased(he moves in downside direction) in grid.

	3. Grid: This contains the Grid and it's related operations.
	
	4. Pawn: This class, inherit Character and uses all the super class methods. This class passes steps and commands used by Character pawn to super class. This class uses super class's default moveValidator method.
	
	5. Hero1: This class, inherit Character and use all the super class methods. This class passes steps and commands used by Character Hero1 to super class. This class uses super class's default moveValidator method.

	6. Hero2: This class, inherit Character and use all the super class methods. Hero2 can take 2 steps at a time but only in straight direction(FL, FR, BL, BR) and override moveValidator method of Character class.  
	
	7. Hero3: This class, inherit Character and use all the super class methods. This class passes steps and commands used by Character Hero3 where steps are 2 at a time but only in diagonal direction(FL, FR, BL, BR, RF, RB, LF, and LB) and override moveValidator method of Character class.

## Commands for Pawns, Hero1, Hero2 and Hero3
Pawn: In one move, it moves 1 block straight in any direction(L, R, F, B).
Hero1: In one move, it moves 2 blocks straight in any direction(L, R, F, B), and kills anything in its path.
Hero2: In one move, it moves 2 blocks diagonally in any direction(FL, FR, BL, BR), and kills anything in its path.
Hero3: In one move, it moves 2 steps straight and one to the side, and kills only where it finally lands. Moves are FL, FR, BL, BR, RF, RB, LF, and LB.
example: H3:FR means it moves 2 steps front and one to the right, H3:RF means it moves 2 steps right and one to the front.

## Player Input:
Player's input are handled by commandlinereader.js file for different scenarios.
 1. All input should be in captial letters(case sensitive).
 2. I have given priviledge to PlayerA to decide how many characters can be in game like [1..n] Pawn, [0,1]Hero1, [0,1]Hero2, [0,1]Hero3
 	example: I/p: P1, P3, H1, H3, H2.(Assumption: First Player should always have some priviledge than other Players in order to make game interesting). here P can without Id like P(recommanded give input with Ids).
 3. Due to above constraint PlayerB has to give necessarly the same number of characters as PlayerA(not necessarily the same characters(Second Player Priviledge as why should PlayerA have all the fun)). 
 4. Grid is having 5 rows by default(can be twick by change of number), number of columns will be based upon PlayerA's input.

## Invalid moves
invalid moves for a player:
	a. Input command on a character that does not exist.(covered)
	b. Character going out of grid bounds.(covered)
	c. Invalid move presented for a given character.(covered)
	d. Targeting a friendly character, i.e a character from our own team.(covered)


## How to run this program:
	First go inside chess package then run the below given commands:
	npm install
	node index.js
	

## Example 1:
Player1 Input: 
P3, P2, P5, P4, P1, H1, H2, H3
Current Grid:

	-	-	-	-	-	-	-	-

	-	-	-	-	-	-	-	-

	-	-	-	-	-	-	-	-

	-	-	-	-	-	-	-	-

	A-P3	A- P2	A- P5	A- P4	A- P1	A- H1	A- H2	A- H3


Player2 Input: 
P2, P1, P3, P5, P4, H1, H2, H3

Player2 Input: 
Current Grid:

	B-P2	B- P1	B- P3	B- P5	B- P4	B- H1	B- H2	B- H3

	-	-	-	-	-	-	-	-

	-	-	-	-	-	-	-	-

	-	-	-	-	-	-	-	-

	A-P3	A- P2	A- P5	A- P4	A- P1	A- H1	A- H2	A- H3


Player A's Move: 
H3:FL
Current Grid:

	B-P2	B- P1	B- P3	B- P5	B- P4	B- H1	B- H2	B- H3

	-	-	-	-	-	-	-	-

	-	-	-	-	-	-	A- H3	-

	-	-	-	-	-	-	-	-

	A-P3	A- P2	A- P5	A- P4	A- P1	A- H1	A- H2	-


Player B's Move: 
> H2:B

Player B's Move: 
H2:F

Player B's Move: 
H2:FR
Current Grid:

	B-P2	B- P1	B- P3	B- P5	B- P4	B- H1	-	B- H3

	-	-	-	-	-	-	-	-

	-	-	-	-	B- H2	-	A- H3	-

	-	-	-	-	-	-	-	-

	A-P3	A- P2	A- P5	A- P4	A- P1	A- H1	A- H2	-


Player A's Move: 
H3:FR
Current Grid:

	B-P2	B- P1	B- P3	B- P5	B- P4	B- H1	-	A- H3

	-	-	-	-	-	-	-	-

	-	-	-	-	B- H2	-	-	-

	-	-	-	-	-	-	-	-

	A-P3	A- P2	A- P5	A- P4	A- P1	A- H1	A- H2	-





## Example 2:
node index.js

Player1 Input: 
W3

Player1 Input: 
P1
Current Grid:

	-

	-

	-

	-

	A-P1


Player2 Input: 
P2

Player2 Input: 
Current Grid:

	B-P2

	-

	-

	-

	A-P1


Player A's Move: 
P3

Player A's Move: 
P4

Player A's Move: 
P1

Player A's Move: 
> P1-F

Player A's Move: 
P1:F
Current Grid:

	B-P2

	-

	-

	A-P1

	-


Player B's Move: 
P2:W

Player B's Move: 
P2:Q

Player B's Move: 
P2:B

Player B's Move: 
P2:F
Current Grid:

	-

	B-P2

	-

	A-P1

	-


Player A's Move: 
P1:F
Current Grid:

	-

	B-P2

	A-P1

	-

	-


Player B's Move: 
P2:F
Current Grid:

	-

	-

	B-P2

	-

	-

Player B is winner.
