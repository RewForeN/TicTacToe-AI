
class Board {

	constructor() {
		this.board = [
			"", "", "",
			"", "", "",
			"", "", ""
		];
	}

	get(i) {
		return this.board[i];
	}

	set(i, p) {
		this.board[i] = p;
	}

	move(i, p) {

		if (p !== "X" && p !== "O") {
			console.log("%cInvalid move: '" + p + "' is not a player.", "color: #fc6603");
			return false;
		}

		if (i < 0 || i > 8) {
			console.log("%cInvalid move: '" + i.toString() + "' is not a valid square.", "color: #fc6603");
			return false;
		}

		if (this.board[i] !== "") {
			console.log("%cInvalid move: Someone has already moved there.", "color: #fc6603");
			return false;
		}

		this.board[i] = p;
		return true;

	}

	winner() {

		const lines = [
			[0, 1, 2], [3, 4, 5], [6, 7, 8], 	// Horizontal
			[0, 3, 6], [1, 4, 7], [2, 5, 8], 	// Vertical
			[0, 4, 8], [2, 4, 6]				// Diagonal
		];

		let player = null;
		let line = null;

		// Check for winner
		for (let i = 0; i < lines.length; i++) {
			let l = lines[i];
			let p = this.board[l[0]];
			if (p !== "" && p === this.board[l[1]] && p === this.board[l[2]]) {
				player = p;
				line = l;
				break;
			}
		}

		// Check for draw
		if (player === null) {
			for (let i = 0; i < 9; i++) {
				if (this.board[i] === "") break;
				else if (i === 8) player = "T";
			}
		}
		
		return {
			player: player,
			line: line
		}

	}

	hasWinner() {

		return this.winner().player !== null;

	}
	
	clone() {

		let b = new Board();

		for (let i = 0; i < 9; i++) {
			b.set(i, this.board[i]);
		}

		return b;

	}

	toNNInputs() {

		let inputs = [];

		for (let i = 0; i < 9; i++) {
			if (this.board[i] === "X") 		inputs[i] = -1;
			else if (this.board[i] === "O") inputs[i] = 1;
			else 							inputs[i] = 0;
		}

		return inputs;

	}

	static randomBoard() {

		let b = new Board();
		let next = "X";

		for (let i = 0; i < 9; i++) {
			let p = "";
			let r = Math.floor(Math.random() * 2);
			if (r === 1) {
				p = next;
				if (next === "X") next = "O";
				else next = "X";
			}
			b.set(i, p);
		}

		return b;

	}

}