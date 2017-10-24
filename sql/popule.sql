CREATE TYPE tipo AS ENUM ('ELOGIO','CRITICA','SUGESTAO','DUVIDAS');
CREATE TYPE asssunto AS ENUM ('PROFESSOR', 'INSTITUTO', 'DISCIPLINA');


CREATE TABLE aluno(
	email VARCHAR(45) PRIMARY KEY,
	ativo BOOLEAN DEFAULT true,
	nome VARCHAR(60) NOT NULL,
	hash_senha CHAR(23) NOT NULL
);

CREATE TABLE professor(
	email VARCHAR(45) PRIMARY KEY,
	ativo BOOLEAN DEFAULT false,
	nome VARCHAR(60) NOT NULL,
	hash_senha CHAR(23) NOT NULL
);

CREATE TABLE mensagem(
	id BIGSERIAL PRIMARY KEY,
	tipo TIPO NOT NULL,
	assunto ASSUNTO NOT NULL,
	professor VARCHAR(45) REFERENCES professores(id),
	coordenacao_acesso BOOLEAN NOT NULL,
	diretorio_academico_acesso BOOLEAN NOT NULL,
	corpo VARCHAR(5000) NOT NULL,
	titulo VARCHAR(50) NOT NULL
);

CREATE TABLE professores(
	id BIGSERIAL PRIMARY KEY,
	nome VARCHAR(60) NOT NULL,
);

CREATE TABLE interage_com(
	aluno VARCHAR(45) REFERENCES aluno(email),
	mensagem BIGSERIAL REFERENCES mensagem(id),
	PRIMARY KEY (aluno,mensagem)
);

CREATE TABLE sudo_coordenacao(
	id SERIAL PRIMARY KEY,
	login VARCHAR(30),
	hash_senha CHAR(23)
);

CREATE TABLE coordenacao(
	id SERIAL PRIMARY KEY,
	login VARCHAR(30),
	hash_senha CHAR(23)
);


CREATE TABLE sudo_dacc(
	id BIGSERIAL PRIMARY KEY,
	login VARCHAR(30),
	hash_senha CHAR(23)
);

CREATE TABLE dacc(
	id BIGSERIAL PRIMARY KEY,
	login VARCHAR(30),
	hash_senha CHAR(23)
);


