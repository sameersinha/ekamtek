const express = require("express");
const { Octokit } = require("@octokit/core");

const app = express();

const port = process.env.PORT || 3000;

const octokit = new Octokit();

const owner = "sameersinha";
const repo = "ekamtek";
const perPage = 25;

app.set('view engine', 'pug');
app.set('views', './views');

app.get('/commits', async (req, res) => {

	const commits = await octokit.request(
		`GET /repos/{owner}/{repo}/commits`, { owner, repo }
	);

	res.render('main', { data: commits.data });
});

app.use((req, res) => {
	res.type('text/plain');
	res.status(404);
	res.send('404 - Not Found');
});

app.use((err, req, res, next) => {
	console.error(err.message);
	res.type('text/plain');
	res.status(500);
	res.send('500 - Server Error');
});

app.listen(port, () => console.log(`Express started on http://localhost:${port}\nPress Ctrl-C to terminate.`));
