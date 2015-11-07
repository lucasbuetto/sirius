angular.module('app.services')
.factory('FiltroService', function () {
    var data = {
        objFiltro: {}
    }
    
    return {
        getObjFiltro: function(){
            return data.objFiltro;
        }, 
        getStringFiltro: function(){
            return '';
        },
        setObjFiltro: function(obj){
            data.objFiltro = obj;
        }
    }
});