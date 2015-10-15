myApp.controller('WelcomeController', [ '$scope', '$location', 'bracketService',
	function($scope, $location, bracketService) {

	$scope.bracket = {
		number: '2',
		rule: 'single'
	};

	$scope.makeBracket = function() {
		bracketService.setBracket( $scope.bracket );
		console.log(bracketService.getBracket());
		$location.path('/bracket')
	};
  
}]);