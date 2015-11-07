angular.module('app.controllers')

.controller('LoginCtrl', function($scope, $state, ServerConfig) {
    $scope.usuario = {};
    
    $scope.login = function(usuario){
        ServerConfig.config("http://cpro29838.publiccloud.com.br:8080/SiriusRestAPI");
        $state.go('filtros');
    }
});