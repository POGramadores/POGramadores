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


var estaNaTabela = (tabelas,substituicao,res) =>{
	console.log('tabela atual');
	if (tabelas.length==0) return (err) => {res.status(400); res.end();};
	return (err) => {
		console.log('cheguei aqui');
		const select = "select email,hash_senha from "+tabelas[0]+"  where email='"+substituicao[0]+"' and hash_senha='"+substituicao[1]+"' ;";
		console.log(select);
		connection.query(select,
			(err, result) => {
				console.log(result + ' ' + err);
				if(!(err || result.rowCount == 0)){
					res.contentType('text/json');
					res.send({auth:jwt.sign({usuario:substituicao[0],senha:substituicao[1],tabelas:tabelas[0]},
					                                                        'secret'),tabela:tabelas[0]});
					res.end();

				}
				else{
					console.log('proxima tabela');
					connection.connect(estaNaTabela(tabelas.slice(1),substituicao,res));
				}
			});
	}

}



var trataFormulario = function(req,res) {
	var bodyUsuario = req.body.usuario, 
	    bodySenha = req.body.senha;
	var substituicao = [bodyUsuario,bodySenha];
	var tabelas = ['aluno','professor','coordenacao','dacc'];
	connection.connect(estaNaTabela(tabelas,substituicao,res));
	console.log(req.url);
}

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.post('/login', trataFormulario);
app.use(discriminacaoAcesso);



app.on('end', function() { connection.end();});
app.listen(8080);
