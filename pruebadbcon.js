const mysql = require('mysql');

  const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root.123',
    database: 'news_portal'
  });

  
  function consulta() {
    conn.query('SELECT * FROM enlaces', (err, filas) => {
     console.log(filas);
	   conn.end();
    });
  }
  
  function main() {
    consulta();
    console.log("Hola")
  }

  main();