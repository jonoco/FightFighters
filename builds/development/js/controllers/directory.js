myApp.controller('DirectoryController', 
	function( $scope, $firebaseObject, $firebaseArray, $location, FIREBASE_URL ) {

	var ref = new Firebase( FIREBASE_URL + '/users' );
	var usersAry = $firebaseArray( ref );
	var directory = [];

	usersAry.$loaded().then(function() {
		for (var i = usersAry.length - 1; i >= 0; i--) {
			directory.push(usersAry[i].events);
		};
		$scope.directory = directory;
	});

});
