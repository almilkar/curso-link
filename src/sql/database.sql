CREATE DATABASE news_portal;

USE news_portal;

CREATE TABLE news (
	id_news INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	title VARCHAR(100),
	news TEXT,
	data_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

DESCRIBE news;

INSERT INTO news (title, news) values ('Suben las temperaturas', 'La sequedad del aire y el impacto sobre la salud');
INSERT INTO news (title, news) values ('Otra goleada en casa', 'Nueve partidos sin perder y muchos goles');

SELECT * FROM NEWS;

CREATE TABLE enlaces (
	id_enlace_e INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	enlace_e varchar(255) NOT NULL,
	titulo_e VARCHAR(100) NOT NULL,
	id_categoria_e INT NOT NULL DEFAULT 0,
	id_usuario_e INT NOT NULL DEFAULT 'anonymous',
	fcreacion_e TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE categorias (
	id_categoria_c INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	nivel_c INT NOT NULL,
	titulo_c VARCHAR(255) NOT NULL,
	descripcion_c TEXT,
	id_usuario_c INT NOT NULL DEFAULT 0,
	fcreacion_c TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE usuarios (
	id_usuario_u INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	alias_u VARCHAR(25) NOT NULL,
	email_u varchar(25) NOT NULL,
	fcreacion_u TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO categorias (nivel_c, titulo_c, descripcion_c) VALUES (0, 'Temporal', 'Categoría indefinida temporal' );

INSERT INTO usuarios (alias_u, email_u) VALUES (0, 'anonymous', 'anonymous@dominium.omn')
