
const s = 600;			// Board size
const bs = s / 3;		// Box size
const hbs = bs / 2;		// Half box size

let humanPlayer = "X";
let aiPlayer = "O";

let board;
let ai;

let winningPlayer = null;
let winningSquares = [];


function setup() {

	createCanvas(s, s);

	board = new Board();
	ai = new Minimax(aiPlayer);

	if (aiPlayer === "X") {
		move(ai.bestMove(board));
	}

}

function draw() {

	background(30);

	// Draw moves
	for (let i = 0; i < 9; i++) {

		let pos = getPixelPosition(i);

		if (winningPlayer === humanPlayer && winningSquares.includes(i)) fill(60, 150, 200);
		else if (winningPlayer === aiPlayer && winningSquares.includes(i)) fill(200, 56, 56);
		else fill(255);

		rect(pos.px + 2, pos.py + 2, bs - 4, bs - 4, 4);

		fill(0);
		textSize(100);
		text(board.get(i), pos.px + hbs - 35, pos.py + hbs + 36);

	}

}

function mousePressed() {

	if (winningPlayer !== null) return;

	let x = Math.floor(mouseX / bs);
	let y = Math.floor(mouseY / bs);

	if (x < 0 || x > 2 || y < 0 || y > 2) {
		return;
	}

	let i = getIndex(x, y);
	let result = board.move(i, humanPlayer);		// Place human's move

	if (!result || checkWinner()) {
		return;
	}

	ai.makeMove(board);			// Tell AI to move
	checkWinner();

}

function getPosition(i) {

	let col = i % 3;
	let row = (i - col) / 3;
	
	return {
		x: col,
		y: row
	}

}

function getPixelPosition(i) {

	let pos = getPosition(i);

	return {
		px: pos.x * bs,
		py: pos.y * bs
	}

}

function getIndex(x, y) {

	return (x + (y * 3));

}

function checkWinner() {

	let r = board.winner();

	console.log(r);

	winningPlayer = r.player;
	winningSquares = r.line;

	return r.player !== null;

}
