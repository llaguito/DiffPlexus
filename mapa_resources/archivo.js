//Clase Archivos
function Archivos(nombre, path, charset) {
    this.nombre = nombre;
    this.path = path;
    this.charset = charset;

    this.setNombre = function(cambio) {
        this.nombre = cambio;
    }

    this.getNombre = function() {
        return this.nombre;
    }

    this.setPath = function(cambio) {
        this.path = cambio;
    }

    this.getPath = function() {
        return this.path;
    }

    this.setCharset = function(cambio) {
        this.charset = cambio;
    }

    this.getCharset = function() {
        return this.charset;
    }
}