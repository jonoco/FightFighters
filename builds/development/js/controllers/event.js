myApp.controller('EventController', [ '$scope', 'Division', '$firebaseObject', '$firebaseArray', 'Authentication', '$firebaseAuth', '$location', '$routeParams', 'FIREBASE_URL',
	function( $scope, Division, $firebaseObject, $firebaseArray, Authentication, $firebaseAuth, $location, $routeParams, FIREBASE_URL) {

	$scope.eventId = $routeParams.eventId;
	$scope.userId = $routeParams.userId;
  $scope.loggedIn = Authentication.user(); 

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
	};

	$scope.bracket = function() {
		//assign bracket to a division
		//for each division that is being assigned, iter thru
		//and find a bracket for each, marking division as status:assigned
	}
}]);
