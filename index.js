const express = require('express');
const app = express();
const fs = require('fs');
let {PythonShell} = require('python-shell');
let options = { options: ['-u'], scriptPath: './python' }

const port = process.env.PORT || 8080;

// Set static folder
app.use(express.static(__dirname + "/public"));

app.set("view engine", "ejs");

// Run the python script at the root
app.get('/', (req, res) => {
	// PythonShell.run('main.py', options, function (err) {
	// 	if (err) throw err;
	// 	console.log('Finished running the code');
	// });
	fs.readFile("kendrick_lamar_base_markov_rap.txt", "utf-8", (err, data) => {
		console.log(typeof data);
		res.render('index', {bars : data});
	})

})

// Visit this route to view the contents of the rap file
app.get('/generated', (req, res) => {
	const filename = 'kendrick_lamar_neural_network_rap.txt';
	fs.readFile(filename, 'utf8', (e, data) => {
			if (e) throw e;
			// console.log('OK: ' + filename);
			res.write(data);
			res.end();
	});
});

app.listen(port, () => {
	console.log('AI rap generator running on port ' + port);
})