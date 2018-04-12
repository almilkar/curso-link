const dbConnection = require('../../config/dbConnection');

module.exports = app => {

	const connection = dbConnection();

	// ====================== ENLACES ============================

	var idUsuario = 2;

	app.use('/enlaces/*', function (req, res, next) {
  		console.log('Solicitud recibida Time:', Date.now(),' => ' + req.toString());
  		next();
	});

	app.get('/enlaces/listafiltro/:idCategoria', (req, res) => {
		var idcat = req.params.idCategoria;
		
		var sqlq = 'SELECT * FROM enlaces WHERE id_usuario_e = ' + connection.escape(idUsuario)
		
		if (idcat > 0) sqlq = sqlq + ' AND id_categoria_e = ' + idcat;
		
		sqlq = sqlq + " LIMIT 0, 2"

		connection.query(sqlq, (err, result) => {
			if (!err) res.send(result);
			else console.log(err);
		});
	});


	// -----------------------------------------------------------------------------
	app.get('/enlaces/cadenacat/:idcat', leeCadenaCat, enviaCadenaCat);

	function leeCadenaCat (req, res, next)  {
		const idCategoria = req.params.idcat;     // req.body;
		var objDatos = {};
		var sqlq = 'SELECT * FROM categorias WHERE id_categoria_c = ' + idCategoria;
	    connection.query(sqlq, (err, result) => {
	    	objDatos[result[0].nivel_c] = result[0];
	    	if (result.length == 0) {req.resp = objDatos;next();}
	    	var prede_c = result[0].prede_c
	    	var sqlq = 'SELECT * FROM categorias WHERE id_categoria_c = ' + prede_c;
	    	connection.query(sqlq, (err, result) => {
	    		objDatos[result[0].nivel_c] = result[0];
	    		if (result.length == 0) {req.resp = objDatos;next();}
	    		var prede_c = result[0].prede_c
	    		var sqlq = 'SELECT * FROM categorias WHERE id_categoria_c = ' + prede_c;
	    		connection.query(sqlq, (err, result) => {
	    			
	    			if (result.length == 0) {
	    				req.resp = objDatos; next();
	    			} else {
	    				objDatos[result[0].nivel_c] = result[0]; req.resp = objDatos; next();	
	    			}
	     			
	     		});
	    	});
		});
	};

	function enviaCadenaCat(req, res) {
		res.send(req.resp);
	}


	///////////////////////////////////////////////////////////////////////////////////
	//	Calcula el nº de registros total y recupera los primeros 5 (filasPorPagina) 
	//
	//	La llamada desde el cliente crea los controles de navegación y presenta las 5 primeras filas.
	//
	// 	datosPagina.grupoPagAnterior = 0
    // 	datosPagina.grupoPagActual = 1
    //	datosPagina.grupoPagPosterior = 2

	app.post('/enlaces/listaprep-enlaces/', (req, res) => {
		const filasPorPagina = 5;
		const paginasPorBloque = 4;
		const filasPorBloque = 15;
		var id_categoria = req.body.id_categoria;
		var pagina_desde = req.body.pagina_desde;
		var bloque_actual = req.body.bloque_actual;

		var fila_desde = (parseInt(pagina_desde) + paginasPorBloque * (bloque_actual - 1)) * filasPorPagina;
		var numRegistros = 0;
		var sqlq = 'SELECT COUNT(*) AS cuantos FROM enlaces WHERE id_usuario_e = ' + connection.escape(idUsuario)
		if (id_categoria > 0) sqlq = sqlq + ' AND id_categoria_e = ' + id_categoria;
		connection.query(sqlq, (err, result) => {
			if (!err) numRegistros = result[0].cuantos;
			sqlq = 'SELECT * FROM enlaces WHERE id_usuario_e = ' + connection.escape(idUsuario)	
			if (id_categoria > 0) sqlq = sqlq + ' AND id_categoria_e = ' + id_categoria;
			sqlq = sqlq + " LIMIT " + filasPorPagina + " OFFSET " + fila_desde;
			console.log(sqlq);
			connection.query(sqlq, (err, result) => {
				var datos = {};
				datos.filasporpagina = filasPorPagina;
				datos.filasporbloque = filasPorBloque;
				datos.paginasporbloque = paginasPorBloque;
				datos.numfilas = numRegistros;
				datos.filas = result;
				datos.fila_desde = fila_desde;
				datos.bloque_actual = bloque_actual;
				if (!err) res.send(datos);
				else console.log(err);
			});
		});
	});

	///////////////////////////////////////////////////////////////////////////////////////////
	//	Responde a las peticiones desde los controles de navegación (por página) del cliente
	//
	//

	app.post('/enlaces/lista-enlaces/', (req, res) => {
		const filasPorPagina = 5;
		const grupoPaginas = 22222; // lo manejan los controles de avance y retroceso a ambos lados de la lista de paginas 
		const {fila_inicial, fila_final} = req.body;
		var sqlq = 'SELECT * FROM enlaces WHERE id_usuario_e = ' + connection.escape(idUsuario)
		//if (idcat > 0) sqlq = sqlq + ' AND id_categoria_e = ' + idcat;
		sqlq = sqlq + " LIMIT " + (fila_inicial-1)*5 + "," + (fila_final - fila_inicial);

		console.log(sqlq);

		connection.query(sqlq, (err, result) => {
			if (!err) res.send(result);
			else console.log(err);
		});
	});

	/*	---------------------------------------------------------------
		*	Lista enlaces
		*
	*/
	app.get('/enlaces/list', leeEnlaces, renderEnlacesPagina);
	app.post('/enlaces/list', leeEnlaces, renderEnlacesPagina);

	function leeEnlaces(req, res, next) {
		var idcat;
		var sqlq = 'SELECT * FROM enlaces WHERE id_usuario_e = ' + connection.escape(idUsuario);

		if (req.body.id_categoria_e != undefined) {
			var idcat = req.body.id_categoria_e;
			sqlq = sqlq + ' AND id_categoria_e = ' + idcat;
		}
		//console.log(sqlq);
		connection.query(sqlq, (err, result) => {
			req.enlaces = result;
			next();
		});
	}
	/*	---------------------------------------------------------------
		*	Render de los resultados de Lista enlaces
		*
	*/
	function renderEnlacesPagina(req, res) {
		//console.log(req.enlaces);
    	res.render('enlaces/enlaces.ejs', {
        	enlaces: req.enlaces
    	});
	}

	/*	----------------------------------------------------------------
		* 	/enlaces/idcatsig/:idcat
	 	* 	Recupera las categorías de siguiente nivel que descienden de la
	 	* 	categoría pasada como parámetro.
	 	* 	Método para ajax
		*		----------------------------------------------------------------
	*/
	app.get('/enlaces/idcatsig/:idcat',  (req, res) => {
		var idcat = req.params.idcat;
		var sqlq = 'SELECT * FROM categorias WHERE id_usuario_c = ' + connection.escape(idUsuario) +
			' AND prede_c = ' + connection.escape(idcat);
		connection.query(sqlq, (err, resultA) => {
				res.send(resultA);
		});
	});
	/*	----------------------------------------------------------------
		* 	/enlaces/idcatexgen/:idcat
		* 	Recupera todas las categorías del nivel 1
		* 	Método para ajax
		*		----------------------------------------------------------------
	*/
	
	app.get('/enlaces/idcatexgen',  (req, res) => {
		//var idcat = req.params.idcat;
		var sqlq = 'SELECT * FROM categorias WHERE id_usuario_c = ' + connection.escape(idUsuario) +
			' AND nivel_c = 1';
		connection.query(sqlq, (err,result) => {
				res.send(result);
		});
	});

	/*	----------------------------------------------------------------
		* 	/enlaces/idcatex/:idprede
		* 	Recupera todas las categorías del nivel seleccionado para un predecesor
		* 	Método para ajax
		----------------------------------------------------------------
	*/
	app.get('/enlaces/idcatex/:idprede', (req, res) => {
		var prede = req.params.idprede;
		var sqlq = 'SELECT * FROM categorias WHERE id_usuario_c = ' + connection.escape(idUsuario) +
			' AND prede_c = ' + connection.escape(prede);
		connection.query(sqlq, (err,result) => {
				res.send(result);
		});
	});

	/*	----------------------------------------------------------------
		

	*/
	

	/*	----------------------------------------------------------------
		* 	/enlaces/idcat/:idcat
	 	* 	Recupera las categorías de siguiente nivel que descienden de la
	 	* 	categoría pasada como parámetro.
	 	* 	Método para ajax
		*		----------------------------------------------------------------
	*/
	app.get('/enlaces/idcat/:idcat',  (req, res) => {
		var idcat = req.params.idcat;
		var sqlq = 'SELECT * FROM categorias WHERE id_usuario_c = ' + connection.escape(idUsuario) +
			' AND id_categoria_c = ' + connection.escape(idcat);
		connection.query(sqlq, (err, result) => {
			var nivel = result[0].nivel_c; var prede = result[0].prede_c;
			var objRes = {categorias3N: null, categorias2N: null, categorias1N: null};
			switch(nivel) {
	  	case 1:
			objRes.categorias1N = result;
	      	ifIdCatPrimerNivelSimple(objRes, idcat, nivel, prede, res);
	      	break;
	  	case 2:
			objRes.categorias2N = result;
			ifIdCatSegundoNivelSimple(objRes, idcat, nivel, prede, res);
	      	break;
		case 3:
			objRes.categorias3N = result;
			ifIdCatTercerNivelSimple(objRes, idcat, nivel, prede, res);
			break;
			}
		});
	});

	function ifIdCatPrimerNivelSimple(objRes, idcat, nivel, prede, res) {
		res.send(objRes);
	};
	function ifIdCatSegundoNivelSimple(objRes, idcat, nivel, prede, res) {
		var sqlq = 'SELECT * FROM categorias WHERE id_usuario_c = ' + connection.escape(idUsuario) +
		' AND id_categoria_c = ' + connection.escape(prede);
		connection.query(sqlq, (err, result21) => {
			objRes.categorias1N = result21;
			res.send(objRes);
		});
	};
	function ifIdCatTercerNivelSimple(objRes, idcat, nivel, prede, res) {
			var sqlq = 'SELECT * FROM categorias WHERE id_usuario_c = ' + connection.escape(idUsuario) +
			' AND id_categoria_c = ' + connection.escape(prede);
			connection.query(sqlq, (err, result32) => {
				var nivel3 = result32[0].nivel_c;
				var prede3 = result32[0].prede_c;
				objRes.categorias2N = result32;
				var sqlq = 'SELECT * FROM categorias WHERE id_usuario_c = ' + connection.escape(idUsuario) +
				' AND id_categoria_c = ' + connection.escape(prede3);
				connection.query(sqlq, (err, result31) => {
					objRes.categorias1N = result31;
					res.send(objRes);
				});
			});
	};
	////////////////////////////////////////////////////////////////////////////

	app.post('/enlaces/addcat', (req, res) => {
		
		const {nivel_c, titulo_c, id_usuario_c, prede_c} = req.body;

		connection.query('INSERT INTO categorias SET ?', {nivel_c, titulo_c, id_usuario_c, prede_c}, (err, result) => {
				if (!err) {
					connection.query('SELECT LAST_INSERT_ID() AS id;',	(err, result) => {
							console.log(result);
							res.send(result);		
						});
				} else {
					console.log(err);
					//res.end();
				}
			});
		});


	app.post('/enlaces/updcat', (req, res) => {
		
		const {titulo_c, id_categoria_c} = req.body;
		
		connection.query('UPDATE categorias SET ? WHERE ?', 
			[{titulo_c},{id_categoria_c}], (err, result) => {
					if (err) throw err;
					res.send(id_categoria_c);
    				console.log(result.affectedRows + " record(s) updated");
				});
	});


// --------------------- Agregar, modificar registro de enlaces ---------------

	app.post('/enlaces/addenlace', (req, res) => {
		
		const {enlace_e, titulo_e, id_categoria_e, id_usuario_e} = req.body;

		connection.query('INSERT INTO enlaces SET ?', {enlace_e, titulo_e, id_categoria_e, id_usuario_e}, (err, result) => {
				if (!err) {
					connection.query('SELECT LAST_INSERT_ID() AS id;',	(err, result) => {
							console.log(result);
							//res.send(result);		
						});
				} else {
					console.log(err);
					//res.end();
				}
				res.redirect('/enlaces/list');
			});
		});
	//////////////////////////////////////////////////////////////////////////////////
	app.post('/enlaces/updenlace', (req, res) => {

		const {id_enlace_e, enlace_e, titulo_e, id_categoria_e} = req.body;

		connection.query('UPDATE enlaces SET ? WHERE ?', 
			[{enlace_e, titulo_e, id_categoria_e}, {id_enlace_e}],	(err, result) => {
				if (!err) {
					res.redirect('/enlaces/list');
				} else {
					console.log(err);
					res.redirect('/enlaces/list');
				}
		});
	});
	/////////////////////////////////////////////////////////////////////////////////
	app.post('/enlaces/delenlace', (req, res) => {

		const {id_enlace_e} = req.body;

		connection.query('DELETE FROM enlaces WHERE ?', [{id_enlace_e}],	(err, result) => {
				if (!err) {
					res.redirect('/enlaces/list');
				} else {
					console.log(err);
					res.redirect('/enlaces/list');
				}
				console.log(result.affectedRows + " record(s) deleted");
		});
	});


}    /////  END END END 


