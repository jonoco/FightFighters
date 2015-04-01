myApp.controller('EditorController', function(
	$scope, $firebaseObject, $location, $routeParams, Authentication, FIREBASE_URL) {

	$scope.eventId = $routeParams.eventId;
	$scope.userId = $routeParams.userId;

	// Authorization check for admin tools
	// TODO check for better method
  if (Authentication.user() !== $scope.userId) $location.path('/');

	var eventRef = new Firebase( FIREBASE_URL + '/users/' + $scope.userId + '/events/' + $scope.eventId );
	var eventObj = $firebaseObject( eventRef );

	eventObj.$loaded().then(function() {
		$scope.event = eventObj;
	});

	$scope.addDivision = function() {
		var name = $scope.division.rank + ' ' + $scope.division.sex + ' ' + $scope.division.minWeight + '-' +
			$scope.division.maxWeight + ' ' + $scope.division.minAge + '-' + $scope.division.maxAge
		
		var division = {
			name: name,
			minWeight: $scope.division.minWeight,
			maxWeight: $scope.division.maxWeight,
			minAge: $scope.division.minAge,
			maxAge: $scope.division.maxAge,
			rank: $scope.division.rank,
			sex: $scope.division.sex
		};

		eventRef.child('divisions').push(division, function() {
			$scope.division.minWeight = '';
			$scope.division.maxWeight = '';
			$scope.$apply();
		});
	};// addDivision
});
