drop database if exists badmovies;
CREATE DATABASE badmovies;

USE badmovies;

CREATE TABLE movie (
 id INT NOT NULL,
 title VARCHAR(20) NOT NULL,
 poster_path VARCHAR(50),
 release_date INT, 
 vote_average INT, 
 PRIMARY KEY (id)
);
