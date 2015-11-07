angular.module('app.controllers')
.controller('FiltrosCtrl', function($scope, $state, $ionicPopup, $ionicLoading, EmpresaService, SegmentoService, PDVService,
                                     DataService, ServerConfig) {
    $scope.segmentos = [];
    $scope.empresas = []
    $scope.grupo = '';
    $scope.empPdvVisivel;
    $scope.pdvs = [];
    $scope.frequencia = 33;
    $scope.limitePadroes = 10;
    
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
        DataService.url = ServerConfig.getServerUrl() + PDVService.url + nroEmpresa;
        DataService.getData(
            function (dataResponse) {
                if(dataResponse.length > 0)
                    $scope.empresas[index].listaPdv = dataResponse;
                else{
                    $ionicPopup.alert({
                        title: "Ops",
                        template: "Essa empresa não possui PDVs cadastrados.",
                        okText: "OK",
                        okType: "button-balanced"
                    });
                }
            },
            function(dataResponse){
                $ionicPopup.alert({
                    title: "Ops",
                    template: "O servidor não respondeu, tente novamente mais tarde.",
                    okText: "OK",
                    okType: "button-balanced"
                });
            });
    };
    
    $scope.mostraGrupo = function(grupo){
        return $scope.grupo === grupo;
    };
    
    $scope.carregaSegmentos = function(){
        if(!$scope.segmentos || $scope.segmentos.length == 0){
            DataService.url = ServerConfig.getServerUrl() + SegmentoService.url;
            DataService.getData(
                function(dataResponse){
                    $scope.segmentos = dataResponse;
                },
                function(dataResponse){
                    var alertPopup = $ionicPopup.alert({
                        title: "Ops",
                        template: "O servidor não respondeu, tente novamente mais tarde.",
                        okText: "OK",
                        okType: "button-positive"
                    });
                }); 
        }
    };
    
    $scope.carregaEmpresas = function(){
        if(!$scope.empresas || $scope.empresas.length == 0){
            DataService.url = ServerConfig.getServerUrl() + EmpresaService.url;
            DataService.getData(
                function(dataResponse){
                    $scope.empresas = dataResponse;
                    for(var i = 0; i < $scope.empresas.length; i++){
                        $scope.empresas[i].listaPdv = [];
                    }
                },
                function(dataResponse){
                    var alertPopup = $ionicPopup.alert({
                        title: "Ops",
                        template: "O servidor não respondeu, tente novamente mais tarde.",
                        okText: "OK",
                        okType: "button-positive"
                    });
                });
        }
    };
    
    $scope.gerarPadroes = function(){
        $state.go('padroes.grafico');
    };
});