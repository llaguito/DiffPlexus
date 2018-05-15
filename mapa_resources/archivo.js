//Clase Archivos
function Archivos(ficheroNew, ficheroOriginal, codigoNew, codigoOriginal, path) {
    this.ficheroNew = ficheroNew;
    this.ficheroOriginal = ficheroOriginal;
    this.codigoNew = codigoNew;
    this.codigoOriginal = codigoOriginal;
    this.path = path;

    this.setFicheroNew = function(cambio) {
        this.ficheroNew = cambio;
    }

    this.getFicheroNew = function() {
        return this.ficheroNew;
    }

    this.setFicheroOriginal = function(cambio) {
        this.ficheroOriginal = cambio;
    }

    this.getFicheroOriginal = function() {
        return this.ficheroOriginal;
    }

    this.setCodigoNew = function(cambio) {
        this.codigoNew = cambio;
    }

    this.getCodigoNew = function() {
        return this.codigoNew;
    }

    this.setCodigoOriginal = function(cambio) {
        this.codigoOriginal = cambio;
    }

    this.getCodigoOriginal = function() {
        return this.codigoOriginal;
    }

    this.setPathl = function(cambio) {
        this.Path = cambio;
    }

    this.getPath = function() {
        return this.Path;
    }
}