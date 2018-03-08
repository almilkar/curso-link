const mysql = require('mysql');

module.exports = db => {
  return mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root.123',
    database: 'news_portal'
  });
};
