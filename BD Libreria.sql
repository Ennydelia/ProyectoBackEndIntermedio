CREATE DATABASE LIBRERIA;

USE LIBRERIA;
CREATE TABLE autores (
	id_autor int primary key AUTO_INCREMENT NOT NULL,
    nombre varchar(250),
    apellidos varchar(250)
);

CREATE TABLE libros (
	id_libro int primary key AUTO_INCREMENT NOT NULL,
	titulo varchar(250),
	paginas int,
	fecha_publicacion date,
	editorial varchar(250),
	id_autores int,
    FOREIGN KEY (id_autores)
      REFERENCES autores(id_autor)
)

SELECT * FROM autores;
SELECT * FROM libros;