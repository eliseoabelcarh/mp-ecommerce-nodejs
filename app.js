var express = require('express');
var exphbs = require('express-handlebars');
var port = process.env.PORT || 3000;
const mp = require('./mercadopago');

var app = express();

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(express.static('assets'));

app.use('/assets', express.static(__dirname + '/assets'));

app.use(express.json());

app.get('/', function (req, res) {
	res.render('home');
});

app.get('/detail', async function (req, res) {
	const producto = await mp.create(req);
	res.render('detail', producto);
});

app.get('/success', function (req, res) {
	res.render('success', req.query);
});
app.get('/failure', function (req, res) {
	res.render('failure');
});
app.get('/pending', function (req, res) {
	res.render('pending', req.query);
});
app.post('/notifications', function (req, res) {
	console.log('notifications webhooks recibida ', req);
	res.sendStatus(200);
});
app.listen(port);
