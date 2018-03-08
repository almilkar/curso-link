const dbConnection = require('../../config/dbConnection');

module.exports = app => {

	const connection = dbConnection();

	// ====================== ENLACES ============================

	var idUsuario = 2;

	app.use('/enlaces/*', function (req, res, next) {
  	console.log('Solicitud recibida Time:', Date.now());
  	next();
	})

	function leeEnlaces(req, res, next) {
		/*
		if (res.query) {
			if (res.query.id_usuario_e === undefined) idUsuario = 1; // anonymous
			else idUsuario = res.query.id_usuario_e;
		}
		*/
		var sqlq = 'SELECT * FROM enlaces WHERE id_usuario_e = ' + connection.escape(idUsuario);
		connection.query(sqlq, (err,result) => {
			req.enlaces = result;
			next();
		});
	}
	function leeCategorias1N(req, res, next) {
		var sqlq = 'SELECT * FROM categorias WHERE id_usuario_c = ' + connection.escape(idUsuario) +
			' AND nivel_c = 1';
		connection.query(sqlq, (err,result) => {
			req.categorias1N = result;
			next();
		});
	}
	function leeCategorias2N(req, res, next) {
		var sqlq = 'SELECT * FROM categorias WHERE id_usuario_c = ' + connection.escape(idUsuario) +
			' AND nivel_c = 2';
		connection.query(sqlq, (err,result) => {
			req.categorias2N = result;
			next();
		});
	}
	function renderEnlacesPagina(req, res) {
    res.render('enlaces/enlaces.ejs', {
        enlaces: req.enlaces,
        categorias1N: req.categorias1N,
				categorias2N: req.categorias2N
    });
	}
	app.get('/enlaces/list', leeEnlaces, leeCategorias1N, leeCategorias2N, renderEnlacesPagina);

	/*
	app.get('/enlaces/:nivel/:prede',  (req, res) => {
		var prede = req.params.prede;
		var nivel = req.params.nivel;
		var sqlq = 'SELECT id_categoria_c, titulo_c FROM categorias WHERE id_usuario_c = ' + connection.escape(idUsuario) +
			' AND nivel_c = ' + connection.escape(nivel) +
			' AND prede_c = ' + connection.escape(prede);
		connection.query(sqlq, (err,result) => {
			req.cate = result;
			res.send(req.cate);
		});
	});
	*/

	/*
	*	A partir de un id de categor�a necesitamos saber su nivel su
	* predecesor y su papel como antecesor en el �rbol de categor�as.
	*/

	/* back
	app.get('/enlaces/idcat/:idcat',  (req, res) => {
		var idcat = req.params.idcat;
		var sqlq = 'SELECT nivel_c, prede_c FROM categorias WHERE id_usuario_c = ' + connection.escape(idUsuario) +
			' AND id_categoria_c = ' + connection.escape(idcat);
		connection.query(sqlq, (err, result1) => {
			var nivel = result1[0].nivel_c;
			var prede = result1[0].prede_c;
			console.log("Posicion: Nivel/IdPadre => " + nivel + "/" + prede);
			sqlq = 'SELECT id_categoria_c, titulo_c FROM categorias WHERE id_usuario_c = ' + connection.escape(idUsuario) +
			' AND nivel_c = ' + connection.escape(nivel) +
			' AND prede_c = ' + connection.escape(prede);
			connection.query(sqlq, (err,result2) => {
				console.log("Posicion: Mismo nivel/mismo padre => ");
				console.log(result2);
				sqlq = 'SELECT id_categoria_c, titulo_c FROM categorias WHERE id_usuario_c = ' + connection.escape(idUsuario) +
				' AND prede_c = ' + connection.escape(idcat);
				connection.query(sqlq, (err,result3) => {
					console.log("Posicion: Nivel abajo/hijos => ");
					console.log(result3);
					res.send(result3);
				});
			});
		});
	});
	*/

	app.get('/enlaces/idcat/:idcat',  (req, res) => {
		var idcat = req.params.idcat;
		var sqlq = 'SELECT nivel_c, prede_c FROM categorias WHERE id_usuario_c = ' + connection.escape(idUsuario) +
			' AND id_categoria_c = ' + connection.escape(idcat);
		connection.query(sqlq, (err, result1) => {
			var nivel = result1[0].nivel_c;
			var prede = result1[0].prede_c;
			console.log("Posicion: Nivel/IdPadre => " + nivel + "/" + prede);
			sqlq = 'SELECT id_categoria_c, titulo_c FROM categorias WHERE id_usuario_c = ' + connection.escape(idUsuario) +
			' AND nivel_c = ' + connection.escape(nivel) +
			' AND prede_c = ' + connection.escape(prede);

			switch(nivel) {
    	case 1:
        ifIdCatPrimerNivel(idcat, sqlq, res);
        break;
    	case 2:
        ifIdCatSegundoNivel(idcat, sqlq, res, nivel);
        break;
			case 3:
				ifIdCatTercerNivel(idcat, sqlq, res, nivel, prede);
				break;
			}

		});
	});

	function ifIdCatPrimerNivel(idcat, sqlq, res) {
		connection.query(sqlq, (err,result11) => {
			sqlq = 'SELECT id_categoria_c, titulo_c FROM categorias WHERE id_usuario_c = ' + connection.escape(idUsuario) +
			' AND prede_c = ' + connection.escape(idcat);
			connection.query(sqlq, (err,result12) => {
				var objRes = {
					categorias1N: result11,
					categorias2N: result12,
					categorias3N: null
				};
				res.send(objRes);
			});
		});
	};

	function ifIdCatSegundoNivel(idcat, sqlq, res, nivel) {
		connection.query(sqlq, (err,result22) => {
			console.log("Nivel 2 => ");
			console.log(result22);
			sqlq = 'SELECT id_categoria_c, titulo_c FROM categorias WHERE id_usuario_c = ' + connection.escape(idUsuario) +
			' AND prede_c = ' + connection.escape(idcat);
			connection.query(sqlq, (err,result23) => {
				console.log("Nivel 3 => ");
				console.log(result23);
				sqlq = 'SELECT id_categoria_c, titulo_c FROM categorias WHERE id_usuario_c = ' + connection.escape(idUsuario) +
				' AND nivel_c = ' + connection.escape(nivel - 1);
				connection.query(sqlq, (err,result21) => {
					console.log("Nivel 1 => ");
					console.log(result21);
					var objRes = {
						categorias3N: result23,
						categorias2N: result22,
						categorias1N: result21
					};
					res.send(objRes);
				})
			});
		});
	};

	function ifIdCatTercerNivel(idcat, sqlq, res, nivel, prede) {
		connection.query(sqlq, (err, result33) => {
			console.log("Nivel 3.3 => ");
			console.log(result33);
			sqlq = 'SELECT nivel_c, prede_c FROM categorias WHERE id_usuario_c = ' + connection.escape(idUsuario) +
			' AND id_categoria_c = ' + connection.escape(prede);
			connection.query(sqlq, (err, result30) => {
				var nivel3 = result30[0].nivel_c;
				var prede3 = result30[0].prede_c;
				sqlq = 'SELECT id_categoria_c, titulo_c FROM categorias WHERE id_usuario_c = ' + connection.escape(idUsuario) +
				' AND nivel_c = ' + connection.escape(nivel3) +
				' AND prede_c = ' + connection.escape(prede3);
				connection.query(sqlq, (err, result32) => {
					console.log("Nivel 3.2 => ");
					console.log(result32);
					sqlq = 'SELECT id_categoria_c, titulo_c FROM categorias WHERE id_usuario_c = ' + connection.escape(idUsuario) +
					' AND id_categoria_c = ' + connection.escape(prede3);
					connection.query(sqlq, (err, result31) => {
						console.log("Nivel 3.1 => ");
						console.log(result31);
						var objRes = {
							categorias3N: result33,
							categorias2N: result32,
							categorias1N: result31
						};
						res.send(objRes);
					});
				});
			});
		});
	};




}
