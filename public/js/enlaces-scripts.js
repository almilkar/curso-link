window.onload = function() {
  expandeCategoria("Tipo1N", 1)
//document.getElementById("title").focus();
};
//
function selecciona(id_enlace_e, enlace_e, titulo_e, id_categoria_e, id_usuario_e) {

document.getElementById("id_enlace_e").value = id_enlace_e;
document.getElementById("enlace_e").value = enlace_e;
document.getElementById("titulo_e").value = titulo_e;
document.getElementById("id_categoria_e").value = id_categoria_e;
document.getElementById("id_usuario_e").value = id_usuario_e;

recuperaCategorias(id_categoria_e);

return true;
}


/* ------------------------------------------------------------
* Recupera una categoría por nivel, para un, dos o tres niveles
*
*/
function recuperaCategorias(idCategoria) {
  var objDato = {};
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      objDato = JSON.parse(this.responseText);
      if (objDato.categorias1N != undefined) {
        creaDDunElemento(objDato.categorias1N, "Tipo1N", false);
      } else {
        document.getElementById("Tipo1N").length = 0;
        document.getElementById("tTipo1N").value = "";
      }
      if (objDato.categorias2N != undefined) {
        creaDDunElemento(objDato.categorias2N, "Tipo2N", false);
      } else {
        document.getElementById("Tipo2N").length = 0;
        document.getElementById("tTipo2N").value = "";
      }
      if (objDato.categorias3N != undefined) {
        creaDDunElemento(objDato.categorias3N, "Tipo3N", false);
      } else {
        document.getElementById("Tipo3N").length = 0;
        document.getElementById("tTipo3N").value = "";
      }
    }
  }
  var url = "/enlaces/idcat/" + idCategoria;
  xhttp.open("GET", url, true);
  xhttp.send();
}
/////////////////////////////////////////////////////////////////////
function creaDDunElemento(dato, iSelector) {
  var option;
  var dd = document.getElementById(iSelector);  // dropdown
  dd.length = 0;
  
  for (var i = 0; i < dato.length; i++) {
    option = document.createElement('option');
    var cat = dato[i].id_categoria_c;
    var niv = dato[i].nivel_c;
    var pre = dato[i].prede_c;

    option.value = cat + "|" + niv + "|" + pre;
    option.text = dato[i].titulo_c;
    dd.add(option);
  }

  document.getElementById("t" + iSelector).value = option.text;
}
/////////////////////////////////////////////////////////////////////
function tomaSeleccionSimple(idDD) {
  var elem = document.getElementById(idDD);

  if (elem.options.length == 0) return "";

  var valor = elem.options[elem.selectedIndex].value;
  var texto = elem.options[elem.selectedIndex].text;

  if (valor == "") {
    document.getElementById("t" + idDD).value = "";
  } else {
    document.getElementById("t" + idDD).value = texto;    
  }

  return texto;
}
///////////////////////////////////////////////////////////////////////
function tomaSeleccion(idDD) {
  var elem = document.getElementById(idDD);

  if (elem.options.length == 0) return "";

  var valor = elem.options[elem.selectedIndex].value;
  var texto = elem.options[elem.selectedIndex].text;

  var arrCat = valor.split("|", 3);
  if (arrCat.length != 3) return "";
  var nivel_siguiente = Number(arrCat[1]) + 1;

  if (valor == "") {
    document.getElementById("t" + idDD).value = "";
  } else {
    document.getElementById("t" + idDD).value = texto;    
  }

  if ((nivel_siguiente > 0) && (nivel_siguiente <= 3))
    recuperaCategoriasSiguientes(valor, nivel_siguiente);

  return texto;
}

///////////////////////////////////////////////////////////////////////
function recuperaCategoriasSiguientes(cadCategoria, nivel) {
  var idCategoria;
  var objDato = {};

  if ((cadCategoria == "") || (cadCategoria == undefined)) {
    document.getElementById(cadCategoria).value = "";
    return false;
  }
  var arrCat = cadCategoria.split("|", 3);
  if (arrCat.length != 3) return false;
  idCategoria = arrCat[0];
  
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      objDato = JSON.parse(this.responseText);
      switch(nivel) {
      case 1:
        creaDD(objDato, "Tipo1N", true);
        break;
      case 2:
        creaDD(objDato, "Tipo2N", true);
        break;
      case 3:
        creaDD(objDato, "Tipo3N", true);
        break;
      }
    }
  }
  var url = "/enlaces/idcatsig/" + idCategoria;
  xhttp.open("GET", url, true);
  xhttp.send();
}
///////////////////////

function expandeCategoria(selectorCategoria, nivelaqui) {
  
  var url, arrCat, idCategoria, nivel, prede;
  var selCat = document.getElementById(selectorCategoria);
  var strCat = selCat.value;

  url = "";
  if (nivelaqui == 1) {
    url = "/enlaces/idcatexgen/";
  } else {
    arrCat = strCat.split("|");
    if (arrCat.length == 3) {
      idCategoria = arrCat[0];
      nivel = arrCat[1];
      prede = arrCat[2];
      url = "/enlaces/idcatex/" + idCategoria;
    }
  }
  if (url == "") return false;

  // --- ---- ---- ----- ---- ------ ------ ------ ------ 
  var objDato = {};
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      objDato = JSON.parse(this.responseText);
      switch(nivelaqui) {
      case 1:
        creaDD(objDato, "Tipo1N", true);
        vaciaDD(["Tipo2N","Tipo3N"]);
        break;
      case 2:
        creaDD(objDato, "Tipo2N", true);
        vaciaDD(["Tipo3N"])
        break;
      case 3:
        creaDD(objDato, "Tipo3N", true);
        break;
      }
    }
  }

  xhttp.open("GET", url, true);
  xhttp.send();
}
////////////////////////////////////////////////////////////
function creaDD(dato, iSelector, blanco) {
  var option;
  var dd = document.getElementById(iSelector);  // dropdown
  dd.length = 0;
  document.getElementById("t" + iSelector).value = "";
  
  option = document.createElement('option');
  option.value = ""; option.text = "";
  dd.add(option);
  
  for (var i = 0; i < dato.length; i++) {
    option = document.createElement('option');
    var cat = dato[i].id_categoria_c;
    var niv = dato[i].nivel_c;
    var pre = dato[i].prede_c;

    option.value = cat + "|" + niv + "|" + pre;
    option.text = dato[i].titulo_c;
    dd.add(option);
  }
}
/////////////////////////////////////////////////////////////////////
function vaciaDD(dds) {
  for (var i = 0;i < dds.length;i++) {
    document.getElementById(dds[i]).options.length = 0;
    document.getElementById("t" + dds[i]).value = "";
  }
}

/////////////////////////////////////////////////////////////////////

function sqlInsertCategoria(datosCategoria) {
  var xhr = new XMLHttpRequest();
  var data = JSON.stringify(datosCategoria);
  var url = "/enlaces/addcat";
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

  xhr.onreadystatechange = function () { 
    if (this.readyState == 4 && this.status == 200) {
      var objDato = JSON.parse(this.responseText);
      var categoria =objDato[0].id;
      recuperaCategorias(categoria);
    }
  }
  
  xhr.send(data);
}

/////////////////////////////////////////////////////////////////////

function sqlUpdateCategoria(datosCategoria) {
  var xhr = new XMLHttpRequest();
  var data = JSON.stringify(datosCategoria);
  var url = "/enlaces/updcat";
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
  xhr.onreadystatechange = function () { 
    if (this.readyState == 4 && this.status == 200) {
      var id_categoria_c = this.responseText;
      recuperaCategorias(id_categoria_c);
    }
  }
  xhr.send(data);
}

/////////////////////////////////////////////////////////////////////
function modificaTituloCategoriaNN(idTipoN) {
  var id_usuario_c = "2";
  var valor = "";
  var arrValor, id_categoria_c, nivel_c, prede_c, t, titulo_c;
  var i = document.getElementById(idTipoN).selectedIndex;

  if (i>=0) valor = document.getElementById(idTipoN).options[i].value;

  if (i>=0 && valor.trim() != "") {   // Existe una seleccion dentro de la lista actual
       
    titulo_c = document.getElementById(idTipoN).options[i].text;
           t = document.getElementById("t" + idTipoN).value;
    // bloque de datos para agregar al registro de nuevo enlace
    arrValor = valor.split("|", 3);
    id_categoria_c = arrValor[0];
    
    if (titulo_c != t) {     // Se ha modificado el texto ...
      titulo_c = t;          //  Hay que grabar esta categoria
      ultimoId = sqlUpdateCategoria({"titulo_c": titulo_c, "id_categoria_c": id_categoria_c});                        
    }                         //  y si no, siguen las comprobaciones

  }
}
/////////////////////////////////////////////////////////////////////


/////////////////////////////////////////////////////////////////////
function buscaCategoriaEfectiva() {
  var valor = leeCategoriaEfectiva("Tipo3N");
  if (valor != "") {
    return valor;
  } else {
    valor = leeCategoriaEfectiva("Tipo2N")
    if (valor != "") {
      return valor;
    } else {
      valor = leeCategoriaEfectiva("Tipo1N")
      if (valor != "") {
        return valor;
      } else {
        return "";
      }
    }
  }
}
/////////////////////////////////////////////////////////////////////
function leeCategoriaEfectiva(tipoN) {
  var id_usuario_c = "2";
  var valor = "";
  var arrValor, id_categoria_c, nivel_c, prede_c, t, titulo_c;

  if (document.getElementById(tipoN) == undefined) return "";

  var i = document.getElementById(tipoN).selectedIndex;

  if (i>=0) {
    valor = document.getElementById(tipoN).options[i].value;
  } else {
    return "";
  }

  if (valor.trim() != "") {   // Existe una seleccion dentro de la lista actual   
    titulo_c = document.getElementById(tipoN).options[i].text;
           t = document.getElementById("t" + tipoN).value;
    if (t == "") return "";  // Se ha sobrescrito el texto de la selección
    arrValor = valor.split("|", 3);
    id_categoria_c = arrValor[0];
    nivel_c = arrValor[1];
    prede_c = arrValor[2];
  } else {
    return "";
  } 
  return valor;
}
/////////////////////////////////////////////////////////////////////
function grabaCategoriaN1() {
  var id_usuario_c = "2";
  var valor = "";
  var arrValor, id_categoria_c, nivel_c, prede_c, t, titulo_c;
  var i = document.getElementById("Tipo1N").selectedIndex;

  if (i>=0) valor = document.getElementById("Tipo1N").options[i].value;

  if (i>=0 && valor.trim() != "") {   // Existe una seleccion dentro de la lista actual
       
    titulo_c = document.getElementById("Tipo1N").options[i].text;
           t = document.getElementById("tTipo1N").value;
    // bloque de datos para agregar al registro de nuevo enlace
    arrValor = valor.split("|", 3);
    id_categoria_c = arrValor[0];
    nivel_c = arrValor[1];
    prede_c = arrValor[2];
    
    if (titulo_c != t) {     // Se ha modificado el texto ...
      titulo_c = t;          //  Hay que grabar esta categoria
      ultimoId = sqlInsertCategoria({"nivel_c": nivel_c, "titulo_c": titulo_c, 
                                      "id_usuario_c": id_usuario_c, "prede_c": prede_c});                        
    }                         //  y si no, siguen las comprobaciones
  } else {      // Si no existe selección
    t = document.getElementById("tTipo1N").value;
    if (t.trim() != "") {     // Se ha modificado el texto ...
      titulo_c = t;          //  Hay que grabar esta categoria
      nivel_c = "1";
      prede_c = "0";
      ultimoId = sqlInsertCategoria({"nivel_c": nivel_c, "titulo_c": titulo_c, 
                                      "id_usuario_c": id_usuario_c, "prede_c": prede_c});                        
    }
  }
  return true;
}
// ----
function grabaCategoriaN2() {
  var id_usuario_c = "2";
  var valor = "";
  var arrValor, id_categoria_c, nivel_c, prede_c, t, titulo_c, prede_sup;

  // Sin datos del predecesor de N1 no podríamos grabar la categoría de N2
  var i = document.getElementById("Tipo1N").selectedIndex;
  valor = document.getElementById("Tipo1N").options[i].value;
  if (i>=0 && valor.trim() != "") {
    arrValor = valor.split("|", 3);
    id_categoria_c = arrValor[0];
    prede_sup = id_categoria_c;
    valor = ""; arrValor = [];
  } else {
    return false;     // sin datos del predecesor
  }

  // Buscamos datos del desplegable actual
  i = document.getElementById("Tipo2N").selectedIndex;
  if (i>=0) valor = document.getElementById("Tipo2N").options[i].value;

  if (i>=0 && valor.trim() != "") {   // Existe una seleccion dentro de la lista actual
       
    titulo_c = document.getElementById("Tipo2N").options[i].text;
           t = document.getElementById("tTipo2N").value;
    // bloque de datos para agregar al registro de nuevo enlace
    arrValor = valor.split("|", 3);
    id_categoria_c = arrValor[0];
    nivel_c = arrValor[1];
    prede_c = arrValor[2];
    
    if (titulo_c != t) {     // Se ha modificado el texto ...
      titulo_c = t;          //  Hay que grabar esta categoria
      ultimoId = sqlInsertCategoria({"nivel_c": nivel_c, "titulo_c": titulo_c, 
                                      "id_usuario_c": id_usuario_c, "prede_c": prede_c});                        
    }                         //  y si no, siguen las comprobaciones
  } else {      // Si no existe selección
    t = document.getElementById("tTipo2N").value;
    if (t.trim() != "") {     // Se ha modificado el texto ...
      titulo_c = t;          //  Hay que grabar esta categoria
      nivel_c = "2";
      prede_c = prede_sup;
      ultimoId = sqlInsertCategoria({"nivel_c": nivel_c, "titulo_c": titulo_c, 
                                      "id_usuario_c": id_usuario_c, "prede_c": prede_c});                        
    }
  }
  return true;
}

// ----

function grabaCategoriaN3() {
  var id_usuario_c = "2";
  var valor = "";
  var arrValor, id_categoria_c, nivel_c, prede_c, t, titulo_c, prede_sup;
  
  // Sin datos del predecesor de N1 no podríamos grabar la categoría de N2
  var i = document.getElementById("Tipo2N").selectedIndex;
  valor = document.getElementById("Tipo2N").options[i].value;
  if (i>=0 && valor.trim() != "") {
    arrValor = valor.split("|", 3);
    id_categoria_c = arrValor[0];
    prede_sup = id_categoria_c;
    valor = ""; arrValor = [];
  } else {
    return false;     // sin datos del predecesor
  }

  // Buscamos datos del desplegable actual
  i = document.getElementById("Tipo3N").selectedIndex;
  if (i>=0) valor = document.getElementById("Tipo3N").options[i].value;

  if (i>=0 && valor.trim() != "") {   // Existe una seleccion dentro de la lista actual
       
    titulo_c = document.getElementById("Tipo3N").options[i].text;
           t = document.getElementById("tTipo3N").value;
    // bloque de datos para agregar al registro de nuevo enlace
    arrValor = valor.split("|", 3);
    id_categoria_c = arrValor[0];
    nivel_c = arrValor[1];
    prede_c = arrValor[2];
    
    if (titulo_c != t) {     // Se ha modificado el texto ...
      titulo_c = t;          //  Hay que grabar esta categoria
      ultimoId = sqlInsertCategoria({"nivel_c": nivel_c, "titulo_c": titulo_c, 
                                      "id_usuario_c": id_usuario_c, "prede_c": prede_c});                        
    }                         //  y si no, siguen las comprobaciones
  } else {      // Si no existe selección
    t = document.getElementById("tTipo3N").value;
    if (t.trim() != "") {     // Se ha modificado el texto ...
      titulo_c = t;          //  Hay que grabar esta categoria
      nivel_c = "3";
      prede_c = prede_sup;
      ultimoId = sqlInsertCategoria({"nivel_c": nivel_c, "titulo_c": titulo_c, 
                                      "id_usuario_c": id_usuario_c, "prede_c": prede_c});                        
    }
  }
  return true;
}

// ----
function nuevoEnlace(idForm) {
  var varCat = buscaCategoriaEfectiva();
  var arrCat = varCat.split("|",3);
  if (arrCat.length == 3) {
    document.getElementById("id_usuario_e").value = 2;
    document.getElementById("id_categoria_e").value = arrCat[0];
    document.getElementById(idForm).action = "/enlaces/addenlace";
    document.getElementById(idForm).method = "POST";
    document.getElementById(idForm).submit();
  }
}
// ----
function modificaEnlace(idForm) {
  var varCat = buscaCategoriaEfectiva();
  var arrCat = varCat.split("|",3);
  if (arrCat.length == 3) {
    document.getElementById("id_categoria_e").value = arrCat[0];
    document.getElementById(idForm).action = "/enlaces/updenlace/";
    document.getElementById(idForm).method = "POST";
    document.getElementById(idForm).submit();
  }
}
// ----
function borraEnlace(idForm) {
    document.getElementById(idForm).action = "/enlaces/delenlace/";
    document.getElementById(idForm).method = "POST";
    document.getElementById(idForm).submit();
}
// ----
function limpiaformsEnlace(forms) {
  forms.forEach(formulario => {
    var x = document.getElementById(formulario);
    x.reset();
  })
  vaciaDD(["Tipo1N","Tipo2N","Tipo3N"]);
}
// ----
// Lista enlaces desde el boton listar
function listaEnlaces(idForm) {
  var varCat = buscaCategoriaEfectiva();
  arrCat = varCat.split("|");
  if (arrCat.length != 3) {
    document.getElementById(idForm).action = "/enlaces/list/";
  } else {
    var idCat = arrCat[0];
    document.getElementById("id_categoria_e").value = idCat;
    document.getElementById(idForm).action = "/enlaces/list/";  
  }
  document.getElementById(idForm).method = "POST";
  document.getElementById(idForm).submit();
}



