const express = require('express');
const pg = require('pg');
const mustache = require('mustache');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const secret = 'secret';
const Pool = require('pg-pool');

const app = express();

const dbLocation = 'localhost';
const dbPort = 5432;
const connection = new pg.Client('postgresql://node:1@localhost/agoravai');

/*app.use();*/

app.use(express.static(__dirname + '/static'));


var paginasReais = (req,res) => {
	res.send('qualquer merda aleatoria');
	res.end();
}

var discriminacaoAcesso = function(req,res,next){
	next();
	if(/^\/dacc/.test(req.url)){

	}
}

var trataFormulario = function(req,res) {
	var bodyUsuario = req.body.usuario, 
	    bodySenha = req.body.senha;
	connection.connect(err => {
		connection.query('select email,hash_senha from aluno where email=$1 and hash_senha=$2',
		                 [bodyUsuario, bodySenha], 
		                 (err, result) => 
			{
			if(err || result.rowCount == 0) {
				res.status(400);
				res.end();
				return;
			} 
			console.log(result);
			res.contentType('text/json');
			res.send({auth:jwt.sign({usuario:bodyUsuario, 
			                         senha:bodySenha, 
			                         tabela:'aluno'}, 
			          'secret')})
		} )
	} );
}

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.post('/login', trataFormulario);
app.use(discriminacaoAcesso);



app.on('end', function() { connection.end();});
app.listen(8080);
