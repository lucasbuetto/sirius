angular.module('siriusApp')
.factory('UsuarioService', function(){
    o = {
        autenticaUsuario: function(usuario){
            return true;
        }
    };
    
    return o;
    
});