angular.module('siriusApp')
.controller('LoginController', function($scope, $state, UsuarioService) {
    usuario = {};
    
    $scope.login = function(){
        
        if (UsuarioService.autenticaUsuario(usuario)) $state.go('filtro');
    };
});