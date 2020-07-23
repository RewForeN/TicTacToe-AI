
function sigmoid(x) {
	return 1 / (1 + Math.exp(-x));
}

function dSig(y) {
	return y * (1 - y);
}

class NeuralNetwork {

	constructor(input_nodes, hidden_nodes, output_nodes) {

		this.input_nodes = input_nodes;
		this.hidden_nodes = hidden_nodes;
		this.output_nodes = output_nodes;

		this.weights_ih = new Matrix(this.hidden_nodes, this.input_nodes);
		this.weights_ho = new Matrix(this.output_nodes, this.hidden_nodes);
		this.weights_ih.randomize();
		this.weights_ho.randomize();

		this.bias_h = new Matrix(this.hidden_nodes, 1);
		this.bias_o = new Matrix(this.output_nodes, 1);
		this.bias_h.randomize();
		this.bias_o.randomize();

		this.learning_rate = 0.1;

	}

	feedforward(input_array) {

		let inputs = Matrix.fromArray(input_array);

		// Generating the HIDDEN outputs
		let hidden = Matrix.multiply(this.weights_ih, inputs);
		hidden.add(this.bias_h);
		hidden.map(sigmoid); // Activation function

		// Generating the OUTPUT outputs
		let output = Matrix.multiply(this.weights_ho, hidden);
		output.add(this.bias_o);
		output.map(sigmoid); // Activation function

		return output.toArray();

	}

	train(input_array, target_array) {

		// Feedforward //
		let inputs = Matrix.fromArray(input_array);

		// Generating the HIDDEN outputs 
		let hidden = Matrix.multiply(this.weights_ih, inputs);
		hidden.add(this.bias_h);
		hidden.map(sigmoid); // Activation function

		// Generating the OUTPUT outputs
		let outputs = Matrix.multiply(this.weights_ho, hidden);
		outputs.add(this.bias_o);
		outputs.map(sigmoid); // Activation function


		let targets = Matrix.fromArray(target_array);

		// Calculate OUTPUT error
		let output_errors = Matrix.subtract(targets, outputs);

		// Calculate OUTPUT gradient //
		let output_gradient = Matrix.map(outputs, dSig);
		output_gradient.multiply(output_errors);
		output_gradient.multiply(this.learning_rate);
		// Calculate OUTPUT deltas
		let hidden_T = Matrix.transpose(hidden);
		let weights_ho_deltas = Matrix.multiply(output_gradient, hidden_T);
		// Adjust OUTPUT weights
		this.weights_ho.add(weights_ho_deltas);
		// Adjust OUTPUT bias
		this.bias_o.add(output_gradient);


		// Calculate HIDDEN errors
		let who_t = Matrix.transpose(this.weights_ho);
		let hidden_errors = Matrix.multiply(who_t, output_errors);

		// Calculate HIDDEN gradient //
		let hidden_gradient = Matrix.map(hidden, dSig);
		hidden_gradient.multiply(hidden_errors);
		hidden_gradient.multiply(this.learning_rate);
		// Calculate HIDDEN deltas
		let inputs_T = Matrix.transpose(inputs);
		let weights_ih_deltas = Matrix.multiply(hidden_gradient, inputs_T);
		// Adjust HIDDEN weights
		this.weights_ih.add(weights_ih_deltas);
		// Adjust HIDDEN bias
		this.bias_h.add(hidden_gradient);

	}

}