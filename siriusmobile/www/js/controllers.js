angular.module('app.controllers', [])
  
.controller('LoginCtrl', function($scope, $state, UsuarioService) {
    $scope.usuario = {};
    
    $scope.login = function(usuario){
        $scope.message = '';
        var urlUsuario = UsuarioService.login(usuario.email, usuario.senha);
        
        if(urlUsuario){
            UsuarioService.gravaUrl(urlUsuario);
            $state.go('filtros');
        }
        else{
            $scope.message = 'Login inválido, tente novamente.';
        }
    }
})
   
.controller('FiltrosCtrl', function($scope, $state, UsuarioService, EmpresaService, SegmentoService,
                                     dataService, serverConfig) {
    $scope.segmentos = [];
    
    dataService.url = serverConfig.serverUrl + SegmentoService.url;
    dataService.getData(function(dataResponse){
        $scope.segmentos = dataResponse;
    });
    
    dataService.url = serverConfig.serverUrl + EmpresaService.url;
    dataService.getData(function(dataResponse){
        $scope.empresas = dataResponse;
    })
    
    
})
   
.controller('PadroesCtrl', function($scope) {

})
 