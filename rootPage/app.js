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
	var bodyUsuario=req.body.usuario, bodySenha=req.body.senha;

	connection.connect(err => {connection.query('select * from ', (err,result) => {console.log(result.rows); res.end();} )} )
/*
	var tokenAutenticacao = jwt.sign({usuario:bodyUsuario, senha:bodySenha}, 'secret'); */
}

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.post('/login', trataFormulario);
app.use(discriminacaoAcesso);



app.on('end', function() { connection.end();});
app.listen(8080);
