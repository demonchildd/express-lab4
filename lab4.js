const express = require('express');
const app = express();
const hbs = require('express-handlebars').create({extname: '.hbs',});
const dataRouter = require('./routers/dataRouter');

app.set('port', 3000);
app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');
app.use(express.static(__dirname + '/public'));
console.log(__dirname+ '/public');
app.use(express.json());
app.use('/', dataRouter);

app.listen(app.get('port'), () => console.log('Start server, port: ' + app.get('port')));

