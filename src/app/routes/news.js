
const dbConnection = require('../../config/dbConnection');


module.exports = app => {

	const connection = dbConnection();

	app.get('/news/list', (req, res) => {
		connection.query('SELECT * FROM news', (err,result) => {
			res.render('news/news.ejs', {
				news: result
			});
		})
	});

	app.post('/news/list', (req, res) => {
		connection.query('SELECT * FROM news', (err,result) => {
			res.render('news/news.ejs', {
				news: result
			});
		})
	});

	app.post('/news/add', (req, res) => {
		const {title, news} = req.body;
		connection.query('INSERT INTO news SET?', {title, news}, (err, result) => {
				res.redirect('/news/list');
			});
	});

	app.post('/news/upd', (req, res) => {
		const {id_news, title, news} = req.body;
		connection.query('UPDATE news SET ? WHERE ?', [{title, news}, {id_news}],	(err, result) => {
				res.redirect('/news/list');
			});
	});

	app.get('/news/endpoint', function(req, res){
		var obj = {};
		console.log('body: ' + JSON.stringify(req.body));
		res.send(req.body);
	});
	app.post('/news/endpoint', function(req, res){
		var obj = {};
		console.log('body: ' + JSON.stringify(req.body));
		res.send(req.body);
	});

	app.get('/news/users', (req, res) => {
		res.json([
			{name: 'Theo'},
			{name: 'Jeff'}
		])
	});



















}
