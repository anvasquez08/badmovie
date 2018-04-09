drop database if exists badmovies;
CREATE DATABASE badmovies;

USE badmovies;

CREATE TABLE movie (
 id INT NOT NULL,
 title VARCHAR(20),
 poster_path VARCHAR(100),
 release_date VARCHAR(100), 
 vote_average INT, 
 PRIMARY KEY (id)
);
