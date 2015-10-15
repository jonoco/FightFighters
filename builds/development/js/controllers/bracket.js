myApp.controller('BracketController',['$scope', 'bracketService',
 function($scope, bracketService) {
	
	$scope.bracket = bracketService.getBracket();
	
}]);