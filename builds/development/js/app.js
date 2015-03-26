var myApp = angular.module('myApp', 
  ['ngRoute', 'firebase'])
  .constant('FIREBASE_URL', 'https://?.firebaseio.com/');

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
  .when('/login', {
    templateUrl: 'views/login.html',
    controller: 'RegistrationController'
  })
  .when('/register', {
    templateUrl: 'views/register.html',
    controller: 'RegistrationController'
  })
  .otherwise({
      redirectTo: '/'
  });
}]);