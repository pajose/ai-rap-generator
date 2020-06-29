const express = require('express');
const app = express();
const fs = require('fs');
let {PythonShell} = require('python-shell');
let options = { options: ['-u'],
				scriptPath: './python',
				args: []};

const port = process.env.PORT || 8080;

// Set static folder
app.use(express.static(__dirname + "/public"));

app.set("view engine", "ejs");

let bars = ["Ask me to spit some bars! My favorite rapper is Kendrick Lamar."];

// Run the python script at the root
app.get('/', (req, res) => {
	res.render("index", {bars : bars});
})

// Generate new markov rap file
app.post('/generaterap/markov', (req, res) => {

	options.args[0] = "markov";

	console.log('Generating Markov model lyrics...');

	PythonShell.run('main.py', options, function (err,results) {
		if (err) throw err;

		fs.readFile("kendrick_lamar_base_markov_rap.txt", 'utf-8', (err, data) => {
			if (err) throw err;
			bars = data.split("\n");
		});

		console.log('Finished running the code');

		res.redirect("/");
	});
});

// Generate new neural network rap file
app.post('/generaterap/neuralnetwork', (req, res) => {

	options.args[0] = "lstm"

	console.log("Generating LSTM Neural Network lyrics...")

	PythonShell.run('main.py', options, function (err, results) {
		if (err) throw err;

		fs.readFile("kendrick_lamar_neural_network_rap.txt", 'utf-8', (err, data) => {
			if (err) throw err;
			bars = data.split("\n");
		});

		console.log('Finished running the code');

		res.redirect("/");
	});
});

app.listen(port, () => {
	console.log('AI rap generator running on port ' + port);
})