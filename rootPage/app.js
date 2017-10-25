const express = require('express');
const pg = require('pg');
const mustache = require('mustache');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const secret = 'secret';
const Pool = require('pg-pool');
const cookieParser = require('cookie-parser');


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


var estaNaTabela = (tabelas,substituicao,res,aux) =>{
	console.log('tabela atual');
	if (tabelas.length==0) return (err) => {if(aux.length==0) {res.status(400); res.end(); return;} 
		console.log(aux); res.header({"Content-type": "text/json"})
		res.status(200); res.send(aux); res.end()};
	return (err) => {
		console.log('cheguei aqui');
		const select = "select email,hash_senha from "+tabelas[0]+"  where email='"+substituicao[0]+"' and hash_senha='"+substituicao[1]+"' ;";
		console.log(select);
		connection.query(select,
			(err, result) => {
				console.log(result + ' ' + err);
				if(!(err || result.rowCount == 0)){
					console.log(tabelas[0]);
					aux[tabelas[0]] = {"auth": jwt.sign({usuario:substituicao[0],senha:substituicao[1],tabelas:tabelas[0]},
					                                                'secret')}
				}
					connection.connect(estaNaTabela(tabelas.slice(1),substituicao,res,aux));
			});
	}

}



var trataFormulario = function(req,res) {
	var bodyUsuario = req.body.usuario, 
	    bodySenha = req.body.senha;
	var substituicao = [bodyUsuario,bodySenha];
	var tabelas = ['aluno','professor','coordenacao','dacc'];
	var email = /^[a-zA-Z_][.a-zA-Z0-9_]*@(id|ic|dcc)\.uff\.br$/;
	if(!email.test(bodyUsuario)) {
		res.status(400);
		res.header({"Content-type": "text/json"});
		res.send("{}");
		res.end();
		return;
	}
	connection.connect(estaNaTabela(tabelas,substituicao,res,{}));
	console.log(req.url);
}

var cadastre = function(req,res){
}

var limpa = function(auth){
	aux={};
	for (var k in auth){
		if(k!='iat') aux[k]=auth[k]
	}
	return aux;
}

var mensagem = function(req,res){
	var auth = req.cookies['auth'];
	console.log(auth);
	if(typeof (auth) === 'undefined')
	{
		res.redirect('/login.html');
		return;
	}
	if(Object.keys(auth).length !== 1){
		res.redirect('/desambiguacao.html');
	}
	else{
		var count = req.body.count;
		var offset = req.body.offset;
		var auth = jwt.verify(auth,'secret');
		auth=limpa(auth);
		connection.connect( err => {
			const select = "select * from conversa NATURAL JOIN aluno where nome='"  + auth['usuario']+
				"' order by data_inicio limit " + count + " offset " + offset;

				
		  
		
		
		
		connection.query(select,
			(err, result) => {
				if(!err){
					res.send(JSON.stringify(result));
					res.end();
				}
				res.end();
			});
	});

	}
}


app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.post('/login', trataFormulario);
app.put('/cadastro', cadastre);
app.get('/mensagem', mensagem);
app.use(discriminacaoAcesso);



app.on('end', function() { connection.end();});
app.listen(8080);
