//Clase Archivos
function Archivos(ficheroNew, ficheroOriginal, codigoNew, codigoOriginal) {
    this.ficheroNew = ficheroNew;
    this.ficheroOriginal = ficheroOriginal;
    this.codigoNew = codigoNew;
    this.codigoOriginal = codigoOriginal;

    this.setFicheroNew = function(nombre) {
        this.ficheroNew = nombre;
    }

    this.getFicheroNew = function() {
        return this.ficheroNew;
    }

    this.setFicheroOriginal = function(nombre) {
        this.ficheroOriginal = nombre;
    }

    this.getFicheroOriginal = function() {
        return this.ficheroOriginal;
    }

    this.setCodigoNew = function(nombre) {
        this.codigoNew = nombre;
    }

    this.getCodigoNew = function() {
        return this.codigoNew;
    }

    this.setCodigoOriginal = function(nombre) {
        this.codigoOriginal = nombre;
    }

    this.getCodigoOriginal = function() {
        return this.codigoOriginal;
    }
}