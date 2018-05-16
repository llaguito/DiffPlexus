//Creador de eventos compatibles con navegadores
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

//Array de objetos "Archivos"
var arrayArchivos = [];
arrayArchivos.push(primeros);
arrayArchivos.push(segundos);

//Evento de espera de carga de página
Evento(window, 'load', Inicio);

//Función de ejecución inicial al cargar la página
function Inicio() {
    ListarArchivos();
}


function renderDiff(diffDiv, contentsBefore, contentsAfter) {
    diffDiv.appendChild(codediff.buildView(
        contentsBefore, contentsAfter, { language: 'js' }));
}

function getAllFiles() {}

function lee(fichero, observador) {
    var original = null;
    var original_loaded = false;
    var destino = null;
    var destino_loaded = false;

    leeFichero("../archivos_java" + fichero + ".original", 'page1', function(content) {
        original = content;
        original_loaded = true;
        if (destino_loaded) {
            observador(original, destino);
        }
    });
    leeFichero("../archivos_java" + fichero + ".new", 'page2', function(content) {
        destino = content;
        destino_loaded = true;
        if (original_loaded) {
            observador(original, destino);
        }
    });
}

function leeFichero(fichero, inname, callback) {
    var iframe = document.getElementById(inname);
    iframe.src = fichero;
    setTimeout(function() {
        try {
            callback(iframe.contentWindow.document.body.innerText);
        } catch (fail) {
            console.log(fail);
            alert("Su navegador no permite acceder al contenido local. Pruebe a usar iexplorer");
        }
    }, 250);
}

//Lista los arhivos que se pueden visualizar.
function ListarArchivos() {
    for (contador = 0; contador < arrayArchivos.length; contador++) {
        var li = document.createElement("li");
        li.setAttribute("class", "mdl-list__item");
        li.setAttribute("onclick", "cargarDatos('" + contador + "')");
        var texto = document.createTextNode(arrayArchivos[contador].getFicheroOriginal() + "-" + arrayArchivos[contador].getFicheroNew());
        li.appendChild(texto);
        document.getElementById("listaArchivos").appendChild(li);
    }
}


//Carga el codigo de ambos archivos usando el Diff
function cargarDatos(numero) {
    document.getElementById("borrar").removeChild(document.getElementById("diffview"));
    var divDiff = document.createElement("div");
    divDiff.setAttribute("id", "diffview");
    document.getElementById("borrar").appendChild(divDiff);
    var beforeText = arrayArchivos[numero].getCodigoOriginal();
    var afterText = arrayArchivos[numero].getCodigoNew();
    var diffDiv = document.getElementById("diffview");
    renderDiff(diffDiv, beforeText, afterText);
}