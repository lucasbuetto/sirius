angular.module('app.routes', ['app.controllers'])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
    .state('login', {
      url: '/login',
      templateUrl: 'templates/login.html',
      controller: 'LoginCtrl'
    })
      
    .state('filtros', {
      url: '/filtros',
      templateUrl: 'templates/filtros.html',
      controller: 'FiltrosCtrl'
    })
    
    // Rotas para a tela de exibição dos padrões
    .state('padroes', {
        url: '/padroes',
        abstract: true,
        templateUrl: 'templates/padroes.html'
    })

    .state('padroes.grafico', {
        url: '/grafico',
        views: {
            'padroes-grafico': {
                templateUrl: 'templates/padroes-grafico.html',
                controller: 'PadroesCtrl'
            }
        }
    })
  
    .state('padroes.analitico', {
        url: '/analitico',
        views: {
            'padroes-analitico': {
                templateUrl: 'templates/padroes-analitico.html',
                controller: 'PadroesCtrl'
            }
        }
    });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');
});