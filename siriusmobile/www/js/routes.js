angular.module('app.routes', [])

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
      
    .state('padroes', {
      url: '/padroes',
      templateUrl: 'templates/padroes.html',
      controller: 'PadroesCtrl'
    });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');
});