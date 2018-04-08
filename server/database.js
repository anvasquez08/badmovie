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
  let query = 'INSERT INTO movie (id, title, poster_path, release_date, vote_average) VALUES (?, ? , ? , ?)'
  connection.query(query, function(err, data) {
  	if(err) console.log(err)
  	callback(data)
  })
};
const deleteFavorites = function(callback) {
  let query = 'DELETE FROM movie WHERE id = ?'
  connection.query(query, function(err, data) {
  	if(err) console.log(err)
  	callback(data)
  })

};
module.exports = {
  getAllFavorites,
  saveFavorite,
  deleteFavorites
};