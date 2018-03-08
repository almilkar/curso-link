USE news_portal;
DROP TABLE IF EXISTS usuarios;
CREATE TABLE usuarios (
	id_usuario_u INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	alias_u VARCHAR(25) NOT NULL,
	email_u VARCHAR(25) NOT NULL,
	fcreacion_u TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO usuarios (alias_u, email_u) VALUES ('anonymous', 'anonymous@dominium.omn');
INSERT INTO usuarios (alias_u, email_u) VALUES ('almilkar', 'almilkar@gmail.com');

DROP TABLE IF EXISTS categorias;
CREATE TABLE categorias (
	id_categoria_c INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	nivel_c INT NOT NULL,
	titulo_c VARCHAR(255) NOT NULL,
	descripcion_c TEXT,
	id_usuario_c INT NOT NULL DEFAULT 1,
	fcreacion_c TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO categorias (nivel_c, titulo_c, descripcion_c) VALUES (1, 'Temporal', 'Categoría indefinida temporal' );
INSERT INTO categorias (nivel_c, titulo_c, descripcion_c) VALUES (1, 'Programacion Web', 'Lenguajes y entornos de programacion');

DROP TABLE IF EXISTS enlaces;
CREATE TABLE enlaces (
	id_enlace_e INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	enlace_e VARCHAR(255) NOT NULL,
	titulo_e VARCHAR(100) NOT NULL,
	descripcion_e VARCHAR(255),
	id_categoria_e INT NOT NULL DEFAULT 1,
	id_usuario_e INT NOT NULL DEFAULT 1,
	fcreacion_e TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO enlaces (enlace_e, titulo_e, descripcion_e, id_categoria_e, id_usuario_e)
	VALUES ('www.google.com', 'Buscador Google', 'Buscador general de internet', 1, 1);
INSERT INTO enlaces (enlace_e, titulo_e, descripcion_e, id_categoria_e, id_usuario_e)
	VALUES ('www.yahoo.com', 'Buscador Yahoo', 'Buscador general de internet', 1, 1);
