angular.module('siriusApp', ['ionic', 'ngRoute', 'ui.router'])

.config(function($stateProvider, $urlRouterProvider) {
 
  $stateProvider
  .state('login', {
    url: '/',
    templateUrl: 'templates/login.html',
    controller: 'LoginController'
  })
  .state('filtro', {
    url: '/filtro',
    templateUrl: 'templates/filtro.html'
  });
 
  $urlRouterProvider.otherwise("/");
 
})

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});
