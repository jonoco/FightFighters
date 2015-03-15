var myApp = angular.module('myApp', 
  ['ngRoute']);

//var appControllers = angular.module('appControllers', []);

myApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider
  .when('/', {
    templateUrl: 'views/welcome.html',
    controller:  'WelcomeController'  
  })
  .when('/bracket', {
  	templateUrl: 'views/bracket.html',
  	controller: 'BracketController'
  })
  .otherwise({
      redirectTo: '/'
  });
}]);