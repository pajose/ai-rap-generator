const express = require('express');
const app = express();
const fs = require('fs');
let {PythonShell} = require('python-shell');
let options = { options: ['-u'], scriptPath: './python' }

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
	// TODO: Run main.py with markov argument to only generate markov lyric txt file

	// PythonShell.run('main.py', options, function (err) {
	// 	if (err) throw err;
	// 	console.log('Finished running the code');
	// });

	fs.readFile("kendrick_lamar_base_markov_rap.txt", 'utf-8', (err, data) => {
			if (err) throw err;
			bars = data.split("\n");
	});
	res.redirect("/");
});

// Generate new neural network rap file
app.post('/generaterap/neuralnetwork', (req, res) => {
	// TODO: Run main.py with neural network argument to only generate markov lyric txt file

	// PythonShell.run('main.py', options, function (err) {
	// 	if (err) throw err;
	// 	console.log('Finished running the code');
	// });

	fs.readFile("kendrick_lamar_neural_network_rap.txt", 'utf-8', (err, data) => {
			if (err) throw err;
			bars = data.split("\n");
	});
	res.redirect("/");
});

app.listen(port, () => {
	console.log('AI rap generator running on port ' + port);
})