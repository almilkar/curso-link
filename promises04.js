
const mysql = require('mysql');

const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root.123',
  database: 'news_portal'
});

const consulta = (idcat) => new Promise(filas => {
    conn.query('SELECT * FROM categorias WHERE id_categoria_c = ' + idcat, (err, filas) => {
    	if (filas.length == 0) return;
    	console.log(filas);
    	var prede_c = filas[0].prede_c
    	conn.query('SELECT * FROM categorias WHERE id_categoria_c = ' + prede_c, (err, filas) => {
    		if (filas.length == 0) return;
    		console.log(filas);
    		var prede_c = filas[0].prede_c
    		conn.query('SELECT * FROM categorias WHERE id_categoria_c = ' + prede_c, (err, filas) => {
    			if (filas.length == 0) return;
     			console.log(filas);
     			//conn.end();
     		});
    	});
	});
});

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array)
  }
}
// ----------------------------------------------
const start = async () => {

	/*
  await asyncForEach([11, 15], async (num) => {
  	await consulta(num);
    });
*/

	for (var x=1; x<=3; x++) await consulta(x);

  	console.log('Done')
}

// -----------------------------------------------
start();
//consulta(15);