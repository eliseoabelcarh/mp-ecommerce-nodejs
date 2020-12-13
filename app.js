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
	console.log('homeee');
	res.render('home');
});

app.get('/detail', async function (req, res) {
	const producto = await mp.create(req);
	console.log('queryyyyyy armadaaa ', producto);
	res.render('detail', producto);
});
app.post('/notifications', function (req, res) {
	console.log('NOTIFICAARION ', req);
	res.sendStatus(200);
});
app.get('/success', function (req, res) {
	console.log('success');
	res.send('successsss');
});

app.get('/pending', function (req, res) {
	console.log('pending');
	res.send('pendingsss');
});
app.get('/failure', function (req, res) {
	console.log('failure');
	res.send('failuresss');
});

app.listen(port);
