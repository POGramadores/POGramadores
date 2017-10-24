DROP TYPE IF EXISTS tipo_mensagem;
DROP TYPE IF EXISTS assunto;

CREATE TYPE tipo_mensagem AS ENUM ('ELOGIO','CRITICA','SUGESTAO','DUVIDAS');
CREATE TYPE assunto AS ENUM ('PROFESSOR', 'INSTITUTO', 'DISCIPLINA');

CREATE TABLE aluno(
	email VARCHAR(45) PRIMARY KEY,
	ativo BOOLEAN DEFAULT true,
	nome VARCHAR(60) NOT NULL,
	hash_senha CHAR(23) NOT NULL,
	membro_dacc BOOLEAN NOT NULL DEFAULT false
);

CREATE TABLE professor(
	email VARCHAR(45) PRIMARY KEY,
	ativo BOOLEAN DEFAULT false,
	id BIGSERIAL NOT NULL REFERENCES professores(id) UNIQUE,
	hash_senha CHAR(23) NOT NULL
);

CREATE TABLE professores(
	id BIGSERIAL PRIMARY KEY,
	nome VARCHAR(60) NOT NULL
);

CREATE TABLE conversa(
	id BIGSERIAL PRIMARY KEY,
	data_inicio TIMESTAMP WITH TIME ZONE NOT NULL,
	aluno VARCHAR(45) REFERENCES aluno(email),
	tipo TIPO_MENSAGEM NOT NULL,
	assunto ASSUNTO NOT NULL,
	professor BIGSERIAL REFERENCES professores(id),
	coordenacao_acesso BOOLEAN NOT NULL,
	diretorio_academico_acesso BOOLEAN NOT NULL,
	titulo VARCHAR(50) NOT NULL
)

CREATE TABLE mensagem(
	data_postagem timestamp with time zone NOT NULL,
	id BIGSERIAL PRIMARY KEY,
	corpo VARCHAR(5000) NOT NULL,
	conversa BIGSERIAL REFERENCES conversa(id)
);

CREATE TABLE envia(
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
	email VARCHAR(30),
	hash_senha CHAR(23)
);


CREATE TABLE sudo_dacc(
	id BIGSERIAL PRIMARY KEY,
	login VARCHAR(30),
	hash_senha CHAR(23)
);

CREATE TABLE dacc(
	id BIGSERIAL PRIMARY KEY,
	email VARCHAR(45),
	hash_senha CHAR(23)
);


