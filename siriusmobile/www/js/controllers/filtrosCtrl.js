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
    
    $scope.dataInicial = new Date();
    /*$scope.dataInicial.setMilliseconds(0);
    $scope.dataInicial.setSeconds(0);*/
    
    $scope.dataFinal = new Date();
    $scope.dataFinal.setMilliseconds(0);
    $scope.dataFinal.setSeconds(0);
    
    $scope.toggleGroup = function(grupo){
        if ($scope.mostraGrupo(grupo))
          $scope.grupo = null;
        else
          $scope.grupo = grupo;
    };
    
    $scope.togglePdv = function(empresa){
        $scope.atualizaPDV(empresa, false);
        
        if ($scope.mostraPdvs(empresa))
            $scope.empPdvVisivel = null;
        else
            $scope.empPdvVisivel = empresa.nroempresa;
    }
    
    $scope.atualizaPDV = function(empresa, trazPdvsMarcados){
        if(empresa.listaPdv.length == 0){
            $scope.getListaPDV(empresa, trazPdvsMarcados);
        }
    };
    
    $scope.mostraPdvs = function(empresa){
        return $scope.empPdvVisivel === empresa.nroempresa;
    };
    
    $scope.getListaPDV = function (empresa, trazPdvsMarcados) {
        DataService.url = ServerConfig.getServerUrl() + PDVService.url + empresa.nroempresa;
        DataService.getData(
            function (dataResponse) {
                if(dataResponse.length > 0){
                    empresa.listaPdv = dataResponse;
                    
                    if(trazPdvsMarcados)
                        for(var i in empresa.listaPdv) empresa.listaPdv[i].isChecked = true;
                }
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
        var objFiltro = {};
        var mensagens = [];    
    
        
        if(!$scope.dataInicial) mensagens.push('Informe a data inicial');
        if(!$scope.dataFinal) mensagens.push('Informe a data final');
        if($scope.dataInicial > $scope.dataFinal) mensagens.push('A data final não pode ser menor que a data inicial.');
        
        objFiltro.dataInicial = $scope.dataInicial;
        objFiltro.dataFinal   = $scope.dataFinal;
        
        objFiltro.diaSemana = [];
        
        objFiltro.frequencia = $scope.frequencia;
        objFiltro.limitePadroes = $scope.limitePadroes;
        
        objFiltro.segmentos = [];
        
        //
        
        
        $ionicPopup.alert({
                    title: "Ops",
                    template: "O servidor não respondeu, tente novamente mais tarde.",
                    okText: "OK",
                    okType: "button-balanced"
                });
        
        
        $state.go('padroes.grafico');
    };
    
    $scope.clickPdv = function(empresa, pdv){
        if(pdv.isChecked){
            empresa.isChecked = true;
        }
        else{
            var existePdvMarcado = false;
            
            for(var i in empresa.listaPdv)
                if(empresa.listaPdv[i].isChecked) existePdvMarcado = true;
            
            empresa.isChecked = existePdvMarcado
        }
    };
    
    $scope.clickEmpresa = function(empresa){
        //empresa.listaPdv 
        $scope.atualizaPDV(empresa, true);
        
        if(empresa.isChecked)
            for(var i in empresa.listaPdv) empresa.listaPdv[i].isChecked = true;
        else
            for(var i in empresa.listaPdv) empresa.listaPdv[i].isChecked = false;
    };
});