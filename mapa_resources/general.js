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

//Array de objetos "Archivos"
var arrayArchivos = [
    new Archivos("prueba", "./archivos_java/", "utf8"),
    new Archivos("prueba", "./archivos_java/", "utf8")
];
var archivos = [];

//Evento de espera de carga de página
Evento(window, 'load', Inicio);

//Función de ejecución inicial al cargar la página
function Inicio() {
    ListarArchivos();
}

//Ejecuta el codigo Diff y lo imprime en pantalla
function renderDiff(diffDiv, contentsBefore, contentsAfter) {
    diffDiv.appendChild(codediff.buildView(
        contentsBefore, contentsAfter, { language: 'java' }));
}

function lee(fichero, observador) {
    var original = null;
    var original_loaded = false;
    var destino = null;
    var destino_loaded = false;

    leeFichero(fichero.getPath() + fichero.getNombre() + ".java.original", 'page1', function(content) {
        original = content;
        original_loaded = true;
        if (destino_loaded) {
            observador(original, destino);
        }
    });

    leeFichero(fichero.getPath() + fichero.getNombre() + ".java.new", 'page2', function(content) {
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
        li.setAttribute("class", "mdl-navigation__link mdl-list__item");
        li.setAttribute("onclick", "cargarDatos('" + contador + "', this)");
        var texto = document.createTextNode(arrayArchivos[contador].getNombre());
        li.appendChild(texto);
        document.getElementById("listaArchivos").appendChild(li);
    }
}


//Carga el codigo de ambos archivos usando el Diff
function cargarDatos(numero, elemento) {
    var active = document.getElementsByClassName("active");
    if(active.length!=0){
        active[0].className = active[0].className.replace("active", "");
        elemento.className += " active";
    } else {
        elemento.className += " active";
    }
    document.getElementById("title-file").innerHTML = arrayArchivos[0].getNombre().toUpperCase();
    document.getElementById("borrar").removeChild(document.getElementById("diffview"));
    var divDiff = document.createElement("div");
    divDiff.setAttribute("id", "diffview");
    document.getElementById("borrar").appendChild(divDiff);
    lee(arrayArchivos[numero], function(beforeText, afterText) {
        var diffDiv = document.getElementById("diffview");
        renderDiff(diffDiv, beforeText, afterText);
    });
}