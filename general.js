var Evento = function() {
    function w3c_crearEvento(elemento, evento, mifuncion) {
        elemento.addEventListener(evento, mifuncion, false);
    }

    function ie_crearEvento(elemento, evento, mifuncion) {
        var fx = function() { mifuncion.call(elemento); };
        elemento.attachEvent('on' + evento, fx);
    }

    if (typeof window.addEventListener !== 'undefined') return w3c_crearEvento;
    else if (typeof window.attachEvent !== 'undefined') return ie_crearEvento;
}();

var primeros = new Archivos("prueba1.java.new", "prueba1.java.original", "Esto es una prueba.Esto es una prueba.Esto es una prueba.Esto es una prueba.Esto es una prueba.Esto es una prueba.Esto es una prueba.Esto es una prueba.Esto es una prueba.Esto es una prueba.Esto es una prueba.", "Es una prueba ahora.Es una prueba ahora.Es una prueba ahora.Es una prueba ahora.Es una prueba ahora.Es una prueba ahora.Es una prueba ahora.Es una prueba ahora.Es una prueba ahora.Es una prueba ahora.Es una prueba ahora.");
var segundos = new Archivos("prueba.java.new", "prueba.java.original", "Esta es la segunda prueba.", "Es la segunda prueba ahora.");

var arrayArchivos = [];
arrayArchivos.push(primeros);
arrayArchivos.push(segundos);

Evento(window, 'load', Inicio);

function Inicio() {
    ListarArchivos();
}

function ListarArchivos() {
    for (contador = 0; contador < arrayArchivos.length; contador++) {
        var li = document.createElement("li");
        li.setAttribute("class", "mdl-list__item");
        li.setAttribute("onclick", "cargarDatos('" + arrayArchivos[contador].getFicheroOriginal() + "')");
        var texto = document.createTextNode(arrayArchivos[contador].getFicheroOriginal() + "-" + arrayArchivos[contador].getFicheroNew());
        li.appendChild(texto);
        document.getElementById("listaArchivos").appendChild(li);
    }
}

function cargarDatos(nombre) {
    document.getElementById("tablaVisualizar").removeChild(document.getElementsByTagName("tbody")[0]);
    for (contador = 0; contador < arrayArchivos.length; contador++) {
        if (arrayArchivos[contador].getFicheroOriginal() == nombre) {
            var tdOriginal = document.createElement("td");
            var textoOriginal = document.createTextNode(arrayArchivos[contador].getCodigoOriginal());
            tdOriginal.appendChild(textoOriginal);
            var tdNew = document.createElement("td");
            var textoNew = document.createTextNode(arrayArchivos[contador].getCodigoNew());
            tdNew.appendChild(textoNew);
            var tr = document.createElement("tr");
            tr.appendChild(tdOriginal);
            tr.appendChild(tdNew);
            var tbody = document.createElement("tbody");
            tbody.appendChild(tr);
            document.getElementById("tablaVisualizar").appendChild(tbody);
        }
    }
}