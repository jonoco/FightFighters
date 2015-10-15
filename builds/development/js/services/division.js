myApp.service('Division', [ '$firebaseObject', '$firebaseArray', 'FIREBASE_URL',
	function( $firebaseObject, $firebaseArray, FIREBASE_URL ) {

	function present(value, list) {
		for (var i = 0; i < list.length; i++) {
			if (value == list[i]) { return true };
		};
		return false;
	};

	var myObject = {
		division : function(user, event) {
			//take list of participants, 
			//compare each against list of divisions to find matches
			var divRef = new Firebase( FIREBASE_URL + '/users/' + user + '/events/' + event + '/divisions'); 
			var prtRef = new Firebase( FIREBASE_URL + '/users/' + user + '/events/' + event + '/participants'); 
			var divisions = $firebaseArray ( divRef );
			var participants = $firebaseArray ( prtRef );

			participants.$loaded().then(function() {
				// participants > divisions > find div match
				angular.forEach(participants, function( fighter ) {
					angular.forEach(divisions, function( div ) {
						if ( fighter.weight > div.minWeight && fighter.weight < div.maxWeight &&
								 fighter.age > div.minAge && fighter.age < div.maxAge &&
						 		 fighter.rank == div.rank && present(fighter.sex, div.sex) ) {
							//change rank and sex to lists, check fighter.rank in div.ranks
							fighter.division = div.name;
							participants.$save(fighter).then(function() {
								console.log(fighter.firstName + ' ' + fighter.lastName + ' division updated to ' + div.name);
							});
						}// division match 
					});// divisions
				});// participants
			});// assumption that participants array will load with or after divisions
		}// division()
	};// myObject

	return myObject;

}]);