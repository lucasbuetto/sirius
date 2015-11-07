angular.module('app.controllers')
.controller('PadroesCtrl', function($scope, DataService, $ionicPopup) {
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
});
 