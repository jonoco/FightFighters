myApp.controller('RegistrationController', 
  function($scope, $location, Authentication) {

    $scope.login = function() {
      Authentication.login($scope.user)
        .then(function(user) {
        $location.path('/user');
      }, function(error) {
        $scope.message = error.toString();
      });
    } // login

    $scope.register = function() {
        Authentication.register($scope.user)
        .then(function(user) {
        Authentication.login($scope.user);
            $location.path('/user');
        }, function(error) {
            $scope.message = error.toString();
      });
    } // register

    $scope.match = function() {
      var match = function() {
        return $scope.user.confirm == $scope.user.password;
      }
    } // match

}); //RegistrationController