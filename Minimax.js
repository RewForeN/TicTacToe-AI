
class Minimax {

	constructor(humanPlayer, aiPlayer) {
		this.humanPlayer = humanPlayer;
		this.aiPlayer = aiPlayer;
	}

	makeMove(board) {

		let best = {
			index: -1,
			score: -Infinity
		};

		for (let i = 0; i < 9; i++) {
			if (board.get(i) !== "") continue;
			let score = this.minimax(board, i, true, 1);
			if (score > best.score) {
				best.index = i;
				best.score = score;
			}
		}

		let result = board.move(best.index, this.aiPlayer);

		if (!result) console.log("AI Could not find a move");

		return result;

	}

	minimax(board, index, isMaximizing, depth) {

		const scores = {
			"X": 10,
			"O": -10,
			"T": 0
		}

		let p = (isMaximizing) ? "X" : "O";

		board = board.clone();
		board.set(index, p);

		if (board.hasWinner()) return scores[board.winner().player] / depth;

		let value;

		if (isMaximizing) {
			value = -Infinity;
			for (let i = 0; i < 9; i++) {
				if (board.get(i) !== "") continue; 
				value = max(value, this.minimax(board, i, false, depth + 1));
			}
			return value;
		}
		else {
			value = Infinity;
			for (let i = 0; i < 9; i++) {
				if (board.get(i) !== "") continue;
				value = min(value, this.minimax(board, i, true, depth + 1));
			}
			return value;
		}

	}

}
