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

/*
app.get('/users/:id', function(req, res, next){
  db.getUser(req.params.id).then(function(users) => {
    res.json(users)
  }).catch(next)
})
*/