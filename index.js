const express = require('express');
const app = express();
const fs = require('fs');
let {PythonShell} = require('python-shell');
const e = require('express');
let options = { options: ['-u'], scriptPath: './python' }

const port = process.env.PORT || 8080;

app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");

// Run the python script at the root
app.get('/', (req, res) => {
	// PythonShell.run('main.py', options, function (err) {
	// 	if (err) throw err;
	// 	console.log('Finished running the code');
	// });

	res.render('index');
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