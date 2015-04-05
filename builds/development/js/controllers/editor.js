myApp.controller('EditorController', function(
	$scope, $firebaseObject, $firebaseArray, $location, $routeParams, Authentication, FIREBASE_URL) {

	$scope.eventId = $routeParams.eventId;
	$scope.userId  = $routeParams.userId;

  if (Authentication.user() !== $scope.userId) $location.path('/');

	var eventRef = new Firebase( FIREBASE_URL + '/users/' + $scope.userId + '/events/' + $scope.eventId );
	var eventObj = $firebaseObject( eventRef );

	eventObj.$loaded().then(function() {
		$scope.event = eventObj;
	});

	$scope.addBracket = function(key, division) {
		var ref = new Firebase( FIREBASE_URL + '/users/' + $scope.userId + '/events/' + $scope.eventId + '/participants');
		var participants = $firebaseArray( ref );
		
		var bracket = {
			name: division.name,
			members: [],
			matches: [],
			status: 'waiting',
			added: Date.now()
		};

		participants.$loaded().then(function() {
			for (var i = 0; i < participants.length; i++) {
				if (division.name == participants[i].division) {
					
					console.log(participants[i]);	
					
					var member = {
						firstName : participants[i].firstName,
						lastName  : participants[i].lastName,
						division  : participants[i].division,
						age       : participants[i].age,
						rank      : participants[i].rank,
						weight    : participants[i].weight,
						sex       : participants[i].sex,
					};

					bracket.members.push(member);
				}
			};// participants iter

			console.log(bracket);

			var bracketLocation = 'brackets/' + division.name;
			eventRef.child(bracketLocation).set(bracket, function() {
				division.status = 'assigned';
				eventObj.$save();
				$scope.$apply();
			});// push bracket

		});// participants loaded
	};// addBracket

	$scope.addDivision = function() {
		var name = $scope.division.minAge + '-' + $scope.division.maxAge + ' ' + $scope.division.rank + ' ' +
			checkSex() + $scope.division.minWeight + '-' + $scope.division.maxWeight ;

		var division = {
			name      : name,
			minWeight : $scope.division.minWeight,
			maxWeight : $scope.division.maxWeight,
			minAge    : $scope.division.minAge,
			maxAge    : $scope.division.maxAge,
			rank      : $scope.division.rank,
			sex       : [ $scope.division.male || '', $scope.division.female || '' ],
			status    : 'unassigned',
			added     : Date.now()
		};

		eventRef.child('divisions').push(division, function() {
			$scope.division.minWeight = '';
			$scope.division.maxWeight = '';
			$scope.$apply();
		});//push
	};// addDivision

	function checkSex() {
		if ($scope.division.male && $scope.division.female) { return '' } 
		else if ($scope.division.male) { return 'Male ' }
		else { return 'Female ' }
	}
});
