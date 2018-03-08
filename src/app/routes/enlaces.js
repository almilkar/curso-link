const dbConnection = require('../../config/dbConnection');

module.exports = app => {

	const connection = dbConnection();

	// ====================== ENLACES ============================

	var idUsuario = 2;

	app.use('/enlaces/*', function (req, res, next) {
  	console.log('Solicitud recibida Time:', Date.now(),' => ' + req.toString());
  	next();
	});

	/*	---------------------------------------------------------------
		*	Lista enlaces
		*
	*/
	app.get('/enlaces/list', leeEnlaces, renderEnlacesPagina);
	function leeEnlaces(req, res, next) {
		/*
		if (res.query) {
			if (res.query.id_usuario_e === undefined) idUsuario = 1; // anonymous
			else idUsuario = res.query.id_usuario_e;
		}
		*/
		var sqlq = 'SELECT * FROM enlaces WHERE id_usuario_e = ' + connection.escape(idUsuario);
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
		* 	/enlaces/idcatex/:idcat
		* 	Recupera las categorías del mismo nivel que el de la categoría
		* 	pasada como parámetro. La primera consulta obtiene el predecesor,
		*		que junto con el nivel, es común para todas las que se obtienen en
		* 	la consulta siguiente.
		* 	Método para ajax
		*		----------------------------------------------------------------
	*/
	app.get('/enlaces/idcatex/:idcat',  (req, res) => {
		var idcat = req.params.idcat;
		var sqlq = 'SELECT * FROM categorias WHERE id_usuario_c = ' + connection.escape(idUsuario) +
			' AND id_categoria_c = ' + connection.escape(idcat);
		connection.query(sqlq, (err, resultA) => {
			var nivel = resultA[0].nivel_c;
			var prede = resultA[0].prede_c;
			sqlq = 'SELECT id_categoria_c, titulo_c FROM categorias WHERE id_usuario_c = ' + connection.escape(idUsuario) +
				' AND nivel_c = ' + connection.escape(nivel) +
				' AND prede_c = ' + connection.escape(prede);
			connection.query(sqlq, (err,resultB) => {
				res.send(resultB);
			});
		});
	});

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

	///////////////////////////////////////////////////////////   3 Nivel    /////////////////////
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

	app.post('/enlaces/add', (req, res) => {
		const {title, news} = req.body;
		/*
		connection.query('INSERT INTO news SET?', {title, news}, (err, result) => {
				res.redirect('/enlaces/list');
			});
			*/
			res.send(req.body);
			//res.redirect('/enlaces/list');
	});

	app.post('/enlaces/upd', (req, res) => {

		const {id_enlace_e, enlace_e, titulo_e, id_usuario_e, id_categoria_e, id_categoria_c, titulo_c, nivel_c, prede_c} = req.body;

		connection.query('INSERT INTO categorias (titulo_c, nivel_c, prede_c) VALUES ? ', [{titulo_c, nivel_c, prede_c}],	(err, result) => {
			if (!err) {
				connection.query('UPDATE enlaces SET ? WHERE ?', [{enlace_e, titulo_e, id_categoria_e}, {id_enlace_e}],	(err, result) => {
					res.redirect('/enlaces/list');
				});
			} else {
					res.redirect('/enlaces/list');
			}
		});
		res.send(req.body);
		//res.redirect('/enlaces/list');
	});


}
