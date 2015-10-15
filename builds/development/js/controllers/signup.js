myApp.controller('SignupController',[ '$scope', '$firebaseObject', '$location', '$routeParams', 'FIREBASE_URL', function(
	$scope, $firebaseObject, $location, $routeParams, FIREBASE_URL) {

	$scope.eventId = $routeParams.eventId;
	$scope.userId = $routeParams.userId;

	var eventRef = new Firebase( FIREBASE_URL + '/users/' + $scope.userId + '/events/' + $scope.eventId );
	var eventObj = $firebaseObject( eventRef );
	var signRef = new Firebase( FIREBASE_URL + '/users/' + $scope.userId + '/events/' + $scope.eventId + '/participants');
	
	eventObj.$loaded().then(function() {
		$scope.event = eventObj;
	});

	$scope.signup = function() {
		var participant = {
			firstName: $scope.user.firstName,
			lastName: $scope.user.lastName,
			age: $scope.user.age,
			weight: $scope.user.weight,
			rank: $scope.user.rank,
			sex: $scope.user.sex,
			division: 'No division'
		};

		signRef.push(participant, function() {
			$location.path('/event/' + $scope.userId + '/' + $scope.eventId);
			$scope.$apply();
		});
	};
}]);

