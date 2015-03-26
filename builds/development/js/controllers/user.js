myApp.controller('UserController', 
	function($scope, $firebaseObject, $firebaseArray, $firebaseAuth, $location, FIREBASE_URL) {

  var ref = new Firebase( FIREBASE_URL );
  var authObj = $firebaseAuth( ref );
  var authData = authObj.$getAuth();

  if (authData) {
		var ref = new Firebase( FIREBASE_URL + '/users/' + authData.uid + '/events' );
		var eventAry = $firebaseArray( ref );
    var eventObj = $firebaseObject( ref );

    eventObj.$loaded().then(function( data ) {
      $scope.events = eventObj;
    }); // user events loaded

    $scope.deleteEvent = function( id ) {
       var event = new Firebase( FIREBASE_URL + '/users/' + authData.uid + '/events/' + id );
       event.remove();
    }

		$scope.addEvent = function() {
      eventAry.$add({
        name: $scope.eventName,
        date: Firebase.ServerValue.TIMESTAMP
      }).then(function() {
        $scope.eventName = '';
      });
    } // addevent
	} else {
    $location.path('/')
  } // check authentication

});