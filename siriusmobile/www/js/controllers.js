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
    $scope.empresas = []
    $scope.grupo = '';
    $scope.empPdvVisivel;
    $scope.pdvs = [];
    
    $scope.toggleGroup = function(grupo){
        if ($scope.mostraGrupo(grupo))
          $scope.grupo = null;
        else
          $scope.grupo = grupo;
    };
    
    $scope.togglePdv = function(nroEmpresa, index){
        $scope.atualizaPDV(index);
        if ($scope.mostraPdvs(nroEmpresa))
            $scope.empPdvVisivel = null;
        else
            $scope.empPdvVisivel = nroEmpresa;
    }
    
    $scope.atualizaPDV = function(index){
        if($scope.empresas[index].listaPdv.length == 0){
            $scope.getListaPDV($scope.empresas[index].nroempresa, index);
        }
    };
    
    $scope.mostraPdvs = function(nroEmpresa){
        return $scope.empPdvVisivel === nroEmpresa;
    };
    
    $scope.getListaPDV = function (nroEmpresa, index) {
        dataService.url = serverConfig.serverUrl + "/Application/GetListaPdv/" + nroEmpresa;
        dataService.getData(function (dataResponse) {
            $scope.empresas[index].listaPdv = dataResponse;
        });
    };
    
    $scope.mostraGrupo = function(grupo){
        return $scope.grupo === grupo;
    };
    
    dataService.url = serverConfig.serverUrl + SegmentoService.url;
    dataService.getData(function(dataResponse){
        $scope.segmentos = dataResponse;
    });
    
    dataService.url = serverConfig.serverUrl + EmpresaService.url;
    dataService.getData(function(dataResponse){
        $scope.empresas = dataResponse;
        for(var i = 0; i < $scope.empresas.length; i++){
            $scope.empresas[i].listaPdv = [];
        }
    })
})
   
.controller('PadroesCtrl', function($scope) {

})
 