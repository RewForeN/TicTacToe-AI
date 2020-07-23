
const s = 600;			// Board size
const bs = s / 3;		// Box size

let humanPlayer = "X";
let aiPlayer = "O";

let board;
let ai;

let winningPlayer = null;
let winningSquares = [];


function setup() {

	createCanvas(s, s);

	board = new Board();
	ai = new Minimax(humanPlayer, aiPlayer);

	if (aiPlayer === "X") {
		ai.makeMove(board);
	}

}

function draw() {

	background(30);

	// Draw board and moves
	for (let i = 0; i < 9; i++) {

		let pos = getPixelPosition(i);

		if (winningPlayer === humanPlayer && winningSquares.includes(i)) fill(60, 150, 200);
		else if (winningPlayer === aiPlayer && winningSquares.includes(i)) fill(200, 56, 56);
		else fill(255);

		noStroke();
		rect(pos.px + 2, pos.py + 2, bs - 4, bs - 4, 4);

		noFill();
		stroke(0);
		strokeWeight(3);
		drawPlayer(board.get(i), pos.px, pos.py);

	}

}

function drawPlayer(p, x, y) {

	if (p === "X") {
		line(x + bs/3, y + bs/3, x + 2*bs/3, y + 2*bs/3);
		line(x + bs/3, y + 2*bs/3, x + 2*bs/3, y + bs/3);
	}
	else if (p === "O") {
		ellipse(x + bs/2, y + bs/2, bs/3);
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

	winningPlayer = r.player;
	winningSquares = r.line;

	return r.player !== null;

}
