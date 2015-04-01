myApp.controller('EventController', function(
	$scope, Division, $firebaseObject, $firebaseArray, $firebaseAuth, $location, $routeParams, FIREBASE_URL) {

	$scope.eventId = $routeParams.eventId;
	$scope.userId = $routeParams.userId;

	// Authorization check for admin tools
	// TODO check for better method
	var ref = new Firebase( FIREBASE_URL );
  var authObj = $firebaseAuth( ref );
  var authData = authObj.$getAuth();

  if (authData.uid == $scope.userId) {
  	$scope.loggedIn = true;
  }// check authentication

	var eventRef = new Firebase( FIREBASE_URL + '/users/' + $scope.userId + '/events/' + $scope.eventId );
	var eventObj = $firebaseObject( eventRef );
	var prtRef = new Firebase( FIREBASE_URL + '/users/' + $scope.userId + '/events/' + $scope.eventId + '/participants');
	var prtAry = $firebaseArray( prtRef );

	eventObj.$loaded().then(function() {
		$scope.event = eventObj;
	});

	prtAry.$loaded().then(function() {
		$scope.participants = prtAry;
	});

	$scope.division = function() {
		Division.division($scope.userId, $scope.eventId);
	}
});
