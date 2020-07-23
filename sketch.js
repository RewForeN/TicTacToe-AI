
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
	mm = new Minimax(aiPlayer, humanPlayer);

	mmAITrainer = new Minimax(humanPlayer, aiPlayer);
	ai = new NeuralNetwork(9, 11, 9);

	if (aiPlayer === "X") {
		ai.makeMove(board);
	}

	console.log("Training....");

	/// TRAIN AI
	let trainCycles = 10000;
	let nextPercent = 0;
	for (let i = 0; i < trainCycles; i++) {

		if (100 * i / trainCycles > nextPercent) {
			console.log("Training: " + Math.floor(100 * i / trainCycles).toString() + "% complete.");
			nextPercent++;
		}

		board = Board.randomBoard();

		let mmIndex = mmAITrainer.getMove(board);
		let mmOutputs = [];
		for (let j = 0; j < 9; j++) mmOutputs[j] = (j === mmIndex) ? 1: 0;
		ai.train(board.toNNInputs(), mmOutputs);
		
	}

	console.clear();
	console.log("Done training!");

	board = new Board();

	mmtest();

}

let reset = false;

function mmtest() {

	if (reset) {
		console.clear();
		board = new Board();
		reset = false;
	}

	// Alg move
	mm.makeMove(board);

	checkWinner();
	if (winningPlayer) {
		reset = true;
		setTimeout(mmtest, 2000);
		return;
	}

	setTimeout(aitest, 1000);

}

function aitest() {

	// AI Move
	let outputs = ai.feedforward(board.toNNInputs());
	
	let move = {
		index: -1,
		score: -Infinity
	};
	for (let i = 0; i < 9; i++) {
		if (outputs[i] > move.score && board.get(i) === "") {
			move.index = i;
			move.score = outputs[i];
		}
	}

	console.log("AI wants to move: " + move.index.toString());
	board.move(move.index, aiPlayer);

	checkWinner();
	if (winningPlayer) {
		reset = true;
	}

	setTimeout(mmtest, 1000);

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

	//ai.makeMove(board);			// Tell AI to move
	let outputs = ai.feedforward(board.toNNInputs());
	
	let move = {
		index: -1,
		score: -Infinity
	};
	for (let i = 0; i < 9; i++) {
		if (outputs[i] > move.score){
			move.index = i;
			move.score = outputs[i];
		}
	}

	board.move(move.index, aiPlayer);

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
