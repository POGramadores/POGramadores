const express = require('express');
const pg = require('pg');
const mustache = require('mustache');

const app = express();

const dbLocation = 'localhost';
const dbPort = 5432;
const connection = new pg.Client('postgresql://' + dbLocation + ':' + dbPort + '/');

/*app.use();*/

app.use(express.static(__dirname + '/static'));


var paginasReais = (req,res) => {
	res.send('qualquer merda aleatoria');
	res.end();
}

var discriminacaoAcesso = function(req,res,next){
	console.log(req.url);
	next();
	if(/^dacc/.test(req.url)){

	}
}

app.use(discriminacaoAcesso);
app.get('*', paginasReais);



app.on('end', function() { connection.end();});
app.listen(8080);
