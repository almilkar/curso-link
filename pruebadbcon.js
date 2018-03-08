const mysql = require('mysql');

  const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root.123',
    database: 'news_portal'
  });

  conn.query('SELECT * FROM news', (err, filas) => {
      console.log(filas);
	  conn.end();
  });
  
