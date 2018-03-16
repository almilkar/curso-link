window.onload = function() {
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
        creaDD(objDato.categorias1N, "Tipo1N", false);
      } else {
        document.getElementById("Tipo1N").length = 0;
        document.getElementById("tTipo1N").value = "";
      }
      if (objDato.categorias2N != undefined) {
        creaDD(objDato.categorias2N, "Tipo2N", false);
      } else {
        document.getElementById("Tipo2N").length = 0;
        document.getElementById("tTipo2N").value = "";
      }
      if (objDato.categorias3N != undefined) {
        creaDD(objDato.categorias3N, "Tipo3N", false);
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
///////////////////////////////////////////////////////////////////////
function recuperaCategoriasSiguientes(cadCategoria, nivel) {
  var idCategoria;
  var objDato = {};

  if ((cadCategoria == "") || (cadCategoria == undefined)) return false;
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
  var dd = document.getElementById(iSelector);  // dropdown
  dd.length = 0;
  if (blanco == true) {
    //option = document.createElement('option');
    //dd.add(option);
    document.getElementById("t" + iSelector).value = "";
  }
  
  for (var i = 0; i < dato.length; i++) {
    var option = document.createElement('option');
    var cat = dato[i].id_categoria_c;
    var niv = dato[i].nivel_c;
    var pre = dato[i].prede_c;

    option.value = cat + "|" + niv + "|" + pre;
    option.text = dato[i].titulo_c;
    dd.add(option);
  }

  dd.selectedIndex = 0;

  if (i==0) {
      document.getElementById("t" + iSelector).value = "";
  } else {
      document.getElementById("t" + iSelector).value = tomaSeleccion(iSelector);
  }
  if (blanco == true) {
    //option = document.createElement('option');
    //dd.add(option);
    document.getElementById("t" + iSelector).value = "";
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
function tomaSeleccion(idDD) {
  var elem = document.getElementById(idDD);
  var valor = elem.options[elem.selectedIndex].value;
  var texto = elem.options[elem.selectedIndex].text;
  return texto;
}
/////////////////////////////////////////////////////////////////////

function grabaCategoria(datosCategoria) {
  var xhr = new XMLHttpRequest();
  var url = "/enlaces/addcat";
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-type", "application/json");
  xhr.onreadystatechange = function () { 
    if (xhr.readyState == 4 && xhr.status == 200) {
        //var json = JSON.parse(xhr.responseText);
        console.log(xhr.responseText);
        return xhr.responseText;
    }
  }
  var data = JSON.stringify({"email":"tomb@raider.com","name":"LaraCroft"});
  xhr.send(data);
}

/////////////////////////////////////////////////////////////////////
/* ----------------------------------------------------------
* leeSelectCategorias()
* Se comprueba:
* 1. Qué valores se seleccionaron en las listas desplegables (selectedIndex >= 0)
* 2. Si se modificó la casilla con respecto el valor original, en cuyo caso se considera
*    que se crea una nueva categoría
* 3. Si el nivel 1 es nuevo, 2 y 3 tambien los son.
* 4. Si el nivel 1 no es nuevo, comprobar el nivel 2
* 5. Si el nivel 2 no es nuevo, comprobar el nivel 3
* -----------------------------------------------------------
*/
function leeSelectCategorias() {
  var id_usuario_c = 2;

  var i1 = document.getElementById("Tipo1N").selectedIndex;
  if (i1>=0) {   // Seleccion dentro de la lista actual
       valor = document.getElementById("Tipo1N").options[i1].value;
    titulo_c = document.getElementById("Tipo1N").options[i1].text;
           t = document.getElementById("tTipo1N").value;
    // bloque de datos para agregar al registro de nuevo enlace
    arrValor = valor.split("|", 3);
    id_categoria_c = arrValor[0];
    nivel_c = arrValor[1];
    prede_c = arrValor[2];
    
    if (titulo_c != t) {     // Se ha modificado el texto ...
      titulo_c = t;          //  Hay que grabar esta categoria
      ultimoIdCatN1 = grabaCategoria({nivel_c, titulo_c, id_usuario_c, prede_c});                        
    }                         //  y si no, siguen las comprobaciones
  }

  var i2 = document.getElementById("Tipo2N").selectedIndex; 
  if (i2>=0) {   // Seleccion dentro de la lista actual
       valor = document.getElementById("Tipo2N").options[i2].value;
    titulo_c = document.getElementById("Tipo2N").options[i2].text;
           t = document.getElementById("tTipo2N").value;
    // bloque de datos para agregar al registro de nuevo enlace
    arrValor = valor.split("|", 3);
    id_categoria_c = arrValor[0];
    nivel_c = arrValor[1];
    prede_c = arrValor[2];
    
    if (titulo_c != t) {     // Se ha modificado el texto ...
      titulo_c = t;          //  Hay que grabar esta categoria
      ultimoIdCatN2 = grabaCategoria({nivel_c, titulo_c, id_usuario_c, prede_c});                        
    }                         //  y si no, siguen las comprobaciones
  }

  var i3 = document.getElementById("Tipo3N").selectedIndex;  
  if (i3>=0) {   // Seleccion dentro de la lista actual
       valor = document.getElementById("Tipo3N").options[i3].value;
    titulo_c = document.getElementById("Tipo3N").options[i3].text;
           t = document.getElementById("tTipo3N").value;
    // bloque de datos para agregar al registro de nuevo enlace
    arrValor = valor.split("|", 3);
    id_categoria_c = arrValor[0];
    nivel_c = arrValor[1];
    prede_c = arrValor[2];
    
    if (titulo_c != t) {     // Se ha modificado el texto ...
      titulo_c = t;          //  Hay que grabar esta categoria
      ultimoIdCatN3 = grabaCategoria({nivel_c, titulo_c, id_usuario_c, prede_c});                        
    }                         //  y si no, siguen las comprobaciones
  }  

  document.getElementById("id_categoria_e").value = valor_nuevo;
  document.getElementById("id_categoria_c").value = valor_nuevo;
  document.getElementById("titulo_c").value = texto_nuevo;
  document.getElementById("nivel_c").value = nivel;
  document.getElementById("prede_c").value = prede;

  return;
}
/////////////////////////////////////////////////////////////////////////////


/* ----------------------------------------------------------
* leeSelectCategorias()
* Se comprueba:
* 1. Qué valores se seleccionaron en las listas desplegables (selectedIndex >= 0)
* 2. Si se modificó la casilla con respecto el valor original, en cuyo caso se considera
*    que se crea una nueva categoría
* -----------------------------------------------------------
*/
function leeEstadoCategoria3() {

  var i3 = document.getElementById("Tipo3N").selectedIndex;
  
  var valor3, valor_nuevo;
  var texto3, texto_nuevo;
  var t3;
  var prede, nivel;

  if (i3 == -1) {
    t3 = document.getElementById("tTipo3N").value;
    t3 = t2.trim();    
    if (t3 != "") {          // nueva categoría en nivel 3    
      valor_nuevo = valor3;
      texto_nuevo = t3;
      nivel = 3;
    } else {

    }
    return;
  }

  if (i3>=0) {
    valor3 = document.getElementById("Tipo3N").options[i3].value;
    texto3 = document.getElementById("Tipo3N").options[i3].text;  // texto select
        t3 = document.getElementById("tTipo3N").value;            //input text sobre el select
    if (texto3 != t3) {      // si se ha modificado el texto ...
      valor_nuevo = valor3;
      texto_nuevo = t3;
      nivel = 3;
    }
  }

  document.getElementById("id_categoria_e").value = valor_nuevo;
  document.getElementById("id_categoria_c").value = valor_nuevo;
  document.getElementById("titulo_c").value = texto_nuevo;
  document.getElementById("nivel_c").value = nivel;
  document.getElementById("prede_c").value = prede;

  return;
}

/////////////////////////////////////////////////////////////////////////////
function nuevoEnlace(idform) {
  leeSelectCategorias();
  document.getElementById(idForm).action = "/enlaces/add/";
  document.getElementById(idForm).method = "POST";
  document.getElementById(idForm).submit();
}
function modificaEnlace(idForm) {
  leeSelectCategorias();
  var idEnlace = document.getElementById('id_enlace_e').value;
  document.getElementById(idForm).action = "/enlaces/upd/" + idEnlace;
  document.getElementById(idForm).method = "POST";
  document.getElementById(idForm).submit();
}
function limpiaformsEnlace(forms) {
  forms.forEach(formulario => {
    var x = document.getElementById(formulario);
    x.reset();
  })
  vaciaDD(["Tipo1N","Tipo2N","Tipo3N"]);
}

