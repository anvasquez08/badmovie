const mysql = require('mysql');
const mysqlConfig = require('./config.js');

const connection = mysql.createConnection(mysqlConfig);

const getAllFavorites = function(callback) {
  let query = 'SELECT * FROM movie';

  connection.query(query, function(err, data) {
  	callback(err, data)
  })
};

const saveFavorite = function(req, callback) {
  let params = [req.body.id, req.body.title, req.body.poster_path, req.body.release_date, req.body.vote_average]
  let query = 'INSERT INTO movie (id, title, poster_path, release_date, vote_average) VALUES (?, ?, ?, ?, ?)';

  connection.query(query, params ,function(err, data) {
  	callback(err, data)
  })
};

const deleteFavorites = function(req, callback) {
  let params = [req.body.id]
  let query = 'DELETE FROM movie WHERE id = ?';

  connection.query(query, params ,function(err, data) {
  	callback(err, data)
  })

};

module.exports = {
  getAllFavorites,
  saveFavorite,
  deleteFavorites
};