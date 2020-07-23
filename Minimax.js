
class Minimax {

	constructor(humanPlayer, aiPlayer) {
		this.humanPlayer = humanPlayer;
		this.aiPlayer = aiPlayer;
	}

	makeMove(board) {

		let index = this.getMove(board);
		board.move(index, this.aiPlayer);

	}

	getMove(board) {

		let best = {
			index: -1,
			score: -Infinity
		};

		for (let i = 0; i < 9; i++) {
			if (board.get(i) !== "") continue;
			let score = this.minimax(i, 1, true, board);
			if (score > best.score) {
				best.index = i;
				best.score = score;
			}
		}

		if (best.score > 0) {
			let moves = Math.round(100 / best.score) - 1;
			//console.log("AI has 100% chance of winning.\nYou will lose in " + moves + " moves.");
		}
		
		return best.index;

	}

	minimax(index, depth, isMaximizing, board) {

		// Identify current player 
		let player = this.getPlayerFromMaximizingState(isMaximizing);

		// Clone board and move at the desired index
		board = board.clone();
		board.set(index, player);

		// Check winning state
		if (board.hasWinner()) {
			let s = (player === this.aiPlayer) ? 100 : -100;
			return (board.winner().player === "T") ? 0 : s / depth;
		}

		// Switch current player
		isMaximizing = !isMaximizing;

		let value;

		// Find current player's next best move
		if (isMaximizing) {
			value = -Infinity;
			for (let i = 0; i < 9; i++) {
				if (board.get(i) !== "") continue;
				value = max(value, this.minimax(i, depth + 1, isMaximizing, board));
			}
			return value;
		}
		else {
			value = Infinity;
			for (let i = 0; i < 9; i++) {
				if (board.get(i) !== "") continue;
				value = min(value, this.minimax(i, depth + 1, isMaximizing, board));
			}
			return value;
		}

	}

	getPlayerFromMaximizingState(isMaximizing) {

		if (isMaximizing) {
			return this.aiPlayer;
		}
		else {
			return this.humanPlayer;
		}

	}

}
