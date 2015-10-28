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
   
.controller('FiltrosCtrl', function($scope, $state, $ionicPopup, $ionicLoading, UsuarioService, EmpresaService, SegmentoService,
                                     DataService, ServerConfig) {
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
        DataService.url = ServerConfig.serverUrl + "/Application/GetListaPdv/" + nroEmpresa;
        DataService.getData(
            function (dataResponse) {
                $scope.empresas[index].listaPdv = dataResponse;
            },
            function(dataResponse){
                var alertPopup = $ionicPopup.alert({
                    title: "Ops",
                    template: "O servidor não respondeu, tente novamente mais tarde.",
                    okText: "OK",
                    okType: "button-balanced"
                });
            
                alertPopup.then(function(res) {
                    console.log('Thank you for not eating my delicious ice cream cone');
                });
            });
    };
    
    $scope.mostraGrupo = function(grupo){
        return $scope.grupo === grupo;
    };
    
    $scope.carregaSegmentos = function(){
        if(!$scope.segmentos || $scope.segmentos.length == 0){
            DataService.url = ServerConfig.serverUrl + SegmentoService.url;
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
            DataService.url = ServerConfig.serverUrl + EmpresaService.url;
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
})
   
.controller('PadroesCtrl', function($scope, PadroesService, DataService, $ionicPopup) {
    //PadroesService
    $scope.cor = '#d62728';
    $scope.dados = [
          {
            guid: 541001,
            frequencia: 20.01,
            padrao: "Banana, maça e mamão"
          },
          {
            guid: 541002,
            frequencia: 35.03,
            padrao: "Contra filé, alho, cebola"
          },
          {
            guid: 541003,
            frequencia: 15.9,
            padrao: "Omo multiação, sabonete dove"
          },
          {
            guid: 541004,
            frequencia: 43.6,
            padrao: "Pão fatiado wikibold, leite jussara, requeijão Criolo, iogurte nestle e flan Paulista"
          },
          {
            guid: 541005,
            frequencia: 30,
            padrao: "Alface e tomate"
          }    
    ];
        
    $scope.options = {
        chart: {
            type: 'discreteBarChart',
            height: 450,
            margin : {
                top: 20,
                right: 20,
                bottom: 60,
                left: 55
            },
            x: function(d){ return d.guid; },
            y: function(d){ return d.frequencia; },
            showValues: true,
            valueFormat: function(d){
                return d3.format(',.4f')(d);
            },
            showLegend: "true",
            transitionDuration: 2000,
            xAxis: {
                axisLabel: 'X Axis'
            },
            yAxis: {
                axisLabel: 'Y Axis',
                axisLabelDistance: 30
            }
        }
    };
        
    $scope.data = [{
        key: 'Padroes',
        values: $scope.dados
    }];
})
 