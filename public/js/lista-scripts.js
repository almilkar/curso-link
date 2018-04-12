datosPrepPaginaEnlaces(0,1,0);

  ////////////////////////////////////////////////////
  // datosPrepPaginaEnlaces(datosPagina)
  // datosPagina: idCategoria, fila_inicial, fila_final
  //              
  //
function datosPrepPaginaEnlaces(id_categoria, bloque_actual, pagina_desde) {

  var datosPagina = {"id_categoria": id_categoria, "bloque_actual": bloque_actual, "pagina_desde": pagina_desde};

  $.post("/enlaces/listaprep-enlaces", datosPagina, function(data, status) {
      if (status == "success") {
        //
        var continua = true;
        var numeroFilas = data.numfilas; 
        var numFilasPorPagina = data.filasporpagina;
        var numFilasPorBloque = data.filasporbloque;
        var paginasPorBloque = data.paginasporbloque;
        var filaDesde = data.fila_desde;
        var bloqueActual = data.bloque_actual * 1;
        var bloqueAnterior = bloqueActual - 1;
        var bloquePosterior = bloqueActual + 1;
        var numBloques = Math.ceil(numeroFilas / numFilasPorBloque);
        var numPaginasTotal = Math.ceil(numeroFilas / numFilasPorPagina);
        var paginaDesde = Math.ceil((filaDesde / numFilasPorPagina) * bloqueActual);
        //
        if (paginaDesde > numPaginasTotal - 3) paginaDesde = numPaginasTotal - 3;
        if (bloqueAnterior <= 0) bloqueAnterior = 1;
        if (bloquePosterior > numBloques) bloquePosterior = numBloques;
        //
        $("#selector").empty();
        var selector = $('#selector'), tabla = $('<table>'), tr = $('<tr>'), td = $('<td>');
       
        var paginaInicioBloqueAnterior = parseInt(pagina_desde) + paginasPorBloque * (bloque_actual - 1);
        var fParam = id_categoria + "," + bloqueAnterior + "," + (parseInt(paginasPorBloque) - 1); 
        var aux = "<a href='#' id='hrefPaginaA' onclick='datosPrepPaginaEnlaces(" + fParam + ")'>---</a>";
        td.append(aux); tr.append(td);
        //
        var x = 0;
        do {
          var indice = 1 + x + paginasPorBloque * (bloqueActual - 1);
          var td = $('<td>');
          var fParam = id_categoria + "," + bloqueActual + "," + x;
          var aux = "<a href='#' id='hrefPagina" + x + "' onclick='datosPrepPaginaEnlaces(" + fParam + ")'>" 
                                                 + indice + "</a>";
          td.append(aux); tr.append(td);
          x++;
          if (indice >= numPaginasTotal) {continua = false; break;}
        } while (x < paginasPorBloque)
        //
        var paginaInicioBloqueSiguiente = parseInt(pagina_desde) + paginasPorBloque * (bloquePosterior - 1);
        fParam = id_categoria + "," + bloquePosterior + "," + 0; //paginaInicioBloqueSiguiente;
        
        if (continua == true) {
          var aux = "<a href='#' id='hrefPaginaB' onclick='datosPrepPaginaEnlaces(" + fParam + ")'>+++</a>";
          td.append(aux); tr.append(td);
        }

        tabla.append(tr);
        

        selector.append(tabla);
        //
        var resultados = data.filas;
        presentaLista(resultados);
      }
  });
}

////////////////////////////////////////////
  // function presentaLista(resultados, paginaActual)
  //  resultados: filas de una query.
  //  paginaActual: número de indicador de página del elemento [a href]
  //  Desencadenado por el evento onclick sobre el [a href] indicador de página
  // Imprime los resultados de la consulta entre código HTML
  ///////////////////////////////////////////////////////////////////////////////
  function presentaLista(resultados, paginaActual) {
    $(document).ready(function(r) {
      $("#contenedor").empty();
      var contenedor = $('#contenedor'); 
      var tabla = $('<table>'); 
      var url;
      resultados.forEach(function(fila) {
        var tr = $('<tr>'); 
        
        tr.attr('id', 'fila');
        $('#fila').on('click', selecciona(fila.id_enlace_e,fila.enlace_e,fila.titulo_e,fila.id_categoria_e,fila.id_usuario_e));

        var aux = fila.enlace_e.match(/(^https:\/\/|^http:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w\.-]*)(\?[\da-z\.-=&]*)*/);
        onclick="selecciona(" + fila.id_enlace_e + ", " + fila.enlace_e + ", " + fila.titulo_e + ", " + fila.id_categoria_e + ", " + fila.id_usuario_e + ")"

        
        tr.append( "<td>"  + fila.id_enlace_e + "</td><td>" + fila.titulo_e + "</td>" + "<td>" + aux[2] + "</td>");
        tabla.append(tr);    
      });
      contenedor.append(tabla);

      var paginaAnterior = paginaActual - 1;
      var paginaPosterior = paginaActual + 1;
      $("#hrefPagina" + paginaAnterior).css("color", "blue");
      $("#hrefPagina" + paginaActual).css("color", "red");
      $("#hrefPagina" + paginaPosterior).css("color", "blue");

    });
   } 

  ////////////////////////////////////////////
