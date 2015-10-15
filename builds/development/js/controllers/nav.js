myApp.controller('NavController',[ '$scope', '$location', 'Authentication', '$firebaseAuth', 'FIREBASE_URL' ,function(
  $scope, $location, Authentication, $firebaseAuth, FIREBASE_URL ) {

  var ref = new Firebase( FIREBASE_URL );
  var authObj = $firebaseAuth( ref );
  
  authObj.$onAuth(function( authData ) {
    if (authData) {
      $scope.loggedIn = true;
    } else {
      $scope.loggedIn = null;
    }
  });

  $scope.logout = function() {
    Authentication.logout()
    $location.path('/');
  }

}]);