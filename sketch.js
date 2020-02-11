
const s = 600;			// Board size
const bs = s / 3;		// Box size
const hbs = bs / 2;		// Half box size

let humanPlayer = "X";
let aiPlayer = "O";

let ai;

let board = [
	"", "", "",
	"", "", "",
	"", "", ""
];


function setup() {

	createCanvas(s, s);

	ai = new Minimax(aiPlayer);

	if (aiPlayer === "X") {
		move(ai.bestMove(board));
	}

}

function draw() {

	// Draw grid
	line(0, bs, s, bs);
	line(0, bs*2, s, bs*2);
	line(bs, 0, bs, s);
	line(bs*2, 0, bs*2, s);

	// Draw moves
	for (let i = 0; i < 9; i++) {
		let pos = getPosition(i);
		textSize(100);
		text(board[i], pos.x * bs + hbs - 35, pos.y * bs + hbs + 36);
	}

}

function mousePressed() {

	let i;
	let x = Math.floor(mouseX / bs);
	let y = Math.floor(mouseY / bs);

	if (x < 0 || x > 2 || y < 0 || y > 2) {
		return;
	}

	i = getIndex(x, y);

	if (board[i] !== "") {
		return;
	}

	board[i] = humanPlayer;		// Place human's move
	i = ai.bestMove(board);		// Get best move for AI
	board[i] = aiPlayer;		// Place AI's move

}

function getPosition(i) {

	let col = i % 3;
	let row = (i - col) / 3;
	
	return {
		x: col,
		y: row
	}

}

function getIndex(x, y) {

	return (x + (y * 3));

}











// let board = [
// 	['', '', ''],
// 	['', '', ''],
// 	['', '', '']
// ];

// let w; // = width / 3;
// let h; // = height / 3;

// let ai = 'X';
// let human = 'O';
// let currentPlayer = human;

// function setup() {

// 	createCanvas(400, 400);
// 	w = width / 3;
// 	h = height / 3;
// 	bestMove();

// }

// function equals3(a, b, c) {
// 	return a == b && b == c && a != '';
// }

// function checkWinner() {
// 	let winner = null;

// 	// horizontal
// 	for (let i = 0; i < 3; i++) {
// 		if (equals3(board[i][0], board[i][1], board[i][2])) {
// 			winner = board[i][0];
// 		}
// 	}

// 	// Vertical
// 	for (let i = 0; i < 3; i++) {
// 		if (equals3(board[0][i], board[1][i], board[2][i])) {
// 			winner = board[0][i];
// 		}
// 	}

// 	// Diagonal
// 	if (equals3(board[0][0], board[1][1], board[2][2])) {
// 		winner = board[0][0];
// 	}
// 	if (equals3(board[2][0], board[1][1], board[0][2])) {
// 		winner = board[2][0];
// 	}

// 	let openSpots = 0;
// 	for (let i = 0; i < 3; i++) {
// 		for (let j = 0; j < 3; j++) {
// 			if (board[i][j] == '') {
// 				openSpots++;
// 			}
// 		}
// 	}

// 	if (winner == null && openSpots == 0) {
// 		return 'tie';
// 	} else {
// 		return winner;
// 	}
// }

// function mousePressed() {
// 	if (currentPlayer == human) {
// 		// Human make turn
// 		let i = floor(mouseX / w);
// 		let j = floor(mouseY / h);
// 		// If valid turn
// 		if (board[i][j] == '') {
// 			board[i][j] = human;
// 			currentPlayer = ai;
// 			bestMove();
// 		}
// 	}
// }

// function draw() {
// 	background(255);
// 	strokeWeight(4);

// 	line(w, 0, w, height);
// 	line(w * 2, 0, w * 2, height);
// 	line(0, h, width, h);
// 	line(0, h * 2, width, h * 2);

// 	for (let j = 0; j < 3; j++) {
// 		for (let i = 0; i < 3; i++) {
// 			let x = w * i + w / 2;
// 			let y = h * j + h / 2;
// 			let spot = board[i][j];
// 			textSize(32);
// 			let r = w / 4;
// 			if (spot == human) {
// 				noFill();
// 				ellipse(x, y, r * 2);
// 			} else if (spot == ai) {
// 				line(x - r, y - r, x + r, y + r);
// 				line(x + r, y - r, x - r, y + r);
// 			}
// 		}
// 	}

// 	let result = checkWinner();
// 	if (result != null) {
// 		noLoop();
// 		console.log(`${result} wins!`)
// 	}
// }