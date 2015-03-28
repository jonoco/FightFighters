myApp.controller('UserController', 
	function($scope, $firebaseObject, $firebaseArray, $firebaseAuth, $location, FIREBASE_URL) {

  var ref = new Firebase( FIREBASE_URL );
  var authObj = $firebaseAuth( ref );
  var authData = authObj.$getAuth()

  if (authData) {
		var userRef = new Firebase( FIREBASE_URL + '/users/' + authData.uid + '/events' );
    var eventRef = new Firebase( FIREBASE_URL + '/events' );
		var userAry = $firebaseArray( userRef );

    userAry.$loaded().then(function( data ) {
      $scope.events = [];
      for (event in userAry) {
        // add to events
      }
    }); // user events loaded

    $scope.deleteEvent = function( id ) {
       var user = new Firebase( FIREBASE_URL + '/users/' + authData.uid + '/events/' + id );
       var event = new Firebase( FIREBASE_URL + '/events/' + id );
       user.remove();
       event.remove();
    }

		$scope.addEvent = function() {
      var newRef = userRef.push({added: Firebase.ServerValue.TIMESTAMP});

      var myEvent = {
        name: $scope.event.name,
        location: $scope.event.location,
        date: $scope.event.date,
        added: Firebase.ServerValue.TIMESTAMP
      };

      var eventKey = newRef.key();
      eventRef.child(eventKey).set(myEvent, function() {
        $scope.event.name = '';
        $scope.event.location = '';
        $scope.event.date = '';
        $('#eventModal').modal('hide');
      });
    } // addevent
	} else {
    $location.path('/')
  } // check authentication

});
